// AUTO-DERIVED from the adversarial business AI dataset (offline, no network).
// Each record: a risky vendor utterance + the failure class Vinayak AI must flag.

export interface AdversarialRecord { id: string; fc: string; lang: string; text: string }

export const ADVERSARIAL_CORPUS: AdversarialRecord[] = [
 {
  "id": "A001",
  "fc": "purchase_state",
  "lang": "gu",
  "text": "આજે: Ordered 15 oil from Patel Traders; only 5 arrived; supplier invoice says 15; payment is pending.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A002",
  "fc": "purchase_state",
  "lang": "rg",
  "text": "Aaje: Ordered 20 oil from Mehta Suppliers; only 10 arrived; supplier invoice says 20; payment is pending.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A003",
  "fc": "purchase_state",
  "lang": "gjmix",
  "text": "Aaje: Ordered 15 PVC pipe from Shah Distributors; only 5 arrived; supplier invoice says 15; payment is pending.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A004",
  "fc": "purchase_state",
  "lang": "en",
  "text": "Ordered 30 rice from Patel Traders; only 20 arrived; supplier invoice says 30; payment is pending."
 },
 {
  "id": "A005",
  "fc": "sale_state",
  "lang": "gjmix",
  "text": "Aaje: Ramesh ordered 5 biscuits; only 2 were delivered; do not automatically mark the whole order as completed sale.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A006",
  "fc": "sale_state",
  "lang": "en",
  "text": "Suresh ordered 20 shirt; only 10 were delivered; do not automatically mark the whole order as completed sale."
 },
 {
  "id": "A007",
  "fc": "sale_state",
  "lang": "hi",
  "text": "आज: Mehul ordered 2 shirt; only 1 were delivered; do not automatically mark the whole order as completed sale.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A008",
  "fc": "sale_state",
  "lang": "rh",
  "text": "Aaj: Amit ordered 10 medicine; only 5 were delivered; do not automatically mark the whole order as completed sale.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A009",
  "fc": "credit_sale",
  "lang": "hi",
  "text": "आज: Sold 2 cement to Amit for ₹10000; only ₹5000 was received today.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A010",
  "fc": "credit_sale",
  "lang": "rh",
  "text": "Aaj: Sold 20 shirt to Kiran for ₹500; only ₹250 was received today.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A011",
  "fc": "credit_sale",
  "lang": "himix",
  "text": "Aaj: Sold 2 shirt to Mehul for ₹5000; only ₹2500 was received today.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A012",
  "fc": "credit_sale",
  "lang": "gu",
  "text": "આજે: Sold 2 LED bulb to Suresh for ₹500; only ₹250 was received today.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A013",
  "fc": "old_receivable",
  "lang": "himix",
  "text": "Aaj: Neha paid ₹10000 today against last month's invoice. There was no new sale.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A014",
  "fc": "old_receivable",
  "lang": "gu",
  "text": "આજે: Suresh paid ₹10000 today against last month's invoice. There was no new sale.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A015",
  "fc": "old_receivable",
  "lang": "rg",
  "text": "Aaje: Neha paid ₹1000 today against last month's invoice. There was no new sale.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A016",
  "fc": "old_receivable",
  "lang": "gjmix",
  "text": "Aaje: Suresh paid ₹1000 today against last month's invoice. There was no new sale.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A017",
  "fc": "customer_advance",
  "lang": "rg",
  "text": "Aaje: Amit gave ₹2000 advance for an order next week.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A018",
  "fc": "customer_advance",
  "lang": "gjmix",
  "text": "Aaje: Neha gave ₹5000 advance for an order next week.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A019",
  "fc": "customer_advance",
  "lang": "en",
  "text": "Mehul gave ₹1000 advance for an order next week."
 },
 {
  "id": "A020",
  "fc": "customer_advance",
  "lang": "hi",
  "text": "आज: Neha gave ₹5000 advance for an order next week.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A021",
  "fc": "supplier_advance",
  "lang": "en",
  "text": "Paid Shah Distributors ₹1000 advance; goods will arrive next month."
 },
 {
  "id": "A022",
  "fc": "supplier_advance",
  "lang": "hi",
  "text": "आज: Paid Patel Traders ₹5000 advance; goods will arrive next month.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A023",
  "fc": "supplier_advance",
  "lang": "rh",
  "text": "Aaj: Paid Kumar Agency ₹2000 advance; goods will arrive next month.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A024",
  "fc": "supplier_advance",
  "lang": "himix",
  "text": "Aaj: Paid Patel Traders ₹2000 advance; goods will arrive next month.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A025",
  "fc": "physical_vs_system_stock",
  "lang": "rh",
  "text": "Aaj: App shows 50 LED bulb; physical count is 47.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A026",
  "fc": "physical_vs_system_stock",
  "lang": "himix",
  "text": "Aaj: App shows 200 shirt; physical count is 197.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A027",
  "fc": "physical_vs_system_stock",
  "lang": "gu",
  "text": "આજે: App shows 200 oil; physical count is 197.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A028",
  "fc": "physical_vs_system_stock",
  "lang": "rg",
  "text": "Aaje: App shows 50 tea; physical count is 47.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A029",
  "fc": "unit_conversion",
  "lang": "gu",
  "text": "આજે: Sold 2 cartons of rice; use the SKU's configured carton-to-piece conversion.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A030",
  "fc": "unit_conversion",
  "lang": "rg",
  "text": "Aaje: Sold 2 cartons of shirt; use the SKU's configured carton-to-piece conversion.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A031",
  "fc": "unit_conversion",
  "lang": "gjmix",
  "text": "Aaje: Sold 2 cartons of shirt; use the SKU's configured carton-to-piece conversion.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A032",
  "fc": "unit_conversion",
  "lang": "en",
  "text": "Sold 2 cartons of tea; use the SKU's configured carton-to-piece conversion."
 },
 {
  "id": "A033",
  "fc": "sku_ambiguity",
  "lang": "gjmix",
  "text": "Aaje: Customer said 'sugar', but there are three variants. Ask which SKU.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A034",
  "fc": "sku_ambiguity",
  "lang": "en",
  "text": "Customer said 'sugar', but there are three variants. Ask which SKU."
 },
 {
  "id": "A035",
  "fc": "sku_ambiguity",
  "lang": "hi",
  "text": "आज: Customer said 'oil', but there are three variants. Ask which SKU.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A036",
  "fc": "sku_ambiguity",
  "lang": "rh",
  "text": "Aaj: Customer said 'cement', but there are three variants. Ask which SKU.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A037",
  "fc": "location_stock",
  "lang": "hi",
  "text": "आज: Moved 5 medicine from warehouse to shop; this is not a purchase.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A038",
  "fc": "location_stock",
  "lang": "rh",
  "text": "Aaj: Moved 2 biscuits from warehouse to shop; this is not a purchase.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A039",
  "fc": "location_stock",
  "lang": "himix",
  "text": "Aaj: Moved 10 cement from warehouse to shop; this is not a purchase.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A040",
  "fc": "location_stock",
  "lang": "gu",
  "text": "આજે: Moved 10 rice from warehouse to shop; this is not a purchase.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A041",
  "fc": "reserved_stock",
  "lang": "himix",
  "text": "Aaj: Physical stock is 100, but 30 are reserved. Available stock should be 70.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A042",
  "fc": "reserved_stock",
  "lang": "gu",
  "text": "આજે: Physical stock is 100, but 30 are reserved. Available stock should be 70.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A043",
  "fc": "reserved_stock",
  "lang": "rg",
  "text": "Aaje: Physical stock is 100, but 30 are reserved. Available stock should be 70.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A044",
  "fc": "reserved_stock",
  "lang": "gjmix",
  "text": "Aaje: Physical stock is 100, but 30 are reserved. Available stock should be 70.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A045",
  "fc": "damage",
  "lang": "rg",
  "text": "Aaje: Received 100 cement; 4 are damaged. Keep damaged quantity separate.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A046",
  "fc": "damage",
  "lang": "gjmix",
  "text": "Aaje: Received 100 biscuits; 4 are damaged. Keep damaged quantity separate.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A047",
  "fc": "damage",
  "lang": "en",
  "text": "Received 100 cement; 4 are damaged. Keep damaged quantity separate."
 },
 {
  "id": "A048",
  "fc": "damage",
  "lang": "hi",
  "text": "आज: Received 100 rice; 4 are damaged. Keep damaged quantity separate.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A049",
  "fc": "expiry",
  "lang": "en",
  "text": "Five medicine batches expire soon; do not silently sell or discard them."
 },
 {
  "id": "A050",
  "fc": "expiry",
  "lang": "hi",
  "text": "आज: Five medicine batches expire soon; do not silently sell or discard them.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A051",
  "fc": "expiry",
  "lang": "rh",
  "text": "Aaj: Five medicine batches expire soon; do not silently sell or discard them.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A052",
  "fc": "expiry",
  "lang": "himix",
  "text": "Aaj: Five medicine batches expire soon; do not silently sell or discard them.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A053",
  "fc": "waste",
  "lang": "rh",
  "text": "Aaj: 2 units of oil were spoiled. This is waste, not sales.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A054",
  "fc": "waste",
  "lang": "himix",
  "text": "Aaj: 10 units of sugar were spoiled. This is waste, not sales.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A055",
  "fc": "waste",
  "lang": "gu",
  "text": "આજે: 20 units of LED bulb were spoiled. This is waste, not sales.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A056",
  "fc": "waste",
  "lang": "rg",
  "text": "Aaje: 20 units of biscuits were spoiled. This is waste, not sales.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A057",
  "fc": "free_sample",
  "lang": "gu",
  "text": "આજે: Gave 10 cement free as samples. Stock changes but normal sales revenue does not.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A058",
  "fc": "free_sample",
  "lang": "rg",
  "text": "Aaje: Gave 5 tea free as samples. Stock changes but normal sales revenue does not.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A059",
  "fc": "free_sample",
  "lang": "gjmix",
  "text": "Aaje: Gave 2 sugar free as samples. Stock changes but normal sales revenue does not.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A060",
  "fc": "free_sample",
  "lang": "en",
  "text": "Gave 5 cement free as samples. Stock changes but normal sales revenue does not."
 },
 {
  "id": "A061",
  "fc": "owner_stock_use",
  "lang": "gjmix",
  "text": "Aaje: Took 20 medicine from shop stock for home use.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A062",
  "fc": "owner_stock_use",
  "lang": "en",
  "text": "Took 20 tea from shop stock for home use."
 },
 {
  "id": "A063",
  "fc": "owner_stock_use",
  "lang": "hi",
  "text": "आज: Took 2 medicine from shop stock for home use.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A064",
  "fc": "owner_stock_use",
  "lang": "rh",
  "text": "Aaj: Took 2 tea from shop stock for home use.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A065",
  "fc": "customer_return",
  "lang": "hi",
  "text": "आज: Kiran returned 20 LED bulb from yesterday's sale.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A066",
  "fc": "customer_return",
  "lang": "rh",
  "text": "Aaj: Amit returned 10 shirt from yesterday's sale.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A067",
  "fc": "customer_return",
  "lang": "himix",
  "text": "Aaj: Kiran returned 2 rice from yesterday's sale.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A068",
  "fc": "customer_return",
  "lang": "gu",
  "text": "આજે: Suresh returned 20 biscuits from yesterday's sale.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A069",
  "fc": "partial_return",
  "lang": "himix",
  "text": "Aaj: Original invoice had 100 units; customer returned 20. Do not cancel the whole invoice.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A070",
  "fc": "partial_return",
  "lang": "gu",
  "text": "આજે: Original invoice had 100 units; customer returned 2. Do not cancel the whole invoice.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A071",
  "fc": "partial_return",
  "lang": "rg",
  "text": "Aaje: Original invoice had 100 units; customer returned 5. Do not cancel the whole invoice.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A072",
  "fc": "partial_return",
  "lang": "gjmix",
  "text": "Aaje: Original invoice had 100 units; customer returned 2. Do not cancel the whole invoice.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A073",
  "fc": "quantity_mismatch",
  "lang": "rg",
  "text": "Aaje: Supplier invoice says 100 units but only 98 were physically received.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A074",
  "fc": "quantity_mismatch",
  "lang": "gjmix",
  "text": "Aaje: Supplier invoice says 100 units but only 98 were physically received.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A075",
  "fc": "quantity_mismatch",
  "lang": "en",
  "text": "Supplier invoice says 100 units but only 98 were physically received."
 },
 {
  "id": "A076",
  "fc": "quantity_mismatch",
  "lang": "hi",
  "text": "आज: Supplier invoice says 100 units but only 98 were physically received.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A077",
  "fc": "wrong_item",
  "lang": "en",
  "text": "Invoice says blue shirt but black shirt was received."
 },
 {
  "id": "A078",
  "fc": "wrong_item",
  "lang": "hi",
  "text": "आज: Invoice says blue shirt but black shirt was received.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A079",
  "fc": "wrong_item",
  "lang": "rh",
  "text": "Aaj: Invoice says blue shirt but black shirt was received.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A080",
  "fc": "wrong_item",
  "lang": "himix",
  "text": "Aaj: Invoice says blue shirt but black shirt was received.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A081",
  "fc": "duplicate",
  "lang": "rh",
  "text": "Aaj: The same invoice arrived through OCR, email import and manual entry.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A082",
  "fc": "duplicate",
  "lang": "himix",
  "text": "Aaj: The same invoice arrived through OCR, email import and manual entry.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A083",
  "fc": "duplicate",
  "lang": "gu",
  "text": "આજે: The same invoice arrived through OCR, email import and manual entry.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A084",
  "fc": "duplicate",
  "lang": "rg",
  "text": "Aaje: The same invoice arrived through OCR, email import and manual entry.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A085",
  "fc": "correction",
  "lang": "gu",
  "text": "આજે: Change yesterday's ₹10000 expense to ₹9500; preserve audit history.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A086",
  "fc": "correction",
  "lang": "rg",
  "text": "Aaje: Change yesterday's ₹2000 expense to ₹1500; preserve audit history.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A087",
  "fc": "correction",
  "lang": "gjmix",
  "text": "Aaje: Change yesterday's ₹2000 expense to ₹1500; preserve audit history.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A088",
  "fc": "correction",
  "lang": "en",
  "text": "Change yesterday's ₹2000 expense to ₹1500; preserve audit history."
 },
 {
  "id": "A089",
  "fc": "backdated",
  "lang": "gjmix",
  "text": "Aaje: Enter a sale today that actually happened two days ago.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A090",
  "fc": "backdated",
  "lang": "en",
  "text": "Enter a sale today that actually happened two days ago."
 },
 {
  "id": "A091",
  "fc": "backdated",
  "lang": "hi",
  "text": "आज: Enter a sale today that actually happened two days ago.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A092",
  "fc": "backdated",
  "lang": "rh",
  "text": "Aaj: Enter a sale today that actually happened two days ago.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A093",
  "fc": "future_order",
  "lang": "hi",
  "text": "आज: Customer placed an order for next Friday; do not post it as today's completed sale.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A094",
  "fc": "future_order",
  "lang": "rh",
  "text": "Aaj: Customer placed an order for next Friday; do not post it as today's completed sale.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A095",
  "fc": "future_order",
  "lang": "himix",
  "text": "Aaj: Customer placed an order for next Friday; do not post it as today's completed sale.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A096",
  "fc": "future_order",
  "lang": "gu",
  "text": "આજે: Customer placed an order for next Friday; do not post it as today's completed sale.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A097",
  "fc": "timezone",
  "lang": "himix",
  "text": "Aaj: The business is in Asia/Kolkata. 'Today' must use business timezone.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A098",
  "fc": "timezone",
  "lang": "gu",
  "text": "આજે: The business is in Asia/Kolkata. 'Today' must use business timezone.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A099",
  "fc": "timezone",
  "lang": "rg",
  "text": "Aaje: The business is in Asia/Kolkata. 'Today' must use business timezone.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A100",
  "fc": "timezone",
  "lang": "gjmix",
  "text": "Aaje: The business is in Asia/Kolkata. 'Today' must use business timezone.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A101",
  "fc": "financial_year",
  "lang": "rg",
  "text": "Aaje: User says 'last year'; determine whether they mean previous financial year or calendar year.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A102",
  "fc": "financial_year",
  "lang": "gjmix",
  "text": "Aaje: User says 'last year'; determine whether they mean previous financial year or calendar year.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A103",
  "fc": "financial_year",
  "lang": "en",
  "text": "User says 'last year'; determine whether they mean previous financial year or calendar year."
 },
 {
  "id": "A104",
  "fc": "financial_year",
  "lang": "hi",
  "text": "आज: User says 'last year'; determine whether they mean previous financial year or calendar year.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A105",
  "fc": "cash_reconciliation",
  "lang": "en",
  "text": "Ledger cash is ₹25000 but physical cash is ₹23800."
 },
 {
  "id": "A106",
  "fc": "cash_reconciliation",
  "lang": "hi",
  "text": "आज: Ledger cash is ₹25000 but physical cash is ₹23800.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A107",
  "fc": "cash_reconciliation",
  "lang": "rh",
  "text": "Aaj: Ledger cash is ₹25000 but physical cash is ₹23800.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A108",
  "fc": "cash_reconciliation",
  "lang": "himix",
  "text": "Aaj: Ledger cash is ₹25000 but physical cash is ₹23800.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A109",
  "fc": "upi_settlement",
  "lang": "rh",
  "text": "Aaj: Customer paid ₹500 by UPI; bank settlement occurred later with a fee.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A110",
  "fc": "upi_settlement",
  "lang": "himix",
  "text": "Aaj: Customer paid ₹1000 by UPI; bank settlement occurred later with a fee.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A111",
  "fc": "upi_settlement",
  "lang": "gu",
  "text": "આજે: Customer paid ₹1000 by UPI; bank settlement occurred later with a fee.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A112",
  "fc": "upi_settlement",
  "lang": "rg",
  "text": "Aaje: Customer paid ₹5000 by UPI; bank settlement occurred later with a fee.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A113",
  "fc": "internal_transfer",
  "lang": "gu",
  "text": "આજે: Moved ₹2000 from current account to savings account.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A114",
  "fc": "internal_transfer",
  "lang": "rg",
  "text": "Aaje: Moved ₹10000 from current account to savings account.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A115",
  "fc": "internal_transfer",
  "lang": "gjmix",
  "text": "Aaje: Moved ₹10000 from current account to savings account.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A116",
  "fc": "internal_transfer",
  "lang": "en",
  "text": "Moved ₹500 from current account to savings account."
 },
 {
  "id": "A117",
  "fc": "owner_capital",
  "lang": "gjmix",
  "text": "Aaje: Owner put ₹500 personal money into the business.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A118",
  "fc": "owner_capital",
  "lang": "en",
  "text": "Owner put ₹5000 personal money into the business."
 },
 {
  "id": "A119",
  "fc": "owner_capital",
  "lang": "hi",
  "text": "आज: Owner put ₹10000 personal money into the business.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A120",
  "fc": "owner_capital",
  "lang": "rh",
  "text": "Aaj: Owner put ₹10000 personal money into the business.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A121",
  "fc": "owner_drawing",
  "lang": "hi",
  "text": "आज: Owner took ₹2000 business cash home for family use.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A122",
  "fc": "owner_drawing",
  "lang": "rh",
  "text": "Aaj: Owner took ₹5000 business cash home for family use.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A123",
  "fc": "owner_drawing",
  "lang": "himix",
  "text": "Aaj: Owner took ₹2000 business cash home for family use.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A124",
  "fc": "owner_drawing",
  "lang": "gu",
  "text": "આજે: Owner took ₹2000 business cash home for family use.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A125",
  "fc": "mixed_bill",
  "lang": "himix",
  "text": "Aaj: Electricity bill is ₹4000 for both home and shop.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A126",
  "fc": "mixed_bill",
  "lang": "gu",
  "text": "આજે: Electricity bill is ₹4000 for both home and shop.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A127",
  "fc": "mixed_bill",
  "lang": "rg",
  "text": "Aaje: Electricity bill is ₹4000 for both home and shop.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A128",
  "fc": "mixed_bill",
  "lang": "gjmix",
  "text": "Aaje: Electricity bill is ₹4000 for both home and shop.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A129",
  "fc": "staff_ambiguity",
  "lang": "rg",
  "text": "Aaje: Paid Neha ₹500. It is unclear whether this is salary, advance, loan or reimbursement.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A130",
  "fc": "staff_ambiguity",
  "lang": "gjmix",
  "text": "Aaje: Paid Neha ₹500. It is unclear whether this is salary, advance, loan or reimbursement.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A131",
  "fc": "staff_ambiguity",
  "lang": "en",
  "text": "Paid Neha ₹500. It is unclear whether this is salary, advance, loan or reimbursement."
 },
 {
  "id": "A132",
  "fc": "staff_ambiguity",
  "lang": "hi",
  "text": "आज: Paid Neha ₹2000. It is unclear whether this is salary, advance, loan or reimbursement.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A133",
  "fc": "party_role",
  "lang": "en",
  "text": "Amit is both a supplier and customer; resolve role from transaction context."
 },
 {
  "id": "A134",
  "fc": "party_role",
  "lang": "hi",
  "text": "आज: Amit is both a supplier and customer; resolve role from transaction context.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A135",
  "fc": "party_role",
  "lang": "rh",
  "text": "Aaj: Amit is both a supplier and customer; resolve role from transaction context.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A136",
  "fc": "party_role",
  "lang": "himix",
  "text": "Aaj: Amit is both a supplier and customer; resolve role from transaction context.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A137",
  "fc": "duplicate_party",
  "lang": "rh",
  "text": "Aaj: There are two Ramesh records with different phone numbers; do not choose randomly.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A138",
  "fc": "duplicate_party",
  "lang": "himix",
  "text": "Aaj: There are two Ramesh records with different phone numbers; do not choose randomly.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A139",
  "fc": "duplicate_party",
  "lang": "gu",
  "text": "આજે: There are two Ramesh records with different phone numbers; do not choose randomly.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A140",
  "fc": "duplicate_party",
  "lang": "rg",
  "text": "Aaje: There are two Ramesh records with different phone numbers; do not choose randomly.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A141",
  "fc": "branch",
  "lang": "gu",
  "text": "આજે: Shop A sold 20 shirt; Shop B has separate stock.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A142",
  "fc": "branch",
  "lang": "rg",
  "text": "Aaje: Shop A sold 20 cement; Shop B has separate stock.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A143",
  "fc": "branch",
  "lang": "gjmix",
  "text": "Aaje: Shop A sold 5 tea; Shop B has separate stock.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A144",
  "fc": "branch",
  "lang": "en",
  "text": "Shop A sold 2 shirt; Shop B has separate stock."
 },
 {
  "id": "A145",
  "fc": "warehouse_transfer",
  "lang": "gjmix",
  "text": "Aaje: Sent 2 LED bulb from warehouse to branch.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A146",
  "fc": "warehouse_transfer",
  "lang": "en",
  "text": "Sent 2 shirt from warehouse to branch."
 },
 {
  "id": "A147",
  "fc": "warehouse_transfer",
  "lang": "hi",
  "text": "आज: Sent 2 PVC pipe from warehouse to branch.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A148",
  "fc": "warehouse_transfer",
  "lang": "rh",
  "text": "Aaj: Sent 20 cement from warehouse to branch.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A149",
  "fc": "negative_stock",
  "lang": "hi",
  "text": "आज: System stock is zero but user says 2 were sold.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A150",
  "fc": "negative_stock",
  "lang": "rh",
  "text": "Aaj: System stock is zero but user says 20 were sold.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A151",
  "fc": "negative_stock",
  "lang": "himix",
  "text": "Aaj: System stock is zero but user says 2 were sold.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A152",
  "fc": "negative_stock",
  "lang": "gu",
  "text": "આજે: System stock is zero but user says 10 were sold.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A153",
  "fc": "shrinkage",
  "lang": "himix",
  "text": "Aaj: Physical stock is 10 lower than system stock; investigate instead of calling it a sale.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A154",
  "fc": "shrinkage",
  "lang": "gu",
  "text": "આજે: Physical stock is 10 lower than system stock; investigate instead of calling it a sale.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A155",
  "fc": "shrinkage",
  "lang": "rg",
  "text": "Aaje: Physical stock is 10 lower than system stock; investigate instead of calling it a sale.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A156",
  "fc": "shrinkage",
  "lang": "gjmix",
  "text": "Aaje: Physical stock is 10 lower than system stock; investigate instead of calling it a sale.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A157",
  "fc": "profit",
  "lang": "rg",
  "text": "Aaje: Today's sales are ₹20000; today's purchases are ₹30000. Do not infer today's profit from this alone.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A158",
  "fc": "profit",
  "lang": "gjmix",
  "text": "Aaje: Today's sales are ₹20000; today's purchases are ₹30000. Do not infer today's profit from this alone.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A159",
  "fc": "profit",
  "lang": "en",
  "text": "Today's sales are ₹20000; today's purchases are ₹30000. Do not infer today's profit from this alone."
 },
 {
  "id": "A160",
  "fc": "profit",
  "lang": "hi",
  "text": "आज: Today's sales are ₹1000; today's purchases are ₹1500. Do not infer today's profit from this alone.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A161",
  "fc": "cost_basis",
  "lang": "en",
  "text": "Same SKU was bought at ₹40 and ₹50; use configured inventory valuation."
 },
 {
  "id": "A162",
  "fc": "cost_basis",
  "lang": "hi",
  "text": "आज: Same SKU was bought at ₹40 and ₹50; use configured inventory valuation.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A163",
  "fc": "cost_basis",
  "lang": "rh",
  "text": "Aaj: Same SKU was bought at ₹40 and ₹50; use configured inventory valuation.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A164",
  "fc": "cost_basis",
  "lang": "himix",
  "text": "Aaj: Same SKU was bought at ₹40 and ₹50; use configured inventory valuation.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A165",
  "fc": "discount",
  "lang": "rh",
  "text": "Aaj: Invoice gross is ₹10000 and includes ₹500 discount; preserve gross, discount and net.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A166",
  "fc": "discount",
  "lang": "himix",
  "text": "Aaj: Invoice gross is ₹10000 and includes ₹500 discount; preserve gross, discount and net.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A167",
  "fc": "discount",
  "lang": "gu",
  "text": "આજે: Invoice gross is ₹10000 and includes ₹500 discount; preserve gross, discount and net.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A168",
  "fc": "discount",
  "lang": "rg",
  "text": "Aaje: Invoice gross is ₹10000 and includes ₹500 discount; preserve gross, discount and net.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A169",
  "fc": "free_quantity",
  "lang": "gu",
  "text": "આજે: Bought 10 cartons and received 1 free; physical quantity is 11.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A170",
  "fc": "free_quantity",
  "lang": "rg",
  "text": "Aaje: Bought 10 cartons and received 1 free; physical quantity is 11.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A171",
  "fc": "free_quantity",
  "lang": "gjmix",
  "text": "Aaje: Bought 10 cartons and received 1 free; physical quantity is 11.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A172",
  "fc": "free_quantity",
  "lang": "en",
  "text": "Bought 10 cartons and received 1 free; physical quantity is 11."
 },
 {
  "id": "A173",
  "fc": "batch",
  "lang": "gjmix",
  "text": "Aaje: Same medicine SKU has two batches with different expiry dates.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A174",
  "fc": "batch",
  "lang": "en",
  "text": "Same medicine SKU has two batches with different expiry dates."
 },
 {
  "id": "A175",
  "fc": "batch",
  "lang": "hi",
  "text": "आज: Same medicine SKU has two batches with different expiry dates.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A176",
  "fc": "batch",
  "lang": "rh",
  "text": "Aaj: Same medicine SKU has two batches with different expiry dates.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A177",
  "fc": "serial",
  "lang": "hi",
  "text": "आज: Sold a laptop; record the actual serial number from master/transaction.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A178",
  "fc": "serial",
  "lang": "rh",
  "text": "Aaj: Sold a laptop; record the actual serial number from master/transaction.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A179",
  "fc": "serial",
  "lang": "himix",
  "text": "Aaj: Sold a laptop; record the actual serial number from master/transaction.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A180",
  "fc": "serial",
  "lang": "gu",
  "text": "આજે: Sold a laptop; record the actual serial number from master/transaction.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A181",
  "fc": "tax",
  "lang": "himix",
  "text": "Aaj: User says 'GST bill'. Retrieve verified tax configuration; do not guess rate.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A182",
  "fc": "tax",
  "lang": "gu",
  "text": "આજે: User says 'GST bill'. Retrieve verified tax configuration; do not guess rate.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A183",
  "fc": "tax",
  "lang": "rg",
  "text": "Aaje: User says 'GST bill'. Retrieve verified tax configuration; do not guess rate.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A184",
  "fc": "tax",
  "lang": "gjmix",
  "text": "Aaje: User says 'GST bill'. Retrieve verified tax configuration; do not guess rate.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A185",
  "fc": "gstin",
  "lang": "rg",
  "text": "Aaje: User asks for e-invoice but customer GSTIN is missing. Retrieve or ask; never invent.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A186",
  "fc": "gstin",
  "lang": "gjmix",
  "text": "Aaje: User asks for e-invoice but customer GSTIN is missing. Retrieve or ask; never invent.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A187",
  "fc": "gstin",
  "lang": "en",
  "text": "User asks for e-invoice but customer GSTIN is missing. Retrieve or ask; never invent."
 },
 {
  "id": "A188",
  "fc": "gstin",
  "lang": "hi",
  "text": "आज: User asks for e-invoice but customer GSTIN is missing. Retrieve or ask; never invent.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A189",
  "fc": "hsn_sac",
  "lang": "en",
  "text": "Product has multiple possible HSN/SAC codes. Do not guess."
 },
 {
  "id": "A190",
  "fc": "hsn_sac",
  "lang": "hi",
  "text": "आज: Product has multiple possible HSN/SAC codes. Do not guess.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A191",
  "fc": "hsn_sac",
  "lang": "rh",
  "text": "Aaj: Product has multiple possible HSN/SAC codes. Do not guess.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A192",
  "fc": "hsn_sac",
  "lang": "himix",
  "text": "Aaj: Product has multiple possible HSN/SAC codes. Do not guess.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A193",
  "fc": "invoice_vs_einvoice",
  "lang": "rh",
  "text": "Aaj: User asks for a PDF invoice. This is not automatically an e-invoice registration.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A194",
  "fc": "invoice_vs_einvoice",
  "lang": "himix",
  "text": "Aaj: User asks for a PDF invoice. This is not automatically an e-invoice registration.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A195",
  "fc": "invoice_vs_einvoice",
  "lang": "gu",
  "text": "આજે: User asks for a PDF invoice. This is not automatically an e-invoice registration.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A196",
  "fc": "invoice_vs_einvoice",
  "lang": "rg",
  "text": "Aaje: User asks for a PDF invoice. This is not automatically an e-invoice registration.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A197",
  "fc": "irn",
  "lang": "gu",
  "text": "આજે: Never invent an IRN, acknowledgement number or signed QR code.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A198",
  "fc": "irn",
  "lang": "rg",
  "text": "Aaje: Never invent an IRN, acknowledgement number or signed QR code.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A199",
  "fc": "irn",
  "lang": "gjmix",
  "text": "Aaje: Never invent an IRN, acknowledgement number or signed QR code.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A200",
  "fc": "irn",
  "lang": "en",
  "text": "Never invent an IRN, acknowledgement number or signed QR code."
 },
 {
  "id": "A201",
  "fc": "einvoice_cancellation",
  "lang": "gjmix",
  "text": "Aaje: User wants to cancel an e-invoice; check current document state and statutory workflow.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A202",
  "fc": "einvoice_cancellation",
  "lang": "en",
  "text": "User wants to cancel an e-invoice; check current document state and statutory workflow."
 },
 {
  "id": "A203",
  "fc": "einvoice_cancellation",
  "lang": "hi",
  "text": "आज: User wants to cancel an e-invoice; check current document state and statutory workflow.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A204",
  "fc": "einvoice_cancellation",
  "lang": "rh",
  "text": "Aaj: User wants to cancel an e-invoice; check current document state and statutory workflow.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A205",
  "fc": "credit_note",
  "lang": "hi",
  "text": "आज: A finalized invoice needs a post-sale correction; consider credit-note workflow instead of editing history.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A206",
  "fc": "credit_note",
  "lang": "rh",
  "text": "Aaj: A finalized invoice needs a post-sale correction; consider credit-note workflow instead of editing history.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A207",
  "fc": "credit_note",
  "lang": "himix",
  "text": "Aaj: A finalized invoice needs a post-sale correction; consider credit-note workflow instead of editing history.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A208",
  "fc": "credit_note",
  "lang": "gu",
  "text": "આજે: A finalized invoice needs a post-sale correction; consider credit-note workflow instead of editing history.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A209",
  "fc": "debit_note",
  "lang": "himix",
  "text": "Aaj: A debit note is a document event, not simply a payment.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A210",
  "fc": "debit_note",
  "lang": "gu",
  "text": "આજે: A debit note is a document event, not simply a payment.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A211",
  "fc": "debit_note",
  "lang": "rg",
  "text": "Aaje: A debit note is a document event, not simply a payment.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A212",
  "fc": "debit_note",
  "lang": "gjmix",
  "text": "Aaje: A debit note is a document event, not simply a payment.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A213",
  "fc": "ewaybill",
  "lang": "rg",
  "text": "Aaje: An e-way bill exists for the document; do not blindly cancel related documents.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A214",
  "fc": "ewaybill",
  "lang": "gjmix",
  "text": "Aaje: An e-way bill exists for the document; do not blindly cancel related documents.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A215",
  "fc": "ewaybill",
  "lang": "en",
  "text": "An e-way bill exists for the document; do not blindly cancel related documents."
 },
 {
  "id": "A216",
  "fc": "ewaybill",
  "lang": "hi",
  "text": "आज: An e-way bill exists for the document; do not blindly cancel related documents.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A217",
  "fc": "gst_reconciliation",
  "lang": "en",
  "text": "Local purchase records must be reconciled with available GST records before tax-credit decisions."
 },
 {
  "id": "A218",
  "fc": "gst_reconciliation",
  "lang": "hi",
  "text": "आज: Local purchase records must be reconciled with available GST records before tax-credit decisions.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A219",
  "fc": "gst_reconciliation",
  "lang": "rh",
  "text": "Aaj: Local purchase records must be reconciled with available GST records before tax-credit decisions.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A220",
  "fc": "gst_reconciliation",
  "lang": "himix",
  "text": "Aaj: Local purchase records must be reconciled with available GST records before tax-credit decisions.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A221",
  "fc": "itc",
  "lang": "rh",
  "text": "Aaj: Do not assume every purchase tax amount is eligible input tax credit.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A222",
  "fc": "itc",
  "lang": "himix",
  "text": "Aaj: Do not assume every purchase tax amount is eligible input tax credit.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A223",
  "fc": "itc",
  "lang": "gu",
  "text": "આજે: Do not assume every purchase tax amount is eligible input tax credit.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A224",
  "fc": "itc",
  "lang": "rg",
  "text": "Aaje: Do not assume every purchase tax amount is eligible input tax credit.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A225",
  "fc": "voice_error",
  "lang": "gu",
  "text": "આજે: Voice input may have heard ₹50000 when the user said ₹5000; confirm before posting.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A226",
  "fc": "voice_error",
  "lang": "rg",
  "text": "Aaje: Voice input may have heard ₹50000 when the user said ₹5000; confirm before posting.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A227",
  "fc": "voice_error",
  "lang": "gjmix",
  "text": "Aaje: Voice input may have heard ₹50000 when the user said ₹5000; confirm before posting.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A228",
  "fc": "voice_error",
  "lang": "en",
  "text": "Voice input may have heard ₹50000 when the user said ₹5000; confirm before posting."
 },
 {
  "id": "A229",
  "fc": "ocr_error",
  "lang": "gjmix",
  "text": "Aaje: OCR reads invoice 00128 as 00123; verify against source/master.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A230",
  "fc": "ocr_error",
  "lang": "en",
  "text": "OCR reads invoice 00128 as 00123; verify against source/master."
 },
 {
  "id": "A231",
  "fc": "ocr_error",
  "lang": "hi",
  "text": "आज: OCR reads invoice 00128 as 00123; verify against source/master.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A232",
  "fc": "ocr_error",
  "lang": "rh",
  "text": "Aaj: OCR reads invoice 00128 as 00123; verify against source/master.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A233",
  "fc": "multilingual",
  "lang": "hi",
  "text": "आज: 'ઉધાર આપ્યું', 'उधार दिया', and 'credit par diya' can describe the same credit-sale concept.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A234",
  "fc": "multilingual",
  "lang": "rh",
  "text": "Aaj: 'ઉધાર આપ્યું', 'उधार दिया', and 'credit par diya' can describe the same credit-sale concept.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A235",
  "fc": "multilingual",
  "lang": "himix",
  "text": "Aaj: 'ઉધાર આપ્યું', 'उधार दिया', and 'credit par diya' can describe the same credit-sale concept.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A236",
  "fc": "multilingual",
  "lang": "gu",
  "text": "આજે: 'ઉધાર આપ્યું', 'उधार दिया', and 'credit par diya' can describe the same credit-sale concept.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A237",
  "fc": "code_mixing",
  "lang": "himix",
  "text": "Aaj: 'Patel pase thi maal aavyo and payment pending che.'. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A238",
  "fc": "code_mixing",
  "lang": "gu",
  "text": "આજે: 'Patel pase thi maal aavyo and payment pending che.'. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A239",
  "fc": "code_mixing",
  "lang": "rg",
  "text": "Aaje: 'Patel pase thi maal aavyo and payment pending che.'. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A240",
  "fc": "code_mixing",
  "lang": "gjmix",
  "text": "Aaje: 'Patel pase thi maal aavyo and payment pending che.'. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A241",
  "fc": "colloquial",
  "lang": "rg",
  "text": "Aaje: 'Maal nikli gayo' could mean sale, dispatch, transfer or stock issue.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A242",
  "fc": "colloquial",
  "lang": "gjmix",
  "text": "Aaje: 'Maal nikli gayo' could mean sale, dispatch, transfer or stock issue.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A243",
  "fc": "colloquial",
  "lang": "en",
  "text": "'Maal nikli gayo' could mean sale, dispatch, transfer or stock issue."
 },
 {
  "id": "A244",
  "fc": "colloquial",
  "lang": "hi",
  "text": "आज: 'Maal nikli gayo' could mean sale, dispatch, transfer or stock issue.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A245",
  "fc": "date_ambiguity",
  "lang": "en",
  "text": "'Kal Ramesh ne maal aapyo' may require clarification before posting."
 },
 {
  "id": "A246",
  "fc": "date_ambiguity",
  "lang": "hi",
  "text": "आज: 'Kal Ramesh ne maal aapyo' may require clarification before posting.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A247",
  "fc": "date_ambiguity",
  "lang": "rh",
  "text": "Aaj: 'Kal Ramesh ne maal aapyo' may require clarification before posting.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A248",
  "fc": "date_ambiguity",
  "lang": "himix",
  "text": "Aaj: 'Kal Ramesh ne maal aapyo' may require clarification before posting.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A249",
  "fc": "number_ambiguity",
  "lang": "rh",
  "text": "Aaj: Spoken amount 'પાંચ લાખ પચાસ' may require confirmation.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A250",
  "fc": "number_ambiguity",
  "lang": "himix",
  "text": "Aaj: Spoken amount 'પાંચ લાખ પચાસ' may require confirmation.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A251",
  "fc": "number_ambiguity",
  "lang": "gu",
  "text": "આજે: Spoken amount 'પાંચ લાખ પચાસ' may require confirmation.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A252",
  "fc": "number_ambiguity",
  "lang": "rg",
  "text": "Aaje: Spoken amount 'પાંચ લાખ પચાસ' may require confirmation.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A253",
  "fc": "currency",
  "lang": "gu",
  "text": "આજે: Invoice is USD 100; do not treat it as INR 100.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A254",
  "fc": "currency",
  "lang": "rg",
  "text": "Aaje: Invoice is USD 100; do not treat it as INR 100.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A255",
  "fc": "currency",
  "lang": "gjmix",
  "text": "Aaje: Invoice is USD 100; do not treat it as INR 100.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A256",
  "fc": "currency",
  "lang": "en",
  "text": "Invoice is USD 100; do not treat it as INR 100."
 },
 {
  "id": "A257",
  "fc": "fx",
  "lang": "gjmix",
  "text": "Aaje: Supplier invoice is USD 100 and bank debit is an INR equivalent; keep both currency and settlement values.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A258",
  "fc": "fx",
  "lang": "en",
  "text": "Supplier invoice is USD 100 and bank debit is an INR equivalent; keep both currency and settlement values."
 },
 {
  "id": "A259",
  "fc": "fx",
  "lang": "hi",
  "text": "आज: Supplier invoice is USD 100 and bank debit is an INR equivalent; keep both currency and settlement values.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A260",
  "fc": "fx",
  "lang": "rh",
  "text": "Aaj: Supplier invoice is USD 100 and bank debit is an INR equivalent; keep both currency and settlement values.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A261",
  "fc": "rounding",
  "lang": "hi",
  "text": "आज: Tax calculation has line-level rounding; use deterministic application rules.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A262",
  "fc": "rounding",
  "lang": "rh",
  "text": "Aaj: Tax calculation has line-level rounding; use deterministic application rules.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A263",
  "fc": "rounding",
  "lang": "himix",
  "text": "Aaj: Tax calculation has line-level rounding; use deterministic application rules.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A264",
  "fc": "rounding",
  "lang": "gu",
  "text": "આજે: Tax calculation has line-level rounding; use deterministic application rules.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A265",
  "fc": "duplicate_payment",
  "lang": "himix",
  "text": "Aaj: The same ₹5000 payment appears in bank import and manual entry.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A266",
  "fc": "duplicate_payment",
  "lang": "gu",
  "text": "આજે: The same ₹5000 payment appears in bank import and manual entry.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A267",
  "fc": "duplicate_payment",
  "lang": "rg",
  "text": "Aaje: The same ₹5000 payment appears in bank import and manual entry.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A268",
  "fc": "duplicate_payment",
  "lang": "gjmix",
  "text": "Aaje: The same ₹5000 payment appears in bank import and manual entry.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A269",
  "fc": "refund",
  "lang": "rg",
  "text": "Aaje: Refund ₹500 to customer for an earlier transaction; link it to the original where possible.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A270",
  "fc": "refund",
  "lang": "gjmix",
  "text": "Aaje: Refund ₹10000 to customer for an earlier transaction; link it to the original where possible.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A271",
  "fc": "refund",
  "lang": "en",
  "text": "Refund ₹1000 to customer for an earlier transaction; link it to the original where possible."
 },
 {
  "id": "A272",
  "fc": "refund",
  "lang": "hi",
  "text": "आज: Refund ₹1000 to customer for an earlier transaction; link it to the original where possible.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A273",
  "fc": "loan",
  "lang": "en",
  "text": "Business received a ₹5000 loan. This is financing, not revenue."
 },
 {
  "id": "A274",
  "fc": "loan",
  "lang": "hi",
  "text": "आज: Business received a ₹500 loan. This is financing, not revenue.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A275",
  "fc": "loan",
  "lang": "rh",
  "text": "Aaj: Business received a ₹5000 loan. This is financing, not revenue.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A276",
  "fc": "loan",
  "lang": "himix",
  "text": "Aaj: Business received a ₹1000 loan. This is financing, not revenue.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A277",
  "fc": "asset",
  "lang": "rh",
  "text": "Aaj: Business bought a machine for ₹20000. Apply asset/accounting policy rather than ordinary daily expense.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A278",
  "fc": "asset",
  "lang": "himix",
  "text": "Aaj: Business bought a machine for ₹10000. Apply asset/accounting policy rather than ordinary daily expense.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A279",
  "fc": "asset",
  "lang": "gu",
  "text": "આજે: Business bought a machine for ₹10000. Apply asset/accounting policy rather than ordinary daily expense.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A280",
  "fc": "asset",
  "lang": "rg",
  "text": "Aaje: Business bought a machine for ₹100000. Apply asset/accounting policy rather than ordinary daily expense.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A281",
  "fc": "service",
  "lang": "gu",
  "text": "આજે: Repair job worth ₹500 is completed but customer has not paid.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A282",
  "fc": "service",
  "lang": "rg",
  "text": "Aaje: Repair job worth ₹500 is completed but customer has not paid.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A283",
  "fc": "service",
  "lang": "gjmix",
  "text": "Aaje: Repair job worth ₹10000 is completed but customer has not paid.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A284",
  "fc": "service",
  "lang": "en",
  "text": "Repair job worth ₹10000 is completed but customer has not paid."
 },
 {
  "id": "A285",
  "fc": "production",
  "lang": "gjmix",
  "text": "Aaje: Used 40 kg steel to produce 20 finished units; record consumption and output separately.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A286",
  "fc": "production",
  "lang": "en",
  "text": "Used 40 kg steel to produce 20 finished units; record consumption and output separately."
 },
 {
  "id": "A287",
  "fc": "production",
  "lang": "hi",
  "text": "आज: Used 40 kg steel to produce 20 finished units; record consumption and output separately.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A288",
  "fc": "production",
  "lang": "rh",
  "text": "Aaj: Used 40 kg steel to produce 20 finished units; record consumption and output separately.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A289",
  "fc": "bom",
  "lang": "hi",
  "text": "आज: Production should consume configured BOM quantities; never invent the BOM.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A290",
  "fc": "bom",
  "lang": "rh",
  "text": "Aaj: Production should consume configured BOM quantities; never invent the BOM.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A291",
  "fc": "bom",
  "lang": "himix",
  "text": "Aaj: Production should consume configured BOM quantities; never invent the BOM.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A292",
  "fc": "bom",
  "lang": "gu",
  "text": "આજે: Production should consume configured BOM quantities; never invent the BOM.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A293",
  "fc": "consignment",
  "lang": "himix",
  "text": "Aaj: Supplier-owned goods are displayed in the shop on consignment.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A294",
  "fc": "consignment",
  "lang": "gu",
  "text": "આજે: Supplier-owned goods are displayed in the shop on consignment.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A295",
  "fc": "consignment",
  "lang": "rg",
  "text": "Aaje: Supplier-owned goods are displayed in the shop on consignment.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A296",
  "fc": "consignment",
  "lang": "gjmix",
  "text": "Aaje: Supplier-owned goods are displayed in the shop on consignment.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A297",
  "fc": "drop_ship",
  "lang": "rg",
  "text": "Aaje: Supplier shipped 10 tea directly to customer; shop never physically received them.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A298",
  "fc": "drop_ship",
  "lang": "gjmix",
  "text": "Aaje: Supplier shipped 5 rice directly to customer; shop never physically received them.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A299",
  "fc": "drop_ship",
  "lang": "en",
  "text": "Supplier shipped 2 LED bulb directly to customer; shop never physically received them."
 },
 {
  "id": "A300",
  "fc": "drop_ship",
  "lang": "hi",
  "text": "आज: Supplier shipped 2 tea directly to customer; shop never physically received them.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A301",
  "fc": "subcontract",
  "lang": "en",
  "text": "Sent 100 kg raw material to a job worker; 80 kg returned processed and 5 kg was waste."
 },
 {
  "id": "A302",
  "fc": "subcontract",
  "lang": "hi",
  "text": "आज: Sent 100 kg raw material to a job worker; 80 kg returned processed and 5 kg was waste.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A303",
  "fc": "subcontract",
  "lang": "rh",
  "text": "Aaj: Sent 100 kg raw material to a job worker; 80 kg returned processed and 5 kg was waste.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A304",
  "fc": "subcontract",
  "lang": "himix",
  "text": "Aaj: Sent 100 kg raw material to a job worker; 80 kg returned processed and 5 kg was waste.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A305",
  "fc": "promotional",
  "lang": "rh",
  "text": "Aaj: Gave 20 units to a customer as promotion.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A306",
  "fc": "promotional",
  "lang": "himix",
  "text": "Aaj: Gave 5 units to a customer as promotion.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A307",
  "fc": "promotional",
  "lang": "gu",
  "text": "આજે: Gave 20 units to a customer as promotion.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A308",
  "fc": "promotional",
  "lang": "rg",
  "text": "Aaje: Gave 2 units to a customer as promotion.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A309",
  "fc": "approval",
  "lang": "gu",
  "text": "આજે: User wants to write off ₹10000 stock; approval may be required.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A310",
  "fc": "approval",
  "lang": "rg",
  "text": "Aaje: User wants to write off ₹200000 stock; approval may be required.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A311",
  "fc": "approval",
  "lang": "gjmix",
  "text": "Aaje: User wants to write off ₹100000 stock; approval may be required.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A312",
  "fc": "approval",
  "lang": "en",
  "text": "User wants to write off ₹20000 stock; approval may be required."
 },
 {
  "id": "A313",
  "fc": "permissions",
  "lang": "gjmix",
  "text": "Aaje: Cashier asks the AI to delete a finalized invoice.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A314",
  "fc": "permissions",
  "lang": "en",
  "text": "Cashier asks the AI to delete a finalized invoice."
 },
 {
  "id": "A315",
  "fc": "permissions",
  "lang": "hi",
  "text": "आज: Cashier asks the AI to delete a finalized invoice.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A316",
  "fc": "permissions",
  "lang": "rh",
  "text": "Aaj: Cashier asks the AI to delete a finalized invoice.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A317",
  "fc": "audit",
  "lang": "hi",
  "text": "आज: User says 'delete yesterday's posted transaction'; preserve history and use reversal/correction policy.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A318",
  "fc": "audit",
  "lang": "rh",
  "text": "Aaj: User says 'delete yesterday's posted transaction'; preserve history and use reversal/correction policy.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A319",
  "fc": "audit",
  "lang": "himix",
  "text": "Aaj: User says 'delete yesterday's posted transaction'; preserve history and use reversal/correction policy.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A320",
  "fc": "audit",
  "lang": "gu",
  "text": "આજે: User says 'delete yesterday's posted transaction'; preserve history and use reversal/correction policy.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A321",
  "fc": "offline_sync",
  "lang": "himix",
  "text": "Aaj: Two phones recorded the same sale offline and later synchronized.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A322",
  "fc": "offline_sync",
  "lang": "gu",
  "text": "આજે: Two phones recorded the same sale offline and later synchronized.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A323",
  "fc": "offline_sync",
  "lang": "rg",
  "text": "Aaje: Two phones recorded the same sale offline and later synchronized.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A324",
  "fc": "offline_sync",
  "lang": "gjmix",
  "text": "Aaje: Two phones recorded the same sale offline and later synchronized.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A325",
  "fc": "concurrency",
  "lang": "rg",
  "text": "Aaje: Two staff users attempted to post the same invoice at the same time.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A326",
  "fc": "concurrency",
  "lang": "gjmix",
  "text": "Aaje: Two staff users attempted to post the same invoice at the same time.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A327",
  "fc": "concurrency",
  "lang": "en",
  "text": "Two staff users attempted to post the same invoice at the same time."
 },
 {
  "id": "A328",
  "fc": "concurrency",
  "lang": "hi",
  "text": "आज: Two staff users attempted to post the same invoice at the same time.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A329",
  "fc": "period_lock",
  "lang": "en",
  "text": "User wants to edit a transaction in a closed accounting period."
 },
 {
  "id": "A330",
  "fc": "period_lock",
  "lang": "hi",
  "text": "आज: User wants to edit a transaction in a closed accounting period.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A331",
  "fc": "period_lock",
  "lang": "rh",
  "text": "Aaj: User wants to edit a transaction in a closed accounting period.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A332",
  "fc": "period_lock",
  "lang": "himix",
  "text": "Aaj: User wants to edit a transaction in a closed accounting period.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A333",
  "fc": "opening_balance",
  "lang": "rh",
  "text": "Aaj: Opening cash is ₹50000. Do not classify it as today's income.. Business ledger me post karne se pehle state aur context check karo."
 },
 {
  "id": "A334",
  "fc": "opening_balance",
  "lang": "himix",
  "text": "Aaj: Opening cash is ₹50000. Do not classify it as today's income.. Business me post karne se pehle state/context verify karo."
 },
 {
  "id": "A335",
  "fc": "opening_balance",
  "lang": "gu",
  "text": "આજે: Opening cash is ₹50000. Do not classify it as today's income.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A336",
  "fc": "opening_balance",
  "lang": "rg",
  "text": "Aaje: Opening cash is ₹50000. Do not classify it as today's income.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A337",
  "fc": "closing",
  "lang": "gu",
  "text": "આજે: User says 'close today's books'; reconcile unresolved drafts, cash, bank/UPI, stock, receivables and payables first.. આને business ledgerમાં પોસ્ટ કરતાં પહેલાં state અને context ચેક કરો."
 },
 {
  "id": "A338",
  "fc": "closing",
  "lang": "rg",
  "text": "Aaje: User says 'close today's books'; reconcile unresolved drafts, cash, bank/UPI, stock, receivables and payables first.. Business ledger ma post karta pela state ane context check karo."
 },
 {
  "id": "A339",
  "fc": "closing",
  "lang": "gjmix",
  "text": "Aaje: User says 'close today's books'; reconcile unresolved drafts, cash, bank/UPI, stock, receivables and payables first.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A340",
  "fc": "closing",
  "lang": "en",
  "text": "User says 'close today's books'; reconcile unresolved drafts, cash, bank/UPI, stock, receivables and payables first."
 },
 {
  "id": "A341",
  "fc": "unknown",
  "lang": "gjmix",
  "text": "Aaje: User says 'today I spent some money' without amount, category or purpose.. Business ma post karta pela state/context verify karvu."
 },
 {
  "id": "A342",
  "fc": "unknown",
  "lang": "en",
  "text": "User says 'today I spent some money' without amount, category or purpose."
 },
 {
  "id": "A343",
  "fc": "unknown",
  "lang": "hi",
  "text": "आज: User says 'today I spent some money' without amount, category or purpose.। इसे business ledger में पोस्ट करने से पहले state और context चेक करें।"
 },
 {
  "id": "A344",
  "fc": "unknown",
  "lang": "rh",
  "text": "Aaj: User says 'today I spent some money' without amount, category or purpose.. Business ledger me post karne se pehle state aur context check karo."
 }
];
