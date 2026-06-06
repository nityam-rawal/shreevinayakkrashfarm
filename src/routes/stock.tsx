import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, type ItemKind } from "@/lib/db";
import { fmtINR } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/stock")({
  head: () => ({ meta: [{ title: "Stock & Services" }] }),
  component: Stock,
});

function Stock() {
  const [tab, setTab] = useState<ItemKind>("stock");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  const items = useLiveQuery(
    () => db.items.where("kind").equals(tab).toArray(),
    [tab],
    [],
  );

  return (
    <AppShell
      title="Stock & Services"
      action={
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Naya"} Item</DialogTitle></DialogHeader>
            <ItemForm kind={tab} id={editing} onDone={() => { setOpen(false); setEditing(null); }} />
          </DialogContent>
        </Dialog>
      }
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as ItemKind)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stock">Stock (Material)</TabsTrigger>
          <TabsTrigger value="service">Service / Vehicle</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            Koi item nahi. Add karo.
          </div>
        )}
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-xs text-muted-foreground">
                {it.category} • per {it.unit}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="num font-display font-bold text-primary">{fmtINR(it.rate)}</div>
              <button
                onClick={() => { setEditing(it.id!); setOpen(true); }}
                className="p-1.5 text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={async () => { await db.items.delete(it.id!); toast.success("Delete"); }}
                className="p-1.5 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function ItemForm({ kind, id, onDone }: { kind: ItemKind; id: number | null; onDone: () => void }) {
  const existing = useLiveQuery(async () => (id ? await db.items.get(id) : undefined), [id]);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(kind === "stock" ? "Brass" : "Trip");
  const [rate, setRate] = useState("");
  const [category, setCategory] = useState("");
  const [hydrated, setHydrated] = useState(false);

  if (existing && !hydrated) {
    setName(existing.name);
    setUnit(existing.unit);
    setRate(String(existing.rate));
    setCategory(existing.category ?? "");
    setHydrated(true);
  }


  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = Number(rate);
    if (!name.trim() || !r) return;
    if (id) {
      await db.items.update(id, { name: name.trim(), unit, rate: r, category });
    } else {
      await db.items.add({ name: name.trim(), kind, unit, rate: r, category, createdAt: Date.now() });
    }
    toast.success("Save ho gaya");
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label>Name *</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Unit</Label>
          <Input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Brass / Bag / Trip / Hour / Day" />
        </div>
        <div>
          <Label>Rate ₹ *</Label>
          <Input value={rate} onChange={(e) => setRate(e.target.value)} inputMode="numeric" required />
        </div>
      </div>
      <div>
        <Label>Category</Label>
        <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Reti / Patthar / Cement / Transport / Machine" />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
