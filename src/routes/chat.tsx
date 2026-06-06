import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, nextInvoiceNumber } from "@/lib/db";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { todayISO, fmtINR } from "@/lib/format";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Assistant" }] }),
  component: ChatPage,
});

type Action =
  | { action: "create_invoice"; data: { partyName: string; lines: { name: string; unit: string; qty: number; rate: number }[]; paid?: number; notes?: string } }
  | { action: "add_cash"; data: { date?: string; type: "income" | "expense"; amount: number; category: string; note?: string } }
  | { action: "add_ledger"; data: { partyName: string; type: "payment" | "invoice" | "adjustment"; amount: number; note?: string } };

function extractAction(text: string): Action | null {
  const m = text.match(/```json\s*([\s\S]*?)```/i);
  if (!m) return null;
  try {
    const j = JSON.parse(m[1]);
    if (j && typeof j === "object" && "action" in j) return j as Action;
  } catch { /* ignore */ }
  return null;
}

function getText(message: UIMessage): string {
  return message.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
}

function ChatPage() {
  const parties = useLiveQuery(() => db.parties.toArray(), [], []);
  const items = useLiveQuery(() => db.items.toArray(), [], []);

  const transport = useMemo(
    () => new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({
        context: {
          parties: parties.map((p) => ({ id: p.id!, name: p.name, type: p.type })),
          items: items.map((i) => ({ id: i.id!, name: i.name, unit: i.unit, rate: i.rate, kind: i.kind })),
        },
      }),
    }),
    [parties, items],
  );

  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (err) => toast.error(err.message || "AI error"),
  });

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage({ text });
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  const suggestions = [
    "Ram Construction ko 2 brass reti badi aur 10 bag cement bheji, bill banao",
    "Aaj 500 ka diesel diya, cash book me add karo",
    "Suresh ne 5000 cash diya",
    "Kal tractor ke 3 trip Shyamji ko gaye 1800 per trip",
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
              <p className="mt-1 text-sm text-muted-foreground">
                Mujhe Hinglish/Hindi me batao kya likhna hai — main khata, cashbook ya bill bana dunga. Try karo:
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

          {messages.map((m) => {
            const text = getText(m);
            const action = m.role === "assistant" ? extractAction(text) : null;
            const cleanText = action ? text.replace(/```json[\s\S]*?```/i, "").trim() : text;
            return (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-card"
                  }`}
                >
                  {cleanText || (isLoading && m.role === "assistant" ? "..." : "")}
                  {action && <ActionCard action={action} />}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Vinayak AI soch raha hai...
            </div>
          )}
        </div>

        <form onSubmit={submit} className="sticky bottom-20 mt-2 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-md">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
            }}
            placeholder="Likho... e.g. 'Ram ko 2 dumper reti bheji'"
            rows={1}
            className="min-h-[44px] resize-none border-0 focus-visible:ring-0"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppShell>
  );
}

function ActionCard({ action }: { action: Action }) {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function apply() {
    setBusy(true);
    try {
      if (action.action === "create_invoice") {
        const d = action.data;
        let party = await db.parties.where("name").equalsIgnoreCase(d.partyName).first();
        if (!party) {
          const id = await db.parties.add({ name: d.partyName, type: "customer", createdAt: Date.now() });
          party = await db.parties.get(id);
        }
        const lines = d.lines.map((l) => ({ ...l, amount: l.qty * l.rate }));
        const subtotal = lines.reduce((a, l) => a + l.amount, 0);
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
        toast.success(`Bill ${number} ban gaya`);
      } else if (action.action === "add_cash") {
        const d = action.data;
        await db.cash.add({
          date: d.date || todayISO(),
          type: d.type, amount: d.amount, category: d.category,
          note: d.note, createdAt: Date.now(),
        });
        toast.success("Cashbook update");
      } else if (action.action === "add_ledger") {
        const d = action.data;
        let party = await db.parties.where("name").equalsIgnoreCase(d.partyName).first();
        if (!party) {
          const id = await db.parties.add({ name: d.partyName, type: "customer", createdAt: Date.now() });
          party = await db.parties.get(id);
        }
        const debit = d.type === "invoice" || (d.type === "adjustment" && d.amount > 0) ? Math.abs(d.amount) : 0;
        const credit = d.type === "payment" || (d.type === "adjustment" && d.amount < 0) ? Math.abs(d.amount) : 0;
        await db.ledger.add({
          partyId: party!.id!, date: todayISO(), type: d.type,
          debit, credit, note: d.note, createdAt: Date.now(),
        });
        if (d.type === "payment") {
          await db.cash.add({ date: todayISO(), type: "income", amount: Math.abs(d.amount), category: "Party Payment", note: `${d.partyName}`, partyId: party!.id!, createdAt: Date.now() });
        }
        toast.success("Khata update");
      }
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 rounded-xl border border-primary/30 bg-background p-3">
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">
        {action.action.replace("_", " ")}
      </div>
      <pre className="num overflow-x-auto whitespace-pre-wrap text-xs text-muted-foreground">
        {action.action === "create_invoice" && (
          <>
            Party: {action.data.partyName}
            {"\n"}
            {action.data.lines.map((l) => `  • ${l.qty} ${l.unit} ${l.name} @ ${fmtINR(l.rate)} = ${fmtINR(l.qty * l.rate)}`).join("\n")}
            {"\n"}Total: {fmtINR(action.data.lines.reduce((a, l) => a + l.qty * l.rate, 0))}
          </>
        )}
        {action.action === "add_cash" && `${action.data.type.toUpperCase()} ${fmtINR(action.data.amount)} — ${action.data.category}`}
        {action.action === "add_ledger" && `${action.data.partyName}: ${action.data.type} ${fmtINR(Math.abs(action.data.amount))}`}
      </pre>
      <Button size="sm" onClick={apply} disabled={done || busy} className="mt-2 gap-1">
        {done ? <><CheckCircle2 className="h-4 w-4" /> Done</> : busy ? "Saving..." : "Confirm & Save"}
      </Button>
    </div>
  );
}
