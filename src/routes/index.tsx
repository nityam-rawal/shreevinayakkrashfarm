import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import { db, seedIfEmpty, cashOnHand } from "@/lib/db";
import { fmtINR, todayISO } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { Users, BookOpen, Boxes, FileText, Sparkles, Wrench, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
  useEffect(() => {
    seedIfEmpty();
  }, []);

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
    { to: "/chat", label: "AI Assistant", sub: "Bolke entry karo", icon: Sparkles, tint: "bg-primary/10 text-primary" },
    { to: "/parties", label: "Staff & Vendors", sub: "Khata + payments", icon: Wrench, tint: "bg-secondary text-secondary-foreground" },
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

      <div className="mt-6 grid grid-cols-2 gap-3">
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
