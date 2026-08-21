// Vinayak AI — whole-day event segmentation (offline).
//
// Trained on the whole-day business narration dataset: a full day's story is
// split into sentences and each sentence is tagged with the business event it
// represents, so the agent knows *what kind* of entry to make — and what NOT
// to post (personal/home spends, reconciliation talk, future orders).

import { normalizeIndic } from "./indic-lexicon";

export type DayEventType =
  | "PURCHASE_RECEIPT"
  | "SALE"
  | "CUSTOMER_RECEIPT"
  | "SUPPLIER_PAYMENT"
  | "BUSINESS_EXPENSE"
  | "STAFF_ADVANCE"
  | "STAFF_SALARY"
  | "PERSONAL_EXPENSE"
  | "OWNER_CAPITAL"
  | "OWNER_DRAWING"
  | "RETURN"
  | "ORDER_ONLY"
  | "RECONCILIATION";

export interface DayEvent {
  type: DayEventType;
  sentence: string;
  /** true when it must stay out of the business ledger */
  excludeFromBusiness: boolean;
}

interface EventRule { type: DayEventType; pri: number; test: RegExp }

// Rules run against text that has passed through normalizeIndic(), so Hindi,
// Gujarati, romanised and code-mixed speech all reduce to canonical tokens.
const EVENT_RULES: EventRule[] = [
  { type: "PERSONAL_EXPENSE", pri: 1, test: /\b(ghar(?:e|\s*ke\s*liye)?|home|household|personal|ghar\s*ka)\b[^.]*\b(saman|goods|liya|lidho|kharcha|bought|expense|spend)\b|\bkeep\s*(?:this|it)\s*personal\b|\bpersonal\s*(?:che|hai|rakhna|rakho)\b|\bbusiness\s*expense\s*me\s*mat\b|\boutside\s*business\b/i },
  { type: "OWNER_DRAWING", pri: 2, test: /\bowner\b[^.]*\b(took|nikala|le\s*gaya|withdrew)\b|\b(business|shop)\s*cash\b[^.]*\b(ghar|home|family|personal)\b/i },
  { type: "OWNER_CAPITAL", pri: 2, test: /\bowner\b[^.]*\b(put|invest|daala|nakhya|introduc)\b|\bpersonal\s*(money|paisa)\b[^.]*\bbusiness\b/i },
  { type: "RECONCILIATION", pri: 3, test: /\b(reconcil\w*|milaya|milaye|check\s*kar\w*|tally|match\s*kiy\w*|mila(?:ya|ye)?)\b[^.]*\b(cash|upi|bank)\b|\b(cash|upi)\b[^.]*\b(reconcil\w*|milaya|milaye|check\s*kar\w*|tally)\b|\bclosing\b/i },
  { type: "STAFF_ADVANCE", pri: 4, test: /\bstaff\b[^.]*\badvance\b|\badvance\b[^.]*\bstaff\b|\bpagar\s*advance\b/i },
  { type: "STAFF_SALARY", pri: 4, test: /\b(staff|karigar|worker|naukar)\b[^.]*\b(salary|pagar|tankha)\b|\bsalary\b[^.]*\b(diya|paid|chukaya)\b/i },
  { type: "RETURN", pri: 5, test: /\b(wapas|return(?:ed)?|parat)\b/i },
  { type: "ORDER_ONLY", pri: 5, test: /\b(order)\b[^.]*\b(next|kal|agle|future|aane\s*wale)\b|\b(next\s*(week|month|monday|friday))\b[^.]*\border\b/i },
  { type: "CUSTOMER_RECEIPT", pri: 6, test: /\b(old|purane?|purani|juna|juni|outstanding|baki|bakaya|udhaar)\b[^.]*\b(mila|mile|malya|diya|diye|aaya|received|paid|jama)\b|\b(payment|jama|upi|cash)\b[^.]*\b(mila|mile|malya|received)\b|\bpaid\b[^.]*\bagainst\b/i },
  { type: "SUPPLIER_PAYMENT", pri: 6, test: /\b(supplier|traders|agency|distributors|wholesaler)\b[^.]*\b(payment|paid|chukaya|diya)\b|\bpaid\b[^.]*\b(supplier|traders|agency|distributors)\b/i },
  { type: "BUSINESS_EXPENSE", pri: 7, test: /\b(kharcha|expense|rent|gas|diesel|petrol|bijli|electricity|courier|repair|packing|chai|labour|transport|salary)\b/i },
  { type: "PURCHASE_RECEIPT", pri: 8, test: /\b(se|pase\s*thi|from)\b[^.]*\b(aaya|aaye|aavya|aa\s*gaya|mila|received|delivered|kharida|purchase[ds]?)\b|\bdelivered\b|\b(kharida|purchase[ds]?)\b/i },
  { type: "SALE", pri: 9, test: /\b(bechi|bech|sold|sell|sale|diya|diye|aapya|bheja|supply)\b/i },
];

const ORDERED = [...EVENT_RULES].sort((a, b) => a.pri - b.pri);

export function splitDaySentences(text: string): string[] {
  return text
    .split(/(?<=[.;।!?|])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
}

/** Tag one sentence with its business event type (null = nothing to post). */
export function classifyDayEvent(sentence: string): DayEventType | null {
  const t = normalizeIndic(sentence);
  for (const r of ORDERED) if (r.test.test(t)) return r.type;
  return null;
}

/** Segment a whole-day narration into tagged events. */
export function segmentDay(text: string): DayEvent[] {
  const out: DayEvent[] = [];
  for (const s of splitDaySentences(text)) {
    const type = classifyDayEvent(s);
    if (!type) continue;
    out.push({
      type,
      sentence: s,
      excludeFromBusiness: type === "PERSONAL_EXPENSE" || type === "RECONCILIATION" || type === "ORDER_ONLY",
    });
  }
  return out;
}

export const EVENT_LABELS: Record<DayEventType, string> = {
  PURCHASE_RECEIPT: "Maal aaya (purchase)",
  SALE: "Sale / bill",
  CUSTOMER_RECEIPT: "Customer se paisa",
  SUPPLIER_PAYMENT: "Supplier ko payment",
  BUSINESS_EXPENSE: "Business kharcha",
  STAFF_ADVANCE: "Staff advance",
  STAFF_SALARY: "Staff salary",
  PERSONAL_EXPENSE: "Personal / ghar (ledger se bahar)",
  OWNER_CAPITAL: "Owner capital",
  OWNER_DRAWING: "Owner drawing",
  RETURN: "Return",
  ORDER_ONLY: "Sirf order (sale nahi)",
  RECONCILIATION: "Din ka milaan",
};
