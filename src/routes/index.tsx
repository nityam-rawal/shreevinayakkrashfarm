import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef, useState } from "react";
import { db, seedIfEmpty, cashOnHand, partyBalance } from "@/lib/db";
import { fmtINR, todayISO } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { Users, BookOpen, Boxes, FileText, ArrowUpRight, ArrowDownRight, AlertTriangle, PackageX, Sparkles, Mic, Search, Loader2, X } from "lucide-react";
import { parseCommand } from "@/lib/nlp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Shree Vinayak Krashi Farm" },
      { name: "description", content: "Daily summary: cash, khata, stock, billing." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [aiQ, setAiQ] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const aiInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    seedIfEmpty();
  }, []);

  async function askAI(text?: string) {
    const q = (text ?? aiQ).trim();
    if (!q) { navigate({ to: "/chat" }); return; }
    setAiBusy(true); setAiAnswer(null);
    try {
      const res = await parseCommand(q);
      const hasActionable = res.actions.some((a) => a.action !== "answer");
      // If the user wants to record anything (bill, payment, expense), open chat for confirm+save.
      if (hasActionable) {
        navigate({ to: "/chat", search: { q, auto: 1 } });
        return;
      }
      // Read-only Q → answer inline, no redirect
      setAiAnswer(res.summary);
    } finally {
      setAiBusy(false);
    }
  }

  function startVoice() {
    const w = window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) { navigate({ to: "/chat" }); return; }
    const rec = new SR() as {
      lang: string; interimResults: boolean; continuous: boolean;
      onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
      onerror: () => void; start: () => void; stop: () => void;
    };
    rec.lang = "hi-IN"; rec.interimResults = false; rec.continuous = false;
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setAiQ(t);
      void askAI(t);
    };
    rec.onerror = () => { navigate({ to: "/chat" }); };
    rec.start();
  }

  const partiesCount = useLiveQuery(() => db.parties.count(), [], 0);
  const itemsCount = useLiveQuery(() => db.items.count(), [], 0);
  const invoicesCount = useLiveQuery(() => db.invoices.count(), [], 0);
  const today = todayISO();
  const cash = useLiveQuery(() => cashOnHand(), [], 0);
  const todayEntries = useLiveQuery(
    () => db.cash.where("date").equals(today).toArray(),
    [today],
    [],
  );
  const todayIn = todayEntries.filter((e) => e.type === "income").reduce((a, e) => a + e.amount, 0);
  const todayOut = todayEntries.filter((e) => e.type === "expense").reduce((a, e) => a + e.amount, 0);

  // Low-stock alerts
  const lowStock = useLiveQuery(async () => {
    const all = await db.items.where("kind").equals("stock").toArray();
    return all.filter((i) => i.lowStockAt != null && (i.stock ?? 0) <= i.lowStockAt);
  }, [], []);

  // Top receivables (parties who owe us)
  const topUdhaar = useLiveQuery(async () => {
    const ps = await db.parties.toArray();
    const withBal = await Promise.all(
      ps.map(async (p) => ({ p, bal: await partyBalance(p.id!) })),
    );
    return withBal.filter((x) => x.bal > 0).sort((a, b) => b.bal - a.bal).slice(0, 3);
  }, [], []);

  const totalReceivable = topUdhaar.reduce((a, x) => a + x.bal, 0);

  const recentInvoices = useLiveQuery(
    () => db.invoices.orderBy("id").reverse().limit(5).toArray(),
    [],
    [],
  );

  const tiles = [
    { to: "/parties", label: "Khata", sub: `${partiesCount} parties`, icon: Users, tint: "bg-primary/10 text-primary" },
    { to: "/cashbook", label: "Cash Book", sub: "Daily aay-vyay", icon: BookOpen, tint: "bg-success/10 text-success" },
    { to: "/stock", label: "Stock & Services", sub: `${itemsCount} items`, icon: Boxes, tint: "bg-accent/30 text-accent-foreground" },
    { to: "/invoice/new", label: "New Bill", sub: `${invoicesCount} banaye`, icon: FileText, tint: "bg-warning/15 text-warning" },
  ] as const;

  return (
    <AppShell>
      {/* Hero balance card */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg">
        <div className="text-xs uppercase tracking-wider opacity-80">Cash on Hand</div>
        <div className="num mt-1 font-display text-4xl font-bold">{fmtINR(cash)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-black/15 p-3">
            <div className="flex items-center gap-1 text-xs opacity-80">
              <ArrowUpRight className="h-3.5 w-3.5" /> Aaj Aaya
            </div>
            <div className="num mt-0.5 font-semibold">{fmtINR(todayIn)}</div>
          </div>
          <div className="rounded-xl bg-black/15 p-3">
            <div className="flex items-center gap-1 text-xs opacity-80">
              <ArrowDownRight className="h-3.5 w-3.5" /> Aaj Gaya
            </div>
            <div className="num mt-0.5 font-semibold">{fmtINR(todayOut)}</div>
          </div>
        </div>
      </div>

      {/* Vinayak AI search bar */}
      <form
        onSubmit={(e) => { e.preventDefault(); void askAI(); }}
        className="group mt-5 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm transition-all focus-within:border-primary/60 focus-within:shadow-md"
      >
        <Sparkles className="h-5 w-5 shrink-0 text-primary" />
        <input
          ref={aiInputRef}
          value={aiQ}
          onChange={(e) => setAiQ(e.target.value)}
          placeholder="Vinayak AI se poochho ya bolo…"
          className="num flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Vinayak AI"
        />
        <button type="button" onClick={startVoice} aria-label="Bolke poochho" className="rounded-full p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary">
          <Mic className="h-4 w-4" />
        </button>
        <button type="submit" aria-label="Search" disabled={aiBusy} className="rounded-full bg-primary p-1.5 text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60">
          {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </button>
      </form>

      {aiAnswer && (
        <div className="mt-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Vinayak AI
            </div>
            <button onClick={() => setAiAnswer(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <pre className="num whitespace-pre-wrap text-sm">{aiAnswer}</pre>
          <button
            onClick={() => navigate({ to: "/chat", search: { q: aiQ } })}
            className="mt-2 text-xs font-semibold text-primary hover:underline"
          >
            Aur baat karo →
          </button>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.label}
              to={t.to}
              className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${t.tint}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-display font-semibold">{t.label}</div>
              <div className="text-xs text-muted-foreground">{t.sub}</div>
            </Link>
          );
        })}
      </div>

      {(lowStock.length > 0 || topUdhaar.length > 0) && (
        <div className="mt-8 space-y-3">
          <h2 className="font-display text-lg font-bold">Aaj ka dhyan</h2>

          {topUdhaar.length > 0 && (
            <div className="rounded-2xl border border-warning/30 bg-warning/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 font-display font-bold text-warning">
                  <AlertTriangle className="h-4 w-4" /> Sabse bada udhaar
                </div>
                <div className="num text-sm font-bold text-warning">{fmtINR(totalReceivable)}+</div>
              </div>
              <div className="space-y-1.5">
                {topUdhaar.map(({ p, bal }) => (
                  <Link
                    key={p.id}
                    to="/parties/$id"
                    params={{ id: String(p.id) }}
                    className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2 text-sm hover:bg-background"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="num font-semibold text-destructive">{fmtINR(bal)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {lowStock.length > 0 && (
            <Link
              to="/stock"
              className="block rounded-2xl border border-destructive/30 bg-destructive/5 p-4 hover:bg-destructive/10"
            >
              <div className="flex items-center gap-2 font-display font-bold text-destructive">
                <PackageX className="h-4 w-4" /> Stock kam ho gaya ({lowStock.length})
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {lowStock.slice(0, 3).map((i) => `${i.name} (${i.stock ?? 0} ${i.unit})`).join(" • ")}
                {lowStock.length > 3 && ` +${lowStock.length - 3} aur`}
              </div>
            </Link>
          )}
        </div>
      )}

      {recentInvoices.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-display text-lg font-bold">Recent Bills</h2>
          <div className="space-y-2">
            {recentInvoices.map((inv) => (
              <Link
                key={inv.id}
                to="/invoice/$id"
                params={{ id: String(inv.id) }}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3"
              >
                <div>
                  <div className="font-semibold">{inv.number}</div>
                  <div className="text-xs text-muted-foreground">{inv.date}</div>
                </div>
                <div className="num font-semibold text-primary">{fmtINR(inv.total)}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
