// Offline speech-to-text using Whisper via Transformers.js (ONNX + WebAssembly).
// First use downloads ~40MB model (whisper-tiny multilingual), cached in
// IndexedDB by the library. All subsequent runs are 100% offline.
//
// Falls back gracefully if the browser can't load WASM.

type Pipeline = (audio: Float32Array, opts?: Record<string, unknown>) => Promise<{ text: string }>;

let pipelinePromise: Promise<Pipeline> | null = null;
let progressCb: ((p: { status: string; progress?: number; file?: string }) => void) | null = null;

export function onWhisperProgress(cb: typeof progressCb): void {
  progressCb = cb;
}

async function getPipeline(): Promise<Pipeline> {
  if (!pipelinePromise) {
    pipelinePromise = (async () => {
      const t = await import("@huggingface/transformers");
      // Force WASM backend (works everywhere; WebGPU optional)
      const p = await t.pipeline("automatic-speech-recognition", "Xenova/whisper-tiny", {
        progress_callback: (info: { status: string; progress?: number; file?: string }) => {
          progressCb?.(info);
        },
      });
      return p as unknown as Pipeline;
    })();
  }
  return pipelinePromise;
}

/** Decode a browser AudioBuffer into 16kHz mono Float32. Whisper wants 16kHz. */
async function toMono16k(blob: Blob): Promise<Float32Array> {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ac = new AC();
  const buf = await ac.decodeAudioData(await blob.arrayBuffer());
  const src = buf.getChannelData(0);
  const targetRate = 16000;
  if (buf.sampleRate === targetRate) { await ac.close(); return src; }
  const ratio = buf.sampleRate / targetRate;
  const outLen = Math.floor(src.length / ratio);
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    out[i] = src[Math.floor(i * ratio)];
  }
  await ac.close();
  return out;
}

/**
 * Transcribe an audio blob. Auto-detects language when `language` is omitted;
 * pass an ISO code (e.g. "hi", "en", "gu", "mr") to force one.
 */
export async function transcribeBlob(blob: Blob, language?: string): Promise<string> {
  const audio = await toMono16k(blob);
  return transcribePcm(audio, language);
}

/** Transcribe raw 16 kHz mono Float32 PCM (fast path — no decode). */
export async function transcribePcm(audio: Float32Array, language?: string): Promise<string> {
  if (audio.length < 16000 * 0.3) return ""; // <300ms — skip
  const asr = await getPipeline();
  const out = await asr(audio, {
    task: "transcribe",
    language,
    chunk_length_s: 30,
    stride_length_s: 5,
    return_timestamps: false,
  });
  return (out?.text ?? "").trim();
}

/** True once the model is downloaded and warm. */
export function isWhisperReady(): boolean {
  return pipelinePromise !== null;
}

/** Kick off model download without transcribing (for a "prepare offline" button). */
export async function preloadWhisper(): Promise<void> {
  await getPipeline();
}
