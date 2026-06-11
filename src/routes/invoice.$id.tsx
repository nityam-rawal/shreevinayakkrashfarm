import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { fmtINR, fmtDate } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { ArrowLeft, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildInvoicePDF, buildInvoiceImage, shareAsImageOrPDF } from "@/lib/pdf";
import { toast } from "sonner";

export const Route = createFileRoute("/invoice/$id")({
  head: () => ({ meta: [{ title: "Bill" }] }),
  component: InvoiceView,
});

function InvoiceView() {
  const { id } = Route.useParams();
  const iid = Number(id);
  const invoice = useLiveQuery(() => db.invoices.get(iid), [iid]);
  const party = useLiveQuery(
    async () => (invoice ? await db.parties.get(invoice.partyId) : undefined),
    [invoice?.partyId],
  );

  if (!invoice || !party) {
    return <AppShell><div className="text-center text-muted-foreground">Loading...</div></AppShell>;
  }

  async function share(whatsapp: boolean) {
    if (!invoice || !party) return;
    const doc = buildInvoicePDF(invoice, party);
    const base = invoice.number.replace(/\//g, "-");
    const text = `${party.name} — Bill ${invoice.number}\nTotal: ${fmtINR(invoice.total)}\nDhanyavaad — Shree Vinayak Krashi Farm`;
    if (whatsapp) {
      const img = await buildInvoiceImage(invoice, party);
      await shareAsImageOrPDF(img, doc, base, text);
    } else {
      doc.save(`${base}.pdf`);
      toast.success("Download ho gaya");
    }
  }

  return (
    <AppShell action={<Link to="/"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4" /></Button></Link>}>
      <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/85 p-6 text-primary-foreground">
        <div className="text-xs uppercase tracking-wider opacity-80">Invoice</div>
        <div className="font-display text-2xl font-bold">{invoice.number}</div>
        <div className="mt-1 text-sm opacity-90">{fmtDate(invoice.date)}</div>
        <div className="mt-4 rounded-xl bg-black/15 p-3">
          <div className="text-xs uppercase opacity-80">Bill To</div>
          <div className="font-semibold">{party.name}</div>
          {party.phone && <div className="text-xs opacity-80">{party.phone}</div>}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase text-secondary-foreground">
            <tr>
              <th className="px-3 py-2 text-left">Item</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-right">Rate</th>
              <th className="px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lines.map((l, i) => (
              <tr key={i} className="border-t border-border">
                <td className="px-3 py-2">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-[10px] uppercase text-muted-foreground">{l.unit}</div>
                </td>
                <td className="num px-3 py-2 text-right">{l.qty}</td>
                <td className="num px-3 py-2 text-right">{fmtINR(l.rate)}</td>
                <td className="num px-3 py-2 text-right font-semibold">{fmtINR(l.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-1 border-t border-border bg-muted/40 p-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span className="num">{fmtINR(invoice.subtotal)}</span></div>
          {invoice.discount > 0 && (
            <div className="flex justify-between text-muted-foreground"><span>Discount</span><span className="num">- {fmtINR(invoice.discount)}</span></div>
          )}
          <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
            <span>Total</span><span className="num text-primary">{fmtINR(invoice.total)}</span>
          </div>
          {invoice.paid > 0 && (
            <>
              <div className="flex justify-between"><span>Paid</span><span className="num text-success">{fmtINR(invoice.paid)}</span></div>
              <div className="flex justify-between font-semibold"><span>Balance</span><span className="num text-destructive">{fmtINR(invoice.total - invoice.paid)}</span></div>
            </>
          )}
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-3 rounded-xl bg-muted p-3 text-sm italic text-muted-foreground">
          {invoice.notes}
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button onClick={() => share(false)} variant="outline" className="gap-1"><Download className="h-4 w-4" /> PDF</Button>
        <Button onClick={() => share(true)} className="gap-1"><Share2 className="h-4 w-4" /> WhatsApp Share</Button>
      </div>
    </AppShell>
  );
}
