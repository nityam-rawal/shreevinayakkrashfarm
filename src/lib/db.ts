import Dexie, { type Table } from "dexie";

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
    super("svkf_v1");
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

// Seed initial items so the app feels usable on first launch.
export async function seedIfEmpty() {
  const count = await db.items.count();
  if (count > 0) return;
  const now = Date.now();
  const seed: Item[] = [
    { name: "Gujarat Reti (Badi)", kind: "stock", unit: "Brass", rate: 4500, category: "Reti", createdAt: now },
    { name: "Gujarat Reti (Plaster)", kind: "stock", unit: "Brass", rate: 5200, category: "Reti", createdAt: now },
    { name: "Pahadi Patthar", kind: "stock", unit: "Brass", rate: 3800, category: "Patthar", createdAt: now },
    { name: "Kreshar (Crusher)", kind: "stock", unit: "Brass", rate: 4200, category: "Kreshar", createdAt: now },
    { name: "Cement (OPC 53)", kind: "stock", unit: "Bag", rate: 380, category: "Cement", createdAt: now },
    { name: "12 Chakka Dumper", kind: "service", unit: "Trip", rate: 6500, category: "Transport", createdAt: now },
    { name: "6 Chakka Dumper", kind: "service", unit: "Trip", rate: 4200, category: "Transport", createdAt: now },
    { name: "Tractor", kind: "service", unit: "Trip", rate: 1800, category: "Transport", createdAt: now },
    { name: "JCB", kind: "service", unit: "Hour", rate: 950, category: "Machine", createdAt: now },
    { name: "Water Tanker (Add-on)", kind: "service", unit: "Day", rate: 1500, category: "Add-on", createdAt: now },
  ];
  await db.items.bulkAdd(seed);
}
