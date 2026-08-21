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
  [/આપવા(?:ના|નું|નુ|નું)?|આપવાનું/g, " dena "],
  [/આપ(?:્યા|્યું|ી|યુ|ો)?/g, " diya "],
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
  [/માં/g, " me "], [/છે(?=\s|$|\?)/g, " hai "], [/નથી|નહીં|નહિ/g, " nahi "],
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
  [/गैस/g, " gas "], [/नग(?=\s|$)/g, " piece "], [/पैकेट/g, " packet "], [/डिब्बा|बॉक्स/g, " box "],
  [/लीटर/g, " liter "], [/दर्जन/g, " dozen "], [/जोड़(?:ो|ें)/g, " add "],
  [/दिखा(?:ओ|ए|एं)?|बता(?:ओ|एं)?/g, " batao "], [/लिखो|दर्ज/g, " likho "],
  [/वापस/g, " wapas "], [/ग्राहक/g, " customer "], [/मुनाफा|लाभ/g, " profit "],
  [/स्टॉक|इन्वेंटरी/g, " stock "], [/खराब/g, " damaged "],
  [/इस\s*महीने|महीने|महीना/g, " mahine "], [/हफ्ते|सप्ताह/g, " week "],
  [/कितन(?:ा|े|ी)/g, " kitna "], [/क्या/g, " kya "], [/नहीं|मत(?=\s|$)/g, " nahi "],
  [/भाव|रेट/g, " rate "], [/रुपये|रूपये|रुपया/g, " "],
  [/\sसे\s/g, " se "], [/\sने\s/g, " ne "], [/\sको\s/g, " ko "], [/\sके\s*लिए\s/g, " ke liye "],
  [/बिल|रसीद|पर्ची/g, " bill "], [/बनाओ|बना\s*दो|बनाना/g, " banao "], [/कर\s*दो|करो/g, " karo "],
  [/कार्टन/g, " carton "], [/शर्ट/g, " shirt "], [/बैच/g, " batch "], [/एक्सपायरी/g, " expiry "], [/माल/g, " stock "], [/हिसाब/g, " hisab "],
  [/કરો|કરી\s*નાખો/g, " karo "], [/શર્ટ/g, " shirt "], [/બે(?=\s)/g, " 2 "], [/કાર્ટન/g, " carton "],
  [/ખર્ચ/g, " kharcha "], [/આવી\s*ગય(?:ો|ું|ુ)/g, " aa gaya "],
  [/खर्च(?:ा|े)?/g, " kharcha "], [/किरा(?:या|ए|यl)?/g, " rent "],
  [/आ\s*गया|आ\s*गयी/g, " aa gaya "], [/बैलेंस/g, " balance "],
  [/दिए|दिये|दिया|दी(?=\s|$)/g, " diya "], [/भेज/g, " bheja "],
  [/सोमवार/g, " monday "], [/शुक्रवार/g, " friday "], [/तक/g, " tak "],
  [/સોમવાર/g, " monday "], [/શુક્રવાર/g, " friday "], [/સુધી(?:નું|ના)?/g, " tak "],
  // ---- mined additions (benchmark-driven) ----
  [/બધા|બધું/g, " sab "], [/વસ્તુ(?:ઓ)?/g, " item "], [/ઓછ(?:ા|ો|ુ|ું)/g, " kam "],
  [/વાપર(?:્યું|યુ|ો)/g, " use "], [/મંગાવ(?:ી|ો|જો)?/g, " order "], [/રાખ(?:ો|જો)/g, " rakho "],
   [/કેમ/g, " kyu "], [/સૌથી\s*વધારે/g, " sabse zyada "], [/તરીકે/g, " as "],
  [/આપવા(?:ના|નું|નુ)?/g, " dena "], [/જોડો|ઉમેર/g, " add "], [/ન્યૂનતમ|લઘુત્તમ/g, " minimum "],
  [/બાકી\s*છે/g, " udhaar hai "], [/હત(?:ુ|ું)/g, " tha "], [/ના,/g, " nahi, "],
  [/વેચાણમાં/g, " sales "], [/નફો|નફા/g, " profit "],
  [/बकाया/g, " udhaar "], [/देना|देने|देंगे/g, " dena "], [/लेना|लेने/g, " lena "],
  [/मंगवा|मंगा/g, " order "], [/न्यूनतम|कम\s*से\s*कम/g, " minimum "], [/रखो|रखें/g, " rakho "],
  [/सारी|सारे|सभी|सब(?=\s|$)/g, " sab "], [/डिलीट|मिटा/g, " delete "], [/जोड़/g, " add "],
  [/प्लेट/g, " plate "], [/स्ट्रिप/g, " strip "], [/चीज(?:ें|े)?|वस्तु(?:एं)?/g, " item "],
  [/कम(?=\s|$)/g, " kam "], [/क्यों/g, " kyu "], [/था|थी/g, " tha "], [/इस्तेमाल|इस्तमाल/g, " use "],
  [/ग्राहक/g, " customer "], [/सप्लायर|विक्रेता/g, " supplier "], [/के\s*रूप\s*में/g, " as "],
  // ---- whole-day narration additions ----
  [/આવ્યા|આવ્યો|આવ્યું|આવી(?!\s*ગય)/g, " aa gaya "], [/आए|आया|आयी|आईं/g, " aa gaya "],
  [/મળ્યા|મળ્યું|મળી/g, " mila "], [/मिल(?:े|ा|ी|ीं)/g, " mila "],
  [/पुरान(?:े|ा|ी)|पिछले/g, " purana "], [/જૂન(?:ા|ી|ો|ું)/g, " purana "],
  [/घर(?:े|वाले)?/g, " ghar "], [/ઘર(?:ે)?/g, " ghar "],
  [/सामान/g, " saman "], [/સામાન/g, " saman "],
  [/लिय(?:ा|े)|ली(?=\s|$)/g, " liya "],
  [/मिलाय(?:ा|े)|मिलान/g, " milaya "], [/મેળવ(?:્યા|્યું)|મેળવણી/g, " milaya "],
  [/ચેક/g, " check "], [/ચકાસ(?:ો|્યું)/g, " check "],
  [/દુકાન/g, " shop "], [/दुकान/g, " shop "],
  [/સવારે/g, " subah "], [/सुबह/g, " subah "], [/સાંજે|शाम/g, " shaam "],
  [/બપોરે|दोपहर/g, " dopahar "], [/ખોલ(?:્યો|્યું|ી)/g, " open "], [/खोल(?:ा|ी)/g, " open "],
  [/બાકી\s*સામે|बकाये\s*के\s*बदले|बाकी\s*के\s*बदले/g, " purana udhaar ke against "],
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
  // ---- mined additions ----
  [/\bdikhao?\b/gi, "batao"], [/\bmoklya\b/gi, "bheja"], [/\bmoklav(?:a|ana|vana)\b/gi, "bheja"],
  [/\baapvan(?:a|u|un)\b/gi, "dena"], [/\bapvan(?:a|u)\b/gi, "dena"],
  [/\brupiya\b/gi, ""], [/\btarike\b/gi, "as"], [/\bvapary?u\b/gi, "use"],
  [/\bmangav(?:i|o|jo)\b/gi, "order"], [/\bhatu\b/gi, "tha"], [/\bbadha\b/gi, "sab"],
  [/\bochh?a\b/gi, "kam"], [/\bkem\b/gi, "kyu"], [/\bvastu(?:o)?\b/gi, "item"],
  [/\bnafo\b/gi, "profit"], [/\bjodo\b/gi, "add"], [/\bumero\b/gi, "add"],
  [/\bpurchased?\b/gi, "kharida"], [/\bbought\b/gi, "kharida"],
  [/\bsold\b/gi, "bechi"], [/\bsells?\b/gi, "bechi"], [/\bsale\s*ki\b/gi, "bechi"],
  [/\bpaid\b/gi, "payment"], [/\breceived\b/gi, "mila"], [/\bcheeni\b/gi, "sugar"], [/\bhow\s+much\b/gi, "kitna"], [/\bcartons?\b/gi, "carton"], [/\bfrom\b/gi, "se"], [/\bunits?\b/gi, "piece"],
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
  // ---- safety / meta first ----
  { intent: "DANGEROUS_BULK_DELETE", test: /\b(delete|remove|mita|hata)\b.*\b(all|sab|sabhi|sari|saari|badha|everything|entire)\b|\b(all|sab|sari|badha)\b.*\b(delete|mita|hata)\b/i },
  { intent: "CORRECT_TRANSACTION", test: /\bbalance\b.*\b(zero|0)\b|\bchange\b.*\b(?:from|se)\b.*\bto\b|\b(galat|wrong|instead|actually|correction|sudhar|badal)\b|\b(no|na|nahi)\b\s*,?\s*(?:it\s*was|\d|kilo|kg)|\d+\s*(?:me\s*se|se)\s*\d+\s*karo/i },
  { intent: "NEGATE_ACTION", test: /\b(nahi|not|didn'?t|did\s*not|do\s*not|don'?t|mat|cancel|undo)\b/i },
  // ---- reports / queries before write-intents ----
  { intent: "UPDATE_REORDER_LEVEL", test: /\b(reorder\s*(?:level|point)|minimum\s*stock|min\s*stock)\b/i },
  { intent: "GET_LOW_STOCK", test: /\b(low[-\s]?stock|kam\s*stock|stock\s*kam|khatam|ochha|ocha)\b/i },
  { intent: "GET_PROFIT_REPORT", test: /\bprofit\b/i },
  { intent: "GET_SALES_REPORT", test: /\b(sabse\s*zyada|most|top|which\s*products?)\b.*\b(bik|bechi|sold|sell|vech)/i },
  { intent: "GET_EXPENSE_REPORT", test: /\b(kharcha|expense)s?\b.*\b(kitna|kitne|total|report|batao|show|dikha)\b|\b(kitna|total|show|batao|dikha)\b.*\b(kharcha|expense)/i },
  { intent: "GET_SALES_REPORT", test: /\b(sale|sales|bechi|vechan|revenue|turnover)\b.*\b(kitna|kitni|report|batao|show|total|dikha|between|se|tak|kal|aaj|week|mahine|monday|friday)\b|\b(kitna|kitni|report|show|batao|dikha|total|tak)\b.*\b(sale|sales|bechi|vechan|revenue)\b/i },
  { intent: "RECORD_PURCHASE", test: /\b(stock|maal)\b.*\baa\s*gaya\b|\baa\s*gaya\b.*\b(stock|maal)\b/i },
  { intent: "TOOL_UPDATE_INVENTORY", test: /\badd\b.*\bstock\b|\bstock\b.*\badd\b/i },
  { intent: "GET_STOCK", test: /\bstock\b|\binventory\b/i },
  { intent: "GET_CUSTOMER_OUTSTANDING", test: /\bkitna\b[^.]*\b(lena|liya)\b|\b(lena|liya)\b[^.]*\bkitna\b/i },
  { intent: "GET_SUPPLIER_PAYABLE", test: /\b(?:we\s+)?owe\b(?!\s+us)|\b(payable|dena|dene|apvana|apva)\b/i },
  { intent: "GET_CUSTOMER_OUTSTANDING", test: /\b(udhaar|outstanding|pending|owes?|receivable|balance|khata)\b/i },
  // ---- item / party creation ----
  { intent: "CREATE_SUPPLIER", test: /\b(naya|new|add|jodo|umero)\b.*\b(supplier|vendor)\b|\b(supplier|vendor)\b.*\b(add|jodo|as|tarike)\b/i },
  { intent: "CREATE_CUSTOMER", test: /\bcustomer\b.*\b(add|jodo|naya|new)\b|\b(add|naya|new|jodo)\b.*\bcustomer\b/i },
  { intent: "CREATE_INVOICE", test: /\b(bill|invoice|parchi)\b/i },
  // ---- returns ----
  { intent: "RECORD_PURCHASE_RETURN", test: /\b(wapas|return(?:ed)?)\b.*\b(supplier|damaged)\b|\b(supplier|damaged)\b.*\b(wapas|return(?:ed)?)\b/i },
  { intent: "RECORD_SALES_RETURN", test: /\bwapas\b|\breturn(?:ed)?\b/i },
  // ---- purchases ----
  { intent: "RECORD_PURCHASE", test: /\b(batch|expiry)\b/i },
  { intent: "RECORD_PURCHASE", test: /\b(order|mangwa|mangav|mangao)\b/i },
  { intent: "RECORD_PURCHASE", test: /\b(kharida|purchase[ds]?)\b[^.]*\bse\b|\bse\b[^.]*\b(kharida|purchase[ds]?|liya|li|lidhi)\b/i },
  // ---- money in / out (amount only, no goods) ----
  { intent: "RECORD_RECEIPT", test: /^(?!.*\b(kg|piece|box|packet|bag|liter|dozen|ton|plate|strip|brass|trip|hour|shirt|carton|quintal)\b).*\d.*\b(diya|diye|mila|payment|jama)\b/i },
  { intent: "RECORD_RECEIPT", test: /\b(payment|jama|deposit|chukaya|paid|received|mila)\b/i },
  { intent: "RECORD_EXPENSE", test: /\b(kharcha|expense|rent|gas|diesel|petrol|salary|bijli|electricity|chai|labour)\b/i },
  // ---- inventory tooling ----
  { intent: "TOOL_UPDATE_INVENTORY", test: /\badd\b.*\bstock\b|\bstock\b.*\badd\b/i },
  // ---- sales fallback ----
  { intent: "RECORD_SALE", test: /\b(bechi|bech|sold|sell|sale|diya|diye|bheja|supply|use|vapar|likho|kharida)\b/i },
  { intent: "GET_STOCK", test: /\bkitna\b[^.]*\bhai\b/i },
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
