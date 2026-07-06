import Dexie, { type Table } from "dexie";
import { dbName } from "./workspace";

export type PartyType = "customer" | "supplier" | "staff";

export interface Party {
  id?: number;
  name: string;
  type: PartyType;
  phone?: string;
  address?: string;
  openingBalance?: number; // positive = they owe us
  createdAt: number;
}

export type LedgerEntryType = "invoice" | "payment" | "adjustment";

export interface LedgerEntry {
  id?: number;
  partyId: number;
  date: string; // YYYY-MM-DD
  type: LedgerEntryType;
  // For customer/supplier ledger: debit = they owe us more, credit = they paid / we owe more
  debit: number;
  credit: number;
  note?: string;
  invoiceId?: number;
  createdAt: number;
}

export type CashEntryType = "income" | "expense";

export interface CashEntry {
  id?: number;
  date: string;
  type: CashEntryType;
  amount: number;
  category: string; // e.g. "Sales", "Diesel", "Salary"
  note?: string;
  partyId?: number;
  createdAt: number;
}

export type ItemKind = "stock" | "service";

export interface Item {
  id?: number;
  name: string;
  kind: ItemKind;
  unit: string; // "Bag", "Brass", "Trip", "Hour", "Day"
  rate: number;
  category?: string; // "Reti", "Patthar", "Cement", "Dumper", "JCB"
  stock?: number; // current quantity in hand (only meaningful for kind="stock")
  lowStockAt?: number; // threshold for low-stock warning
  createdAt: number;
}

export interface InvoiceLine {
  name: string;
  unit: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id?: number;
  number: string; // SVKF/2026/0001
  partyId: number;
  date: string;
  lines: InvoiceLine[];
  subtotal: number;
  discount: number;
  total: number;
  paid: number;
  notes?: string;
  createdAt: number;
}

class AppDB extends Dexie {
  parties!: Table<Party, number>;
  ledger!: Table<LedgerEntry, number>;
  cash!: Table<CashEntry, number>;
  items!: Table<Item, number>;
  invoices!: Table<Invoice, number>;

  constructor() {
    super(typeof window === "undefined" ? "svkf_v1" : dbName());
    this.version(1).stores({
      parties: "++id, name, type, createdAt",
      ledger: "++id, partyId, date, type, invoiceId, createdAt",
      cash: "++id, date, type, category, partyId, createdAt",
      items: "++id, name, kind, category, createdAt",
      invoices: "++id, number, partyId, date, createdAt",
    });
  }
}

export const db = new AppDB();

// ---- Helpers ----

export async function partyBalance(partyId: number): Promise<number> {
  const party = await db.parties.get(partyId);
  const opening = party?.openingBalance ?? 0;
  const entries = await db.ledger.where("partyId").equals(partyId).toArray();
  const sum = entries.reduce((a, e) => a + (e.debit - e.credit), 0);
  return opening + sum;
}

export async function cashOnHand(uptoDate?: string): Promise<number> {
  const all = await db.cash.toArray();
  return all
    .filter((e) => (uptoDate ? e.date <= uptoDate : true))
    .reduce((a, e) => a + (e.type === "income" ? e.amount : -e.amount), 0);
}

export async function nextInvoiceNumber(): Promise<string> {
  const last = await db.invoices.orderBy("id").last();
  const seq = (last?.id ?? 0) + 1;
  const yr = new Date().getFullYear();
  return `SVKF/${yr}/${String(seq).padStart(4, "0")}`;
}

/**
 * Deduct (or add back) stock for a set of invoice lines.
 * Matches items by name (case-insensitive) and only adjusts items where kind === "stock".
 * `sign` = -1 for sale (deduct), +1 for reversal / stock-in.
 */
export async function adjustStockForLines(
  lines: { name: string; qty: number }[],
  sign: 1 | -1 = -1,
): Promise<{ name: string; newStock: number; low: boolean }[]> {
  const out: { name: string; newStock: number; low: boolean }[] = [];
  for (const l of lines) {
    if (!l.name || !l.qty) continue;
    const it = await db.items.where("name").equalsIgnoreCase(l.name).first();
    if (!it || it.kind !== "stock" || it.id == null) continue;
    const newStock = (it.stock ?? 0) + sign * l.qty;
    await db.items.update(it.id, { stock: newStock });
    out.push({
      name: it.name,
      newStock,
      low: it.lowStockAt != null && newStock <= it.lowStockAt,
    });
  }
  return out;
}

// Legacy seed kept for backward compatibility. The onboarding wizard now
// seeds a per-vertical catalog via seedVerticalCatalog(). Existing installs
// that already had items retain them; new installs start empty until the
// wizard runs.
export async function seedIfEmpty() {
  // no-op — kept as a safe call site for older code paths.
  return;
}

