import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { db, nextInvoiceNumber, adjustStockForLines } from "@/lib/db";
import { parseCommand, type ParsedAction } from "@/lib/nlp";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, CheckCircle2, Loader2, Mic, MicOff, Camera, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { todayISO, fmtINR } from "@/lib/format";
import { ocrImage } from "@/lib/ocr";

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
    const date = todayISO();
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
    await db.cash.add({ date: todayISO(), type: d.type, amount: d.amount, category: d.category, note: d.note, createdAt: Date.now() });
    return `Cash ${d.type} ${fmtINR(d.amount)}`;
  }
  const d = a.data;
  let party = await db.parties.where("name").equalsIgnoreCase(d.partyName).first();
  if (!party) {
    const id = await db.parties.add({ name: d.partyName, type: "customer", createdAt: Date.now() });
    party = await db.parties.get(id);
  }
  const debit = d.type === "invoice" ? Math.abs(d.amount) : 0;
  const credit = d.type === "payment" ? Math.abs(d.amount) : 0;
  await db.ledger.add({ partyId: party!.id!, date: todayISO(), type: d.type, debit, credit, note: d.note, createdAt: Date.now() });
  if (d.type === "payment") {
    await db.cash.add({ date: todayISO(), type: "income", amount: Math.abs(d.amount), category: "Party Payment", note: d.partyName, partyId: party!.id!, createdAt: Date.now() });
  }
  return `Khata: ${d.partyName}`;
}

function ChatPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [ocrBusy, setOcrBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<unknown>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

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
      if (m.done[i]) continue;
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
      (recRef.current as { stop: () => void } | null)?.stop();
      setListening(false);
      return;
    }
    const rec = new SR() as {
      lang: string; continuous: boolean; interimResults: boolean;
      onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
      onend: () => void; onerror: (e: { error: string }) => void;
      start: () => void; stop: () => void;
    };
    rec.lang = "hi-IN";
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = "";
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
    rec.onend = () => setListening(false);
    rec.onerror = (e) => { toast.error("Voice: " + e.error); setListening(false); };
    recRef.current = rec;
    rec.start();
    setListening(true);
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
      setInput((prev) => (prev ? prev + "\n" : "") + text);
      toast.success("Text mil gaya — review karke send karo");
      inputRef.current?.focus();
    } catch (err) {
      toast.dismiss(tid);
      toast.error(err instanceof Error ? err.message : "OCR error");
    } finally {
      setOcrBusy(false);
    }
  }

  const suggestions = [
    "Ram ko 2 brass reti badi aur 10 bag cement bheji",
    "Suresh ne 5000 cash diya",
    "500 ka diesel kharcha",
    "Shyam ko 3 trip tractor bheji, 1000 paid",
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
                {m.role === "assistant" && m.actions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {m.actions.map((a, i) => (
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
                    ))}
                    {m.actions.length > 1 && !m.done.every(Boolean) && (
                      <Button size="sm" onClick={() => applyAll(m.id)} className="w-full gap-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Save All ({m.actions.length})
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="sticky bottom-20 mt-2 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-md">
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onOcrFile} className="hidden" />
          <Button type="button" size="icon" variant="ghost" disabled={ocrBusy} onClick={() => fileRef.current?.click()} title="Photo / OCR">
            {ocrBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </Button>
          <Button type="button" size="icon" variant={listening ? "destructive" : "ghost"} onClick={toggleVoice} title="Voice (Hindi)">
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
            }}
            placeholder="Bolo, photo daalo, ya likho..."
            rows={1}
            className="min-h-[44px] resize-none border-0 focus-visible:ring-0"
          />
          <Button type="submit" disabled={!input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
