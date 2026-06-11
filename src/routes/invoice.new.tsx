import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import { db, nextInvoiceNumber, adjustStockForLines, type InvoiceLine } from "@/lib/db";
import { fmtINR, todayISO } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DateField } from "@/components/DateField";
import { PartyCombobox } from "@/components/PartyCombobox";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({ partyId: z.coerce.number().optional() });

export const Route = createFileRoute("/invoice/new")({
  head: () => ({ meta: [{ title: "Naya Bill" }] }),
  validateSearch: searchSchema,
  component: NewInvoice,
});

function NewInvoice() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const items = useLiveQuery(() => db.items.toArray(), [], []);

  const [partyId, setPartyId] = useState<number | undefined>(search.partyId);
  const [partyName, setPartyName] = useState<string>("");
  const [date, setDate] = useState(todayISO());
  const [lines, setLines] = useState<InvoiceLine[]>([{ name: "", unit: "", qty: 1, rate: 0, amount: 0 }]);
  const [discount, setDiscount] = useState("0");
  const [paid, setPaid] = useState("0");
  const [notes, setNotes] = useState("");

  const subtotal = useMemo(() => lines.reduce((a, l) => a + (Number(l.qty) || 0) * (Number(l.rate) || 0), 0), [lines]);
  const total = subtotal - (Number(discount) || 0);

  function updateLine(i: number, patch: Partial<InvoiceLine>) {
    setLines((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      next[i].amount = (Number(next[i].qty) || 0) * (Number(next[i].rate) || 0);
      return next;
    });
  }

  function pickItem(i: number, itemId: string) {
    const it = items.find((x) => x.id === Number(itemId));
    if (!it) return;
    updateLine(i, { name: it.name, unit: it.unit, rate: it.rate });
  }

  async function save() {
    let pid = partyId;
    if (!pid) {
      const nm = partyName.trim();
      if (!nm) return toast.error("Party ka naam likho");
      // create on the fly
      pid = await db.parties.add({ name: nm, type: "customer", createdAt: Date.now() });
    }
    const cleanLines = lines.filter((l) => l.name && l.qty > 0);
    if (cleanLines.length === 0) return toast.error("Items add karo");
    const number = await nextInvoiceNumber();
    const inv = {
      number, partyId: pid, date, lines: cleanLines, subtotal,
      discount: Number(discount) || 0, total,
      paid: Number(paid) || 0, notes: notes || undefined,
      createdAt: Date.now(),
    };
    const id = await db.invoices.add(inv);
    await db.ledger.add({ partyId: pid, date, type: "invoice", debit: total, credit: 0, note: `Bill ${number}`, invoiceId: id, createdAt: Date.now() });
    if ((Number(paid) || 0) > 0) {
      await db.ledger.add({ partyId: pid, date, type: "payment", debit: 0, credit: Number(paid), note: `Paid for ${number}`, invoiceId: id, createdAt: Date.now() });
      await db.cash.add({ date, type: "income", amount: Number(paid), category: "Sales", note: `${number}`, partyId: pid, createdAt: Date.now() });
    }
    const stockUpdates = await adjustStockForLines(cleanLines, -1);
    const low = stockUpdates.filter((s) => s.low).map((s) => `${s.name}: ${s.newStock}`).join(", ");
    toast.success(`${number} ban gaya${low ? ` • Low stock: ${low}` : ""}`);
    navigate({ to: "/invoice/$id", params: { id: String(id) } });
  }

  return (
    <AppShell title="Naya Bill">
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
        <div>
          <Label>Party *</Label>
          <PartyCombobox
            partyId={partyId}
            name={partyName}
            onChange={({ partyId: pid, name }) => { setPartyId(pid); setPartyName(name); }}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Existing party chuno ya naya naam likho — save pe ban jayega.
          </p>
        </div>
        <div>
          <Label>Date</Label>
          <DateField value={date} onChange={setDate} />
        </div>
      </div>

      <h2 className="mb-2 mt-5 font-display font-bold">Items / Services</h2>
      <div className="space-y-3">
        {lines.map((l, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-3">
            <div className="flex gap-2">
              <Select onValueChange={(v) => pickItem(i, v)}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Item chuno ya niche likho" /></SelectTrigger>
                <SelectContent>
                  {items.map((it) => (
                    <SelectItem key={it.id} value={String(it.id)}>
                      {it.name} — {fmtINR(it.rate)}/{it.unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {lines.length > 1 && (
                <button onClick={() => setLines((p) => p.filter((_, j) => j !== i))} className="rounded-lg p-2 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <Input
              className="mt-2"
              value={l.name}
              onChange={(e) => updateLine(i, { name: e.target.value })}
              placeholder="Item name"
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Input value={l.unit} onChange={(e) => updateLine(i, { unit: e.target.value })} placeholder="Unit" />
              <Input value={l.qty || ""} onChange={(e) => updateLine(i, { qty: Number(e.target.value) })} inputMode="decimal" placeholder="Qty" />
              <Input value={l.rate || ""} onChange={(e) => updateLine(i, { rate: Number(e.target.value) })} inputMode="numeric" placeholder="Rate" />
            </div>
            <div className="mt-2 text-right text-sm">
              = <span className="num font-semibold text-primary">{fmtINR(l.amount)}</span>
            </div>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => setLines((p) => [...p, { name: "", unit: "", qty: 1, rate: 0, amount: 0 }])}
          className="w-full gap-1"
        >
          <Plus className="h-4 w-4" /> Aur line add karo
        </Button>
      </div>

      <div className="mt-5 space-y-2 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="num font-semibold">{fmtINR(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Label className="m-0">Discount ₹</Label>
          <Input className="max-w-[120px]" value={discount} onChange={(e) => setDiscount(e.target.value)} inputMode="numeric" />
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-display text-lg font-bold">TOTAL</span>
          <span className="num font-display text-xl font-bold text-primary">{fmtINR(total)}</span>
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          <Label className="m-0">Paid ₹ (advance)</Label>
          <Input className="max-w-[120px]" value={paid} onChange={(e) => setPaid(e.target.value)} inputMode="numeric" />
        </div>
      </div>

      <div className="mt-3">
        <Label>Notes</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
      </div>

      <Button onClick={save} className="mt-4 w-full gap-2" size="lg">
        <Save className="h-4 w-4" /> Bill Save Karo
      </Button>
    </AppShell>
  );
}
