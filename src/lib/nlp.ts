// 100% offline Hinglish/Hindi NLP parser for daily business commands.
// No external API, no AI model. Pure pattern matching against the user's
// own item catalog + party list (loaded from Dexie).
//
// Returns a structured Action[] that the chat UI can confirm and save
// into khata + cashbook + stock simultaneously.

import { db, partyBalance, cashOnHand, type Item, type Party } from "./db";
import { fmtINR, todayISO } from "./format";

export type ParsedAction =
  | {
      action: "create_invoice";
      data: {
        partyName: string;
        lines: { name: string; unit: string; qty: number; rate: number }[];
        paid?: number;
        notes?: string;
      };
    }
  | {
      action: "add_cash";
      data: {
        type: "income" | "expense";
        amount: number;
        category: string;
        note?: string;
      };
    }
  | {
      action: "add_ledger";
      data: {
        partyName: string;
        type: "payment" | "invoice" | "adjustment";
        amount: number;
        note?: string;
      };
    }
  | {
      action: "answer";
      data: { text: string };
    };

export interface ParseResult {
  actions: ParsedAction[];
  summary: string;
  unmatched: string[];
}

// ---------- helpers ----------

const NUM_WORDS: Record<string, number> = {
  ek: 1, do: 2, dho: 2, teen: 3, tin: 3, char: 4, chaar: 4,
  panch: 5, paanch: 5, chhe: 6, che: 6, saat: 7, sat: 7,
  aath: 8, ath: 8, nau: 9, dus: 10, das: 10,
  bara: 12, barah: 12, pandra: 15, bees: 20, pachas: 50, pachaas: 50,
  sau: 100, hazaar: 1000, hajar: 1000, lakh: 100000,
};

function extractNumber(s: string): number | null {
  const m = s.match(/(\d+(?:[.,]\d+)?)/);
  if (m) return parseFloat(m[1].replace(",", "."));
  for (const w of s.toLowerCase().split(/\s+/)) {
    if (NUM_WORDS[w] != null) return NUM_WORDS[w];
  }
  return null;
}

// fuzzy: case-insensitive substring + token overlap
function scoreMatch(needle: string, hay: string): number {
  const n = needle.toLowerCase();
  const h = hay.toLowerCase();
  if (h === n) return 100;
  if (h.includes(n)) return 60 + n.length;
  if (n.includes(h)) return 50 + h.length;
  const ntok = new Set(n.split(/\s+/).filter(Boolean));
  const htok = new Set(h.split(/[\s()]+/).filter(Boolean));
  let overlap = 0;
  for (const t of ntok) if (htok.has(t)) overlap++;
  return overlap * 15;
}

function findParty(text: string, parties: Party[]): Party | null {
  let best: Party | null = null;
  let bestScore = 0;
  for (const p of parties) {
    const s = scoreMatch(p.name, text);
    if (s > bestScore) {
      bestScore = s;
      best = p;
    }
  }
  // Also try last names / first words
  if (bestScore < 30) {
    for (const p of parties) {
      const first = p.name.split(/\s+/)[0];
      if (first && new RegExp(`\\b${first}\\b`, "i").test(text)) {
        if (first.length * 8 > bestScore) {
          bestScore = first.length * 8;
          best = p;
        }
      }
    }
  }
  return bestScore >= 25 ? best : null;
}

function findItem(phrase: string, items: Item[]): Item | null {
  let best: Item | null = null;
  let bestScore = 0;
  for (const it of items) {
    const s = scoreMatch(phrase, it.name);
    const c = it.category ? scoreMatch(phrase, it.category) * 0.6 : 0;
    const sc = Math.max(s, c);
    if (sc > bestScore) {
      bestScore = sc;
      best = it;
    }
  }
  return bestScore >= 20 ? best : null;
}

// Split a sentence into "line phrases" — each one likely a single item
function splitLines(sentence: string): string[] {
  return sentence
    .split(/,| aur | and |\+/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Split full message into sentences / commands
function splitSentences(text: string): string[] {
  return text
    .split(/[.;\n]| then /i)
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------- intent detection ----------

const KW_INVOICE = /\b(bill|invoice|bhej|bheji|bheja|supply|diya|diye|de\s*do|bana|banao|parchi)\b/i;
const KW_PAYMENT_IN = /\b(mila|mile|mili|diya|diye|cash\s+diya|payment|chukta|chuka|received|aaya|cash\s+aaya)\b/i;
const KW_EXPENSE = /\b(kharcha|kharch|kharach|diesel|petrol|fuel|salary|tankhah|mazdoori|labour|rent|kiraya|repair|maintenance|tea|chai|paani|electricity|bijli|expense)\b/i;
const KW_INCOME = /\b(sales|sale|income|bechi|beche|cash\s+aaya|recovery)\b/i;
const KW_PARTY_MARKER = /\b(ko|ne|se|ka|ki)\b/i;

const EXPENSE_CATEGORY_MAP: { match: RegExp; cat: string }[] = [
  { match: /diesel|petrol|fuel/i, cat: "Diesel" },
  { match: /salary|tankhah/i, cat: "Salary" },
  { match: /mazdoori|labour|labor/i, cat: "Labour" },
  { match: /rent|kiraya/i, cat: "Rent" },
  { match: /repair|maintenance/i, cat: "Maintenance" },
  { match: /tea|chai|paani|nashta/i, cat: "Tea/Snacks" },
  { match: /electricity|bijli|light/i, cat: "Electricity" },
];

function detectExpenseCategory(s: string): string {
  for (const m of EXPENSE_CATEGORY_MAP) if (m.match.test(s)) return m.cat;
  return "Other";
}

function parseSentence(
  sentence: string,
  parties: Party[],
  items: Item[],
): ParsedAction | null {
  const s = sentence.trim();
  if (!s) return null;

  // ---------- expense (no party needed) ----------
  if (KW_EXPENSE.test(s) && !KW_INVOICE.test(s)) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_cash",
        data: {
          type: "expense",
          amount: amt,
          category: detectExpenseCategory(s),
          note: s,
        },
      };
    }
  }

  // ---------- pure payment received from party ----------
  const party = findParty(s, parties);
  const isPaymentLike =
    KW_PAYMENT_IN.test(s) && !findItem(s, items) && !/brass|bag|trip|hour|kg|qty|@/i.test(s);
  if (party && isPaymentLike) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_ledger",
        data: {
          partyName: party.name,
          type: "payment",
          amount: amt,
          note: s,
        },
      };
    }
  }

  // ---------- invoice / bill ----------
  if (party && (KW_INVOICE.test(s) || /\d+\s*(brass|bag|trip|hour|hr|day|kg|bori)/i.test(s))) {
    // remove party name reference to clean line phrases
    const withoutParty = s.replace(new RegExp(party.name.split(/\s+/)[0], "ig"), "");
    const phrases = splitLines(withoutParty);
    const lines: { name: string; unit: string; qty: number; rate: number }[] = [];
    let paid = 0;
    for (const ph of phrases) {
      // detect "paid X" or "cash X"
      const paidMatch = ph.match(/\b(paid|cash|advance|adv)\b[^\d]*(\d+)/i);
      if (paidMatch) {
        paid += parseInt(paidMatch[2], 10);
        continue;
      }
      const it = findItem(ph, items);
      if (!it) continue;
      const qty = extractNumber(ph) ?? 1;
      // optional explicit rate: "@5000" or "rate 5000"
      const rateM = ph.match(/@\s*(\d+)|rate\s*(\d+)/i);
      const rate = rateM ? parseInt(rateM[1] || rateM[2], 10) : it.rate;
      lines.push({ name: it.name, unit: it.unit, qty, rate });
    }
    if (lines.length > 0) {
      return {
        action: "create_invoice",
        data: { partyName: party.name, lines, paid: paid || undefined, notes: undefined },
      };
    }
  }

  // ---------- generic income ----------
  if (KW_INCOME.test(s)) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_cash",
        data: { type: "income", amount: amt, category: "Sales", note: s },
      };
    }
  }

  return null;
}

export async function parseCommand(text: string): Promise<ParseResult> {
  const parties = await db.parties.toArray();
  const items = await db.items.toArray();

  const sentences = splitSentences(text);
  const actions: ParsedAction[] = [];
  const unmatched: string[] = [];

  for (const s of sentences) {
    const a = parseSentence(s, parties, items);
    if (a) actions.push(a);
    else if (s.length > 3) unmatched.push(s);
  }

  // build summary
  const parts: string[] = [];
  for (const a of actions) {
    if (a.action === "create_invoice") {
      const tot = a.data.lines.reduce((acc, l) => acc + l.qty * l.rate, 0);
      parts.push(`Bill → ${a.data.partyName} (₹${Math.round(tot)})`);
    } else if (a.action === "add_cash") {
      parts.push(`${a.data.type === "income" ? "Income" : "Expense"} ₹${a.data.amount} (${a.data.category})`);
    } else {
      parts.push(`${a.data.partyName} payment ₹${a.data.amount}`);
    }
  }
  const summary = parts.length
    ? `Mile ${parts.length} entries:\n• ${parts.join("\n• ")}`
    : "Kuch samajh nahi aaya. Try: 'Ram ko 2 brass reti badi bheji' ya '500 diesel kharcha'.";

  return { actions, summary, unmatched };
}
