import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { downloadBackup, downloadEncryptedBackup, importBackup, wipeAll } from "@/lib/backup";
import { changePin, clearPin, hasPin, setPin } from "@/lib/lock";
import { getShop, saveShop, type ShopProfile } from "@/lib/shop";
import { toast } from "sonner";
import { Download, Upload, Trash2, ShieldCheck, KeyRound, WifiOff, Store } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings & Backup" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [hasPinState, setHasPinState] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [shop, setShopState] = useState<ShopProfile>(() => getShop());

  function saveShopProfile() {
    saveShop(shop);
    toast.success("Shop details save ho gayi");
  }

  useEffect(() => {
    setHasPinState(hasPin());
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  async function onExport() {
    setBusy(true);
    try {
      await downloadBackup();
      toast.success("Backup file download ho gayi. WhatsApp pe khud ko bhej do.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed");
    } finally { setBusy(false); }
  }

  async function onImport(e: React.ChangeEvent<HTMLInputElement>, mode: "replace" | "merge") {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (mode === "replace" && !confirm("Sab kuch replace ho jayega. Pakka?")) return;
    setBusy(true);
    try {
      const r = await importBackup(f, mode);
      toast.success(`Restored: ${r.parties}p / ${r.invoices}b / ${r.cash}c / ${r.ledger}l`);
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Import failed");
    } finally { setBusy(false); }
  }

  async function onSetPin() {
    if (!newPin) return;
    try {
      if (hasPinState) await changePin(oldPin, newPin);
      else await setPin(newPin);
      setOldPin(""); setNewPin("");
      setHasPinState(true);
      toast.success("PIN update ho gayi");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "PIN error");
    }
  }

  function onRemovePin() {
    if (!confirm("PIN hata du? Phone khone pe data unprotected ho jayega.")) return;
    clearPin();
    setHasPinState(false);
    toast.success("PIN hat gayi");
  }

  async function onWipe() {
    const c1 = prompt('Sab data delete karne ke liye "DELETE" likho:');
    if (c1 !== "DELETE") return;
    await wipeAll();
    toast.success("Sab data delete ho gaya");
    setTimeout(() => location.reload(), 600);
  }

  return (
    <AppShell title="Settings">
      <div className="space-y-6">
        <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${online ? "border-warning/40 bg-warning/10 text-warning" : "border-success/40 bg-success/10 text-success"}`}>
          <WifiOff className="h-4 w-4" />
          {online
            ? "Phone online hai — par yeh app online jaaye bina kaam karta hai. Data kahin upload nahi hota."
            : "100% Offline — data phone me hi hai."}
        </div>

        {/* Shop profile */}
        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="flex items-center gap-2 font-display font-bold">
            <Store className="h-4 w-4" /> Shop / Dukaan
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Ye details aapke bills aur WhatsApp reminders me automatic aayengi. UPI ID set karoge to customer ko 1-tap payment link milega.
          </p>
          <div className="mt-3 space-y-2">
            <div>
              <Label>Shop ka naam</Label>
              <Input value={shop.name} onChange={(e) => setShopState({ ...shop, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Phone</Label>
                <Input value={shop.phone} onChange={(e) => setShopState({ ...shop, phone: e.target.value })} inputMode="tel" />
              </div>
              <div>
                <Label>GSTIN</Label>
                <Input value={shop.gstin} onChange={(e) => setShopState({ ...shop, gstin: e.target.value.toUpperCase() })} />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Input value={shop.address} onChange={(e) => setShopState({ ...shop, address: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>UPI ID</Label>
                <Input value={shop.upiId} onChange={(e) => setShopState({ ...shop, upiId: e.target.value })} placeholder="name@oksbi" />
              </div>
              <div>
                <Label>UPI Name</Label>
                <Input value={shop.upiName} onChange={(e) => setShopState({ ...shop, upiName: e.target.value })} />
              </div>
            </div>
            <Button onClick={saveShopProfile} className="w-full">Save Shop Details</Button>
          </div>
        </section>

        {/* Backup */}
        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="flex items-center gap-2 font-display font-bold">
            <Download className="h-4 w-4" /> Backup banao
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Pure data ki ek JSON file download karo. Apne WhatsApp pe khud ko bhej do — phone toot gaya to wahi file restore kar lo.
          </p>
          <Button onClick={onExport} disabled={busy} className="mt-3 w-full gap-2">
            <Download className="h-4 w-4" /> Backup Download
          </Button>
        </section>

        {/* Restore */}
        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="flex items-center gap-2 font-display font-bold">
            <Upload className="h-4 w-4" /> Restore karo
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Purani backup file se data wapas laao. <b>Replace</b> = sab kuch overwrite, <b>Merge</b> = naya add.
          </p>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden"
            onChange={(e) => onImport(e, (e.target.dataset.mode as "replace" | "merge") || "replace")} />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="outline" disabled={busy}
              onClick={() => { if (fileRef.current) { fileRef.current.dataset.mode = "merge"; fileRef.current.click(); } }}>
              Merge
            </Button>
            <Button variant="destructive" disabled={busy}
              onClick={() => { if (fileRef.current) { fileRef.current.dataset.mode = "replace"; fileRef.current.click(); } }}>
              Replace
            </Button>
          </div>
        </section>

        {/* PIN */}
        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="flex items-center gap-2 font-display font-bold">
            <ShieldCheck className="h-4 w-4" /> PIN Lock
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {hasPinState ? "PIN set hai. Change karne ke liye purana + naya daalo." : "Naya PIN set karo (4-8 digits)."}
            {" "}5 galat tries pe 1 min, 10 pe 10 min, 20 pe 1 ghante ka block.
          </p>
          <div className="mt-3 space-y-2">
            {hasPinState && (
              <Input type="password" inputMode="numeric" maxLength={8} placeholder="Purana PIN"
                value={oldPin} onChange={(e) => setOldPin(e.target.value.replace(/\D/g, ""))} />
            )}
            <Input type="password" inputMode="numeric" maxLength={8} placeholder="Naya PIN"
              value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))} />
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={onSetPin} className="gap-1"><KeyRound className="h-4 w-4" /> Save PIN</Button>
              {hasPinState && (
                <Button variant="outline" onClick={onRemovePin}>PIN hatao</Button>
              )}
            </div>
          </div>
        </section>

        {/* Danger */}
        <section className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4">
          <h2 className="flex items-center gap-2 font-display font-bold text-destructive">
            <Trash2 className="h-4 w-4" /> Danger Zone
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Sab data permanently delete kar dega. Pehle backup zaroor le lo.
          </p>
          <Button variant="destructive" onClick={onWipe} className="mt-3 w-full">
            Sab Data Delete
          </Button>
        </section>
      </div>
    </AppShell>
  );
}
