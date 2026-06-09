import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, cashOnHand, type CashEntryType } from "@/lib/db";
import { fmtINR, fmtDate, todayISO } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { Plus, ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateField } from "@/components/DateField";
import { toast } from "sonner";

export const Route = createFileRoute("/cashbook")({
  head: () => ({ meta: [{ title: "Cash Book" }] }),
  component: Cashbook,
});

function Cashbook() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(todayISO());

  const entries = useLiveQuery(
    () => db.cash.where("date").equals(date).reverse().sortBy("createdAt"),
    [date],
    [],
  );
  const cash = useLiveQuery(() => cashOnHand(), [], 0);
  const dayIn = entries.filter((e) => e.type === "income").reduce((a, e) => a + e.amount, 0);
  const dayOut = entries.filter((e) => e.type === "expense").reduce((a, e) => a + e.amount, 0);

  return (
    <AppShell
      title="Cash Book"
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Entry</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Naya Cash Entry</DialogTitle></DialogHeader>
            <NewCashForm onDone={() => setOpen(false)} defaultDate={date} />
          </DialogContent>
        </Dialog>
      }
    >
      <div className="rounded-2xl bg-gradient-to-br from-success to-success/80 p-5 text-success-foreground">
        <div className="text-xs uppercase tracking-wider opacity-80">Total Cash on Hand</div>
        <div className="num mt-1 font-display text-3xl font-bold">{fmtINR(cash)}</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="max-w-[180px] flex-1"><DateField value={date} onChange={setDate} /></div>
        <div className="flex gap-3 text-sm">
          <div className="rounded-lg bg-success/10 px-3 py-1.5 num font-semibold text-success">+ {fmtINR(dayIn)}</div>
          <div className="rounded-lg bg-destructive/10 px-3 py-1.5 num font-semibold text-destructive">- {fmtINR(dayOut)}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Is din ke liye koi entry nahi.
          </div>
        ) : (
          entries.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${e.type === "income" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                  {e.type === "income" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </div>
                <div>
                  <div className="font-semibold">{e.category}</div>
                  {e.note && <div className="text-xs text-muted-foreground">{e.note}</div>}
                  <div className="text-[10px] uppercase text-muted-foreground">{fmtDate(e.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`num font-semibold ${e.type === "income" ? "text-success" : "text-destructive"}`}>
                  {e.type === "income" ? "+" : "-"} {fmtINR(e.amount)}
                </div>
                <button
                  onClick={async () => {
                    await db.cash.delete(e.id!);
                    toast.success("Delete");
                  }}
                  className="p-1 text-muted-foreground hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}

function NewCashForm({ onDone, defaultDate }: { onDone: () => void; defaultDate: string }) {
  const [type, setType] = useState<CashEntryType>("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(defaultDate);

  const presets = type === "income"
    ? ["Sales", "Party Payment", "Other"]
    : ["Diesel", "Salary", "Maintenance", "Material Purchase", "Other"];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || !category.trim()) return;
    await db.cash.add({ date, type, amount: amt, category: category.trim(), note: note || undefined, createdAt: Date.now() });
    toast.success("Add ho gaya");
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <Tabs value={type} onValueChange={(v) => setType(v as CashEntryType)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="income">Aaya (Income)</TabsTrigger>
          <TabsTrigger value="expense">Gaya (Expense)</TabsTrigger>
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
        <Label>Category</Label>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Diesel, Sales" />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setCategory(p)}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground hover:bg-secondary/70"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Note</Label>
        <Input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
