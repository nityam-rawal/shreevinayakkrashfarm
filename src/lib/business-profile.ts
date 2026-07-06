// Business Profile — makes Vinayak adaptable to any small business.
// Follows v3 ledger-parser spec: catalog, units, and services come from a
// swappable profile — parsing logic in nlp.ts is vertical-agnostic.
// 100% offline, per-workspace, stored in localStorage.

import { db, type Item } from "./db";
import { getActiveWorkspaceId } from "./workspace";

export type VerticalKey =
  | "cement"
  | "kirana"
  | "tailor"
  | "mobile"
  | "salon"
  | "medical"
  | "hardware"
  | "custom";

export interface BusinessProfile {
  name: string;
  vertical: VerticalKey;
  currency: string;
  configured: boolean;
  onboardedAt?: number;
}

const DEFAULT: BusinessProfile = {
  name: "",
  vertical: "custom",
  currency: "INR",
  configured: false,
};

function key(): string {
  return `svkf_biz_profile_${getActiveWorkspaceId()}`;
}

export function getProfile(): BusinessProfile {
  if (typeof localStorage === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(key());
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function saveProfile(p: BusinessProfile): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key(), JSON.stringify(p));
}

// ---------- vertical templates ----------

export interface VerticalTemplate {
  key: VerticalKey;
  label: string;
  emoji: string;
  hint: string;
  items: Omit<Item, "id" | "createdAt">[];
}

export const VERTICALS: VerticalTemplate[] = [
  {
    key: "cement",
    label: "Cement / Building Materials",
    emoji: "🧱",
    hint: "Reti, cement, patthar, JCB, dumper",
    items: [
      { name: "Gujarat Reti (Badi)", kind: "stock", unit: "Brass", rate: 4500, category: "Reti" },
      { name: "Gujarat Reti (Plaster)", kind: "stock", unit: "Brass", rate: 5200, category: "Reti" },
      { name: "Pahadi Patthar", kind: "stock", unit: "Brass", rate: 3800, category: "Patthar" },
      { name: "Kreshar (Crusher)", kind: "stock", unit: "Brass", rate: 4200, category: "Kreshar" },
      { name: "Cement (OPC 53)", kind: "stock", unit: "Bag", rate: 380, category: "Cement" },
      { name: "12 Chakka Dumper", kind: "service", unit: "Trip", rate: 6500, category: "Transport" },
      { name: "6 Chakka Dumper", kind: "service", unit: "Trip", rate: 4200, category: "Transport" },
      { name: "Tractor", kind: "service", unit: "Trip", rate: 1800, category: "Transport" },
      { name: "JCB", kind: "service", unit: "Hour", rate: 950, category: "Machine" },
    ],
  },
  {
    key: "kirana",
    label: "Kirana / General Store",
    emoji: "🛒",
    hint: "Aata, chawal, dal, tel, chai, sabun",
    items: [
      { name: "Aata (Wheat Flour)", kind: "stock", unit: "kg", rate: 40, category: "Grain" },
      { name: "Chawal (Basmati)", kind: "stock", unit: "kg", rate: 80, category: "Grain" },
      { name: "Chawal (Sona)", kind: "stock", unit: "kg", rate: 45, category: "Grain" },
      { name: "Toor Dal", kind: "stock", unit: "kg", rate: 140, category: "Dal" },
      { name: "Chana Dal", kind: "stock", unit: "kg", rate: 90, category: "Dal" },
      { name: "Sunflower Oil", kind: "stock", unit: "liter", rate: 140, category: "Oil" },
      { name: "Chai Patti", kind: "stock", unit: "kg", rate: 450, category: "Beverage" },
      { name: "Sugar", kind: "stock", unit: "kg", rate: 45, category: "Grocery" },
      { name: "Maggi", kind: "stock", unit: "packet", rate: 14, category: "Packaged" },
      { name: "Sabun", kind: "stock", unit: "piece", rate: 35, category: "Personal Care" },
    ],
  },
  {
    key: "tailor",
    label: "Tailor / Boutique",
    emoji: "✂️",
    hint: "Kurta, blouse, alteration, silai",
    items: [
      { name: "Kurta Silai", kind: "service", unit: "piece", rate: 300, category: "Silai" },
      { name: "Blouse Silai", kind: "service", unit: "piece", rate: 250, category: "Silai" },
      { name: "Salwar Silai", kind: "service", unit: "piece", rate: 200, category: "Silai" },
      { name: "Pant Silai", kind: "service", unit: "piece", rate: 350, category: "Silai" },
      { name: "Shirt Silai", kind: "service", unit: "piece", rate: 300, category: "Silai" },
      { name: "Alteration", kind: "service", unit: "job", rate: 100, category: "Silai" },
      { name: "Cotton Fabric", kind: "stock", unit: "meter", rate: 180, category: "Cloth" },
      { name: "Lining", kind: "stock", unit: "meter", rate: 60, category: "Cloth" },
    ],
  },
  {
    key: "mobile",
    label: "Mobile Repair / Recharge",
    emoji: "📱",
    hint: "Screen, battery, recharge, cover",
    items: [
      { name: "Screen Replace", kind: "service", unit: "job", rate: 1500, category: "Repair" },
      { name: "Battery Replace", kind: "service", unit: "job", rate: 800, category: "Repair" },
      { name: "Charging Port Repair", kind: "service", unit: "job", rate: 500, category: "Repair" },
      { name: "Software Install", kind: "service", unit: "job", rate: 300, category: "Repair" },
      { name: "Back Cover", kind: "stock", unit: "piece", rate: 150, category: "Accessory" },
      { name: "Tempered Glass", kind: "stock", unit: "piece", rate: 100, category: "Accessory" },
      { name: "Charger (Fast)", kind: "stock", unit: "piece", rate: 350, category: "Accessory" },
      { name: "Earphones", kind: "stock", unit: "piece", rate: 200, category: "Accessory" },
    ],
  },
  {
    key: "salon",
    label: "Salon / Beauty Parlour",
    emoji: "💇",
    hint: "Haircut, facial, threading, waxing",
    items: [
      { name: "Haircut", kind: "service", unit: "session", rate: 150, category: "Hair" },
      { name: "Hair Colour", kind: "service", unit: "session", rate: 800, category: "Hair" },
      { name: "Facial", kind: "service", unit: "session", rate: 500, category: "Face" },
      { name: "Threading (Eyebrow)", kind: "service", unit: "session", rate: 50, category: "Face" },
      { name: "Waxing (Full Arm)", kind: "service", unit: "session", rate: 200, category: "Waxing" },
      { name: "Head Massage", kind: "service", unit: "session", rate: 300, category: "Massage" },
    ],
  },
  {
    key: "medical",
    label: "Medical / Chemist Shop",
    emoji: "💊",
    hint: "Tablets, syrups, injections, strips",
    items: [
      { name: "Paracetamol 500mg", kind: "stock", unit: "strip", rate: 20, category: "Tablet" },
      { name: "Amoxicillin 500mg", kind: "stock", unit: "strip", rate: 80, category: "Tablet" },
      { name: "Cough Syrup", kind: "stock", unit: "bottle", rate: 90, category: "Syrup" },
      { name: "BP Monitor Rental", kind: "service", unit: "day", rate: 50, category: "Rental" },
    ],
  },
  {
    key: "hardware",
    label: "Hardware / Sanitary",
    emoji: "🔧",
    hint: "Pipe, taps, nails, paint",
    items: [
      { name: "PVC Pipe 1 inch", kind: "stock", unit: "meter", rate: 60, category: "Pipe" },
      { name: "Tap (Brass)", kind: "stock", unit: "piece", rate: 250, category: "Fitting" },
      { name: "Nails 3 inch", kind: "stock", unit: "kg", rate: 80, category: "Fastener" },
      { name: "Wall Paint (White)", kind: "stock", unit: "liter", rate: 220, category: "Paint" },
      { name: "Plumbing (Home Visit)", kind: "service", unit: "visit", rate: 300, category: "Service" },
    ],
  },
  {
    key: "custom",
    label: "Custom / Other",
    emoji: "🏪",
    hint: "Blank catalog — add items as you go",
    items: [],
  },
];

export function verticalByKey(k: VerticalKey): VerticalTemplate {
  return VERTICALS.find((v) => v.key === k) ?? VERTICALS[VERTICALS.length - 1];
}

/** Seed the template's items into db.items — only adds items whose names don't already exist. */
export async function seedVerticalCatalog(v: VerticalKey): Promise<number> {
  const tpl = verticalByKey(v);
  if (!tpl.items.length) return 0;
  const existing = await db.items.toArray();
  const existingNames = new Set(existing.map((i) => i.name.toLowerCase()));
  const now = Date.now();
  const toAdd = tpl.items
    .filter((it) => !existingNames.has(it.name.toLowerCase()))
    .map((it) => ({ ...it, createdAt: now }));
  if (toAdd.length) await db.items.bulkAdd(toAdd);
  return toAdd.length;
}

/** Auto-learn — record a new item observed from a confirmed transaction. */
export async function learnItem(input: {
  name: string;
  unit?: string;
  rate?: number;
  kind?: "stock" | "service";
  category?: string;
}): Promise<Item | null> {
  const name = input.name.trim();
  if (!name) return null;
  const existing = await db.items.where("name").equalsIgnoreCase(name).first();
  if (existing) return existing;
  const it: Omit<Item, "id"> = {
    name,
    kind: input.kind ?? "stock",
    unit: input.unit ?? "piece",
    rate: input.rate ?? 0,
    category: input.category ?? "Auto-learned",
    createdAt: Date.now(),
  };
  const id = await db.items.add(it as Item);
  return { ...it, id } as Item;
}
