// 100% offline Hinglish/Hindi/English NLP parser for daily business commands.
// No external API, no AI model. Pattern matching + fuzzy match against the
// user's own item catalog + party list (loaded from Dexie).
//
// Returns structured Action[] that the chat UI can confirm and save
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
        date?: string;
      };
    }
  | {
      action: "add_cash";
      data: {
        type: "income" | "expense";
        amount: number;
        category: string;
        note?: string;
        date?: string;
      };
    }
  | {
      action: "add_ledger";
      data: {
        partyName: string;
        type: "payment" | "invoice" | "adjustment";
        amount: number;
        note?: string;
        date?: string;
        direction?: "in" | "out"; // in = we received, out = we paid
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

// ---------- normalization ----------

// Convert Devanagari / Gujarati digits to ASCII digits
function normalizeDigits(s: string): string {
  return s
    .replace(/[०-९]/g, (d) => String("०१२३४५६७८९".indexOf(d)))
    .replace(/[૦-૯]/g, (d) => String("૦૧૨૩૪૫૬૭૮૯".indexOf(d)));
}

const HINDI_BUSINESS_WORDS: [RegExp, string][] = [
  [/आज/g, " aaj "], [/कल/g, " kal "], [/परसों/g, " parso "],
  [/हिसाब|हिसाब/g, " hisab "], [/खाता/g, " khata "], [/उधार|उधारी|बाकी|बकाया/g, " udhaar "],
  [/स्टॉक|माल/g, " stock "], [/बिल|रसीद|पर्ची/g, " bill "],
  [/रेती|रेत|सैंड/g, " reti "], [/सीमेंट|सिमेंट|सीमेन्ट/g, " cement "],
  [/ब्रास|ब्रेस|बरस|वर्ष/g, " brass "], [/बैग|बोरी|कट्टा/g, " bag "],
  [/ट्रिप|फेरा|फेरे/g, " trip "], [/घंटा|घंटे/g, " hour "], [/किलो/g, " kg "],
  [/डीजल/g, " diesel "], [/पेट्रोल/g, " petrol "], [/खर्चा|खर्च|खरचा|खरच/g, " kharcha "],
  [/चाय/g, " chai "], [/नाश्ता/g, " nashta "], [/मजदूरी|लेबर/g, " labour "], [/किराया/g, " rent "], [/बिजली/g, " bijli "],
  [/भेजी|भेजा|भेजे|भेजो|दिया|दीया|दिये|दिए|दी/g, " diya "],
  [/लिया|लीया|लिये|लिए/g, " liya "],
  [/मिला|मिले|मिली|प्राप्त/g, " mila "], [/चुकाया|चुकता/g, " chukaya "],
  [/पेमेंट|भुगतान/g, " payment "], [/कैश|नकद/g, " cash "], [/जमा/g, " jama "], [/एडवांस|अग्रिम/g, " advance "],
  [/और/g, " aur "], [/राम/g, " Ram "], [/रमेश/g, " Ramesh "], [/सुरेश/g, " Suresh "], [/मोहन/g, " Mohan "], [/किशोर/g, " Kishor "],
  [/\sको\s/g, " ko "], [/\sने\s/g, " ne "], [/\sसे\s/g, " se "], [/\sका\s|\sकी\s|\sके\s/g, " ka "],
];

function normalizeBusinessTerms(s: string): string {
  let out = normalizeDigits(s);
  for (const [match, replacement] of HINDI_BUSINESS_WORDS) out = out.replace(match, replacement);
  return out.replace(/\s+/g, " ").trim();
}

function sameLooseWord(a: string, b: string): boolean {
  return a.localeCompare(b, undefined, { sensitivity: "base" }) === 0;
}

/** Remove Web Speech cumulative/interim repetition such as "hello hello aaj hello aaj...". */
export function cleanDictationText(input: string): string {
  const normalized = normalizeBusinessTerms(input)
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!normalized) return "";

  const rawWords = normalized.split(/\s+/).filter(Boolean);
  const words: string[] = [];
  for (const word of rawWords) {
    const prev = words[words.length - 1];
    const prev2 = words[words.length - 2];
    if (prev && prev2 && sameLooseWord(prev, word) && sameLooseWord(prev2, word)) continue;
    words.push(word);
    for (let size = Math.min(8, Math.floor(words.length / 2)); size >= 1; size--) {
      const a = words.slice(words.length - size * 2, words.length - size);
      const b = words.slice(words.length - size);
      if (a.length === size && b.length === size && a.every((w, i) => sameLooseWord(w, b[i]))) {
        words.splice(words.length - size, size);
        break;
      }
    }
  }

  let out = words.join(" ");
  out = out.replace(/^(?:(?:hello|helo|हेलो|हलो|halo)\s+){1,}/i, "").trim();
  return out;
}

// Common Hinglish spelling variants → canonical forms (only for parsing, not display)
function normalizeSpelling(s: string): string {
  return normalizeBusinessTerms(s)
    .replace(/\bbrs\b/gi, "brass")
    .replace(/\bbori\b/gi, "bag")
    .replace(/\bborie?s\b/gi, "bag")
    .replace(/\btha?ela\b/gi, "bag")
    .replace(/\bboora\b/gi, "bag")
    .replace(/\bfera\b/gi, "trip")
    .replace(/\bpher[ao]?\b/gi, "trip")
    .replace(/\bghanta\b/gi, "hour")
    .replace(/\bghante\b/gi, "hour")
    .replace(/\bhr\b/gi, "hour")
    .replace(/\bhrs\b/gi, "hour")
    .replace(/\bkilo\b/gi, "kg")
    .replace(/\bkg?s\b/gi, "kg")
    .replace(/\brs\.?\b/gi, "")
    .replace(/\brupees?\b/gi, "")
    .replace(/\brupaye?\b/gi, "");
}

const NUM_WORDS: Record<string, number> = {
  ek: 1, do: 2, dho: 2, teen: 3, tin: 3, char: 4, chaar: 4,
  panch: 5, paanch: 5, chhe: 6, che: 6, chha: 6, saat: 7, sat: 7,
  aath: 8, ath: 8, nau: 9, dus: 10, das: 10,
  gyarah: 11, bara: 12, barah: 12, terah: 13, chaudah: 14, pandra: 15,
  bees: 20, tees: 30, chalis: 40, chaalis: 40, pachas: 50, pachaas: 50,
  saath: 60, sattar: 70, assi: 80, nabbe: 90,
  sau: 100, hazaar: 1000, hajar: 1000, hazar: 1000, lakh: 100000, karod: 10000000, crore: 10000000,
  "एक": 1, "दो": 2, "तीन": 3, "चार": 4, "पांच": 5, "पाँच": 5,
  "छह": 6, "सात": 7, "आठ": 8, "नौ": 9, "दस": 10,
  "बीस": 20, "पचास": 50, "सौ": 100, "हजार": 1000, "हज़ार": 1000, "लाख": 100000,
};

function extractNumber(s: string): number | null {
  const t = normalizeDigits(s);
  // 5k / 2.5k
  const kMatch = t.match(/(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;
  // "5 hazaar", "2.5 lakh"
  const bigMatch = t.match(/(\d+(?:\.\d+)?)\s*(hazaar|hazar|hajar|lakh|karod|crore|सौ|हजार|लाख)/i);
  if (bigMatch) {
    const mult = NUM_WORDS[bigMatch[2].toLowerCase()] ?? 1;
    return parseFloat(bigMatch[1]) * mult;
  }
  const m = t.match(/(\d[\d,]*(?:\.\d+)?)/);
  if (m) return parseFloat(m[1].replace(/,/g, ""));
  const tokens = t.toLowerCase().split(/\s+/);
  let total = 0, cur = 0, found = false;
  for (const w of tokens) {
    const v = NUM_WORDS[w];
    if (v == null) continue;
    found = true;
    if (v >= 100) cur = (cur || 1) * v;
    else cur += v;
    if (v >= 1000) { total += cur; cur = 0; }
  }
  return found ? total + cur : null;
}

// Extract ALL numbers in order (for "2 brass reti 10 bag cement")
function extractAllNumbers(s: string): number[] {
  const t = normalizeDigits(s);
  const out: number[] = [];
  const re = /(\d+(?:\.\d+)?)\s*k\b|(\d+(?:\.\d+)?)\s*(hazaar|hazar|hajar|lakh|karod|crore)|(\d[\d,]*(?:\.\d+)?)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t)) !== null) {
    if (m[1]) out.push(parseFloat(m[1]) * 1000);
    else if (m[2]) out.push(parseFloat(m[2]) * (NUM_WORDS[m[3].toLowerCase()] ?? 1));
    else if (m[4]) out.push(parseFloat(m[4].replace(/,/g, "")));
  }
  if (out.length === 0) {
    for (const token of t.toLowerCase().split(/\s+/)) {
      const n = NUM_WORDS[token];
      if (n != null && n > 0 && n < 1000) out.push(n);
    }
  }
  return out;
}

// ---------- fuzzy match with Levenshtein for typo tolerance ----------

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (!al) return bl;
  if (!bl) return al;
  const dp = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) dp[j] = j;
  for (let i = 1; i <= al; i++) {
    let prev = dp[0]; dp[0] = i;
    for (let j = 1; j <= bl; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[bl];
}

function scoreMatch(needle: string, hay: string): number {
  const n = needle.toLowerCase().trim();
  const h = hay.toLowerCase().trim();
  if (!n || !h) return 0;
  if (h === n) return 100;
  if (h.includes(n) && n.length >= 3) return 60 + n.length;
  if (n.includes(h) && h.length >= 3) return 50 + h.length;
  // Token overlap
  const ntok = n.split(/\s+/).filter(Boolean);
  const htok = h.split(/[\s()]+/).filter(Boolean);
  let overlap = 0;
  for (const nt of ntok) {
    for (const ht of htok) {
      if (nt === ht) { overlap += 20; continue; }
      if (nt.length >= 4 && ht.length >= 4) {
        const d = levenshtein(nt, ht);
        if (d <= Math.max(1, Math.floor(Math.min(nt.length, ht.length) / 4))) {
          overlap += 15;
        }
      }
    }
  }
  return overlap;
}

function findParty(text: string, parties: Party[]): Party | null {
  let best: Party | null = null;
  let bestScore = 0;
  for (const p of parties) {
    const s = scoreMatch(p.name, text);
    if (s > bestScore) { bestScore = s; best = p; }
  }
  if (bestScore < 30) {
    // try first-name match with typo tolerance
    for (const p of parties) {
      const first = p.name.split(/\s+/)[0];
      if (!first || first.length < 3) continue;
      for (const w of text.split(/\s+/)) {
        const cw = w.replace(/[^\p{L}]/gu, "");
        if (cw.length < 3) continue;
        const d = levenshtein(first.toLowerCase(), cw.toLowerCase());
        const tol = Math.max(1, Math.floor(first.length / 4));
        if (d <= tol) {
          const sc = 40 + (first.length - d) * 4;
          if (sc > bestScore) { bestScore = sc; best = p; }
        }
      }
    }
  }
  return bestScore >= 25 ? best : null;
}

function inferPartyName(text: string): string | null {
  const normalized = normalizeSpelling(text);
  const patterns = [
    /^\s*([\p{L}][\p{L} .'-]{1,40}?)\s+(?:ko|ne|se)\b/iu,
    /\b(?:from|to)\s+([\p{L}][\p{L} .'-]{1,40}?)(?:\s|$)/iu,
  ];
  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    const candidate = match?.[1]
      ?.split(/\s+/)
      .filter((word) => isNameToken(word))
      .slice(0, 3)
      .join(" ")
      .trim();
    if (candidate && candidate.length >= 2) {
      return candidate.replace(/\b\w/g, (c) => c.toUpperCase());
    }
  }
  return null;
}

function partyNameFor(text: string, parties: Party[]): string | null {
  return findParty(text, parties)?.name ?? inferPartyName(text);
}

function findItem(phrase: string, items: Item[]): Item | null {
  let best: Item | null = null;
  let bestScore = 0;
  for (const it of items) {
    const s = scoreMatch(phrase, it.name);
    const c = it.category ? scoreMatch(phrase, it.category) * 0.6 : 0;
    const sc = Math.max(s, c);
    if (sc > bestScore) { bestScore = sc; best = it; }
  }
  return bestScore >= 20 ? best : null;
}

function hasAnyItem(text: string, items: Item[]): boolean {
  return splitLines(text).some((part) => !!findItem(part, items)) || !!findItem(text, items);
}

// ---------- date detection ----------

function parseDateFromText(s: string): string | null {
  const t = normalizeDigits(s);
  if (/\b(aaj|today)\b/i.test(t)) return todayISO();
  if (/\b(kal|yesterday)\b/i.test(t)) return new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (/\b(parso|day before yesterday)\b/i.test(t)) return new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
  // DD/MM or DD-MM or DD/MM/YY(YY)
  const m = t.match(/\b(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?\b/);
  if (m) {
    const dd = parseInt(m[1], 10), mm = parseInt(m[2], 10);
    let yy = m[3] ? parseInt(m[3], 10) : new Date().getFullYear();
    if (yy < 100) yy += 2000;
    if (dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12) {
      return `${yy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
    }
  }
  return null;
}

// Split "line phrases" - each likely a single item
function splitLines(sentence: string): string[] {
  return sentence
    .split(/,| aur | and |\+| plus /i)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Split full message into sentences / commands
function splitSentences(text: string): string[] {
  return cleanDictationText(text)
    .replace(/\r/g, "")
    .split(/\n+|[.;।]|(?:^|\s)[-*•]\s+|(?:^|\s)\d+[.)]\s+| phir | then | uske baad | fir | baad me /gi)
    .flatMap(splitCompoundClauses)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

const NON_NAME_TOKENS = new Set([
  "aaj", "kal", "parso", "ka", "ki", "ke", "ko", "ne", "se", "aur", "and", "or", "plus",
  "bill", "invoice", "payment", "cash", "paid", "advance", "kharcha", "hisab", "hisaab", "stock", "udhaar",
  "brass", "bag", "trip", "hour", "kg", "ton", "piece", "pcs", "meter", "feet", "reti", "cement", "diesel", "petrol",
  "diya", "bheji", "bheja", "mila", "chukaya", "jama", "liya", "batao", "dikhao",
]);

function cleanToken(token: string): string {
  return token.replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, "");
}

function isNameToken(token: string): boolean {
  const t = cleanToken(token).toLowerCase();
  return t.length >= 2 && !/^\d/.test(t) && !NON_NAME_TOKENS.has(t) && NUM_WORDS[t] == null;
}

function splitCompoundClauses(sentence: string): string[] {
  const expanded = sentence
    .replace(/\b(\d[\d,]*(?:\.\d+)?)\s+(?=(?:ka\s+)?(?:diesel|petrol|fuel|chai|nashta|labour|rent|bijli)\b)/gi, ". $1 ")
    .replace(/\b((?:[\p{L} .'-]+?)\s+(?:ko|ne|se)\s+\d[\d,]*(?:\.\d+)?\s+(?:cash\s+)?(?:diya|mila|liya|payment|advance|paid|chukaya))\s+(?=(?:\p{L}+\s+)?\d)/giu, "$1. ");
  if (expanded !== sentence) return expanded.split(/[.;।]/).flatMap(splitCompoundClauses).map((s) => s.trim()).filter(Boolean);
  const tokens = sentence.split(/\s+/).filter(Boolean);
  const starts = [0];
  for (let i = 1; i < tokens.length - 1; i++) {
    const marker = cleanToken(tokens[i + 1]).toLowerCase();
    if ((marker === "ko" || marker === "ne" || marker === "se") && isNameToken(tokens[i])) {
      const prevChunk = tokens.slice(starts[starts.length - 1], i).join(" ");
      if (prevChunk.length > 8 && /(diya|bhej|mila|payment|cash|kharcha|paid|chukaya|jama|bill)/i.test(prevChunk)) {
        starts.push(i);
      }
    }
  }
  if (starts.length === 1) return [sentence];
  return starts.map((start, idx) => tokens.slice(start, starts[idx + 1] ?? tokens.length).join(" "));
}

// ---------- intent keywords ----------

const KW_INVOICE = /\b(bill|invoice|bhej|bheji|bheja|bhejo|supply|diya|diye|de\s*do|bana|banao|banai|parchi|kaat|kaato)\b/i;
const KW_PAYMENT_IN = /\b(mila|mile|mili|payment|chukta|chuka|chukaya|received|aaya|recover|jama|deposit)\b/i;
const KW_PAYMENT_OUT = /\b(diya\s+cash|cash\s+diya|paid\s+to|pay\s+kiya|advance\s+diya|chukaya|bhej\s+diya\s+cash)\b/i;
const KW_EXPENSE = /\b(kharcha|kharch|kharach|diesel|petrol|fuel|salary|tankhah|mazdoori|labour|labor|rent|kiraya|repair|maintenance|tea|chai|paani|nashta|electricity|bijli|expense|kharche|puncture|toll|parking|khana|food)\b/i;
const KW_INCOME = /\b(sales|sale|income|bechi|beche|bech\s+diya|recovery)\b/i;
const KW_UNIT = /\b(brass|bag|trip|hour|hr|day|kg|ton|piece|pcs|meter|feet|fera|ghanta)\b/i;

const EXPENSE_CATEGORY_MAP: { match: RegExp; cat: string }[] = [
  { match: /diesel|petrol|fuel/i, cat: "Diesel" },
  { match: /salary|tankhah/i, cat: "Salary" },
  { match: /mazdoori|labour|labor/i, cat: "Labour" },
  { match: /rent|kiraya/i, cat: "Rent" },
  { match: /repair|maintenance|puncture/i, cat: "Maintenance" },
  { match: /tea|chai|paani|nashta|khana|food/i, cat: "Tea/Snacks" },
  { match: /electricity|bijli|light/i, cat: "Electricity" },
  { match: /toll|parking/i, cat: "Toll/Parking" },
];

function detectExpenseCategory(s: string): string {
  for (const m of EXPENSE_CATEGORY_MAP) if (m.match.test(s)) return m.cat;
  return "Other";
}

// Parse item phrases in a sentence — handles both "2 brass reti" and "reti 2 brass"
function extractInvoiceLines(
  sentence: string,
  items: Item[],
): { name: string; unit: string; qty: number; rate: number }[] {
  const lines: { name: string; unit: string; qty: number; rate: number }[] = [];
  const phrases = splitLines(sentence);
  for (const raw of phrases) {
    const ph = raw.trim();
    if (!ph) continue;
    const it = findItem(ph, items);
    if (!it) continue;
    // qty: prefer number nearest to a unit keyword; else first number
    const nums = extractAllNumbers(ph);
    let qty: number | null = null;
    const unitRe = new RegExp(`(\\d+(?:\\.\\d+)?)\\s*(${it.unit})\\b`, "i");
    const um = ph.match(unitRe);
    if (um) qty = parseFloat(um[1]);
    else if (nums.length > 0) qty = nums[0];
    // avoid picking up a "@rate" number as qty
    const rateM = ph.match(/@\s*(\d+(?:\.\d+)?)|rate\s*(\d+(?:\.\d+)?)|per\s+\w+\s*(\d+(?:\.\d+)?)/i);
    const rate = rateM ? parseFloat(rateM[1] || rateM[2] || rateM[3]) : it.rate;
    if (rateM && qty != null && qty === rate && nums.length > 1) qty = nums[0];
    if (qty == null || qty <= 0) qty = 1;
    lines.push({ name: it.name, unit: it.unit, qty, rate });
  }
  return lines;
}

function extractPaidAmount(s: string, invoiceTotal: number): number {
  const t = normalizeSpelling(s);
  const candidates: number[] = [];
  const patterns = [
    /\b(?:paid|cash|advance|adv|jama|liya|mila)\b\D{0,12}(\d[\d,]*(?:\.\d+)?)/gi,
    /(\d[\d,]*(?:\.\d+)?)\D{0,12}\b(?:paid|cash|advance|adv|jama|liya|mila)\b/gi,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(t)) !== null) candidates.push(parseFloat(m[1].replace(/,/g, "")));
  }
  const sane = candidates.filter((n) => n > 0 && n <= Math.max(invoiceTotal * 1.2, 1000000));
  return sane.at(-1) ?? 0;
}

function isPaymentOutText(s: string): boolean {
  return /\b(?:ko|to)\b.*\b(?:advance|paid|pay|payment|cash|diya|chukaya)\b/i.test(s)
    && !/\b(?:ne|se|from)\b/i.test(s);
}

function isPaymentInText(s: string): boolean {
  return /\b(?:ne|se|from)\b/i.test(s) || /\b(?:mila|received|aaya|jama|deposit|recovery)\b/i.test(s);
}

function parseSentence(
  sentence: string,
  parties: Party[],
  items: Item[],
): ParsedAction | null {
  const raw = sentence.trim();
  if (!raw) return null;
  const s = normalizeSpelling(raw);
  const date = parseDateFromText(s) ?? undefined;

  // ---------- expense (no party needed) ----------
  if (KW_EXPENSE.test(s) && !KW_INVOICE.test(s) && !KW_UNIT.test(s)) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_cash",
        data: { type: "expense", amount: amt, category: detectExpenseCategory(s), note: raw, date },
      };
    }
  }

  // ---------- party-related ----------
  const partyName = partyNameFor(s, parties);

  // Payment OUT (we paid advance/cash to someone) — "Mohan ko 2000 advance diya".
  if (partyName && KW_PAYMENT_OUT.test(s) && isPaymentOutText(s) && !hasAnyItem(s, items) && !KW_UNIT.test(s)) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_ledger",
        data: {
          partyName, type: "payment", amount: -amt,
          note: raw, date, direction: "out",
        },
      };
    }
  }

  // Payment IN (received from party) — "Suresh ne 5000 cash diya".
  const isPaymentLike =
    (KW_PAYMENT_IN.test(s) || /\b(cash|paid|diya)\b/i.test(s)) && isPaymentInText(s) && !hasAnyItem(s, items) && !KW_UNIT.test(s);
  if (partyName && isPaymentLike) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_ledger",
        data: { partyName, type: "payment", amount: amt, note: raw, date, direction: "in" },
      };
    }
  }

  // ---------- invoice / bill ----------
  if (partyName && (KW_INVOICE.test(s) || KW_UNIT.test(s) || hasAnyItem(s, items))) {
    const withoutParty = s
      .replace(new RegExp(partyName.split(/\s+/)[0], "ig"), "")
      .replace(/\b(ko|ne|se)\b/gi, ",");
    const lines = extractInvoiceLines(withoutParty, items);
    if (lines.length > 0) {
      const total = lines.reduce((sum, l) => sum + l.qty * l.rate, 0);
      const paid = extractPaidAmount(s, total);
      return {
        action: "create_invoice",
        data: { partyName, lines, paid: paid || undefined, date },
      };
    }
  }

  // ---------- generic income ----------
  if (KW_INCOME.test(s) && !partyName) {
    const amt = extractNumber(s) ?? 0;
    if (amt > 0) {
      return {
        action: "add_cash",
        data: { type: "income", amount: amt, category: "Sales", note: raw, date },
      };
    }
  }

  return null;
}

// ---------- query intent (read-only synthesis) ----------

const KW_QUERY = /\b(kitna|kitne|kya|kaisa|batao|bata|dikha|show|how\s+much|total|summary|hisab|hisaab|report)\b/i;
const KW_TODAY = /\b(aaj|today|aaj\s*ka)\b/i;
const KW_MONTH = /\b(mahine|month|is\s*mahine|this\s*month)\b/i;
const KW_STOCK = /\b(stock|maal|inventory|kitna\s*maal)\b/i;
const KW_UDHAAR = /\b(udhaar|udhar|baki|baaki|owes|owe|balance|khata)\b/i;

function ymPrefix(): string { return new Date().toISOString().slice(0, 7); }

async function tryQuery(
  s: string, parties: Party[], items: Item[],
): Promise<ParsedAction | null> {
  if (!KW_QUERY.test(s) && !KW_UDHAAR.test(s) && !KW_STOCK.test(s)) return null;

  if (KW_STOCK.test(s)) {
    const stocks = items.filter((i) => i.kind === "stock");
    const lines = stocks
      .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
      .slice(0, 8)
      .map((i) => `• ${i.name}: ${i.stock ?? 0} ${i.unit}${i.lowStockAt != null && (i.stock ?? 0) <= i.lowStockAt ? " ⚠️ low" : ""}`);
    return { action: "answer", data: { text: lines.length ? `Stock:\n${lines.join("\n")}` : "Stock empty hai." } };
  }

  const isYesterday = /\b(kal|yesterday)\b/i.test(s);
  if (KW_TODAY.test(s) || isYesterday || /\b(poora|pura|full|whole|complete|din|day)\b.*\b(hisab|hisaab|summary|report)\b/i.test(s) || /\b(hisab|hisaab|summary)\b/i.test(s)) {
    const target = isYesterday
      ? new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      : todayISO();
    const label = isYesterday ? "Kal ka" : "Aaj ka";
    const todayCash = await db.cash.where("date").equals(target).toArray();
    const inc = todayCash.filter((c) => c.type === "income").reduce((a, c) => a + c.amount, 0);
    const exp = todayCash.filter((c) => c.type === "expense").reduce((a, c) => a + c.amount, 0);
    const invs = await db.invoices.where("date").equals(target).toArray();
    const sales = invs.reduce((a, i) => a + i.total, 0);
    const paidOnBills = invs.reduce((a, i) => a + (i.paid ?? 0), 0);
    const udhaarGiven = sales - paidOnBills;
    const onHand = await cashOnHand(target);

    const payLedger = (await db.ledger.where("date").equals(target).toArray())
      .filter((l) => l.type === "payment");
    const partyMap = new Map<number, number>();
    for (const l of payLedger) partyMap.set(l.partyId, (partyMap.get(l.partyId) ?? 0) + l.credit);
    const topParties = [...partyMap.entries()]
      .sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([pid, amt]) => {
        const p = parties.find((x) => x.id === pid);
        return `   – ${p?.name ?? "?"}: ${fmtINR(amt)}`;
      });

    const expByCat = new Map<string, number>();
    for (const c of todayCash.filter((x) => x.type === "expense")) {
      expByCat.set(c.category, (expByCat.get(c.category) ?? 0) + c.amount);
    }
    const topExp = [...expByCat.entries()]
      .sort((a, b) => b[1] - a[1]).slice(0, 4)
      .map(([cat, amt]) => `   – ${cat}: ${fmtINR(amt)}`);

    const itemMap = new Map<string, { qty: number; unit: string; amt: number }>();
    for (const inv of invs) for (const l of inv.lines) {
      const prev = itemMap.get(l.name) ?? { qty: 0, unit: l.unit, amt: 0 };
      itemMap.set(l.name, { qty: prev.qty + l.qty, unit: l.unit, amt: prev.amt + l.amount });
    }
    const topItems = [...itemMap.entries()]
      .sort((a, b) => b[1].amt - a[1].amt).slice(0, 3)
      .map(([n, v]) => `   – ${n}: ${v.qty} ${v.unit} (${fmtINR(v.amt)})`);

    const parts = [
      `${label} hisaab (${target}):`,
      `• Bills banaye: ${invs.length} — Total ${fmtINR(sales)}`,
      `   Paid on bills: ${fmtINR(paidOnBills)}, Naya udhaar: ${fmtINR(udhaarGiven)}`,
      `• Cash aaya: ${fmtINR(inc)}`,
      ...(topParties.length ? [`   Party payments:`, ...topParties] : []),
      `• Kharcha: ${fmtINR(exp)}`,
      ...(topExp.length ? topExp : []),
      ...(topItems.length ? [`• Sabse zyada bika:`, ...topItems] : []),
      `• Cash on hand: ${fmtINR(onHand)}`,
      `• Net (income - kharcha): ${fmtINR(inc - exp)}`,
    ];
    return { action: "answer", data: { text: parts.join("\n") } };
  }

  if (KW_MONTH.test(s)) {
    const ym = ymPrefix();
    const cat = (s.match(/(diesel|petrol|fuel|salary|labour|rent|electricity|maintenance|tea|chai)/i)?.[0] || "").toLowerCase();
    const all = (await db.cash.toArray()).filter((c) => c.date.startsWith(ym));
    if (cat) {
      const tot = all.filter((c) => c.type === "expense" && c.category.toLowerCase().includes(cat.slice(0, 4))).reduce((a, c) => a + c.amount, 0);
      return { action: "answer", data: { text: `Is mahine ${cat} kharcha: ${fmtINR(tot)}` } };
    }
    const inc = all.filter((c) => c.type === "income").reduce((a, c) => a + c.amount, 0);
    const exp = all.filter((c) => c.type === "expense").reduce((a, c) => a + c.amount, 0);
    return { action: "answer", data: { text: `Is mahine: Income ${fmtINR(inc)}, Kharcha ${fmtINR(exp)}, Net ${fmtINR(inc - exp)}` } };
  }

  const p = findParty(s, parties);
  if (p && KW_UDHAAR.test(s)) {
    const bal = await partyBalance(p.id!);
    const txt = bal > 0
      ? `${p.name} aap ko ${fmtINR(bal)} dena hai.`
      : bal < 0 ? `${p.name} ko aap ${fmtINR(-bal)} dena hai.`
      : `${p.name} ka hisaab clear hai.`;
    return { action: "answer", data: { text: txt } };
  }

  if (KW_UDHAAR.test(s)) {
    let total = 0;
    for (const pt of parties) {
      if (pt.type === "customer") total += await partyBalance(pt.id!);
    }
    return { action: "answer", data: { text: `Total udhaar (sab customer): ${fmtINR(total)}` } };
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
    const q = await tryQuery(s, parties, items);
    if (q) { actions.push(q); continue; }
    const a = parseSentence(s, parties, items);
    if (a) actions.push(a);
    else if (s.length > 3) unmatched.push(s);
  }

  const parts: string[] = [];
  for (const a of actions) {
    if (a.action === "create_invoice") {
      const tot = a.data.lines.reduce((acc, l) => acc + l.qty * l.rate, 0);
      parts.push(`Bill → ${a.data.partyName} (₹${Math.round(tot)})`);
    } else if (a.action === "add_cash") {
      parts.push(`${a.data.type === "income" ? "Income" : "Expense"} ₹${a.data.amount} (${a.data.category})`);
    } else if (a.action === "add_ledger") {
      const dir = a.data.direction === "out" ? "paid to" : "payment from";
      parts.push(`${a.data.partyName} ${dir} ₹${Math.abs(a.data.amount)}`);
    } else {
      parts.push(a.data.text);
    }
  }
  const hasAnswerOnly = actions.length > 0 && actions.every((a) => a.action === "answer");
  const summary = !actions.length
    ? "Kuch samajh nahi aaya. Try: 'Ram ko 2 brass reti bheji', '500 diesel kharcha', ya 'aaj ka hisaab'."
    : hasAnswerOnly
      ? parts.join("\n\n")
      : `Mile ${actions.length} entries:\n• ${parts.join("\n• ")}`;

  return { actions, summary, unmatched };
}

// ---------- exported helpers for the test lab ----------
export const _internal = { extractNumber, extractAllNumbers, parseDateFromText, normalizeDigits, levenshtein };
