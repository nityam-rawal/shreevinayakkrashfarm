// Privacy-first microphone hook.
// Captures raw PCM at 16 kHz mono via Web Audio (no server, no MediaRecorder
// container quirks). Exposes a live level (0..1) for a visualizer and the
// accumulated Float32 PCM buffer.

import { useCallback, useEffect, useRef, useState } from "react";

interface UseMicRecorderOptions {
  targetSampleRate?: number; // default 16000 (Whisper)
  onChunk?: (pcm: Float32Array, totalPcm: Float32Array) => void;
  chunkSeconds?: number; // emit onChunk every N seconds while recording
}

interface UseMicRecorder {
  state: "idle" | "recording";
  level: number;
  error: string | null;
  start: () => Promise<void>;
  stop: () => Promise<Float32Array>;
  reset: () => void;
}

export function useMicRecorder(opts: UseMicRecorderOptions = {}): UseMicRecorder {
  const targetRate = opts.targetSampleRate ?? 16000;
  const chunkSec = opts.chunkSeconds ?? 4;

  const [state, setState] = useState<"idle" | "recording">("idle");
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const procRef = useRef<ScriptProcessorNode | null>(null);
  const srcRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const chunksRef = useRef<Float32Array[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastEmitRef = useRef<number>(0);
  const sinceEmitRef = useRef<Float32Array[]>([]);
  const onChunkRef = useRef(opts.onChunk);
  useEffect(() => { onChunkRef.current = opts.onChunk; }, [opts.onChunk]);

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    procRef.current?.disconnect();
    srcRef.current?.disconnect();
    analyserRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    ctxRef.current?.close().catch(() => {});
    procRef.current = null;
    srcRef.current = null;
    analyserRef.current = null;
    streamRef.current = null;
    ctxRef.current = null;
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const start = useCallback(async () => {
    if (state === "recording") return;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
      });
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      const proc = ctx.createScriptProcessor(4096, 1, 1);
      const inRate = ctx.sampleRate;
      const ratio = inRate / targetRate;

      chunksRef.current = [];
      sinceEmitRef.current = [];
      lastEmitRef.current = performance.now();

      proc.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        const outLen = Math.floor(input.length / ratio);
        const out = new Float32Array(outLen);
        for (let i = 0; i < outLen; i++) out[i] = input[Math.floor(i * ratio)];
        chunksRef.current.push(out);
        sinceEmitRef.current.push(out);

        const now = performance.now();
        if (onChunkRef.current && now - lastEmitRef.current >= chunkSec * 1000) {
          lastEmitRef.current = now;
          const chunk = concat(sinceEmitRef.current);
          sinceEmitRef.current = [];
          const total = concat(chunksRef.current);
          onChunkRef.current(chunk, total);
        }
      };

      src.connect(analyser);
      src.connect(proc);
      proc.connect(ctx.destination);

      streamRef.current = stream;
      ctxRef.current = ctx;
      srcRef.current = src;
      procRef.current = proc;
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          const v = (data[i] - 128) / 128;
          sum += v * v;
        }
        setLevel(Math.min(1, Math.sqrt(sum / data.length) * 2.5));
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();

      setState("recording");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mic permission denied");
      cleanup();
    }
  }, [state, targetRate, chunkSec, cleanup]);

  const stop = useCallback(async () => {
    const full = concat(chunksRef.current);
    cleanup();
    setState("idle");
    setLevel(0);
    return full;
  }, [cleanup]);

  const reset = useCallback(() => {
    chunksRef.current = [];
    sinceEmitRef.current = [];
    setLevel(0);
  }, []);

  return { state, level, error, start, stop, reset };
}

function concat(parts: Float32Array[]): Float32Array {
  let len = 0;
  for (const p of parts) len += p.length;
  const out = new Float32Array(len);
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
