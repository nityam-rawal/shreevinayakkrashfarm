// Reusable mic button using the browser's Web Speech API. Works fully
// offline on most modern Android Chrome (Google's on-device recognizer
// kicks in when available). Supports Hindi + English mixed (Hinglish).
//
// Usage:
//   <VoiceButton onResult={(text) => setName(text)} lang="hi-IN" />

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Minimal typing for the non-standard Web Speech API
type SR = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function getSR(): (new () => SR) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SR;
    webkitSpeechRecognition?: new () => SR;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Convert Hindi spoken numbers to digits inside a transcript.
const HINDI_NUM: Record<string, string> = {
  "शून्य": "0", "एक": "1", "दो": "2", "तीन": "3", "चार": "4",
  "पाँच": "5", "पांच": "5", "छह": "6", "छः": "6", "सात": "7",
  "आठ": "8", "नौ": "9", "दस": "10", "ग्यारह": "11", "बारह": "12",
  "बरह": "12", "तेरह": "13", "चौदह": "14", "पंद्रह": "15",
  "सोलह": "16", "सत्रह": "17", "अठारह": "18", "उन्नीस": "19",
  "बीस": "20", "तीस": "30", "चालीस": "40", "पचास": "50",
  "साठ": "60", "सत्तर": "70", "अस्सी": "80", "नब्बे": "90",
  "सौ": "100", "हजार": "1000", "हज़ार": "1000", "लाख": "100000",
};
export function normalizeHinglish(s: string): string {
  let out = s.trim();
  for (const [k, v] of Object.entries(HINDI_NUM)) {
    out = out.replace(new RegExp(k, "g"), v);
  }
  return out;
}

interface Props {
  onResult: (text: string) => void;
  lang?: string;
  className?: string;
}

export function VoiceButton({ onResult, lang = "hi-IN", className }: Props) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef<SR | null>(null);

  useEffect(() => {
    const SR = getSR();
    if (!SR) {
      setSupported(false);
      return;
    }
    const r = new SR();
    r.lang = lang;
    r.continuous = false;
    r.interimResults = false;
    r.onresult = (e) => {
      const t = e.results[0]?.[0]?.transcript ?? "";
      if (t) onResult(normalizeHinglish(t));
    };
    r.onerror = (e) => {
      if (e.error !== "aborted") toast.error("Mic error: " + e.error);
    };
    r.onend = () => setListening(false);
    recRef.current = r;
    return () => { try { r.stop(); } catch { /* noop */ } };
  // re-create only when lang changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function toggle() {
    const r = recRef.current;
    if (!r) return;
    if (listening) {
      r.stop();
      setListening(false);
    } else {
      try {
        r.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  }

  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? "Sun raha hu..." : "Bolke likho"}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors",
        listening
          ? "animate-pulse border-destructive bg-destructive/10 text-destructive"
          : "border-input bg-background text-muted-foreground hover:bg-accent",
        className,
      )}
    >
      {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </button>
  );
}
