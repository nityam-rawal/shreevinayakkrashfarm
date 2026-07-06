import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { db, seedIfEmpty } from "@/lib/db";
import { seedVerticalCatalog } from "@/lib/business-profile";

import { parseCommand, type ParsedAction } from "@/lib/nlp";
import { CheckCircle2, XCircle, Loader2, FlaskConical, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-test")({
  head: () => ({ meta: [{ title: "AI Test Lab" }] }),
  component: AiTestPage,
});

type Case = {
  input: string;
  expect: {
    kind: ParsedAction["action"];
    party?: string;
    amount?: number;
    lineCount?: number;
    category?: string;
    contains?: string; // for "answer" text
  }[];
  desc: string;
};

const CASES: Case[] = [
  { desc: "Simple bill (Hinglish)",
    input: "Ram ko 2 brass reti bheji",
    expect: [{ kind: "create_invoice", party: "Ram Kumar", lineCount: 1 }] },

  { desc: "Multi-item bill + advance",
    input: "Suresh ko 5 bag cement aur 1 trip 12 chakka dumper diya, 2000 cash liya",
    expect: [{ kind: "create_invoice", party: "Suresh Patel", lineCount: 2 }] },

  { desc: "Payment received",
    input: "Ram ne 5000 payment diya",
    expect: [{ kind: "add_ledger", party: "Ram Kumar", amount: 5000 }] },

  { desc: "Expense with category",
    input: "500 diesel kharcha",
    expect: [{ kind: "add_cash", amount: 500, category: "Diesel" }] },

  { desc: "Devanagari digits",
    input: "१२०० का पेट्रोल kharcha",
    expect: [{ kind: "add_cash", amount: 1200, category: "Diesel" }] },

  { desc: "K-suffix number",
    input: "salary 8k diya",
    expect: [{ kind: "add_cash", amount: 8000, category: "Salary" }] },

  { desc: "Hazaar in words",
    input: "Ram ne 2.5 hazaar diya payment",
    expect: [{ kind: "add_ledger", party: "Ram Kumar", amount: 2500 }] },

  { desc: "Fuzzy party name (typo)",
    input: "Sursh ne 1000 diya payment",
    expect: [{ kind: "add_ledger", party: "Suresh Patel", amount: 1000 }] },

  { desc: "Batch: 3 events in one line",
    input: "Ram ko 2 brass reti bheji; Suresh ne 5000 diya payment; 500 chai kharcha",
    expect: [
      { kind: "create_invoice", party: "Ram Kumar" },
      { kind: "add_ledger", party: "Suresh Patel", amount: 5000 },
      { kind: "add_cash", amount: 500, category: "Tea/Snacks" },
    ] },

  { desc: "Query — party balance",
    input: "Ram ka kitna udhaar hai",
    expect: [{ kind: "answer", contains: "Ram" }] },

  { desc: "Query — stock",
    input: "Stock dikhao",
    expect: [{ kind: "answer", contains: "Stock" }] },

  { desc: "Query — today's report",
    input: "Aaj ka hisaab batao",
    expect: [{ kind: "answer", contains: "hisaab" }] },

  { desc: "Item alias (bori → bag)",
    input: "Ram ko 10 bori cement bhejo",
    expect: [{ kind: "create_invoice", party: "Ram Kumar", lineCount: 1 }] },

  { desc: "Service line (JCB hours)",
    input: "Suresh ko 4 hour JCB diya",
    expect: [{ kind: "create_invoice", party: "Suresh Patel", lineCount: 1 }] },

  { desc: "Explicit rate override",
    input: "Ram ko 3 brass reti @4800 bheji",
    expect: [{ kind: "create_invoice", party: "Ram Kumar", lineCount: 1 }] },

  // v3 spec — any-business regression checklist
  { desc: "v3 §7.1 — jama universal payment",
    input: "Ram ka jama 500",
    expect: [{ kind: "add_ledger", party: "Ram Kumar", amount: 500 }] },

  { desc: "v3 §4.5 — purchase payable (se udhar li)",
    input: "50 bag cement Mohan se udhar li",
    expect: [{ kind: "add_ledger", party: "Mohan Traders" }] },

  { desc: "v3 §4.7 — return (wapas kiya)",
    input: "Ram ne 2 bag cement wapas kiya",
    expect: [{ kind: "add_ledger", party: "Ram Kumar" }] },

  { desc: "v3 §10.4 — rate override (X rate pe di)",
    input: "Suresh ko 2 bag cement 350 rate pe di",
    expect: [{ kind: "create_invoice", party: "Suresh Patel", lineCount: 1 }] },
];


type Result = { case: Case; pass: boolean; actual: ParsedAction[]; reason?: string };

async function seedDummy() {
  await seedIfEmpty();
  // Ensure cement-vertical catalog exists so item-based tests can resolve.
  await seedVerticalCatalog("cement");

  const now = Date.now();
  const ensure = async (name: string, type: "customer" | "supplier" | "staff") => {
    const ex = await db.parties.where("name").equalsIgnoreCase(name).first();
    if (ex) return ex.id!;
    return await db.parties.add({ name, type, createdAt: now });
  };
  const ram = await ensure("Ram Kumar", "customer");
  const sur = await ensure("Suresh Patel", "customer");
  await ensure("Mohan Traders", "supplier");
  await ensure("Kishor Driver", "staff");

  // Seed 1 opening ledger entry each if none
  const rLed = await db.ledger.where("partyId").equals(ram).count();
  if (rLed === 0) {
    await db.ledger.add({ partyId: ram, date: new Date().toISOString().slice(0,10), type: "invoice", debit: 3500, credit: 0, note: "Opening", createdAt: now });
  }
  const sLed = await db.ledger.where("partyId").equals(sur).count();
  if (sLed === 0) {
    await db.ledger.add({ partyId: sur, date: new Date().toISOString().slice(0,10), type: "invoice", debit: 12000, credit: 0, note: "Opening", createdAt: now });
  }
}

function checkOne(c: Case, actions: ParsedAction[]): { pass: boolean; reason?: string } {
  if (actions.length < c.expect.length)
    return { pass: false, reason: `Got ${actions.length}/${c.expect.length} actions` };
  for (let i = 0; i < c.expect.length; i++) {
    const exp = c.expect[i];
    const a = actions[i];
    if (a.action !== exp.kind) return { pass: false, reason: `#${i + 1}: got ${a.action}, expected ${exp.kind}` };
    if (exp.party) {
      const got = a.action === "create_invoice" ? a.data.partyName
        : a.action === "add_ledger" ? a.data.partyName : "";
      if (!got.toLowerCase().includes(exp.party.split(" ")[0].toLowerCase()))
        return { pass: false, reason: `#${i + 1}: party got "${got}"` };
    }
    if (exp.amount != null) {
      const got = a.action === "add_cash" ? a.data.amount
        : a.action === "add_ledger" ? Math.abs(a.data.amount) : 0;
      if (got !== exp.amount) return { pass: false, reason: `#${i + 1}: amount ${got} ≠ ${exp.amount}` };
    }
    if (exp.category && a.action === "add_cash" && a.data.category !== exp.category)
      return { pass: false, reason: `#${i + 1}: category "${a.data.category}" ≠ "${exp.category}"` };
    if (exp.lineCount != null && a.action === "create_invoice" && a.data.lines.length !== exp.lineCount)
      return { pass: false, reason: `#${i + 1}: got ${a.data.lines.length} lines, expected ${exp.lineCount}` };
    if (exp.contains && a.action === "answer" && !a.data.text.toLowerCase().includes(exp.contains.toLowerCase()))
      return { pass: false, reason: `#${i + 1}: answer missing "${exp.contains}"` };
  }
  return { pass: true };
}

function AiTestPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [running, setRunning] = useState(false);
  const [seeded, setSeeded] = useState(false);

  async function seed() {
    setRunning(true);
    try { await seedDummy(); setSeeded(true); toast.success("Dummy data seeded (Ram, Suresh, Mohan, Kishor)"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Seed failed"); }
    finally { setRunning(false); }
  }

  async function runAll() {
    setRunning(true); setResults([]);
    try {
      await seedDummy();
      const out: Result[] = [];
      for (const c of CASES) {
        const r = await parseCommand(c.input);
        const chk = checkOne(c, r.actions);
        out.push({ case: c, pass: chk.pass, actual: r.actions, reason: chk.reason });
      }
      setResults(out);
      const passed = out.filter((r) => r.pass).length;
      toast.success(`${passed}/${out.length} tests passed`);
    } finally { setRunning(false); }
  }

  const passed = results.filter((r) => r.pass).length;

  return (
    <AppShell title="AI Test Lab">
      <div className="space-y-4">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <h2 className="flex items-center gap-2 font-display font-bold text-primary">
            <FlaskConical className="h-5 w-5" /> Vinayak AI Testing
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Dummy parties (Ram, Suresh, Mohan, Kishor) seed karke {CASES.length} real-world cases test karo.
            Fail hone pe exact reason milega. Test data aapke asli data ke saath merge hoga — chinta nahi, sirf 4 parties add hoti hain.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button onClick={runAll} disabled={running} className="gap-2">
              {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <FlaskConical className="h-4 w-4" />}
              Run All Tests
            </Button>
            <Button variant="outline" onClick={seed} disabled={running}>
              Seed Dummy Data Only
            </Button>
            <Link to="/chat" search={{ q: undefined, auto: undefined }}><Button variant="outline">Try in Chat →</Button></Link>
          </div>
          {seeded && (
            <p className="mt-2 text-[11px] text-success">✓ Dummy data ready. Ab /chat pe jaake "Ram ka udhaar batao" try karo.</p>
          )}
        </div>

        {results.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display font-bold">
                Result: <span className={passed === results.length ? "text-success" : "text-warning"}>
                  {passed}/{results.length} pass
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setResults([])}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className={`rounded-xl border p-3 text-sm ${r.pass ? "border-success/30 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
                  <div className="flex items-start gap-2">
                    {r.pass ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" /> : <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">{r.case.desc}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">"{r.case.input}"</div>
                      {!r.pass && r.reason && (
                        <div className="mt-1 text-xs text-destructive">✗ {r.reason}</div>
                      )}
                      <details className="mt-1 text-[11px] text-muted-foreground">
                        <summary className="cursor-pointer">Detail ({r.actual.length} actions)</summary>
                        <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded bg-background p-2">
                          {JSON.stringify(r.actual.map((a) => ({ action: a.action, data: a.data })), null, 2)}
                        </pre>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
