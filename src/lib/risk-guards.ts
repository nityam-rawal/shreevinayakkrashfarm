// Vinayak AI — offline risk guards ("business samajh" layer).
//
// Trained on the adversarial business dataset: instead of blindly posting a
// transaction, the AI detects *state / classification risks* in the narration
// and asks the shopkeeper one short Hinglish question before saving.
//
// 100% offline: ordered regex rules, no model, no network.

export type RiskSeverity = "block" | "ask" | "note";

export interface RiskRule {
  /** failure class id from the training taxonomy */
  fc: string;
  severity: RiskSeverity;
  /** lower runs first; defaults to array order bucket 100 */
  pri?: number;
  /** short Hinglish label shown as a chip */
  label: string;
  /** the one question the AI should ask before posting */
  ask: string;
  test: RegExp;
}

/**
 * Ordered: most specific first. `detectRisks` collects every match,
 * `classifyRisk` returns the first (used by the benchmark).
 */
export const RISK_RULES: RiskRule[] = [
  // ---- permissions / audit / period ----
  { fc: "permissions", severity: "block", label: "Permission", ask: "Finalized bill delete karne ka haq nahi — reversal entry banayein?",
    test: /\b(cashier|staff)\b[^.]*\b(delete|remove)\b|\b(delete|remove)\b[^.]*\bfinali[sz]ed\b|\brole\b[^.]*\b(not\s*allowed|permission)\b/i },
  { fc: "audit", severity: "block", label: "Audit trail", ask: "Purani posted entry delete nahi hogi — correction ya reversal karein?",
    test: /\bdelete\b[^.]*\b(posted|yesterday'?s)\b|\bpreserve\b[^.]*\bhistory\b|\breversal\/?correction\b/i },
  { fc: "period_lock", severity: "block", label: "Period locked", ask: "Ye period band hai — nayi date pe correction entry karein?",
    test: /\bclosed\b[^.]*\b(period|month|year)\b|\bperiod\b[^.]*\b(lock|closed)\b/i },
  { fc: "approval", severity: "ask", label: "Approval", ask: "Bada write-off hai — pehle approve karna hoga. Aage badhein?",
    test: /\bwrite[-\s]?off\b|\bapproval\b[^.]*\brequired\b/i },
  { fc: "concurrency", severity: "ask", label: "Double posting", ask: "Do users ne same entry daali lagti hai — ek hi rakhein?",
    test: /\b(two|2)\b[^.]*\b(users?|staff|phones?)\b[^.]*\bsame\b|\bconcurrent/i },
  { fc: "offline_sync", pri: 10, severity: "ask", label: "Sync duplicate", ask: "Offline sync se same entry do baar aayi — duplicate hata dein?",
    test: /\boffline\b[^.]*\b(sync|synchroni)/i },

  // ---- duplicates ----
  { fc: "duplicate_payment", severity: "ask", label: "Duplicate payment", ask: "Ye payment pehle se ledger me hai — dobara add karein?",
    test: /\bsame\b[^.]*\bpayment\b|\bpayment\b[^.]*\b(bank\s*import|already\s*entered|twice|do\s*baar)\b/i },
  { fc: "duplicate_party", severity: "ask", label: "Same naam 2 party", ask: "Is naam ke 2 khate hain — kaun sa party use karein?",
    test: /\btwo\b[^.]*\brecords?\b|\bsame\s*name\b[^.]*\b(different|do)\b|\bwhich\s*(party|customer)\b/i },
  { fc: "duplicate", severity: "ask", label: "Duplicate bill", ask: "Ye bill OCR/manual dono se aaya — ek hi post karein?",
    test: /\bsame\b[^.]*\binvoice\b[^.]*\b(ocr|import|manual)\b|\bduplicate\b/i },

  // ---- money classification ----
  { fc: "owner_capital", severity: "ask", label: "Owner ka paisa", ask: "Ye owner ka capital hai, sale nahi — capital me daalein?",
    test: /\bowner\b[^.]*\b(put|introduc|invest|daala|nakhya)\b|\bpersonal\s*money\b[^.]*\bbusiness\b|\bcapital\b[^.]*\b(introduc|add)/i },
  { fc: "owner_drawing", severity: "ask", label: "Ghar le gaye", ask: "Business cash ghar le gaye — drawing me daalein (kharcha nahi)?",
    test: /\bowner\b[^.]*\b(took|withdrew|nikala)\b|\b(business\s*cash|shop\s*cash)\b[^.]*\b(home|family|ghar|personal)\b|\bdrawing\b/i },
  { fc: "mixed_bill", severity: "ask", label: "Ghar + dukan bill", ask: "Bill ghar aur dukan dono ka hai — kitna business ka maane?",
    test: /\bboth\b[^.]*\b(home|house)\b[^.]*\b(shop|business)\b|\b(home|ghar)\b[^.]*\band\b[^.]*\b(shop|dukan)\b[^.]*\b(bill|expense)\b|\bmixed\s*bill\b/i },
  { fc: "personal_expense", severity: "ask", label: "Personal kharcha", ask: "Ye personal kharcha hai — business ledger se bahar rakhein?",
    test: /\b(personal|household|home)\b[^.]*\b(expense|goods|kharcha|spend|bought)\b|\bkeep\s*this\s*personal\b|\bghar\s*ka\s*kharcha\b/i },
  { fc: "internal_transfer", severity: "ask", label: "Internal transfer", ask: "Ye account-to-account transfer hai — income/kharcha nahi. Transfer maane?",
    test: /\b(moved|transferred|transfer)\b[^.]*\b(account|bank|cash)\b[^.]*\bto\b[^.]*\b(account|bank|savings|current|cash)\b|\bcash\s*to\s*bank\b|\bbank\s*to\s*bank\b/i },
  { fc: "loan", severity: "ask", label: "Loan", ask: "Loan aaya hai — ye income nahi, financing hai. Loan me daalein?",
    test: /\bloan\b/i },
  { fc: "asset", severity: "ask", label: "Asset kharid", ask: "Machine/equipment asset hai — normal kharcha me na daalein?",
    test: /\b(machine|equipment|vehicle|furniture)\b[^.]*\b(bought|purchase[d]?|kharid|liya)\b|\basset\b/i },
  { fc: "opening_balance", severity: "note", label: "Opening balance", ask: "Opening balance hai — aaj ki income me count nahi hoga.",
    test: /\bopening\b[^.]*\b(cash|balance|stock)\b/i },
  { fc: "customer_advance", severity: "ask", label: "Customer advance", ask: "Ye advance hai, sale nahi — advance me rakhein?",
    test: /\b(customer|he|she|[A-Z][a-z]+)\b[^.]*\bgave\b[^.]*\badvance\b|\badvance\b[^.]*\b(for|order|next)\b|\bpeshgi\b/i },
  { fc: "supplier_advance", pri: 10, severity: "ask", label: "Supplier advance", ask: "Supplier ko advance diya — purchase baad me aayega. Advance maane?",
    test: /\bpaid\b[^.]*\badvance\b|\badvance\b[^.]*\b(supplier|goods\s*will)\b/i },
  { fc: "staff_ambiguity", pri: 10, severity: "ask", label: "Staff paisa", ask: "Staff ko diya paisa — salary, advance ya loan?",
    test: /\bstaff\b[^.]*\b(advance|salary|loan|bonus|reimburse)\b|\bunclear\b[^.]*\b(salary|advance|loan)\b/i },
  { fc: "old_receivable", severity: "ask", label: "Purana udhaar", ask: "Ye purane udhaar ki vasooli hai — nayi sale na banaye?",
    test: /\b(old|last\s*month'?s|previous|purana|purani)\b[^.]*\b(outstanding|balance|invoice|udhaar|bakaya)\b|\bno\s*new\s*sale\b|\bagainst\b[^.]*\b(old|outstanding|invoice)\b/i },
  { fc: "credit_sale", severity: "ask", label: "Udhaar sale", ask: "Poora paisa nahi aaya — baaki udhaar me daalein?",
    test: /\bonly\b[^.]*\b(received|aaya|mila)\b|\bpart\b[^.]*\bcredit\b|\bcredit\s*(par|pe|sale)\b|\bbalance\s*pending\b/i },
  { fc: "refund", severity: "ask", label: "Refund", ask: "Refund kis purani entry ka hai?",
    test: /\brefund/i },
  { fc: "upi_settlement", severity: "note", label: "UPI settlement", ask: "UPI aaya, bank settlement baad me — dono alag track honge.",
    test: /\bupi\b[^.]*\b(settle|settlement|fee|later)\b|\bsettlement\b[^.]*\bbank\b/i },
  { fc: "cash_reconciliation", severity: "ask", label: "Cash mismatch", ask: "Ledger cash aur physical cash alag hai — kaun sa sahi maane?",
    test: /\b(ledger|book|system)\b[^.]*\bcash\b[^.]*\b(physical|actual|ginti)\b|\bphysical\s*cash\b[^.]*\b(differ|but|hai)\b|\breconcil\w*\b[^.]*\bcash\b/i },
  { fc: "closing", pri: 10, severity: "note", label: "Day closing", ask: "Books band karne se pehle cash, stock aur udhaar reconcile karein.",
    test: /\bclose\b[^.]*\bbooks?\b|\bday\s*closing\b|\bdin\s*band\b|\bclosing\b[^.]*\breconcil/i },

  // ---- stock / SKU ----
  { fc: "negative_stock", severity: "ask", label: "Stock kam", ask: "System me itna stock nahi hai — phir bhi sale post karein?",
    test: /\bstock\b[^.]*\b(zero|0|negative)\b[^.]*\bsold\b|\bmore\b[^.]*\bthan\b[^.]*\bstock\b|\bnegative\s*stock\b/i },
  { fc: "shrinkage", severity: "ask", label: "Stock ghata", ask: "Stock kam mila — ye sale nahi, shrinkage. Investigate karein?",
    test: /\b(missing|lower|kam)\b[^.]*\bstock\b[^.]*\b(investigat|not\b[^.]*sale)|\bshrinkage\b/i },
  { fc: "physical_vs_system_stock", severity: "ask", label: "Ginti mismatch", ask: "App ka stock aur physical count alag hai — adjustment karein?",
    test: /\b(app|system)\b[^.]*\b(shows?|stock)\b[^.]*\bphysical\b|\bphysical\s*(count|stock)\b[^.]*\b(differ|is)\b/i },
  { fc: "reserved_stock", pri: 10, severity: "note", label: "Reserved stock", ask: "Kuch stock reserved hai — available quantity kam hai.",
    test: /\breserved\b/i },
  { fc: "location_stock", severity: "ask", label: "Godown transfer", ask: "Warehouse se shop bheja — ye purchase nahi, transfer hai. Transfer maane?",
    test: /\b(warehouse|godown)\b[^.]*\b(to|se)\b[^.]*\b(shop|branch)\b|\bnot\s*a\s*purchase\b/i },
  { fc: "warehouse_transfer", pri: 10, severity: "ask", label: "Stock transfer", ask: "Ye stock transfer hai — sale/purchase na banaye?",
    test: /\b(sent|moved)\b[^.]*\bfrom\b[^.]*\b(warehouse|godown|branch)\b|\bstock\s*transfer\b/i },
  { fc: "branch", severity: "note", label: "Branch stock", ask: "Do dukan ka stock alag hai — kaun si branch?",
    test: /\b(shop|branch|store)\s*[ab1-9]\b[^.]*\b(separate|alag|other)\b|\bbranch\b[^.]*\bseparate\s*stock\b/i },
  { fc: "consignment", severity: "note", label: "Consignment", ask: "Ye maal supplier ka hai — apna stock na maane.",
    test: /\bconsignment\b|\bsupplier[-\s]owned\b/i },
  { fc: "drop_ship", severity: "note", label: "Direct delivery", ask: "Maal seedha customer ko gaya — shop stock me na daalein.",
    test: /\b(directly|seedha)\b[^.]*\bcustomer\b|\bnever\s*physically\s*received\b|\bdrop[-\s]?ship/i },
  { fc: "subcontract", severity: "ask", label: "Job work", ask: "Job worker ko maal bheja — issue aur return alag likhein?",
    test: /\bjob\s*work(?:er)?\b|\bsubcontract/i },
  { fc: "production", severity: "ask", label: "Production", ask: "Raw material use aur finished output alag likhein?",
    test: /\b(used|consumed)\b[^.]*\b(kg|units?)\b[^.]*\bproduce\b|\bproduction\b|\bfinished\s*(units?|goods)\b/i },
  { fc: "bom", pri: 10, severity: "note", label: "BOM", ask: "BOM quantity app ki settings se lein — guess na karein.",
    test: /\bbom\b|\bbill\s*of\s*material/i },
  { fc: "damage", severity: "ask", label: "Damaged maal", ask: "Kitna maal damaged hai? Wo alag rakhein.",
    test: /\bdamag\w*\b|\bkharab\b|\btut(?:a|e|i)\b/i },
  { fc: "expiry", severity: "ask", label: "Expiry", ask: "Expiry wale batch alag handle karein — sale na karein?",
    test: /\bexpir\w*\b/i },
  { fc: "batch", pri: 10, severity: "note", label: "Batch", ask: "Same item ke 2 batch hain — kaun sa batch?",
    test: /\bbatch(?:es)?\b/i },
  { fc: "serial", severity: "note", label: "Serial no.", ask: "Serial number wala item hai — actual serial likhein.",
    test: /\bserial\b|\bimei\b/i },
  { fc: "waste", pri: 10, severity: "ask", label: "Waste", ask: "Ye waste/spoil hai, sale nahi — waste me daalein?",
    test: /\b(spoiled|spoilage|waste|wastage|kharab\s*ho\s*gaya)\b/i },
  { fc: "free_sample", severity: "ask", label: "Free sample", ask: "Free sample diya — stock kam hoga, sale nahi. Theek?",
    test: /\bfree\b[^.]*\bsample|\bsample[s]?\b[^.]*\bfree\b|\bmuft\b/i },
  { fc: "promotional", severity: "ask", label: "Promotion", ask: "Promotion me diya — normal sale na banaye?",
    test: /\bpromotion\w*\b|\bscheme\s*me\b/i },
  { fc: "free_quantity", pri: 10, severity: "note", label: "Free quantity", ask: "Free quantity mili — physical stock zyada hoga.",
    test: /\b(received|mila|extra|got)\s*\d+\s*free\b|\bfree\s*(quantity|qty)\b|\bbuy\b[^.]*\bget\b[^.]*\bfree\b/i },
  { fc: "owner_stock_use", pri: 10, severity: "ask", label: "Ghar ke liye maal", ask: "Ghar ke liye maal liya — sale nahi, owner use maane?",
    test: /\b(took|liya|lidhu)\b[^.]*\b(stock|shop)\b[^.]*\b(home|ghar|personal)\b|\bhome\s*use\b/i },
  { fc: "unit_conversion", severity: "ask", label: "Unit convert", ask: "Carton/box ka conversion app settings se lein — confirm karein?",
    test: /\b(carton|box|dozen|bori|bag|packet)\b[^.]*\bconversion\b|\bconvert\w*\b[^.]*\b(unit|piece|kg)\b/i },
  { fc: "sku_ambiguity", severity: "ask", label: "Kaun sa item", ask: "Item ke kai variant hain — kaun sa item lein?",
    test: /\b(variant|multiple\s*sku|which\s*sku|three\s*variants?)\b/i },

  // ---- documents / tax ----
  { fc: "gstin", severity: "ask", label: "GSTIN missing", ask: "Customer ka GSTIN nahi hai — bina GSTIN bill banayein?",
    test: /\bgstin\b/i },
  { fc: "hsn_sac", severity: "ask", label: "HSN/SAC", ask: "HSN/SAC pakka nahi — aap confirm karein.",
    test: /\bhsn\b|\bsac\b/i },
  { fc: "irn", severity: "note", label: "IRN", ask: "IRN/QR e-invoice system se hi aayega — guess nahi.",
    test: /\birn\b|\backnowledgement\s*number\b|\bsigned\s*qr\b/i },
  { fc: "einvoice_cancellation", severity: "block", label: "E-invoice cancel", ask: "E-invoice cancel statutory workflow se hoga — aage badhein?",
    test: /\bcancel\b[^.]*\be[-\s]?invoice\b|\be[-\s]?invoice\b[^.]*\bcancel/i },
  { fc: "ewaybill", severity: "note", label: "E-way bill", ask: "Is document ka e-way bill hai — pehle wo dekh lein.",
    test: /\be[-\s]?way\s*bill\b/i },
  { fc: "invoice_vs_einvoice", severity: "note", label: "PDF ≠ e-invoice", ask: "PDF bill ban gaya — ye e-invoice registration nahi hai.",
    test: /\bpdf\s*invoice\b|\binvoice\s*pdf\b/i },
  { fc: "gst_reconciliation", severity: "note", label: "GST reco", ask: "GST records se milaan karna hoga.",
    test: /\bgst\b[^.]*\brecord|\breconcil\w*\b[^.]*\bgst\b/i },
  { fc: "itc", severity: "note", label: "ITC", ask: "Har purchase tax ITC eligible nahi hota — verify karein.",
    test: /\binput\s*tax\s*credit\b|\bitc\b/i },
  { fc: "tax", severity: "ask", label: "Tax rate", ask: "GST rate settings se lein — guess na karein. Rate confirm karein?",
    test: /\bgst\b|\btax\s*(rate|config)/i },
  { fc: "rounding", severity: "note", label: "Rounding", ask: "Rounding app ke rule se hoga.",
    test: /\brounding\b|\bround\s*off\b/i },
  { fc: "credit_note", pri: 10, severity: "ask", label: "Credit note", ask: "Final bill me badlav — credit note banayein?",
    test: /\bcredit[-\s]note\b/i },
  { fc: "debit_note", severity: "note", label: "Debit note", ask: "Debit note document event hai, sirf payment nahi.",
    test: /\bdebit\s*note\b/i },
  { fc: "discount", severity: "note", label: "Discount", ask: "Gross, discount aur net alag rakhein.",
    test: /\bdiscount\b|\bchhoot\b/i },
  { fc: "currency", severity: "ask", label: "Foreign currency", ask: "Ye foreign currency hai — INR me na maane. Rate batayein?",
    test: /\b(usd|eur|gbp|aed|dollar|euro)\b/i },
  { fc: "fx", pri: 10, severity: "note", label: "FX settlement", ask: "Foreign invoice aur INR settlement dono track honge.",
    test: /\b(exchange\s*rate|forex|fx)\b/i },
  { fc: "cost_basis", severity: "note", label: "Cost basis", ask: "Valuation policy app se — purchase rate alag alag hai.",
    test: /\b(valuation|cost\s*basis|bought\s*at)\b/i },
  { fc: "profit", severity: "note", label: "Profit ≠ sale−purchase", ask: "Aaj ki sale minus purchase = profit nahi hota.",
    test: /\bprofit\b[^.]*\b(infer|not|nahi)\b|\bdo\s*not\s*infer\b[^.]*\bprofit\b|\bpurchases?\b[^.]*\bprofit\b/i },

  // ---- order / delivery states ----
  { fc: "future_order", severity: "ask", label: "Future order", ask: "Ye future order hai — aaj ki sale na banaye?",
    test: /\b(next\s*(week|month|friday|monday)|kal\s*ka\s*order|future\s*order|advance\s*order)\b|\border\b[^.]*\bfor\b[^.]*\bnext\b/i },
  { fc: "purchase_state", severity: "ask", label: "Purchase adhoora", ask: "Order aur delivery quantity alag hai — kitna receive hua?",
    test: /\bordered\b[^.]*\b(only|arrived|received)\b|\bsupplier\s*invoice\s*says\b/i },
  { fc: "sale_state", pri: 10, severity: "ask", label: "Sale adhoori", ask: "Poora order deliver nahi hua — kitna bill karein?",
    test: /\bordered\b[^.]*\bdeliver/i },
  { fc: "quantity_mismatch", pri: 10, severity: "ask", label: "Qty mismatch", ask: "Invoice qty aur receive qty alag hai — kaun sa likhein?",
    test: /\binvoice\b[^.]*\b(says|qty|quantity)\b[^.]*\b(only|but|physically)\b|\bquantity\s*mismatch\b/i },
  { fc: "wrong_item", pri: 10, severity: "ask", label: "Galat item", ask: "Invoice ka item aur aaya item alag hai — kaun sa likhein?",
    test: /\binvoice\s*says\b[^.]*\bbut\b[^.]*\breceived\b|\bwrong\s*item\b|\bdifferent\s*item\b/i },
  { fc: "partial_return", pri: 10, severity: "ask", label: "Partial return", ask: "Thoda maal wapas aaya — poora bill cancel na karein?",
    test: /\breturn\w*\b[^.]*\b(do\s*not\s*cancel|partial|thoda)\b|\boriginal\s*invoice\b[^.]*\breturn/i },
  { fc: "customer_return", severity: "ask", label: "Sales return", ask: "Customer ne wapas kiya — sales return likhein?",
    test: /\b(customer|[A-Z][a-z]+)\b[^.]*\breturned\b|\breturn\w*\b[^.]*\b(sale|customer)\b|\bwapas\s*(kiya|aaya)\b/i },
  { fc: "service", severity: "ask", label: "Service pending payment", ask: "Kaam poora, paisa baaki — udhaar me daalein?",
    test: /\b(repair|service|job)\b[^.]*\b(complet\w*|done)\b[^.]*\b(not\s*paid|pending|baaki)\b|\bservice\s*complet/i },

  // ---- input quality / language ----
  { fc: "voice_error", severity: "ask", label: "Voice shak", ask: "Amount voice se galat sun sakta hai — confirm karein?",
    test: /\bvoice\b[^.]*\b(error|may\s*have|misheard|heard)\b|\bspeech\b[^.]*\b(error|misread)\b/i },
  { fc: "ocr_error", severity: "ask", label: "OCR shak", ask: "OCR ne number galat padha ho sakta hai — check karein?",
    test: /\bocr\b/i },
  { fc: "number_ambiguity", severity: "ask", label: "Amount shak", ask: "Amount pakka nahi — figure confirm karein?",
    test: /\b(lakh|crore|lakhs?)\b[^.]*\b(confirm|ambig|may)\b|\bspoken\s*amount\b|\bnumber\s*ambig/i },
  { fc: "date_ambiguity", severity: "ask", label: "Date pakki nahi", ask: "'Kal' ka matlab kal aaya ya aane wala kal? Date batayein.",
    test: /\bkal\b[^.]*\b(clarif|ambig|may)\b|\bdate\s*ambig|\b'kal'\b/i },
  { fc: "backdated", severity: "ask", label: "Purani date", ask: "Entry purani date ki hai — wahi date rakhein?",
    test: /\b(two\s*days\s*ago|yesterday|backdat\w*|pichle\s*hafte)\b[^.]*\b(sale|entry|enter|post)\b|\bactually\s*happened\b/i },
  { fc: "financial_year", severity: "note", label: "Year ambiguity", ask: "'Last year' — financial year ya calendar year?",
    test: /\b(last|previous)\s*year\b|\bfinancial\s*year\b/i },
  { fc: "timezone", severity: "note", label: "Timezone", ask: "'Aaj' business timezone se count hoga.",
    test: /\btimezone\b|\basia\/kolkata\b/i },
  { fc: "party_role", severity: "ask", label: "Party role", ask: "Ye party customer bhi hai supplier bhi — is entry me kaun?",
    test: /\bboth\b[^.]*\b(supplier|customer)\b[^.]*\b(customer|supplier)\b|\bparty\s*role\b/i },
  { fc: "multilingual", pri: 10, severity: "note", label: "Multi-language", ask: "Ek hi baat kai bhasha me — same concept maana gaya.",
    test: /\bcan\s*describe\s*the\s*same\b|\bsame\b[^.]*\bconcept\b/i },
  { fc: "code_mixing", severity: "note", label: "Mixed bhasha", ask: "Mixed bhasha samajh li — confirm karein.",
    test: /\bcode[-\s]?mix|\bpase\s*thi\b|\baavyo\b[^.]*\band\b/i },
  { fc: "colloquial", severity: "ask", label: "Matlab pakka nahi", ask: "Iska matlab sale, transfer ya dispatch — kaun sa?",
    test: /\bcould\s*mean\b|\bmatlab\b[^.]*\b(kya|pakka)\b|\bnikli\s*gayo\b/i },
  { fc: "correction", pri: 10, severity: "ask", label: "Correction", ask: "Purani entry badalni hai — history rakh ke correction karein?",
    test: /\bchange\b[^.]*\b(yesterday'?s|₹?\d+)\b[^.]*\bto\b|\bcorrect\w*\b[^.]*\b(entry|expense|amount)\b|\bgalat\b/i },
  { fc: "unknown", severity: "ask", label: "Info kam", ask: "Amount/category clear nahi — detail batayein?",
    test: /\bsome\s*money\b|\bwithout\s*(amount|category|purpose)\b|\binsufficient\b/i },
];

export interface RiskFlag {
  fc: string;
  severity: RiskSeverity;
  label: string;
  ask: string;
  /** the sentence that triggered it */
  snippet: string;
}

const ORDERED_RULES = [...RISK_RULES].sort((a, b) => (a.pri ?? 100) - (b.pri ?? 100));

const SENTENCE_SPLIT = /(?<=[.;।|])\s+|\n+/;

/** All risks found in a whole-day narration, de-duplicated by failure class. */
export function detectRisks(text: string, limit = 6): RiskFlag[] {
  const out: RiskFlag[] = [];
  const seen = new Set<string>();
  const parts = text.split(SENTENCE_SPLIT).filter((s) => s.trim().length > 2);
  for (const part of parts.length ? parts : [text]) {
    for (const r of ORDERED_RULES) {
      if (seen.has(r.fc)) continue;
      if (!r.test.test(part)) continue;
      seen.add(r.fc);
      out.push({ fc: r.fc, severity: r.severity, label: r.label, ask: r.ask, snippet: part.trim().slice(0, 120) });
    }
  }
  const order: RiskSeverity[] = ["block", "ask", "note"];
  return out.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity)).slice(0, limit);
}

/** Single best-guess failure class (used by the offline benchmark). */
export function classifyRisk(text: string): string | null {
  for (const r of ORDERED_RULES) if (r.test.test(text)) return r.fc;
  return null;
}
