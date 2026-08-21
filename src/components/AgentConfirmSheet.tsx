// Confirm sheet for Vinayak day-synthesis.
// Shows grouped, editable planned actions with totals; on confirm runs all in Dexie tx.

import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fmtINR } from "@/lib/format";
import { runAll, type PlannedAction, type SynthesisResult } from "@/lib/agent";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, FileText, ArrowDownRight, ArrowUpRight, Wallet, Trash2, Loader2, Sparkles, ShieldAlert, ShieldCheck } from "lucide-react";
import type { ParsedAction } from "@/lib/nlp";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  result: SynthesisResult | null;
  onDone?: (summary: string) => void;
}

export function AgentConfirmSheet({ open, onOpenChange, result, onDone }: Props) {
  const [planned, setPlanned] = useState<PlannedAction[]>([]);
  const [saving, setSaving] = useState(false);

  // Sync incoming result once when sheet opens
  useMemo(() => { if (result) setPlanned(result.planned); }, [result]);

  function updateAction(id: string, mut: (a: ParsedAction) => ParsedAction) {
    setPlanned((cur) => cur.map((p) => p.id === id ? { ...p, action: mut(p.action) } : p));
  }
  function remove(id: string) { setPlanned((cur) => cur.filter((p) => p.id !== id)); }

  const groups = useMemo(() => ({
    invoices: planned.filter((p) => p.action.action === "create_invoice"),
    paysIn: planned.filter((p) => p.action.action === "add_ledger" && !(p.action.data.direction === "out" || p.action.data.amount < 0)),
    paysOut: planned.filter((p) => p.action.action === "add_ledger" && (p.action.data.direction === "out" || p.action.data.amount < 0)),
    expenses: planned.filter((p) => p.action.action === "add_cash" && p.action.data.type === "expense"),
    incomes: planned.filter((p) => p.action.action === "add_cash" && p.action.data.type === "income"),
  }), [planned]);

  const totals = useMemo(() => {
    let bills = 0, paid = 0, pIn = 0, pOut = 0, exp = 0, inc = 0;
    for (const p of planned) {
      const a = p.action;
      if (a.action === "create_invoice") { bills += a.data.lines.reduce((s, l) => s + l.qty * l.rate, 0); paid += a.data.paid ?? 0; }
      else if (a.action === "add_ledger") { const abs = Math.abs(a.data.amount); (a.data.direction === "out" || a.data.amount < 0) ? pOut += abs : pIn += abs; }
      else if (a.action === "add_cash") { a.data.type === "expense" ? exp += a.data.amount : inc += a.data.amount; }
    }
    return { bills, paid, udhaar: bills - paid, pIn, pOut, exp, inc, net: inc + paid + pIn - exp - pOut };
  }, [planned]);

  async function confirmAll() {
    if (!planned.length) { onOpenChange(false); return; }
    setSaving(true);
    try {
      const { ok, fail, msgs } = await runAll(planned);
      if (fail === 0) toast.success(`${ok} entries save ho gayi ✓`);
      else toast.error(`${ok} save, ${fail} fail`);
      onDone?.(msgs.join("\n"));
      onOpenChange(false);
    } finally { setSaving(false); }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] overflow-y-auto p-0">
        <SheetHeader className="sticky top-0 z-10 border-b bg-background/95 p-4 backdrop-blur">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" /> Din bhar ka hisab — confirm karo
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            {planned.length} entries • Edit karke ✓ Confirm dabao. Sab kuch offline save hoga.
          </p>
        </SheetHeader>

        <div className="space-y-4 p-4 pb-32">
          {/* RISK GUARD — business samajh warnings before anything is posted */}
          {result?.risks?.length ? (
            <div className="rounded-2xl border border-warning/50 bg-warning/5 p-3">
              <div className="flex items-center gap-1.5 text-sm font-bold text-warning">
                <ShieldAlert className="h-4 w-4" /> Pehle ye confirm karo
              </div>
              <ul className="mt-2 space-y-2">
                {result.risks.map((r) => (
                  <li key={r.fc} className="rounded-xl border border-border/60 bg-card p-2">
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          r.severity === "block"
                            ? "border-destructive/50 text-destructive"
                            : r.severity === "ask"
                              ? "border-warning/50 text-warning"
                              : "border-border text-muted-foreground"
                        }`}
                      >
                        {r.severity === "block" ? "Ruko" : r.severity === "ask" ? "Pucho" : "Dhyan"}
                      </Badge>
                      <span className="text-xs font-semibold">{r.label}</span>
                    </div>
                    <div className="mt-1 text-xs">{r.ask}</div>
                    <div className="mt-0.5 truncate text-[10px] text-muted-foreground">"{r.snippet}"</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Intentionally kept out of the books */}
          {result?.excluded?.length ? (
            <div className="rounded-2xl border border-border bg-muted/30 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="h-4 w-4 text-success" /> Books se bahar rakha
              </div>
              <ul className="mt-1.5 space-y-1">
                {result.excluded.map((e, i) => (
                  <li key={i} className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{e.label}</span> — {e.sentence}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* INVOICES */}

          {groups.invoices.length > 0 && (
            <GroupCard icon={<FileText className="h-4 w-4" />} title="Bills" total={groups.invoices.reduce((s, p) => s + (p.action.action === "create_invoice" ? p.action.data.lines.reduce((x, l) => x + l.qty * l.rate, 0) : 0), 0)}>
              {groups.invoices.map((p) => {
                if (p.action.action !== "create_invoice") return null;
                const d = p.action.data;
                const tot = d.lines.reduce((s, l) => s + l.qty * l.rate, 0);
                return (
                  <Row key={p.id} p={p} onRemove={() => remove(p.id)}>
                    <Input value={d.partyName} onChange={(e) => updateAction(p.id, (a) => a.action === "create_invoice" ? { ...a, data: { ...a.data, partyName: e.target.value } } : a)} className="h-8 text-sm font-semibold" placeholder="Party" />
                    <div className="mt-1 space-y-1">
                      {d.lines.map((l, i) => (
                        <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-1 text-xs">
                          <span className="truncate">{l.name}</span>
                          <Input value={l.qty} type="number" onChange={(e) => updateAction(p.id, (a) => {
                            if (a.action !== "create_invoice") return a;
                            const lines = [...a.data.lines]; lines[i] = { ...lines[i], qty: parseFloat(e.target.value) || 0 };
                            return { ...a, data: { ...a.data, lines } };
                          })} className="h-7 w-16 text-xs" />
                          <Input value={l.rate} type="number" onChange={(e) => updateAction(p.id, (a) => {
                            if (a.action !== "create_invoice") return a;
                            const lines = [...a.data.lines]; lines[i] = { ...lines[i], rate: parseFloat(e.target.value) || 0 };
                            return { ...a, data: { ...a.data, lines } };
                          })} className="h-7 w-20 text-xs" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Paid</span>
                      <div className="flex items-center gap-2">
                        <Input value={d.paid ?? 0} type="number" onChange={(e) => updateAction(p.id, (a) => a.action === "create_invoice" ? { ...a, data: { ...a.data, paid: parseFloat(e.target.value) || 0 } } : a)} className="h-7 w-24 text-xs" />
                        <span className="num font-bold text-primary">{fmtINR(tot)}</span>
                      </div>
                    </div>
                  </Row>
                );
              })}
            </GroupCard>
          )}

          {groups.paysIn.length > 0 && (
            <GroupCard icon={<ArrowDownRight className="h-4 w-4 text-success" />} title="Payments received" total={totals.pIn}>
              {groups.paysIn.map((p) => <LedgerRow key={p.id} p={p} onRemove={() => remove(p.id)} onUpdate={updateAction} />)}
            </GroupCard>
          )}

          {groups.paysOut.length > 0 && (
            <GroupCard icon={<ArrowUpRight className="h-4 w-4 text-destructive" />} title="Payments paid out" total={totals.pOut}>
              {groups.paysOut.map((p) => <LedgerRow key={p.id} p={p} onRemove={() => remove(p.id)} onUpdate={updateAction} />)}
            </GroupCard>
          )}

          {groups.expenses.length > 0 && (
            <GroupCard icon={<Wallet className="h-4 w-4 text-destructive" />} title="Kharche" total={totals.exp}>
              {groups.expenses.map((p) => <CashRow key={p.id} p={p} onRemove={() => remove(p.id)} onUpdate={updateAction} />)}
            </GroupCard>
          )}

          {groups.incomes.length > 0 && (
            <GroupCard icon={<Wallet className="h-4 w-4 text-success" />} title="Income" total={totals.inc}>
              {groups.incomes.map((p) => <CashRow key={p.id} p={p} onRemove={() => remove(p.id)} onUpdate={updateAction} />)}
            </GroupCard>
          )}

          {planned.length === 0 && (
            <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">Koi entry nahi mili. Wapas jaake dictation edit karo.</div>
          )}

          {result?.unmatched?.length ? (
            <div className="rounded-xl border border-warning/40 bg-warning/5 p-3 text-xs">
              <div className="mb-1 font-bold text-warning">Ye lines samajh nahi aayi:</div>
              <ul className="list-inside list-disc space-y-0.5 text-muted-foreground">
                {result.unmatched.map((u, i) => <li key={i}>{u}</li>)}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Sticky totals + confirm */}
        <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 p-3 backdrop-blur">
          <div className="mb-2 grid grid-cols-3 gap-2 text-center text-[11px]">
            <Stat label="Bills" v={fmtINR(totals.bills)} />
            <Stat label="Udhaar naya" v={fmtINR(totals.udhaar)} tint="text-destructive" />
            <Stat label="Net cash" v={fmtINR(totals.net)} tint={totals.net >= 0 ? "text-success" : "text-destructive"} />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1" disabled={saving}>Cancel</Button>
            <Button onClick={confirmAll} className="flex-1 gap-1" disabled={saving || planned.length === 0}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              Confirm & Save ({planned.length})
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function GroupCard({ icon, title, total, children }: { icon: React.ReactNode; title: string; total: number; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-1.5 text-sm font-bold">{icon}{title}</div>
        <div className="num text-sm font-bold">{fmtINR(total)}</div>
      </div>
      <div className="divide-y">{children}</div>
    </div>
  );
}

function Row({ p, onRemove, children }: { p: PlannedAction; onRemove: () => void; children: React.ReactNode }) {
  return (
    <div className="p-3">
      <div className="mb-1.5 flex items-center justify-between">
        {p.status === "needs-review"
          ? <Badge variant="outline" className="gap-1 border-warning/50 text-[10px] text-warning"><AlertTriangle className="h-3 w-3" />Check: {p.reason ?? "low confidence"}</Badge>
          : <Badge variant="outline" className="gap-1 border-success/40 text-[10px] text-success"><CheckCircle2 className="h-3 w-3" />OK ({p.confidence}%)</Badge>}
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
      </div>
      {children}
    </div>
  );
}

function LedgerRow({ p, onRemove, onUpdate }: { p: PlannedAction; onRemove: () => void; onUpdate: (id: string, m: (a: ParsedAction) => ParsedAction) => void }) {
  if (p.action.action !== "add_ledger") return null;
  const d = p.action.data;
  return (
    <Row p={p} onRemove={onRemove}>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Input value={d.partyName} onChange={(e) => onUpdate(p.id, (a) => a.action === "add_ledger" ? { ...a, data: { ...a.data, partyName: e.target.value } } : a)} className="h-8 text-sm" placeholder="Party" />
        <Input value={Math.abs(d.amount)} type="number" onChange={(e) => onUpdate(p.id, (a) => a.action === "add_ledger" ? { ...a, data: { ...a.data, amount: (parseFloat(e.target.value) || 0) * (a.data.amount < 0 ? -1 : 1) } } : a)} className="h-8 w-28 text-sm font-semibold" />
      </div>
    </Row>
  );
}

function CashRow({ p, onRemove, onUpdate }: { p: PlannedAction; onRemove: () => void; onUpdate: (id: string, m: (a: ParsedAction) => ParsedAction) => void }) {
  if (p.action.action !== "add_cash") return null;
  const d = p.action.data;
  return (
    <Row p={p} onRemove={onRemove}>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Input value={d.category} onChange={(e) => onUpdate(p.id, (a) => a.action === "add_cash" ? { ...a, data: { ...a.data, category: e.target.value } } : a)} className="h-8 text-sm" placeholder="Category" />
        <Input value={d.amount} type="number" onChange={(e) => onUpdate(p.id, (a) => a.action === "add_cash" ? { ...a, data: { ...a.data, amount: parseFloat(e.target.value) || 0 } } : a)} className="h-8 w-28 text-sm font-semibold" />
      </div>
      {d.note && <div className="mt-1 truncate text-[10px] text-muted-foreground">"{d.note}"</div>}
    </Row>
  );
}

function Stat({ label, v, tint }: { label: string; v: string; tint?: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-1.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`num text-sm font-bold ${tint ?? ""}`}>{v}</div>
    </div>
  );
}
