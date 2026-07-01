// Native offline mic recorder that transcribes via Whisper WASM.
// Records PCM via MediaRecorder → sends to whisper pipeline → returns text.

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { transcribeBlob, onWhisperProgress } from "@/lib/whisper";
import { cn } from "@/lib/utils";

interface Props {
  onResult: (text: string) => void;
  language?: string; // undefined = auto-detect
  className?: string;
}

export function WhisperRecorder({ onResult, language, className }: Props) {
  const [state, setState] = useState<"idle" | "recording" | "transcribing" | "loading">("idle");
  const [progress, setProgress] = useState<number>(0);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    onWhisperProgress((p) => {
      if (typeof p.progress === "number") setProgress(Math.round(p.progress));
    });
  }, []);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        if (blob.size < 2000) { setState("idle"); toast.error("Kuch bola nahi gaya"); return; }
        setState("loading");
        const tid = toast.loading("Sun raha hu (offline)...");
        try {
          const text = await transcribeBlob(blob, language);
          toast.dismiss(tid);
          if (text) { onResult(text); toast.success("Ho gaya"); }
          else toast.error("Awaz clear nahi thi");
        } catch (e) {
          toast.dismiss(tid);
          toast.error(e instanceof Error ? e.message : "Whisper error");
        } finally { setState("idle"); }
      };
      recRef.current = rec;
      rec.start();
      setState("recording");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Mic permission denied");
    }
  }

  function stop() {
    recRef.current?.stop();
    setState("transcribing");
  }

  const busy = state === "loading" || state === "transcribing";
  return (
    <button
      type="button"
      onClick={() => (state === "recording" ? stop() : start())}
      disabled={busy}
      title={state === "recording" ? "Rok do" : "Bolke likho (offline Whisper)"}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-1 rounded-md border px-2 text-xs font-medium transition-colors",
        state === "recording"
          ? "animate-pulse border-destructive bg-destructive/10 text-destructive"
          : busy
            ? "border-input bg-muted text-muted-foreground"
            : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
        className,
      )}
    >
      {state === "recording" ? <Square className="h-4 w-4" /> :
       busy ? <Loader2 className="h-4 w-4 animate-spin" /> :
       <Mic className="h-4 w-4" />}
      <span>{state === "recording" ? "Stop" : busy ? (progress ? `${progress}%` : "…") : "Whisper"}</span>
    </button>
  );
}
