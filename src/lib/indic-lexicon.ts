// Multi-lingual lexicon mined from the Indic business AI training dataset.
// 100% offline: plain regex maps, no model, no network.
//
// Covers: Hindi (देवनागरी), Gujarati (ગુજરાતી), romanised Hindi (rh),
// romanised Gujarati (rg) and mixed English code-switching (gjmix/himix).

/** Word/phrase → canonical Hinglish token used by the parser. */
export const INDIC_NORMALIZERS: [RegExp, string][] = [
  // ---- Gujarati script: verbs & business actions ----
  [/વેચ(?:ાણ|્યું|ી|યા|યુ)?/g, " bechi "],
  [/ખરીદ(?:્યું|ી|યા|યુ|ો)?/g, " kharida "],
  [/આપ(?:્યા|્યું|ી|યુ|ો|વાનું|વાના)?/g, " diya "],
  [/લિધ(?:ા|ી|ુ|ું)|લીધ(?:ા|ી|ુ|ું)|લેવ(?:ા|ાનું)/g, " liya "],
  [/મળ(?:્યા|્યું|ી|યુ)/g, " mila "],
  [/જમા/g, " jama "],
  [/ચૂક(?:વ્યા|વ્યું|તે)/g, " chukaya "],
  [/બનાવ(?:ો|જો|ી|્યું)?/g, " banao "],
  [/લખ(?:ો|જો|ી|્યું)?/g, " likho "],
  [/ઉમેર(?:ો|જો|્યું)?/g, " add "],
  [/બતાવ(?:ો|જો|્યું)?|દેખાડ(?:ો|જો)?/g, " batao "],
  [/પાછ(?:ા|ી|ુ|ું)|પરત/g, " wapas "],
  [/મોકલ(?:ો|જો|્યું|ી|યા)?/g, " bheja "],
  [/ખરાબ|બગડ(?:ેલ|ી)/g, " damaged "],
  // ---- Gujarati script: nouns ----
  [/ખાંડ/g, " sugar "], [/ચોખા/g, " rice "], [/ઘઉં|ગહુ/g, " wheat "],
  [/તેલ/g, " oil "], [/દૂધ/g, " milk "], [/ચા\b/g, " chai "],
  [/બિસ્કિટ/g, " biscuit "], [/ગેસ/g, " gas "], [/ભાડું|ભાડુ/g, " rent "],
  [/માલ/g, " stock "], [/વેપાર/g, " business "], [/બિલ|બીલ/g, " bill "],
  [/ગ્રાહક/g, " customer "], [/સપ્લાયર/g, " supplier "],
  [/ખર્ચ(?:ો|ા)?/g, " kharcha "], [/ઉધાર|બાકી|બાકિ/g, " udhaar "],
  [/હિસાબ/g, " hisab "], [/નફો|નફા/g, " profit "], [/ઓર્ડર/g, " order "],
  // ---- Gujarati script: particles / time / question words ----
  [/આજ(?:નું|ના|નુ)?/g, " aaj "], [/ગઈકાલે|કાલ(?:ની|નું)?/g, " kal "],
  [/આ\s*મહિને|મહિના/g, " mahine "], [/અઠવાડિય(?:ા|ે|ું)/g, " week "],
  [/કેટલ(?:ુ|ું|ા|ી|ો)/g, " kitna "], [/શું/g, " kya "],
  [/પાસેથી|માંથી/g, " se "], [/\sને\s/g, " ko "], [/\sમાટે\s/g, " ke liye "],
  [/માં\b/g, " me "], [/છે\b/g, " hai "], [/નથી|નહીં|નહિ/g, " nahi "],
  [/ભાવ(?:ે|થી)?/g, " rate "], [/હજાર/g, " hazaar "], [/રૂપિયા(?:નું|ના)?|રૂ\.?/g, " "],
  // ---- Gujarati units ----
  [/કિલો/g, " kg "], [/નંગ/g, " piece "], [/બોક્સ/g, " box "],
  [/પેકેટ/g, " packet "], [/બોરી|થેલી/g, " bag "], [/લિટર/g, " liter "],
  [/ડઝન/g, " dozen "], [/ટન/g, " ton "],
  // ---- Hindi script additions (existing map covers the rest) ----
  [/बिक्री|बेचा|बेचे|बेची/g, " bechi "],
  [/खरीद(?:ा|े|ी|ो)?/g, " kharida "],
  [/चीनी|शक्कर/g, " sugar "], [/चावल/g, " rice "], [/गेहूं|गेहूँ/g, " wheat "],
  [/तेल/g, " oil "], [/दूध/g, " milk "], [/बिस्कुट|बिस्किट/g, " biscuit "],
  [/गैस/g, " gas "], [/नग\b/g, " piece "], [/पैकेट/g, " packet "], [/डिब्बा|बॉक्स/g, " box "],
  [/लीटर/g, " liter "], [/दर्जन/g, " dozen "], [/जोड़(?:ो|ें)/g, " add "],
  [/दिखा(?:ओ|ए|एं)?|बता(?:ओ|एं)?/g, " batao "], [/लिखो|दर्ज/g, " likho "],
  [/वापस/g, " wapas "], [/ग्राहक/g, " customer "], [/मुनाफा|लाभ/g, " profit "],
  [/स्टॉक|इन्वेंटरी/g, " stock "], [/खराब/g, " damaged "],
  [/इस\s*महीने|महीने|महीना/g, " mahine "], [/हफ्ते|सप्ताह/g, " week "],
  [/कितन(?:ा|े|ी)/g, " kitna "], [/क्या/g, " kya "], [/नहीं|मत\b/g, " nahi "],
  [/भाव|रेट/g, " rate "], [/रुपये|रूपये|रुपया/g, " "],
];

/** Romanised unit / item synonyms → canonical catalog wording. */
export const ROMAN_SYNONYMS: [RegExp, string][] = [
  // units
  [/\bkilos?\b/gi, "kg"], [/\bkilogram(?:s)?\b/gi, "kg"],
  [/\bnang\b/gi, "piece"], [/\bnug\b/gi, "piece"], [/\bpc\b/gi, "piece"],
  [/\bboxes\b/gi, "box"], [/\bpackets?\b/gi, "packet"], [/\bpaket\b/gi, "packet"],
  [/\bthaili\b/gi, "bag"], [/\bbori\b/gi, "bag"],
  [/\blitres?\b/gi, "liter"], [/\bltr\b/gi, "liter"], [/\bdozens?\b/gi, "dozen"],
  [/\btonnes?\b/gi, "ton"], [/\bquintals?\b/gi, "quintal"],
  // romanised Gujarati verbs
  [/\bvech(?:an|yu|i|ya|u)\b/gi, "bechi"], [/\bvechvu\b/gi, "bechi"],
  [/\bkharid(?:i|yu|ya|o)\b/gi, "kharida"],
  [/\baap(?:ya|yu|i|o)\b/gi, "diya"], [/\bapya\b/gi, "diya"],
  [/\blidh(?:a|i|u)\b/gi, "liya"], [/\bleva\b/gi, "liya"],
  [/\bmal(?:y|i)a?\b/gi, "mila"], [/\bmalyu\b/gi, "mila"],
  [/\bbanav(?:o|jo|i)\b/gi, "banao"], [/\blakh(?:jo|o)\b/gi, "likho"],
  [/\bbatav(?:o|jo)\b/gi, "batao"], [/\bdekhad(?:o|jo)\b/gi, "batao"],
  [/\bpach(?:a|i|u)\b/gi, "wapas"], [/\bparat\b/gi, "wapas"],
  [/\bmokal(?:o|jo|ya)\b/gi, "bheja"], [/\bumer(?:o|jo)\b/gi, "add"],
  // romanised Gujarati nouns / particles
  [/\bkhand\b/gi, "sugar"], [/\bchokha\b/gi, "rice"], [/\bghau\b/gi, "wheat"],
  [/\bdudh\b/gi, "milk"], [/\btel\b/gi, "oil"],
  [/\bpasethi\b/gi, "se"], [/\bmathi\b/gi, "se"], [/\bmate\b/gi, "ke liye"],
  [/\bketl(?:u|a|i|o)\b/gi, "kitna"], [/\bnu\b/gi, "ka"], [/\bche\b/gi, "hai"],
  [/\bbaki\b/gi, "udhaar"], [/\bnafo\b/gi, "profit"], [/\bbhave?\b/gi, "rate"],
  [/\bgaikale\b/gi, "kal"], [/\baa\s+mahine\b/gi, "mahine"],
  [/\bathvadiy(?:a|e|u)\b/gi, "week"],
];

/** Gujarati/Hindi spoken numerals (romanised) not already in the parser map. */
export const EXTRA_NUM_WORDS: Record<string, number> = {
  be: 2, tran: 3, traN: 3, chaar_g: 4, panch_g: 5, chh: 6, chhah: 6,
  saat_g: 7, aath_g: 8, nav: 9, das_g: 10, vees: 20, tris: 30,
  chalees: 40, pachas_g: 50, so: 100, hajaar: 1000,
};

// ---------- intent classification (canonical inventory, §25) ----------

interface IntentRule { intent: string; test: RegExp }

/**
 * Ordered rules: first match wins. Written against text that has already
 * passed through INDIC_NORMALIZERS + ROMAN_SYNONYMS, so every rule can assume
 * canonical Hinglish tokens.
 */
export const INTENT_RULES: IntentRule[] = [
  { intent: "DANGEROUS_BULK_DELETE", test: /\b(delete|remove|mita|hata)\b.*\b(all|sab|sabhi|everything|entire)\b|\b(all|sab)\b.*\b(delete|mita)\b/i },
  { intent: "NEGATE_ACTION", test: /\b(nahi|not|cancel|mat|don'?t|do\s*not)\b.*\b(likho|save|record|banao|add)\b|\b(cancel|undo)\b/i },
  { intent: "CORRECT_TRANSACTION", test: /\b(galat|wrong|correction|correct|sudhar|change|badal|instead)\b/i },
  { intent: "GET_LOW_STOCK", test: /\b(low\s*stock|khatam|reorder\s*(?:level|point)?\s*(?:se\s*)?(?:kam|niche|below))\b/i },
  { intent: "UPDATE_REORDER_LEVEL", test: /\breorder\s*(?:level|point)\b.*\b(\d+|set|karo|rakho)\b/i },
  { intent: "GET_PROFIT_REPORT", test: /\bprofit\b.*\b(kitna|report|batao|show|kya)\b|\b(kitna|show|batao)\b.*\bprofit\b/i },
  { intent: "GET_EXPENSE_REPORT", test: /\b(kharcha|expense)s?\b.*\b(kitna|report|total|batao|show)\b|\b(total|show|batao)\b.*\b(kharcha|expense)/i },
  { intent: "GET_SALES_REPORT", test: /\b(sale|sales|bechi|vechan|revenue)\b.*\b(kitna|report|batao|show|total)\b|\b(show|batao|kitna|total)\b.*\b(sale|sales|bechi)\b/i },
  { intent: "GET_STOCK", test: /\bstock\b.*\b(kitna|batao|show|hai|check)\b|\b(kitna|show|batao)\b.*\bstock\b/i },
  { intent: "GET_SUPPLIER_PAYABLE", test: /\b(supplier|vendor)\b.*\b(dena|payable|owe|baki|udhaar)\b|\b(ko|owe)\b.*\b(dena|payable|apvanu|apvanun)\b/i },
  { intent: "GET_CUSTOMER_OUTSTANDING", test: /\b(udhaar|outstanding|pending|owe|balance|khata)\b.*\b(kitna|batao|show|hai|kya)\b|\b(kitna)\b.*\b(lena|udhaar|outstanding|pending)\b/i },
  { intent: "CREATE_INVOICE", test: /\b(bill|invoice|parchi)\b.*\b(banao|bana|create|make|kaato|generate)\b|\b(banao|create|make)\b.*\b(bill|invoice)\b/i },
  { intent: "RECORD_SALES_RETURN", test: /\bwapas\b.*\b(customer|liya|diya|mila|kiya)?/i },
  { intent: "RECORD_PURCHASE_RETURN", test: /\bwapas\b.*\b(supplier|bheja|damaged)\b/i },
  { intent: "RECORD_EXPENSE", test: /\b(kharcha|expense|rent|gas|diesel|petrol|salary|bijli|electricity|chai|labour)\b/i },
  { intent: "RECORD_RECEIPT", test: /\b(payment|cash|jama|mila|received|chukaya)\b.*\b(mila|jama|received|aaya|liya)\b|\b(ne|se)\b.*\b(payment|cash|jama)\b/i },
  { intent: "RECORD_PURCHASE", test: /\b(kharida|purchase|khareeda|se\s+liya)\b/i },
  { intent: "RECORD_SALE", test: /\b(bechi|bech|sold|sale|diya|bheja|supply)\b/i },
  { intent: "TOOL_UPDATE_INVENTORY", test: /\badd\b.*\bstock\b|\bstock\b.*\badd\b/i },
  { intent: "CREATE_CUSTOMER", test: /\b(naya|new|add)\b.*\bcustomer\b/i },
  { intent: "CREATE_SUPPLIER", test: /\b(naya|new|add)\b.*\b(supplier|vendor)\b/i },
];

/** Best-effort offline intent guess. Returns null when nothing matches. */
export function classifyIntentRaw(normalizedText: string): string | null {
  for (const r of INTENT_RULES) if (r.test.test(normalizedText)) return r.intent;
  return null;
}

const DEV_DIGITS = "०१२३४५६७८९";
const GU_DIGITS = "૦૧૨૩૪૫૬૭૮૯";

/** Dexie-free normalizer so the lexicon can be benchmarked standalone. */
export function normalizeIndic(s: string): string {
  let out = s
    .replace(/[०-९]/g, (d) => String(DEV_DIGITS.indexOf(d)))
    .replace(/[૦-૯]/g, (d) => String(GU_DIGITS.indexOf(d)));
  for (const [m, r] of INDIC_NORMALIZERS) out = out.replace(m, r);
  for (const [m, r] of ROMAN_SYNONYMS) out = out.replace(m, r);
  return out.replace(/\s+/g, " ").trim();
}

/** Intent guess directly from raw multilingual text (no DB needed). */
export function classifyIntentOffline(text: string): string | null {
  return classifyIntentRaw(normalizeIndic(text));
}

/** Dataset intents that our engine treats as the same capability. */
export const INTENT_ALIASES: Record<string, string> = {
  TOOL_QUERY_LEDGER: "GET_CUSTOMER_OUTSTANDING",
  TOOL_QUERY_SALES: "GET_SALES_REPORT",
  TOOL_UPDATE_INVENTORY: "TOOL_UPDATE_INVENTORY",
  RECORD_PAYMENT: "RECORD_RECEIPT",
  RECORD_RECEIPT: "RECORD_RECEIPT",
  GET_RECEIVABLE_REPORT: "GET_CUSTOMER_OUTSTANDING",
  RECORD_MATERIAL_ISSUE: "RECORD_SALE",
  RECORD_RECEIPT_OF_GOODS: "RECORD_PURCHASE",
  CREATE_PURCHASE_ORDER: "RECORD_PURCHASE",
  NEGATE_TRANSACTION: "NEGATE_ACTION",
  MANUAL_BALANCE_OVERRIDE: "CORRECT_TRANSACTION",
  TOP_SELLING_ITEMS: "GET_SALES_REPORT",
  EXPLAIN_PROFIT_CHANGE: "GET_PROFIT_REPORT",
};

export function canonicalIntent(intent: string): string {
  return INTENT_ALIASES[intent] ?? intent;
}
