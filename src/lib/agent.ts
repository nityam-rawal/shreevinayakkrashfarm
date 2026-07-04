// Vinayak Agent — offline, deterministic, tool-calling.
// Wraps existing NLP parser + Dexie mutations behind a "synthesize → confirm → execute" flow.
// No network, no LLM. Confidence hints let the UI mark rows for review.

import { db, nextInvoiceNumber, adjustStockForLines } from "./db";
import { parseCommand, type ParsedAction } from "./nlp";
import { todayISO } from "./format";

export type ActionStatus = "auto" | "needs-review";

export interface PlannedAction {
  id: string;
  action: ParsedAction;
  status: ActionStatus;
  confidence: number; // 0-100
  reason?: string;    // why it needs review
}

export interface DayTotals {
  billsCount: number;
  billsTotal: number;
  paidOnBills: number;
  udhaarGiven: number;
  paymentsIn: number;
  paymentsOut: number;
  expenses: number;
  income: number;
  netCash: number;
}

export interface SynthesisResult {
  planned: PlannedAction[];
  answers: string[];             // read-only Q results kept separate
  unmatched: string[];
  totals: DayTotals;
  groups: {
    invoices: PlannedAction[];
    paymentsIn: PlannedAction[];
    paymentsOut: PlannedAction[];
    expenses: PlannedAction[];
    incomes: PlannedAction[];
  };
}

function confidenceFor(a: ParsedAction): { conf: number; reason?: string } {
  switch (a.action) {
    case "create_invoice": {
      const d = a.data;
      if (!d.partyName) return { conf: 30, reason: "Party missing" };
      if (!d.lines.length) return { conf: 30, reason: "No items" };
      const bad = d.lines.some((l) => !l.qty || !l.rate);
      if (bad) return { conf: 55, reason: "Qty/rate missing on a line" };
      return { conf: 90 };
    }
    case "add_ledger": {
      const d = a.data;
      if (!d.partyName) return { conf: 25, reason: "Party missing" };
      if (!d.amount) return { conf: 40, reason: "Amount missing" };
      return { conf: 88 };
    }
    case "add_cash": {
      if (!a.data.amount) return { conf: 35, reason: "Amount missing" };
      if (a.data.category === "Other") return { conf: 65, reason: "Category unclear" };
      return { conf: 85 };
    }
    default:
      return { conf: 100 };
  }
}

function totalsFor(planned: PlannedAction[]): DayTotals {
  let billsCount = 0, billsTotal = 0, paidOnBills = 0, paymentsIn = 0, paymentsOut = 0, expenses = 0, income = 0;
  for (const p of planned) {
    const a = p.action;
    if (a.action === "create_invoice") {
      billsCount++;
      const tot = a.data.lines.reduce((s, l) => s + l.qty * l.rate, 0);
      billsTotal += tot;
      paidOnBills += a.data.paid ?? 0;
    } else if (a.action === "add_ledger") {
      const abs = Math.abs(a.data.amount);
      const out = a.data.direction === "out" || a.data.amount < 0;
      if (out) paymentsOut += abs; else paymentsIn += abs;
    } else if (a.action === "add_cash") {
      if (a.data.type === "expense") expenses += a.data.amount;
      else income += a.data.amount;
    }
  }
  const udhaarGiven = billsTotal - paidOnBills;
  const netCash = income + paidOnBills + paymentsIn - expenses - paymentsOut;
  return { billsCount, billsTotal, paidOnBills, udhaarGiven, paymentsIn, paymentsOut, expenses, income, netCash };
}

/** Parse a whole day's dictation, tag with confidence, group by type. */
export async function synthesizeDay(text: string): Promise<SynthesisResult> {
  const res = await parseCommand(text);
  const planned: PlannedAction[] = [];
  const answers: string[] = [];
  for (const a of res.actions) {
    if (a.action === "answer") { answers.push(a.data.text); continue; }
    const { conf, reason } = confidenceFor(a);
    planned.push({
      id: crypto.randomUUID(),
      action: a,
      status: conf >= 75 ? "auto" : "needs-review",
      confidence: conf,
      reason,
    });
  }
  const groups = {
    invoices: planned.filter((p) => p.action.action === "create_invoice"),
    paymentsIn: planned.filter((p) => p.action.action === "add_ledger" && !(p.action.data.direction === "out" || p.action.data.amount < 0)),
    paymentsOut: planned.filter((p) => p.action.action === "add_ledger" && (p.action.data.direction === "out" || p.action.data.amount < 0)),
    expenses: planned.filter((p) => p.action.action === "add_cash" && p.action.data.type === "expense"),
    incomes: planned.filter((p) => p.action.action === "add_cash" && p.action.data.type === "income"),
  };
  return { planned, answers, unmatched: res.unmatched, totals: totalsFor(planned), groups };
}

// ---------- Tool executors (atomic per action) ----------

async function ensureParty(name: string): Promise<number> {
  const p = await db.parties.where("name").equalsIgnoreCase(name).first();
  if (p?.id) return p.id;
  return await db.parties.add({ name, type: "customer", createdAt: Date.now() });
}

export async function runAction(a: ParsedAction): Promise<string> {
  if (a.action === "create_invoice") {
    const d = a.data;
    const lines = d.lines.map((l) => ({ ...l, amount: l.qty * l.rate }));
    const subtotal = lines.reduce((s, l) => s + l.amount, 0);
    return await db.transaction("rw", [db.parties, db.invoices, db.ledger, db.cash, db.items], async () => {
      const partyId = await ensureParty(d.partyName);
      const number = await nextInvoiceNumber();
      const date = d.date ?? todayISO();
      const invId = await db.invoices.add({
        number, partyId, date, lines,
        subtotal, discount: 0, total: subtotal, paid: d.paid ?? 0,
        notes: d.notes, createdAt: Date.now(),
      });
      await db.ledger.add({ partyId, date, type: "invoice", debit: subtotal, credit: 0, note: `Bill ${number}`, invoiceId: invId, createdAt: Date.now() });
      if (d.paid && d.paid > 0) {
        await db.ledger.add({ partyId, date, type: "payment", debit: 0, credit: d.paid, note: `Paid ${number}`, invoiceId: invId, createdAt: Date.now() });
        await db.cash.add({ date, type: "income", amount: d.paid, category: "Sales", note: number, partyId, createdAt: Date.now() });
      }
      await adjustStockForLines(lines, -1);
      return `Bill ${number} → ${d.partyName}`;
    });
  }
  if (a.action === "add_cash") {
    const d = a.data;
    await db.cash.add({ date: d.date ?? todayISO(), type: d.type, amount: d.amount, category: d.category, note: d.note, createdAt: Date.now() });
    return `${d.type === "income" ? "Income" : "Kharcha"} ₹${d.amount} (${d.category})`;
  }
  if (a.action === "add_ledger") {
    const d = a.data;
    const date = d.date ?? todayISO();
    return await db.transaction("rw", [db.parties, db.ledger, db.cash], async () => {
      const partyId = await ensureParty(d.partyName);
      const isOut = d.direction === "out" || d.amount < 0;
      const abs = Math.abs(d.amount);
      const debit = d.type === "invoice" ? abs : isOut ? abs : 0;
      const credit = d.type === "payment" && !isOut ? abs : 0;
      await db.ledger.add({ partyId, date, type: d.type, debit, credit, note: d.note, createdAt: Date.now() });
      if (d.type === "payment") {
        await db.cash.add({
          date, type: isOut ? "expense" : "income", amount: abs,
          category: isOut ? "Party Payment Out" : "Party Payment",
          note: d.partyName, partyId, createdAt: Date.now(),
        });
      }
      return `${d.partyName} ${isOut ? "paid out" : "received"} ₹${abs}`;
    });
  }
  return "";
}

export async function runAll(planned: PlannedAction[]): Promise<{ ok: number; fail: number; msgs: string[] }> {
  let ok = 0, fail = 0;
  const msgs: string[] = [];
  for (const p of planned) {
    try { msgs.push(await runAction(p.action)); ok++; }
    catch (e) { fail++; msgs.push(`✗ ${e instanceof Error ? e.message : "fail"}`); }
  }
  return { ok, fail, msgs };
}
