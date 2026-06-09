import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, partyBalance } from "@/lib/db";
import { fmtINR, fmtDate, todayISO } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { ArrowLeft, Phone, Share2, Plus, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { buildLedgerPDF, shareOrDownloadPDF } from "@/lib/pdf";
import { DateField } from "@/components/DateField";
import { VoiceButton } from "@/components/VoiceButton";
import { getShop, upiLink } from "@/lib/shop";
import { toast } from "sonner";

export const Route = createFileRoute("/parties/$id")({
  head: () => ({ meta: [{ title: "Party Khata" }] }),
  component: PartyDetail,
});

function PartyDetail() {
  const { id } = Route.useParams();
  const pid = Number(id);
  const navigate = useNavigate();
  const party = useLiveQuery(() => db.parties.get(pid), [pid]);
  const entries = useLiveQuery(
    () => db.ledger.where("partyId").equals(pid).sortBy("date"),
    [pid],
    [],
  );
  const balance = useLiveQuery(() => partyBalance(pid), [pid], 0);
  const [addOpen, setAddOpen] = useState(false);

  if (!party) {
    return (
      <AppShell>
        <div className="text-center text-muted-foreground">Loading...</div>
      </AppShell>
    );
  }

  let running = party.openingBalance ?? 0;

  async function sharePDF() {
    if (!party) return;
    const doc = buildLedgerPDF(party, entries, balance);
    // Billed-format text body for WhatsApp (works even if recipient can't open PDF)
    let run = party.openingBalance ?? 0;
    const rows = entries.map((e) => {
      run += e.debit - e.credit;
      const side = e.debit ? `Dr ${fmtINR(e.debit)}` : `Cr ${fmtINR(e.credit)}`;
      return `${fmtDate(e.date)}  ${e.type.toUpperCase().padEnd(10)}  ${side.padStart(14)}  Bal ${fmtINR(run)}${e.note ? `\n  ${e.note}` : ""}`;
    });
    const head =
      `*SHREE VINAYAK KRASHI FARM*\n` +
      `Khata Statement — *${party.name}*\n` +
      (party.phone ? `Ph: ${party.phone}\n` : "") +
      `--------------------------------\n`;
    const opening = (party.openingBalance ?? 0) !== 0
      ? `Opening Balance: ${fmtINR(party.openingBalance ?? 0)}\n`
      : "";
    const foot =
      `--------------------------------\n` +
      `*${balance >= 0 ? "Lena hai (Receivable)" : "Dena hai (Payable)"}: ${fmtINR(Math.abs(balance))}*\n` +
      `\nDate: ${fmtDate(todayISO())}\n` +
      `— Shree Vinayak Krashi Farm`;
    const text = head + opening + (rows.length ? rows.join("\n") + "\n" : "(koi entry nahi)\n") + foot;
    await shareOrDownloadPDF(doc, `${party.name}-khata.pdf`, text);
  }

  return (
    <AppShell
      action={
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/parties" })}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      }
    >
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{party.type}</div>
        <h1 className="font-display text-2xl font-bold">{party.name}</h1>
        {party.phone && (
          <a href={`tel:${party.phone}`} className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" /> {party.phone}
          </a>
        )}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase text-muted-foreground">
              {balance === 0 ? "Settled" : balance > 0 ? "Lena hai" : "Dena hai"}
            </div>
            <div className={`num font-display text-3xl font-bold ${balance >= 0 ? "text-success" : "text-destructive"}`}>
              {fmtINR(Math.abs(balance))}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={sharePDF} className="gap-1">
            <Share2 className="h-4 w-4" /> Khata
          </Button>
        </div>
        {balance > 0 && party.phone && (
          <button
            onClick={() => sendReminder(party, balance)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-sm font-semibold text-success-foreground hover:bg-success/90"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Reminder + UPI Link
          </button>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="flex-1 gap-1">
              <Plus className="h-4 w-4" /> Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{party.name} — Naya Entry</DialogTitle>
            </DialogHeader>
            <AddEntryForm partyId={pid} onDone={() => setAddOpen(false)} />
          </DialogContent>
        </Dialog>
        <Link to="/invoice/new" search={{ partyId: pid }} className="flex-1">
          <Button variant="outline" className="w-full gap-1">
            <FileText className="h-4 w-4" /> Bill
          </Button>
        </Link>
      </div>

      <h2 className="mb-2 mt-6 font-display font-bold">Ledger</h2>
      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          Abhi koi entry nahi. Pehla bill banao ya entry add karo.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-xs uppercase text-secondary-foreground">
              <tr>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Particulars</th>
                <th className="px-3 py-2 text-right">Debit</th>
                <th className="px-3 py-2 text-right">Credit</th>
                <th className="px-3 py-2 text-right">Bal</th>
              </tr>
            </thead>
            <tbody>
              {(party.openingBalance ?? 0) !== 0 && (
                <tr className="border-t border-border bg-muted/50">
                  <td className="px-3 py-2 text-xs text-muted-foreground">Opening</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">Balance</td>
                  <td className="num px-3 py-2 text-right">{(party.openingBalance ?? 0) > 0 ? fmtINR(party.openingBalance ?? 0) : ""}</td>
                  <td className="num px-3 py-2 text-right">{(party.openingBalance ?? 0) < 0 ? fmtINR(-(party.openingBalance ?? 0)) : ""}</td>
                  <td className="num px-3 py-2 text-right font-semibold">{fmtINR(running)}</td>
                </tr>
              )}
              {entries.map((e) => {
                running += e.debit - e.credit;
                const clickable = e.type === "invoice" && e.invoiceId;
                const rowClass = `border-t border-border ${clickable ? "cursor-pointer hover:bg-accent/40" : ""}`;
                const onClick = clickable
                  ? () => navigate({ to: "/invoice/$id", params: { id: String(e.invoiceId) } })
                  : undefined;
                return (
                  <tr key={e.id} className={rowClass} onClick={onClick}>
                    <td className="px-3 py-2 text-xs">{fmtDate(e.date)}</td>
                    <td className="px-3 py-2">
                      <div className="text-xs font-semibold uppercase">
                        {e.type}
                        {clickable && <span className="ml-1 text-primary">→ Bill</span>}
                      </div>
                      {e.note && <div className="text-xs text-muted-foreground">{e.note}</div>}
                    </td>
                    <td className="num px-3 py-2 text-right">{e.debit ? fmtINR(e.debit) : ""}</td>
                    <td className="num px-3 py-2 text-right">{e.credit ? fmtINR(e.credit) : ""}</td>
                    <td className="num px-3 py-2 text-right font-semibold">{fmtINR(running)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}

function sendReminder(party: { name: string; phone?: string }, balance: number) {
  if (!party.phone) {
    toast.error("Phone number nahi hai");
    return;
  }
  const shop = getShop();
  const upi = upiLink(balance, `${shop.name} - ${party.name}`);
  const lines = [
    `Namaste *${party.name}* 🙏`,
    ``,
    `Aapka bakaya: *${fmtINR(balance)}*`,
    ``,
    upi
      ? `Yahan se 1-tap me pay karo:\n${upi}`
      : `Kripya payment jaldi karein.`,
    ``,
    `— ${shop.name}`,
    shop.phone ? `Call: ${shop.phone}` : "",
  ].filter(Boolean).join("\n");
  const phone = party.phone.replace(/\D/g, "");
  const num = phone.length === 10 ? `91${phone}` : phone;
  const url = `https://wa.me/${num}?text=${encodeURIComponent(lines)}`;
  window.open(url, "_blank");
}

function AddEntryForm({ partyId, onDone }: { partyId: number; onDone: () => void }) {
  const [mode, setMode] = useState<"invoice" | "payment" | "adjustment">("payment");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(todayISO());
  const [note, setNote] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt) return;
    // payment = they paid us = credit (reduces receivable)
    // invoice = manual debit (they owe more)
    // adjustment = treat positive as debit, negative as credit
    const debit = mode === "invoice" ? amt : mode === "adjustment" && amt > 0 ? amt : 0;
    const credit = mode === "payment" ? amt : mode === "adjustment" && amt < 0 ? -amt : 0;
    await db.ledger.add({ partyId, date, type: mode, debit, credit, note: note || undefined, createdAt: Date.now() });
    // Mirror into cashbook if payment
    if (mode === "payment") {
      await db.cash.add({
        date,
        type: "income",
        amount: amt,
        category: "Party Payment",
        note,
        partyId,
        createdAt: Date.now(),
      });
    }
    toast.success("Entry add ho gaya");
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="invoice">Manual Bill</TabsTrigger>
          <TabsTrigger value="adjustment">Adjustment</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Date</Label>
          <DateField value={date} onChange={setDate} />
        </div>
        <div>
          <Label>Amount ₹</Label>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" required autoFocus />
        </div>
      </div>
      <div>
        <Label>Note</Label>
        <div className="flex gap-2">
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="optional" />
          <VoiceButton onResult={(t) => setNote((n) => (n ? n + " " : "") + t)} />
        </div>
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
