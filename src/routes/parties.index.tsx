import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { db, partyBalance, type PartyType } from "@/lib/db";
import { fmtINR } from "@/lib/format";
import { AppShell } from "@/components/AppShell";
import { Plus, Search, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/parties/")({
  head: () => ({ meta: [{ title: "Khata — Parties" }] }),
  component: Parties,
});

function Parties() {
  const [filter, setFilter] = useState<"all" | PartyType>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const parties = useLiveQuery(
    () => db.parties.orderBy("name").toArray(),
    [],
    [],
  );

  const visible = parties.filter(
    (p) =>
      (filter === "all" || p.type === filter) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <AppShell
      title="Khata"
      action={
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Naya
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Naya Party Add karo</DialogTitle>
            </DialogHeader>
            <NewPartyForm onDone={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      }
    >
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Naam search karo..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="supplier">Supplier</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
      </Tabs>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          Koi party nahi mili. <br />
          <span className="text-xs">"Naya" button daba ke add karo.</span>
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map((p) => (
            <PartyRow key={p.id} id={p.id!} name={p.name} type={p.type} phone={p.phone} />
          ))}
        </div>
      )}
    </AppShell>
  );
}

function PartyRow({ id, name, type, phone }: { id: number; name: string; type: PartyType; phone?: string }) {
  const balance = useLiveQuery(() => partyBalance(id), [id], 0);
  const isReceivable = balance >= 0;
  return (
    <Link
      to="/parties/$id"
      params={{ id: String(id) }}
      className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary font-display text-base font-bold uppercase text-secondary-foreground">
          {name.slice(0, 2)}
        </div>
        <div>
          <div className="font-semibold leading-tight">{name}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="capitalize">{type}</span>
            {phone && (
              <>
                <span>•</span>
                <Phone className="h-3 w-3" /> {phone}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={`num font-semibold ${isReceivable ? "text-success" : "text-destructive"}`}>
          {fmtINR(Math.abs(balance))}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {balance === 0 ? "Settled" : isReceivable ? "Lena hai" : "Dena hai"}
        </div>
      </div>
    </Link>
  );
}

function NewPartyForm({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<PartyType>("customer");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [opening, setOpening] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await db.parties.add({
      name: name.trim(),
      type,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      openingBalance: opening ? Number(opening) : 0,
      createdAt: Date.now(),
    });
    toast.success(`${name} add ho gaya`);
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label>Naam *</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
      </div>
      <div>
        <Label>Type</Label>
        <Tabs value={type} onValueChange={(v) => setType(v as PartyType)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="supplier">Supplier</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
        </div>
        <div>
          <Label>Opening (+/-)</Label>
          <Input value={opening} onChange={(e) => setOpening(e.target.value)} inputMode="numeric" placeholder="0" />
        </div>
      </div>
      <div>
        <Label>Address</Label>
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <Button type="submit" className="w-full">Save</Button>
    </form>
  );
}
