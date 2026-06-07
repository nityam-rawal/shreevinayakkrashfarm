// Lazy-loaded Tesseract OCR (hin + eng). Models cached by browser after first run.
import { createWorker, type Worker } from "tesseract.js";

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = createWorker(["eng", "hin"]);
  }
  return workerPromise;
}

export async function ocrImage(file: File | Blob): Promise<string> {
  const w = await getWorker();
  const { data } = await w.recognize(file);
  return data.text.trim();
}
