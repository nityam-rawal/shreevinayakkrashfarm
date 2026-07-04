import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { db, nextInvoiceNumber, adjustStockForLines } from "@/lib/db";
import { parseCommand, type ParsedAction } from "@/lib/nlp";
import { synthesizeDay, type SynthesisResult } from "@/lib/agent";
import { AgentConfirmSheet } from "@/components/AgentConfirmSheet";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, CheckCircle2, Loader2, Mic, MicOff, Camera, WifiOff, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { todayISO, fmtINR } from "@/lib/format";
import { ocrImage } from "@/lib/ocr";
import { VoiceDictation } from "@/components/VoiceDictation";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Assistant — Offline" }] }),
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === "string" ? s.q : undefined,
    auto: s.auto === "1" || s.auto === 1 || s.auto === true ? 1 : undefined,
  }),
  component: ChatPage,
});

type ChatMsg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; actions: ParsedAction[]; done: boolean[] };

async function applyAction(a: ParsedAction): Promise<string> {
  if (a.action === "create_invoice") {
    const d = a.data;
    let party = await db.parties.where("name").equalsIgnoreCase(d.partyName).first();
    if (!party) {
      const id = await db.parties.add({ name: d.partyName, type: "customer", createdAt: Date.now() });
      party = await db.parties.get(id);
    }
    const lines = d.lines.map((l) => ({ ...l, amount: l.qty * l.rate }));
    const subtotal = lines.reduce((acc, l) => acc + l.amount, 0);
    const total = subtotal;
    const number = await nextInvoiceNumber();
    const date = d.date ?? todayISO();
    const invId = await db.invoices.add({
      number, partyId: party!.id!, date, lines,
      subtotal, discount: 0, total, paid: d.paid ?? 0,
      notes: d.notes, createdAt: Date.now(),
    });
    await db.ledger.add({ partyId: party!.id!, date, type: "invoice", debit: total, credit: 0, note: `Bill ${number}`, invoiceId: invId, createdAt: Date.now() });
    if (d.paid && d.paid > 0) {
      await db.ledger.add({ partyId: party!.id!, date, type: "payment", debit: 0, credit: d.paid, note: `Paid ${number}`, invoiceId: invId, createdAt: Date.now() });
      await db.cash.add({ date, type: "income", amount: d.paid, category: "Sales", note: number, partyId: party!.id!, createdAt: Date.now() });
    }
    const stockUpdates = await adjustStockForLines(lines, -1);
    const low = stockUpdates.filter((s) => s.low).map((s) => `${s.name}:${s.newStock}`).join(",");
    return `Bill ${number}${low ? ` (low: ${low})` : ""}`;
  }
  if (a.action === "add_cash") {
    const d = a.data;
    await db.cash.add({ date: d.date ?? todayISO(), type: d.type, amount: d.amount, category: d.category, note: d.note, createdAt: Date.now() });
    return `Cash ${d.type} ${fmtINR(d.amount)}`;
  }
  if (a.action === "add_ledger") {
    const d = a.data;
    const date = d.date ?? todayISO();
    let party = await db.parties.where("name").equalsIgnoreCase(d.partyName).first();
    if (!party) {
      const id = await db.parties.add({ name: d.partyName, type: "customer", createdAt: Date.now() });
      party = await db.parties.get(id);
    }
    const isOut = d.direction === "out" || d.amount < 0;
    const abs = Math.abs(d.amount);
    const debit = d.type === "invoice" ? abs : isOut ? abs : 0;
    const credit = d.type === "payment" && !isOut ? abs : 0;
    await db.ledger.add({ partyId: party!.id!, date, type: d.type, debit, credit, note: d.note, createdAt: Date.now() });
    if (d.type === "payment") {
      await db.cash.add({
        date, type: isOut ? "expense" : "income", amount: abs,
        category: isOut ? "Party Payment Out" : "Party Payment",
        note: d.partyName, partyId: party!.id!, createdAt: Date.now(),
      });
    }
    return `Khata: ${d.partyName} ${isOut ? "(paid out)" : "(received)"}`;
  }
  // answer: read-only — nothing to save
  return a.data.text;
}

function ChatPage() {
  const { q, auto } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState(q ?? "");
  const [listening, setListening] = useState(false);
  const [ocrBusy, setOcrBusy] = useState(false);
  const [synth, setSynth] = useState<SynthesisResult | null>(null);
  const [synthOpen, setSynthOpen] = useState(false);
  const [synthBusy, setSynthBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<unknown>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoFiredRef = useRef(false);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (auto && q && !autoFiredRef.current) {
      autoFiredRef.current = true;
      setInput(q);
      setTimeout(() => { void submit(); navigate({ to: "/chat", search: { q: undefined, auto: undefined }, replace: true }); }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, q]);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    const result = await parseCommand(text);
    const reply: ChatMsg = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: result.summary + (result.unmatched.length ? `\n\nNot understood: ${result.unmatched.join("; ")}` : ""),
      actions: result.actions,
      done: result.actions.map(() => false),
    };
    setMessages((m) => [...m, reply]);
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  async function applyOne(msgId: string, idx: number) {
    const m = messages.find((x) => x.id === msgId);
    if (!m || m.role !== "assistant") return;
    try {
      const r = await applyAction(m.actions[idx]);
      toast.success(r);
      setMessages((all) => all.map((x) => x.id === msgId && x.role === "assistant"
        ? { ...x, done: x.done.map((v, i) => i === idx ? true : v) }
        : x));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    }
  }

  async function applyAll(msgId: string) {
    const m = messages.find((x) => x.id === msgId);
    if (!m || m.role !== "assistant") return;
    let n = 0;
    for (let i = 0; i < m.actions.length; i++) {
      if (m.done[i] || m.actions[i].action === "answer") continue;
      try { await applyAction(m.actions[i]); n++; } catch (e) {
        toast.error(`Step ${i + 1}: ${e instanceof Error ? e.message : "fail"}`);
      }
    }
    setMessages((all) => all.map((x) => x.id === msgId && x.role === "assistant"
      ? { ...x, done: x.actions.map(() => true) } : x));
    toast.success(`${n} entries save ho gayi`);
  }

  function toggleVoice() {
    const w = window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { toast.error("Voice support nahi hai is browser me"); return; }
    if (listening) {
      const r = recRef.current as { _stop?: boolean; stop: () => void } | null;
      if (r) { r._stop = true; r.stop(); }
      setListening(false);
      return;
    }
    // Try Hindi first; if browser errors "language-not-supported", fall back to en-IN.
    const langs = ["hi-IN", "en-IN", "en-US"];
    let langIdx = 0;
    let finalText = "";

    const start = () => {
      const rec = new SR() as {
        lang: string; continuous: boolean; interimResults: boolean; maxAlternatives: number;
        onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal?: boolean }> }) => void;
        onend: () => void; onerror: (e: { error: string }) => void;
        start: () => void; stop: () => void; _stop?: boolean;
      };
      rec.lang = langs[langIdx];
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 3;
      rec.onresult = (e) => {
        let interim = "";
        for (let i = 0; i < e.results.length; i++) {
          const r = e.results[i];
          const t = r[0].transcript;
          if ((r as unknown as { isFinal: boolean }).isFinal) finalText += t + " ";
          else interim += t;
        }
        setInput((finalText + interim).trim());
      };
      rec.onerror = (e) => {
        if (e.error === "language-not-supported" && langIdx < langs.length - 1) {
          langIdx++; return; // onend will restart with next lang
        }
        if (e.error === "no-speech" || e.error === "aborted") return;
        toast.error("Voice: " + e.error);
      };
      rec.onend = () => {
        if (rec._stop) { setListening(false); return; }
        // auto-restart to keep capturing long dictations / lang fallback
        try { rec.start(); } catch { setListening(false); }
      };
      recRef.current = rec;
      try { rec.start(); setListening(true); } catch { setListening(false); }
    };
    start();
  }

  async function onOcrFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setOcrBusy(true);
    const tid = toast.loading("Image padh raha hu...");
    try {
      const text = await ocrImage(f);
      toast.dismiss(tid);
      if (!text) { toast.error("Kuch padha nahi gaya"); return; }
      setInput((prev: string) => (prev ? prev + "\n" : "") + text);
      toast.success("Text mil gaya — review karke send karo");
      inputRef.current?.focus();
    } catch (err) {
      toast.dismiss(tid);
      toast.error(err instanceof Error ? err.message : "OCR error");
    } finally {
      setOcrBusy(false);
    }
  }

  async function runSynthesis() {
    const text = input.trim();
    if (!text || text.length < 8) { toast.error("Pehle poora din ka hisab likho ya bolo."); return; }
    setSynthBusy(true);
    const tid = toast.loading("Vinayak AI analyze kar raha hai...");
    try {
      const res = await synthesizeDay(text);
      toast.dismiss(tid);
      setSynth(res);
      if (res.planned.length === 0 && res.answers.length === 0) {
        toast.error("Kuch actionable nahi mila. Try: 'Ram ko 2 brass reti bheji, Suresh ne 5000 diya, 500 diesel'.");
        return;
      }
      if (res.planned.length === 0 && res.answers.length > 0) {
        // Only queries — reply inline
        const reply: ChatMsg = { id: crypto.randomUUID(), role: "assistant", text: res.answers.join("\n\n"), actions: [], done: [] };
        setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }, reply]);
        setInput("");
        return;
      }
      setSynthOpen(true);
    } catch (e) {
      toast.dismiss(tid);
      toast.error(e instanceof Error ? e.message : "Synthesis failed");
    } finally { setSynthBusy(false); }
  }

  const suggestions = [
    "Aaj ka hisaab batao",
    "Ram ka kitna udhaar hai",
    "Stock dikhao",
    "Ram ko 2 brass reti aur 10 bag cement bheji, 1000 paid. Suresh ne 5000 cash diya. 500 ka diesel kharcha. Mohan ko 2000 advance diya.",
  ];

  return (
    <AppShell title="Vinayak AI">
      <div className="flex flex-col" style={{ minHeight: "calc(100vh - 220px)" }}>
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <div className="rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-5">
              <div className="flex items-center gap-2 font-display font-bold text-primary">
                <Sparkles className="h-5 w-5" /> Namaste!
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-success">
                <WifiOff className="h-3 w-3" /> 100% Offline — data phone se bahar nahi jaata
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Bolo 🎤, photo 📷 daalo, ya likho. Hindi/Hinglish me bill, khata, cashbook sab ek saath.
              </p>
              <div className="mt-3 space-y-1.5">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(s); inputRef.current?.focus(); }}
                    className="block w-full rounded-xl border border-border bg-card px-3 py-2 text-left text-xs hover:border-primary/50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border bg-card"
                }`}
              >
                {m.text}
                {m.role === "assistant" && m.actions.filter(a => a.action !== "answer").length > 0 && (
                  <div className="mt-3 space-y-2">
                    {m.actions.map((a, i) => {
                      if (a.action === "answer") return null;
                      return (
                      <div key={i} className="rounded-xl border border-primary/30 bg-background p-3">
                        <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary">
                          <span>{a.action.replace("_", " ")}</span>
                          {m.done[i] && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        </div>
                        <pre className="num overflow-x-auto whitespace-pre-wrap text-xs text-muted-foreground">
                          {a.action === "create_invoice" && (
                            <>
                              {a.data.partyName}
                              {"\n"}
                              {a.data.lines.map((l) => `  • ${l.qty} ${l.unit} ${l.name} @ ${fmtINR(l.rate)} = ${fmtINR(l.qty * l.rate)}`).join("\n")}
                              {"\n"}Total: {fmtINR(a.data.lines.reduce((acc, l) => acc + l.qty * l.rate, 0))}
                              {a.data.paid ? `  •  Paid: ${fmtINR(a.data.paid)}` : ""}
                            </>
                          )}
                          {a.action === "add_cash" && `${a.data.type.toUpperCase()} ${fmtINR(a.data.amount)} — ${a.data.category}`}
                          {a.action === "add_ledger" && `${a.data.partyName}: ${a.data.type} ${fmtINR(Math.abs(a.data.amount))}`}
                        </pre>
                        {!m.done[i] && (
                          <Button size="sm" variant="outline" onClick={() => applyOne(m.id, i)} className="mt-2">
                            Save this
                          </Button>
                        )}
                      </div>
                      );
                    })}
                    {m.actions.filter(a => a.action !== "answer").length > 1 && !m.done.every(Boolean) && (
                      <Button size="sm" onClick={() => applyAll(m.id)} className="w-full gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Save All ({m.actions.filter(a => a.action !== "answer").length})
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-20 mt-2 space-y-2">
          <VoiceDictation onResult={(t: string) => setInput(t)} />

          {input.trim().length > 20 && (
            <Button
              type="button"
              onClick={runSynthesis}
              disabled={synthBusy}
              variant="secondary"
              className="w-full gap-1.5 border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
            >
              {synthBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarClock className="h-4 w-4" />}
              Din bhar ka hisab synthesize karo
            </Button>
          )}

          <form onSubmit={submit} className="flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-md">
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onOcrFile} className="hidden" />
            <Button type="button" size="icon" variant="ghost" disabled={ocrBusy} onClick={() => fileRef.current?.click()} title="Photo / OCR">
              {ocrBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            </Button>
            <Button type="button" size="icon" variant={listening ? "destructive" : "ghost"} onClick={toggleVoice} title="Quick voice (browser)">
              {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
            }}
            placeholder="Bolo, photo daalo, ya poora din ka hisab likho..."
            rows={1}
            className="min-h-[44px] resize-none border-0 focus-visible:ring-0"
          />
          <Button type="submit" disabled={!input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
          </form>
        </div>
      </div>

      <AgentConfirmSheet
        open={synthOpen}
        onOpenChange={setSynthOpen}
        result={synth}
        onDone={(summary) => {
          setInput("");
          setMessages((m) => [...m, {
            id: crypto.randomUUID(), role: "assistant",
            text: `✓ Din bhar ka hisab save ho gaya:\n${summary}`,
            actions: [], done: [],
          }]);
        }}
      />


    </AppShell>
  );
}
