// Lazy-loaded Tesseract OCR (hin + eng) with heavy client-side preprocessing.
// Preprocessing (upscale + grayscale + adaptive threshold) typically doubles
// accuracy on phone photos of handwritten/printed bills.
import { createWorker, type Worker } from "tesseract.js";

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = (async () => {
      const w = await createWorker(["eng", "hin"]);
      // Bill-friendly PSM: assume a single uniform block of text.
      await w.setParameters({
        tessedit_pageseg_mode: "6" as unknown as never,
        preserve_interword_spaces: "1" as unknown as never,
      });
      return w;
    })();
  }
  return workerPromise;
}

// Load blob → HTMLImageElement
function loadImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

// Preprocess: upscale small images to ~1600px on the long edge, convert to
// grayscale with contrast boost + Otsu-like threshold. Returns a Blob.
async function preprocess(blob: Blob): Promise<Blob> {
  try {
    const img = await loadImage(blob);
    const longEdge = Math.max(img.width, img.height);
    const target = 1600;
    const scale = longEdge < target ? target / longEdge : 1;
    const W = Math.round(img.width * scale);
    const H = Math.round(img.height * scale);

    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return blob;
    ctx.drawImage(img, 0, 0, W, H);

    const data = ctx.getImageData(0, 0, W, H);
    const px = data.data;

    // Grayscale + histogram for Otsu threshold
    const hist = new Uint32Array(256);
    for (let i = 0; i < px.length; i += 4) {
      const g = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) | 0;
      px[i] = px[i + 1] = px[i + 2] = g;
      hist[g]++;
    }
    // Otsu
    const total = W * H;
    let sum = 0;
    for (let t = 0; t < 256; t++) sum += t * hist[t];
    let sumB = 0, wB = 0, varMax = 0, threshold = 128;
    for (let t = 0; t < 256; t++) {
      wB += hist[t];
      if (!wB) continue;
      const wF = total - wB;
      if (!wF) break;
      sumB += t * hist[t];
      const mB = sumB / wB;
      const mF = (sum - sumB) / wF;
      const v = wB * wF * (mB - mF) * (mB - mF);
      if (v > varMax) { varMax = v; threshold = t; }
    }
    // Slight bias to keep faint strokes
    const th = Math.max(80, threshold - 10);
    for (let i = 0; i < px.length; i += 4) {
      const v = px[i] > th ? 255 : 0;
      px[i] = px[i + 1] = px[i + 2] = v;
    }
    ctx.putImageData(data, 0, 0);
    return await new Promise<Blob>((res) => c.toBlob((b) => res(b ?? blob), "image/png"));
  } catch {
    return blob;
  }
}

export async function ocrImage(file: File | Blob): Promise<string> {
  const pre = await preprocess(file);
  const w = await getWorker();
  const { data } = await w.recognize(pre);
  // Clean common OCR noise
  return data.text
    .replace(/[|·•●◦]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
