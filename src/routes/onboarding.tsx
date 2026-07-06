import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  getProfile,
  saveProfile,
  seedVerticalCatalog,
  VERTICALS,
  verticalByKey,
  type VerticalKey,
} from "@/lib/business-profile";
import { fmtINR } from "@/lib/format";
import { toast } from "sonner";
import { Sparkles, Check, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Setup — Vinayak Business Assistant" },
      { name: "description", content: "One-time setup: pick your business type." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const existing = getProfile();
  const [step, setStep] = useState<1 | 2>(existing.name ? 2 : 1);
  const [name, setName] = useState(existing.name || "");
  const [vertical, setVertical] = useState<VerticalKey>(existing.vertical || "custom");
  const [busy, setBusy] = useState(false);

  async function finish() {
    if (!name.trim()) { toast.error("Business ka naam daalo"); return; }
    setBusy(true);
    try {
      const added = await seedVerticalCatalog(vertical);
      saveProfile({
        name: name.trim(),
        vertical,
        currency: "INR",
        configured: true,
        onboardedAt: Date.now(),
      });
      toast.success(added ? `${added} items catalog me add ho gaye ✓` : "Setup done ✓");
      navigate({ to: "/" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Setup failed");
    } finally {
      setBusy(false);
    }
  }

  const tpl = verticalByKey(vertical);

  return (
    <AppShell title="Business Setup">
      <div className="space-y-4">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <h2 className="font-display font-bold">Vinayak ko apne business ke liye setup karo</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Ye ek baar ka setup hai. AI aapke items, rates, aur customers auto-learn karega jaise
            aap din bhar ka hisaab dictate karte jaoge.
          </p>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-success">
            <ShieldCheck className="h-3.5 w-3.5" /> 100% offline • data phone me hi rehta hai
          </div>
        </div>

        {step === 1 && (
          <section className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-2 font-display font-bold">Step 1 — Business ka naam</h3>
            <Label>Business / Dukaan ka naam</Label>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sharma General Store"
              className="mt-1"
            />
            <Button
              className="mt-3 w-full gap-1"
              disabled={!name.trim()}
              onClick={() => setStep(2)}
            >
              Aage badho <ArrowRight className="h-4 w-4" />
            </Button>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-2 font-display font-bold">Step 2 — Business type</h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Apna business type chuno — Vinayak turant us type ke common items aur rates ready
              kar dega. Baad me kabhi bhi Stock section me edit kar sakte ho.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {VERTICALS.map((v) => {
                const active = v.key === vertical;
                return (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setVertical(v.key)}
                    className={`rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-primary bg-primary/10 ring-2 ring-primary/40"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{v.emoji}</span>
                      {active && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="mt-1 text-sm font-bold">{v.label}</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">{v.hint}</div>
                  </button>
                );
              })}
            </div>

            {tpl.items.length > 0 && (
              <div className="mt-3 rounded-xl border border-muted bg-muted/30 p-3">
                <div className="mb-1 flex items-center justify-between text-xs font-bold">
                  <span>Pre-seed ho jayenge ({tpl.items.length} items)</span>
                  <Badge variant="outline" className="text-[10px]">
                    editable
                  </Badge>
                </div>
                <ul className="space-y-0.5 text-[11px] text-muted-foreground">
                  {tpl.items.slice(0, 6).map((it, i) => (
                    <li key={i} className="flex justify-between">
                      <span>• {it.name}</span>
                      <span>{fmtINR(it.rate)}/{it.unit}</span>
                    </li>
                  ))}
                  {tpl.items.length > 6 && (
                    <li className="text-center italic">…+{tpl.items.length - 6} more</li>
                  )}
                </ul>
              </div>
            )}

            {tpl.items.length === 0 && (
              <div className="mt-3 rounded-xl border border-dashed border-primary/40 p-3 text-xs text-muted-foreground">
                Blank catalog. Auto-learn on — jaise aap first bill banaoge, item apne aap add ho jayega.
              </div>
            )}

            <div className="mt-3 flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} disabled={busy}>
                ← Wapas
              </Button>
              <Button onClick={finish} className="flex-1 gap-1" disabled={busy}>
                {busy ? "Setting up…" : "Finish Setup"} <Check className="h-4 w-4" />
              </Button>
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
