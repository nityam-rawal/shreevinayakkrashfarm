// Privacy-first offline voice dictation using Whisper (WASM).
// - Web Audio PCM capture (no server, no MediaRecorder container issues)
// - Live animated waveform visualizer driven by mic RMS level
// - Progressive transcription: every ~4s we transcribe the full buffer so far
//   and stream the growing text into the parent via `onResult`
// - Model loading state with % progress (first run downloads ~40MB, then cached)
// - "Privacy Mode" badge to reassure the user everything is local

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Mic, ShieldCheck, Square } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMicRecorder } from "@/hooks/useMicRecorder";
import { onWhisperProgress, preloadWhisper, transcribePcm } from "@/lib/whisper";

interface Props {
  /** Called with the *latest full* transcript each time we re-transcribe. */
  onResult: (text: string) => void;
  /** Optional: force a language (ISO). Omit for auto-detect. */
  language?: string;
  /** Chunk cadence for progressive transcription. Default 4s. */
  chunkSeconds?: number;
  className?: string;
  compact?: boolean;
}

type ModelState = "cold" | "loading" | "ready" | "error";

export function VoiceDictation({ onResult, language, chunkSeconds = 4, className, compact = false }: Props) {
  const [modelState, setModelState] = useState<ModelState>("cold");
  const [modelProgress, setModelProgress] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [liveText, setLiveText] = useState("");
  const inFlightRef = useRef(false);
  const pendingRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    onWhisperProgress((p) => {
      if (p.status === "progress" && typeof p.progress === "number") {
        setModelProgress(Math.round(p.progress));
        setModelState("loading");
      } else if (p.status === "ready" || p.status === "done") {
        setModelState("ready");
      }
    });
  }, []);

  async function runTranscription(pcm: Float32Array) {
    if (pcm.length < 16000 * 0.5) return; // <0.5s
    if (inFlightRef.current) { pendingRef.current = pcm; return; }
    inFlightRef.current = true;
    setTranscribing(true);
    try {
      const text = await transcribePcm(pcm, language);
      if (text) { setLiveText(text); onResult(text); }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Transcription failed");
    } finally {
      inFlightRef.current = false;
      setTranscribing(false);
      const q = pendingRef.current;
      pendingRef.current = null;
      if (q) void runTranscription(q);
    }
  }

  const rec = useMicRecorder({
    chunkSeconds,
    onChunk: (_chunk, total) => { void runTranscription(total); },
  });

  useEffect(() => { if (rec.error) toast.error(rec.error); }, [rec.error]);

  async function toggle() {
    if (rec.state === "recording") {
      const full = await rec.stop();
      if (full.length >= 16000 * 0.5) await runTranscription(full);
      return;
    }
    setLiveText("");
    if (modelState !== "ready") {
      setModelState("loading");
      const tid = toast.loading("Model load ho raha hai (ek baar hi, phir offline)…");
      try { await preloadWhisper(); setModelState("ready"); toast.dismiss(tid); }
      catch (e) { toast.dismiss(tid); setModelState("error"); toast.error(e instanceof Error ? e.message : "Model load fail"); return; }
    }
    await rec.start();
  }

  const bars = useMemo(() => new Array(20).fill(0), []);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          disabled={modelState === "loading" && rec.state !== "recording"}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors",
            rec.state === "recording"
              ? "animate-pulse border-destructive bg-destructive/10 text-destructive"
              : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
          )}
          aria-label={rec.state === "recording" ? "Stop recording" : "Start recording"}
        >
          {modelState === "loading" && rec.state !== "recording"
            ? <><Loader2 className="h-4 w-4 animate-spin" />{modelProgress ? `${modelProgress}%` : "Loading…"}</>
            : rec.state === "recording"
              ? <><Square className="h-4 w-4" />Stop</>
              : <><Mic className="h-4 w-4" />Bolo</>}
        </button>

        {/* Live waveform */}
        <div className="flex h-10 flex-1 items-center gap-[2px] rounded-full border border-border bg-muted/40 px-3">
          {bars.map((_, i) => {
            const center = bars.length / 2;
            const dist = Math.abs(i - center) / center;
            const active = rec.state === "recording";
            const h = active
              ? Math.max(4, rec.level * 28 * (1 - dist * 0.6) + (Math.random() * 4))
              : 3;
            return (
              <span
                key={i}
                style={{ height: `${h}px` }}
                className={cn(
                  "w-[3px] rounded-full transition-[height] duration-75",
                  active ? "bg-primary" : "bg-muted-foreground/40",
                )}
              />
            );
          })}
        </div>

        <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-1 text-[10px] font-semibold text-success">
          <ShieldCheck className="h-3 w-3" /> Privacy Mode
        </span>
      </div>

      {!compact && (transcribing || liveText) && (
        <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 text-sm">
          <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {transcribing && <Loader2 className="h-3 w-3 animate-spin" />}
            Live transcript (100% on-device)
          </div>
          <div className="whitespace-pre-wrap text-foreground">{liveText || "…"}</div>
        </div>
      )}
    </div>
  );
}
