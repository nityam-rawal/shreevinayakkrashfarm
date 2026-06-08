import { useEffect, useState, type ReactNode } from "react";
import { hasPin, isUnlocked, lockoutRemainingMs, setPin, verifyPin } from "@/lib/lock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ShieldCheck } from "lucide-react";

export function PinGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPinValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [mode, setMode] = useState<"setup" | "unlock">("unlock");

  useEffect(() => {
    setMode(hasPin() ? "unlock" : "setup");
    setUnlocked(isUnlocked());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "setup") {
        if (pin !== confirm) throw new Error("PIN match nahi ho raha");
        await setPin(pin);
        setUnlocked(true);
      } else {
        const ok = await verifyPin(pin);
        if (!ok) throw new Error("Galat PIN");
        setUnlocked(true);
      }
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            {mode === "setup" ? <ShieldCheck className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
          </div>
          <h1 className="mt-3 font-display text-xl font-bold">
            {mode === "setup" ? "App ko Lock karo" : "Apna PIN daalo"}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {mode === "setup"
              ? "Naya 4-8 digit PIN set karo. Yeh sirf is phone me save hoga."
              : "Aapka data 100% phone me hai. PIN dalkar khol lo."}
          </p>
        </div>
        <Input
          inputMode="numeric"
          autoFocus
          maxLength={8}
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPinValue(e.target.value.replace(/\D/g, ""))}
          type="password"
        />
        {mode === "setup" && (
          <Input
            inputMode="numeric"
            maxLength={8}
            placeholder="PIN confirm karo"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value.replace(/\D/g, ""))}
            type="password"
          />
        )}
        {err && <p className="text-xs text-destructive">{err}</p>}
        <Button type="submit" className="w-full">
          {mode === "setup" ? "Lock Set karo" : "Unlock"}
        </Button>
      </form>
    </div>
  );
}
