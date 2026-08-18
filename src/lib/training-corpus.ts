// AUTO-DERIVED from the Indic business AI training dataset (offline, no network).
// Used by the AI Test Lab benchmark and by the lexicon miner.

export interface TrainingRecord {
  id: string;
  domain: string;
  lang: string;
  text: string;
  intent: string;
  entities: Record<string, string>;
  clarify: string;
}

export const TRAINING_CORPUS: TrainingRecord[] = [
 {
  "id": "S001",
  "domain": "grocery",
  "lang": "gu",
  "text": "આજે 5 કિલો ખાંડ રમેશને વેચી",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S002",
  "domain": "grocery",
  "lang": "hi",
  "text": "आज रमेश को 5 किलो चीनी बेची",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S003",
  "domain": "grocery",
  "lang": "en",
  "text": "Sold 5 kg sugar to Ramesh today",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S004",
  "domain": "grocery",
  "lang": "rg",
  "text": "aaje Ramesh ne 5 kilo khand vechi",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S005",
  "domain": "grocery",
  "lang": "rh",
  "text": "aaj Ramesh ko 5 kilo cheeni bechi",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S006",
  "domain": "grocery",
  "lang": "gjmix",
  "text": "આજે Ramesh ને 5 kilo sugar વેચી",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S007",
  "domain": "grocery",
  "lang": "himix",
  "text": "आज Ramesh ko 5 kg sugar sell ki",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "quantity": "5",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S008",
  "domain": "grocery",
  "lang": "en",
  "text": "Make a sale of 10 packets biscuits to Patel",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Patel",
   "item": "biscuit",
   "quantity": "10",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "S009",
  "domain": "grocery",
  "lang": "gu",
  "text": "પટેલને 10 પેકેટ બિસ્કિટ આપ્યા",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Patel",
   "item": "biscuit",
   "quantity": "10",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "S010",
  "domain": "grocery",
  "lang": "hi",
  "text": "पटेल को 10 पैकेट बिस्कुट दिए",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Patel",
   "item": "biscuit",
   "quantity": "10",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "S011",
  "domain": "grocery",
  "lang": "rg",
  "text": "Patel ne 10 packet biscuit aapya",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Patel",
   "item": "biscuit",
   "quantity": "10",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "S012",
  "domain": "grocery",
  "lang": "rh",
  "text": "Patel ko 10 packet biscuit diye",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Patel",
   "item": "biscuit",
   "quantity": "10",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "S013",
  "domain": "retail",
  "lang": "en",
  "text": "Ravi bought 2 shirts at 799 each",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ravi",
   "item": "shirt",
   "quantity": "2",
   "unit": "piece",
   "unit_price": "799"
  },
  "clarify": "no"
 },
 {
  "id": "S014",
  "domain": "clothing",
  "lang": "gu",
  "text": "રવિને બે શર્ટ 799 રૂપિયાના આપ્યા",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ravi",
   "item": "shirt",
   "quantity": "2",
   "unit": "piece",
   "unit_price": "799"
  },
  "clarify": "no"
 },
 {
  "id": "S015",
  "domain": "clothing",
  "lang": "hi",
  "text": "रवि को दो शर्ट 799 रुपये वाली दी",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ravi",
   "item": "shirt",
   "quantity": "2",
   "unit": "piece",
   "unit_price": "799"
  },
  "clarify": "no"
 },
 {
  "id": "S016",
  "domain": "clothing",
  "lang": "gjmix",
  "text": "Ravi ne 2 shirt 799 ma aapi",
  "intent": "RECORD_SALE",
  "entities": {
   "customer": "Ravi",
   "item": "shirt",
   "quantity": "2",
   "unit": "piece",
   "unit_price": "799"
  },
  "clarify": "no"
 },
 {
  "id": "S017",
  "domain": "retail",
  "lang": "en",
  "text": "Record today's cash sale for 3500",
  "intent": "RECORD_SALE",
  "entities": {
   "amount": "3500",
   "payment_method": "cash",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S018",
  "domain": "retail",
  "lang": "hi",
  "text": "आज की 3500 रुपये की कैश बिक्री दर्ज करो",
  "intent": "RECORD_SALE",
  "entities": {
   "amount": "3500",
   "payment_method": "cash",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S019",
  "domain": "retail",
  "lang": "gu",
  "text": "આજનું 3500નું cash sale લખી દો",
  "intent": "RECORD_SALE",
  "entities": {
   "amount": "3500",
   "payment_method": "cash",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "S020",
  "domain": "retail",
  "lang": "rg",
  "text": "aaj nu 3500 cash sale note kari do",
  "intent": "RECORD_SALE",
  "entities": {
   "amount": "3500",
   "payment_method": "cash",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "P001",
  "domain": "grocery",
  "lang": "gu",
  "text": "પટેલ ટ્રેડર્સ પાસેથી 20 કિલો ખાંડ લીધી",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "P002",
  "domain": "grocery",
  "lang": "hi",
  "text": "पटेल ट्रेडर्स से 20 किलो चीनी खरीदी",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "P003",
  "domain": "grocery",
  "lang": "en",
  "text": "Purchased 20 kg sugar from Patel Traders",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "P004",
  "domain": "grocery",
  "lang": "rg",
  "text": "Patel Traders mathi 20 kilo khand lidhi",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "P005",
  "domain": "grocery",
  "lang": "rh",
  "text": "Patel Traders se 20 kilo cheeni li",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "P006",
  "domain": "grocery",
  "lang": "gjmix",
  "text": "Patel Traders પાસેથી 20 kg sugar lidhi",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "P007",
  "domain": "wholesale",
  "lang": "en",
  "text": "Add purchase of 50 cartons from Shah Distributors",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Shah Distributors",
   "quantity": "50",
   "unit": "carton"
  },
  "clarify": "yes:item missing"
 },
 {
  "id": "P008",
  "domain": "wholesale",
  "lang": "hi",
  "text": "शाह डिस्ट्रीब्यूटर्स से 50 कार्टन खरीदे",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Shah Distributors",
   "quantity": "50",
   "unit": "carton"
  },
  "clarify": "yes:item missing"
 },
 {
  "id": "P009",
  "domain": "wholesale",
  "lang": "gu",
  "text": "શાહ ડિસ્ટ્રિબ્યુટર્સ પાસેથી 50 કાર્ટન લીધા",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Shah Distributors",
   "quantity": "50",
   "unit": "carton"
  },
  "clarify": "yes:item missing"
 },
 {
  "id": "P010",
  "domain": "wholesale",
  "lang": "rg",
  "text": "Shah Distributors mathi 50 carton lidha",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Shah Distributors",
   "quantity": "50",
   "unit": "carton"
  },
  "clarify": "yes:item missing"
 },
 {
  "id": "P011",
  "domain": "retail",
  "lang": "en",
  "text": "Bought 12 units at 45 each from supplier Kumar",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Kumar",
   "quantity": "12",
   "unit": "piece",
   "unit_price": "45"
  },
  "clarify": "yes:item missing"
 },
 {
  "id": "P012",
  "domain": "retail",
  "lang": "gu",
  "text": "Kumar પાસેથી 12 નંગ 45 રૂપિયાના લીધા",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "supplier": "Kumar",
   "quantity": "12",
   "unit": "piece",
   "unit_price": "45"
  },
  "clarify": "yes:item missing"
 },
 {
  "id": "I001",
  "domain": "grocery",
  "lang": "en",
  "text": "How much sugar is in stock?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "I002",
  "domain": "grocery",
  "lang": "hi",
  "text": "चीनी का स्टॉक कितना है?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "I003",
  "domain": "grocery",
  "lang": "gu",
  "text": "ખાંડનો stock કેટલો છે?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "I004",
  "domain": "grocery",
  "lang": "rh",
  "text": "cheeni ka stock kitna hai?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "I005",
  "domain": "grocery",
  "lang": "rg",
  "text": "khand no stock ketlo che?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "I006",
  "domain": "grocery",
  "lang": "gjmix",
  "text": "sugar નો stock કેટલો છે?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "I007",
  "domain": "retail",
  "lang": "en",
  "text": "Show low-stock items",
  "intent": "GET_LOW_STOCK",
  "entities": {
   "threshold": "business_default"
  },
  "clarify": "no"
 },
 {
  "id": "I008",
  "domain": "retail",
  "lang": "hi",
  "text": "कम स्टॉक वाली चीजें दिखाओ",
  "intent": "GET_LOW_STOCK",
  "entities": {
   "threshold": "business_default"
  },
  "clarify": "no"
 },
 {
  "id": "I009",
  "domain": "retail",
  "lang": "gu",
  "text": "ઓછા stock વાળી વસ્તુઓ બતાવો",
  "intent": "GET_LOW_STOCK",
  "entities": {
   "threshold": "business_default"
  },
  "clarify": "no"
 },
 {
  "id": "I010",
  "domain": "retail",
  "lang": "rh",
  "text": "low stock wali items dikhao",
  "intent": "GET_LOW_STOCK",
  "entities": {
   "threshold": "business_default"
  },
  "clarify": "no"
 },
 {
  "id": "I011",
  "domain": "retail",
  "lang": "en",
  "text": "Set sugar minimum stock to 20 kg",
  "intent": "UPDATE_REORDER_LEVEL",
  "entities": {
   "item": "sugar",
   "minimum_stock": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "I012",
  "domain": "grocery",
  "lang": "gu",
  "text": "ખાંડનું minimum stock 20 kilo રાખો",
  "intent": "UPDATE_REORDER_LEVEL",
  "entities": {
   "item": "sugar",
   "minimum_stock": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "I013",
  "domain": "grocery",
  "lang": "hi",
  "text": "चीनी का न्यूनतम स्टॉक 20 किलो रखो",
  "intent": "UPDATE_REORDER_LEVEL",
  "entities": {
   "item": "sugar",
   "minimum_stock": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "I014",
  "domain": "grocery",
  "lang": "rg",
  "text": "khand nu minimum stock 20 kilo rakho",
  "intent": "UPDATE_REORDER_LEVEL",
  "entities": {
   "item": "sugar",
   "minimum_stock": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "I015",
  "domain": "retail",
  "lang": "en",
  "text": "Stock of blue L shirts",
  "intent": "GET_STOCK",
  "entities": {
   "item": "shirt",
   "color": "blue",
   "size": "L"
  },
  "clarify": "no"
 },
 {
  "id": "I016",
  "domain": "clothing",
  "lang": "gu",
  "text": "blue L size ના shirt કેટલા છે?",
  "intent": "GET_STOCK",
  "entities": {
   "item": "shirt",
   "color": "blue",
   "size": "L"
  },
  "clarify": "no"
 },
 {
  "id": "C001",
  "domain": "all",
  "lang": "en",
  "text": "Add customer Ramesh Patel",
  "intent": "CREATE_CUSTOMER",
  "entities": {
   "customer": "Ramesh Patel"
  },
  "clarify": "no"
 },
 {
  "id": "C002",
  "domain": "all",
  "lang": "hi",
  "text": "ग्राहक रमेश पटेल जोड़ो",
  "intent": "CREATE_CUSTOMER",
  "entities": {
   "customer": "Ramesh Patel"
  },
  "clarify": "no"
 },
 {
  "id": "C003",
  "domain": "all",
  "lang": "gu",
  "text": "ગ્રાહક રમેશ પટેલ ઉમેરો",
  "intent": "CREATE_CUSTOMER",
  "entities": {
   "customer": "Ramesh Patel"
  },
  "clarify": "no"
 },
 {
  "id": "C004",
  "domain": "all",
  "lang": "rh",
  "text": "customer Ramesh Patel add karo",
  "intent": "CREATE_CUSTOMER",
  "entities": {
   "customer": "Ramesh Patel"
  },
  "clarify": "no"
 },
 {
  "id": "C005",
  "domain": "all",
  "lang": "rg",
  "text": "customer Ramesh Patel add karo",
  "intent": "CREATE_CUSTOMER",
  "entities": {
   "customer": "Ramesh Patel"
  },
  "clarify": "no"
 },
 {
  "id": "C006",
  "domain": "all",
  "lang": "en",
  "text": "Add Patel Traders as a supplier",
  "intent": "CREATE_SUPPLIER",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "C007",
  "domain": "all",
  "lang": "hi",
  "text": "पटेल ट्रेडर्स को सप्लायर के रूप में जोड़ो",
  "intent": "CREATE_SUPPLIER",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "C008",
  "domain": "all",
  "lang": "gu",
  "text": "Patel Traders ને supplier તરીકે ઉમેરો",
  "intent": "CREATE_SUPPLIER",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "C009",
  "domain": "all",
  "lang": "rg",
  "text": "Patel Traders ne supplier tarike add karo",
  "intent": "CREATE_SUPPLIER",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "C010",
  "domain": "all",
  "lang": "en",
  "text": "Find customer Ramesh",
  "intent": "SEARCH_CUSTOMER",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "C011",
  "domain": "all",
  "lang": "gu",
  "text": "Ramesh customer શોધો",
  "intent": "SEARCH_CUSTOMER",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "C012",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश ग्राहक खोजो",
  "intent": "SEARCH_CUSTOMER",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "L001",
  "domain": "all",
  "lang": "gu",
  "text": "રમેશે 5000 રૂપિયા આપ્યા",
  "intent": "RECORD_RECEIPT",
  "entities": {
   "customer": "Ramesh",
   "amount": "5000",
   "payment_method": "unspecified"
  },
  "clarify": "no"
 },
 {
  "id": "L002",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश ने 5000 रुपये दिए",
  "intent": "RECORD_RECEIPT",
  "entities": {
   "customer": "Ramesh",
   "amount": "5000",
   "payment_method": "unspecified"
  },
  "clarify": "no"
 },
 {
  "id": "L003",
  "domain": "all",
  "lang": "en",
  "text": "Ramesh paid 5000",
  "intent": "RECORD_RECEIPT",
  "entities": {
   "customer": "Ramesh",
   "amount": "5000",
   "payment_method": "unspecified"
  },
  "clarify": "no"
 },
 {
  "id": "L004",
  "domain": "all",
  "lang": "rg",
  "text": "Ramesh e 5000 rupiya aapya",
  "intent": "RECORD_RECEIPT",
  "entities": {
   "customer": "Ramesh",
   "amount": "5000",
   "payment_method": "unspecified"
  },
  "clarify": "no"
 },
 {
  "id": "L005",
  "domain": "all",
  "lang": "rh",
  "text": "Ramesh ne 5000 rupaye diye",
  "intent": "RECORD_RECEIPT",
  "entities": {
   "customer": "Ramesh",
   "amount": "5000",
   "payment_method": "unspecified"
  },
  "clarify": "no"
 },
 {
  "id": "L006",
  "domain": "all",
  "lang": "en",
  "text": "Ramesh still owes how much?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "L007",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश का कितना बकाया है?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "L008",
  "domain": "all",
  "lang": "gu",
  "text": "રમેશનું કેટલું બાકી છે?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "L009",
  "domain": "all",
  "lang": "rg",
  "text": "Ramesh nu ketlu baki che?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "L010",
  "domain": "all",
  "lang": "rh",
  "text": "Ramesh ka kitna baki hai?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "L011",
  "domain": "all",
  "lang": "en",
  "text": "How much do we owe Patel Traders?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "L012",
  "domain": "all",
  "lang": "hi",
  "text": "पटेल ट्रेडर्स को हमें कितना देना है?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "L013",
  "domain": "all",
  "lang": "gu",
  "text": "Patel Traders ને કેટલા રૂપિયા આપવા છે?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "L014",
  "domain": "all",
  "lang": "rg",
  "text": "Patel Traders ne ketla rupiya aapvana che?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "L015",
  "domain": "all",
  "lang": "en",
  "text": "Record a bank payment of 12000 to Patel Traders",
  "intent": "RECORD_PAYMENT",
  "entities": {
   "supplier": "Patel Traders",
   "amount": "12000",
   "payment_method": "bank"
  },
  "clarify": "no"
 },
 {
  "id": "L016",
  "domain": "all",
  "lang": "gu",
  "text": "Patel Traders ને bankથી 12000 આપ્યા",
  "intent": "RECORD_PAYMENT",
  "entities": {
   "supplier": "Patel Traders",
   "amount": "12000",
   "payment_method": "bank"
  },
  "clarify": "no"
 },
 {
  "id": "E001",
  "domain": "all",
  "lang": "en",
  "text": "Add 1500 rent expense for this month",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "rent",
   "amount": "1500",
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "E002",
  "domain": "all",
  "lang": "hi",
  "text": "इस महीने 1500 रुपये किराए का खर्च दर्ज करो",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "rent",
   "amount": "1500",
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "E003",
  "domain": "all",
  "lang": "gu",
  "text": "આ મહિને 1500 રૂપિયાનું rent expense લખો",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "rent",
   "amount": "1500",
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "E004",
  "domain": "all",
  "lang": "rh",
  "text": "is mahine 1500 rent expense note karo",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "rent",
   "amount": "1500",
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "E005",
  "domain": "all",
  "lang": "rg",
  "text": "aa mahine 1500 nu rent expense lakhjo",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "rent",
   "amount": "1500",
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "E006",
  "domain": "restaurant",
  "lang": "en",
  "text": "Record 800 for gas expense",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "gas",
   "amount": "800"
  },
  "clarify": "no"
 },
 {
  "id": "E007",
  "domain": "restaurant",
  "lang": "gu",
  "text": "ગેસનો 800 રૂપિયાનો ખર્ચ લખો",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "gas",
   "amount": "800"
  },
  "clarify": "no"
 },
 {
  "id": "E008",
  "domain": "restaurant",
  "lang": "hi",
  "text": "गैस का 800 रुपये खर्च दर्ज करो",
  "intent": "RECORD_EXPENSE",
  "entities": {
   "category": "gas",
   "amount": "800"
  },
  "clarify": "no"
 },
 {
  "id": "V001",
  "domain": "all",
  "lang": "en",
  "text": "Create an invoice for Ramesh",
  "intent": "CREATE_INVOICE",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "yes:item/amount missing"
 },
 {
  "id": "V002",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश के लिए बिल बनाओ",
  "intent": "CREATE_INVOICE",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "yes:item/amount missing"
 },
 {
  "id": "V003",
  "domain": "all",
  "lang": "gu",
  "text": "રમેશ માટે બિલ બનાવો",
  "intent": "CREATE_INVOICE",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "yes:item/amount missing"
 },
 {
  "id": "V004",
  "domain": "all",
  "lang": "rh",
  "text": "Ramesh ke liye bill bana do",
  "intent": "CREATE_INVOICE",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "yes:item/amount missing"
 },
 {
  "id": "V005",
  "domain": "all",
  "lang": "rg",
  "text": "Ramesh mate bill banavo",
  "intent": "CREATE_INVOICE",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "yes:item/amount missing"
 },
 {
  "id": "V006",
  "domain": "all",
  "lang": "en",
  "text": "Make a GST invoice for 10 kg sugar at 50 per kg",
  "intent": "CREATE_INVOICE",
  "entities": {
   "item": "sugar",
   "quantity": "10",
   "unit": "kg",
   "unit_price": "50",
   "tax_type": "GST"
  },
  "clarify": "yes:customer/tax details may be required"
 },
 {
  "id": "V007",
  "domain": "grocery",
  "lang": "gu",
  "text": "10 કિલો ખાંડ 50ના ભાવે GST bill બનાવો",
  "intent": "CREATE_INVOICE",
  "entities": {
   "item": "sugar",
   "quantity": "10",
   "unit": "kg",
   "unit_price": "50",
   "tax_type": "GST"
  },
  "clarify": "yes:customer/tax details may be required"
 },
 {
  "id": "V008",
  "domain": "grocery",
  "lang": "hi",
  "text": "10 किलो चीनी 50 रुपये किलो के हिसाब से GST बिल बनाओ",
  "intent": "CREATE_INVOICE",
  "entities": {
   "item": "sugar",
   "quantity": "10",
   "unit": "kg",
   "unit_price": "50",
   "tax_type": "GST"
  },
  "clarify": "yes:customer/tax details may be required"
 },
 {
  "id": "R001",
  "domain": "grocery",
  "lang": "en",
  "text": "Ramesh returned 2 packets biscuits",
  "intent": "RECORD_SALES_RETURN",
  "entities": {
   "customer": "Ramesh",
   "item": "biscuit",
   "quantity": "2",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "R002",
  "domain": "grocery",
  "lang": "hi",
  "text": "रमेश ने 2 पैकेट बिस्कुट वापस किए",
  "intent": "RECORD_SALES_RETURN",
  "entities": {
   "customer": "Ramesh",
   "item": "biscuit",
   "quantity": "2",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "R003",
  "domain": "grocery",
  "lang": "gu",
  "text": "રમેશે 2 પેકેટ બિસ્કિટ પાછા આપ્યા",
  "intent": "RECORD_SALES_RETURN",
  "entities": {
   "customer": "Ramesh",
   "item": "biscuit",
   "quantity": "2",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "R004",
  "domain": "grocery",
  "lang": "rg",
  "text": "Ramesh e 2 packet biscuit pacha aapya",
  "intent": "RECORD_SALES_RETURN",
  "entities": {
   "customer": "Ramesh",
   "item": "biscuit",
   "quantity": "2",
   "unit": "packet"
  },
  "clarify": "no"
 },
 {
  "id": "R005",
  "domain": "grocery",
  "lang": "en",
  "text": "Return 5 kg damaged rice to supplier",
  "intent": "RECORD_PURCHASE_RETURN",
  "entities": {
   "supplier": "unresolved",
   "item": "rice",
   "quantity": "5",
   "unit": "kg",
   "reason": "damaged"
  },
  "clarify": "yes:supplier missing"
 },
 {
  "id": "R006",
  "domain": "grocery",
  "lang": "gu",
  "text": "5 કિલો ખરાબ ચોખા supplier ને પાછા મોકલો",
  "intent": "RECORD_PURCHASE_RETURN",
  "entities": {
   "item": "rice",
   "quantity": "5",
   "unit": "kg",
   "reason": "damaged",
   "supplier": "unresolved"
  },
  "clarify": "yes:supplier missing"
 },
 {
  "id": "Q001",
  "domain": "all",
  "lang": "en",
  "text": "Show today's sales",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "Q002",
  "domain": "all",
  "lang": "hi",
  "text": "आज की बिक्री दिखाओ",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "Q003",
  "domain": "all",
  "lang": "gu",
  "text": "આજનું વેચાણ બતાવો",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "Q004",
  "domain": "all",
  "lang": "rh",
  "text": "aaj ki sale dikhao",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "Q005",
  "domain": "all",
  "lang": "rg",
  "text": "aaj nu vechan batavo",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "Q006",
  "domain": "all",
  "lang": "gjmix",
  "text": "આજની sales report બતાવો",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "Q007",
  "domain": "all",
  "lang": "en",
  "text": "What was my profit last month?",
  "intent": "GET_PROFIT_REPORT",
  "entities": {
   "period": "last_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q008",
  "domain": "all",
  "lang": "hi",
  "text": "पिछले महीने का मुनाफा कितना था?",
  "intent": "GET_PROFIT_REPORT",
  "entities": {
   "period": "last_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q009",
  "domain": "all",
  "lang": "gu",
  "text": "ગયા મહિને કેટલો નફો થયો?",
  "intent": "GET_PROFIT_REPORT",
  "entities": {
   "period": "last_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q010",
  "domain": "all",
  "lang": "rh",
  "text": "pichle mahine kitna profit hua?",
  "intent": "GET_PROFIT_REPORT",
  "entities": {
   "period": "last_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q011",
  "domain": "all",
  "lang": "en",
  "text": "Show expenses for this month",
  "intent": "GET_EXPENSE_REPORT",
  "entities": {
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q012",
  "domain": "all",
  "lang": "gu",
  "text": "આ મહિના ના expenses બતાવો",
  "intent": "GET_EXPENSE_REPORT",
  "entities": {
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q013",
  "domain": "all",
  "lang": "hi",
  "text": "इस महीने के खर्च दिखाओ",
  "intent": "GET_EXPENSE_REPORT",
  "entities": {
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "Q014",
  "domain": "all",
  "lang": "en",
  "text": "Give me outstanding customers",
  "intent": "GET_RECEIVABLE_REPORT",
  "entities": {
   "scope": "customers"
  },
  "clarify": "no"
 },
 {
  "id": "Q015",
  "domain": "all",
  "lang": "gu",
  "text": "બધા customers નું outstanding બતાવો",
  "intent": "GET_RECEIVABLE_REPORT",
  "entities": {
   "scope": "customers"
  },
  "clarify": "no"
 },
 {
  "id": "Q016",
  "domain": "all",
  "lang": "hi",
  "text": "सभी ग्राहकों का बकाया दिखाओ",
  "intent": "GET_RECEIVABLE_REPORT",
  "entities": {
   "scope": "customers"
  },
  "clarify": "no"
 },
 {
  "id": "O001",
  "domain": "grocery",
  "lang": "en",
  "text": "Order 20 kg sugar from Patel Traders",
  "intent": "CREATE_PURCHASE_ORDER",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "O002",
  "domain": "grocery",
  "lang": "hi",
  "text": "पटेल ट्रेडर्स से 20 किलो चीनी मंगवा दो",
  "intent": "CREATE_PURCHASE_ORDER",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "O003",
  "domain": "grocery",
  "lang": "gu",
  "text": "Patel Traders પાસેથી 20 કિલો ખાંડ મંગાવી દો",
  "intent": "CREATE_PURCHASE_ORDER",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "O004",
  "domain": "grocery",
  "lang": "rg",
  "text": "Patel Traders mathi 20 kilo khand mangavi do",
  "intent": "CREATE_PURCHASE_ORDER",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "O005",
  "domain": "grocery",
  "lang": "rh",
  "text": "Patel Traders se 20 kilo cheeni mangwa do",
  "intent": "CREATE_PURCHASE_ORDER",
  "entities": {
   "supplier": "Patel Traders",
   "item": "sugar",
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "O006",
  "domain": "construction",
  "lang": "gu",
  "text": "25 સિમેન્ટની બોરી site પર કાલે મોકલજો",
  "intent": "CREATE_DELIVERY_ORDER",
  "entities": {
   "item": "cement",
   "quantity": "25",
   "unit": "bag",
   "destination": "site",
   "date": "tomorrow"
  },
  "clarify": "no"
 },
 {
  "id": "O007",
  "domain": "construction",
  "lang": "hi",
  "text": "25 सीमेंट की बोरी साइट पर कल भेजना",
  "intent": "CREATE_DELIVERY_ORDER",
  "entities": {
   "item": "cement",
   "quantity": "25",
   "unit": "bag",
   "destination": "site",
   "date": "tomorrow"
  },
  "clarify": "no"
 },
 {
  "id": "O008",
  "domain": "construction",
  "lang": "rg",
  "text": "25 cement ni bori site par kale mokaljo",
  "intent": "CREATE_DELIVERY_ORDER",
  "entities": {
   "item": "cement",
   "quantity": "25",
   "unit": "bag",
   "destination": "site",
   "date": "tomorrow"
  },
  "clarify": "no"
 },
 {
  "id": "O009",
  "domain": "clothing",
  "lang": "en",
  "text": "Reserve 2 blue L shirts for Ramesh",
  "intent": "RESERVE_ITEM",
  "entities": {
   "customer": "Ramesh",
   "item": "shirt",
   "color": "blue",
   "size": "L",
   "quantity": "2"
  },
  "clarify": "no"
 },
 {
  "id": "O010",
  "domain": "clothing",
  "lang": "gu",
  "text": "Ramesh માટે 2 blue L shirt reserve રાખજો",
  "intent": "RESERVE_ITEM",
  "entities": {
   "customer": "Ramesh",
   "item": "shirt",
   "color": "blue",
   "size": "L",
   "quantity": "2"
  },
  "clarify": "no"
 },
 {
  "id": "A001",
  "domain": "all",
  "lang": "gu",
  "text": "Patel ને 20 box મોકલ્યા",
  "intent": "AMBIGUOUS_TRANSACTION",
  "entities": {
   "party": "Patel",
   "quantity": "20",
   "unit": "box"
  },
  "clarify": "yes"
 },
 {
  "id": "A002",
  "domain": "all",
  "lang": "hi",
  "text": "पटेल को 20 बॉक्स भेजे",
  "intent": "AMBIGUOUS_TRANSACTION",
  "entities": {
   "party": "Patel",
   "quantity": "20",
   "unit": "box"
  },
  "clarify": "yes"
 },
 {
  "id": "A003",
  "domain": "all",
  "lang": "en",
  "text": "Sent 20 boxes to Patel",
  "intent": "AMBIGUOUS_TRANSACTION",
  "entities": {
   "party": "Patel",
   "quantity": "20",
   "unit": "box"
  },
  "clarify": "yes"
 },
 {
  "id": "A004",
  "domain": "all",
  "lang": "rg",
  "text": "Patel ne 20 box moklya",
  "intent": "AMBIGUOUS_TRANSACTION",
  "entities": {
   "party": "Patel",
   "quantity": "20",
   "unit": "box"
  },
  "clarify": "yes"
 },
 {
  "id": "A005",
  "domain": "all",
  "lang": "gu",
  "text": "કાલે માલ મોકલજો",
  "intent": "MISSING_INFORMATION",
  "entities": {
   "date": "tomorrow",
   "action": "send goods"
  },
  "clarify": "yes"
 },
 {
  "id": "A006",
  "domain": "all",
  "lang": "hi",
  "text": "कल माल भेज देना",
  "intent": "MISSING_INFORMATION",
  "entities": {
   "date": "tomorrow",
   "action": "send goods"
  },
  "clarify": "yes"
 },
 {
  "id": "A007",
  "domain": "all",
  "lang": "en",
  "text": "Send the goods tomorrow",
  "intent": "MISSING_INFORMATION",
  "entities": {
   "date": "tomorrow",
   "action": "send goods"
  },
  "clarify": "yes"
 },
 {
  "id": "A008",
  "domain": "all",
  "lang": "en",
  "text": "Create invoice",
  "intent": "MISSING_INFORMATION",
  "entities": {
   "action": "create_invoice"
  },
  "clarify": "yes"
 },
 {
  "id": "A009",
  "domain": "all",
  "lang": "gu",
  "text": "બિલ બનાવી દો",
  "intent": "MISSING_INFORMATION",
  "entities": {
   "action": "create_invoice"
  },
  "clarify": "yes"
 },
 {
  "id": "A010",
  "domain": "all",
  "lang": "hi",
  "text": "बिल बना दो",
  "intent": "MISSING_INFORMATION",
  "entities": {
   "action": "create_invoice"
  },
  "clarify": "yes"
 },
 {
  "id": "X001",
  "domain": "grocery",
  "lang": "en",
  "text": "Sold 50 kg sugar to Ramesh. No, it was 15 kg.",
  "intent": "CORRECT_TRANSACTION",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "correct_quantity": "15"
  },
  "clarify": "no"
 },
 {
  "id": "X002",
  "domain": "grocery",
  "lang": "gu",
  "text": "Ramesh ને 50 kilo ખાંડ વેચી. ના, 15 kilo હતું.",
  "intent": "CORRECT_TRANSACTION",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "correct_quantity": "15"
  },
  "clarify": "no"
 },
 {
  "id": "X003",
  "domain": "grocery",
  "lang": "hi",
  "text": "रमेश को 50 किलो चीनी बेची। नहीं, 15 किलो था।",
  "intent": "CORRECT_TRANSACTION",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "correct_quantity": "15"
  },
  "clarify": "no"
 },
 {
  "id": "X004",
  "domain": "grocery",
  "lang": "rg",
  "text": "Ramesh ne 50 kilo khand vechi. Na, 15 kilo hatu.",
  "intent": "CORRECT_TRANSACTION",
  "entities": {
   "customer": "Ramesh",
   "item": "sugar",
   "correct_quantity": "15"
  },
  "clarify": "no"
 },
 {
  "id": "X005",
  "domain": "all",
  "lang": "en",
  "text": "Change the amount from 5000 to 4500",
  "intent": "CORRECT_TRANSACTION",
  "entities": {
   "old_amount": "5000",
   "new_amount": "4500"
  },
  "clarify": "no"
 },
 {
  "id": "X006",
  "domain": "all",
  "lang": "gu",
  "text": "amount 5000માંથી 4500 કરો",
  "intent": "CORRECT_TRANSACTION",
  "entities": {
   "old_amount": "5000",
   "new_amount": "4500"
  },
  "clarify": "no"
 },
 {
  "id": "B001",
  "domain": "pharmacy",
  "lang": "en",
  "text": "Add 10 strips of paracetamol, batch A12, expiry Dec 2027",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "item": "paracetamol",
   "quantity": "10",
   "unit": "strip",
   "batch": "A12",
   "expiry": "2027-12"
  },
  "clarify": "no"
 },
 {
  "id": "B002",
  "domain": "pharmacy",
  "lang": "hi",
  "text": "पैरासिटामोल की 10 स्ट्रिप, बैच A12, एक्सपायरी दिसंबर 2027",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "item": "paracetamol",
   "quantity": "10",
   "unit": "strip",
   "batch": "A12",
   "expiry": "2027-12"
  },
  "clarify": "no"
 },
 {
  "id": "B003",
  "domain": "pharmacy",
  "lang": "gu",
  "text": "paracetamol ની 10 strip, batch A12, expiry Dec 2027",
  "intent": "RECORD_PURCHASE",
  "entities": {
   "item": "paracetamol",
   "quantity": "10",
   "unit": "strip",
   "batch": "A12",
   "expiry": "2027-12"
  },
  "clarify": "no"
 },
 {
  "id": "B004",
  "domain": "clothing",
  "lang": "en",
  "text": "Add 12 blue shirts size L",
  "intent": "CREATE_ITEM_VARIANT",
  "entities": {
   "item": "shirt",
   "quantity": "12",
   "color": "blue",
   "size": "L"
  },
  "clarify": "no"
 },
 {
  "id": "B005",
  "domain": "clothing",
  "lang": "gu",
  "text": "blue L size ના 12 shirt add કરો",
  "intent": "CREATE_ITEM_VARIANT",
  "entities": {
   "item": "shirt",
   "quantity": "12",
   "color": "blue",
   "size": "L"
  },
  "clarify": "no"
 },
 {
  "id": "B006",
  "domain": "restaurant",
  "lang": "en",
  "text": "Record 30 plates of dosa sold",
  "intent": "RECORD_SALE",
  "entities": {
   "item": "dosa",
   "quantity": "30",
   "unit": "plate"
  },
  "clarify": "no"
 },
 {
  "id": "B007",
  "domain": "restaurant",
  "lang": "hi",
  "text": "30 प्लेट डोसा बेचा दर्ज करो",
  "intent": "RECORD_SALE",
  "entities": {
   "item": "dosa",
   "quantity": "30",
   "unit": "plate"
  },
  "clarify": "no"
 },
 {
  "id": "B008",
  "domain": "restaurant",
  "lang": "gu",
  "text": "30 plate dosa વેચાણમાં લખો",
  "intent": "RECORD_SALE",
  "entities": {
   "item": "dosa",
   "quantity": "30",
   "unit": "plate"
  },
  "clarify": "no"
 },
 {
  "id": "B009",
  "domain": "manufacturing",
  "lang": "en",
  "text": "Use 50 kg steel for today's production",
  "intent": "RECORD_MATERIAL_ISSUE",
  "entities": {
   "item": "steel",
   "quantity": "50",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "B010",
  "domain": "manufacturing",
  "lang": "gu",
  "text": "આજના production માટે 50 kilo steel વાપર્યું",
  "intent": "RECORD_MATERIAL_ISSUE",
  "entities": {
   "item": "steel",
   "quantity": "50",
   "unit": "kg",
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "B011",
  "domain": "hardware",
  "lang": "en",
  "text": "Show 2 inch PVC pipe stock",
  "intent": "GET_STOCK",
  "entities": {
   "item": "PVC pipe",
   "size": "2 inch"
  },
  "clarify": "no"
 },
 {
  "id": "B012",
  "domain": "hardware",
  "lang": "hi",
  "text": "2 इंच PVC पाइप का स्टॉक दिखाओ",
  "intent": "GET_STOCK",
  "entities": {
   "item": "PVC pipe",
   "size": "2 inch"
  },
  "clarify": "no"
 },
 {
  "id": "B013",
  "domain": "services",
  "lang": "en",
  "text": "Book a service for Ramesh tomorrow at 11",
  "intent": "CREATE_APPOINTMENT",
  "entities": {
   "customer": "Ramesh",
   "date": "tomorrow",
   "time": "11:00"
  },
  "clarify": "no"
 },
 {
  "id": "B014",
  "domain": "services",
  "lang": "gu",
  "text": "Ramesh માટે કાલે 11 વાગ્યે service book કરો",
  "intent": "CREATE_APPOINTMENT",
  "entities": {
   "customer": "Ramesh",
   "date": "tomorrow",
   "time": "11:00"
  },
  "clarify": "no"
 },
 {
  "id": "N001",
  "domain": "all",
  "lang": "rg",
  "text": "aaj nu vechan ketlu?",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "N002",
  "domain": "all",
  "lang": "rh",
  "text": "aaj ki sale kitni hai",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "today"
  },
  "clarify": "no"
 },
 {
  "id": "N003",
  "domain": "all",
  "lang": "gjmix",
  "text": "કાલની sale report બતાવ",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "N004",
  "domain": "all",
  "lang": "himix",
  "text": "kal ka sales report dikhao",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "N005",
  "domain": "all",
  "lang": "rg",
  "text": "stock ma ketlu maal baki che?",
  "intent": "GET_STOCK",
  "entities": {
   "scope": "inventory"
  },
  "clarify": "no"
 },
 {
  "id": "N006",
  "domain": "all",
  "lang": "rh",
  "text": "stock mein kitna maal baki hai?",
  "intent": "GET_STOCK",
  "entities": {
   "scope": "inventory"
  },
  "clarify": "no"
 },
 {
  "id": "N007",
  "domain": "all",
  "lang": "gu",
  "text": "માલ આવી ગયો છે",
  "intent": "RECORD_RECEIPT_OF_GOODS",
  "entities": {
   "state": "goods_received"
  },
  "clarify": "yes:which purchase/order"
 },
 {
  "id": "N008",
  "domain": "all",
  "lang": "hi",
  "text": "माल आ गया है",
  "intent": "RECORD_RECEIPT_OF_GOODS",
  "entities": {
   "state": "goods_received"
  },
  "clarify": "yes:which purchase/order"
 },
 {
  "id": "T001",
  "domain": "all",
  "lang": "en",
  "text": "What is Ramesh's outstanding?",
  "intent": "TOOL_QUERY_LEDGER",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "T002",
  "domain": "all",
  "lang": "gu",
  "text": "Ramesh નું outstanding કેટલું?",
  "intent": "TOOL_QUERY_LEDGER",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "T003",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश का बकाया कितना है?",
  "intent": "TOOL_QUERY_LEDGER",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "T004",
  "domain": "all",
  "lang": "en",
  "text": "Add 10 kg sugar to stock",
  "intent": "TOOL_UPDATE_INVENTORY",
  "entities": {
   "item": "sugar",
   "quantity": "10",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "T005",
  "domain": "all",
  "lang": "gu",
  "text": "stockમાં 10 kilo sugar ઉમેરો",
  "intent": "TOOL_UPDATE_INVENTORY",
  "entities": {
   "item": "sugar",
   "quantity": "10",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "T006",
  "domain": "all",
  "lang": "hi",
  "text": "स्टॉक में 10 किलो चीनी जोड़ो",
  "intent": "TOOL_UPDATE_INVENTORY",
  "entities": {
   "item": "sugar",
   "quantity": "10",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "T007",
  "domain": "all",
  "lang": "en",
  "text": "How much did we sell yesterday?",
  "intent": "TOOL_QUERY_SALES",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "T008",
  "domain": "all",
  "lang": "gu",
  "text": "ગઈકાલે કેટલું વેચાણ થયું?",
  "intent": "TOOL_QUERY_SALES",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "Z001",
  "domain": "all",
  "lang": "en",
  "text": "Delete all sales",
  "intent": "DANGEROUS_BULK_DELETE",
  "entities": {
   "scope": "sales",
   "all": "true"
  },
  "clarify": "yes"
 },
 {
  "id": "Z002",
  "domain": "all",
  "lang": "gu",
  "text": "બધા sales delete કરી નાખો",
  "intent": "DANGEROUS_BULK_DELETE",
  "entities": {
   "scope": "sales",
   "all": "true"
  },
  "clarify": "yes"
 },
 {
  "id": "Z003",
  "domain": "all",
  "lang": "hi",
  "text": "सारी बिक्री डिलीट कर दो",
  "intent": "DANGEROUS_BULK_DELETE",
  "entities": {
   "scope": "sales",
   "all": "true"
  },
  "clarify": "yes"
 },
 {
  "id": "Z004",
  "domain": "all",
  "lang": "en",
  "text": "Change Ramesh's balance to zero",
  "intent": "MANUAL_BALANCE_OVERRIDE",
  "entities": {
   "customer": "Ramesh",
   "balance": "0"
  },
  "clarify": "yes"
 },
 {
  "id": "Z005",
  "domain": "all",
  "lang": "gu",
  "text": "Ramesh નું balance zero કરી દો",
  "intent": "MANUAL_BALANCE_OVERRIDE",
  "entities": {
   "customer": "Ramesh",
   "balance": "0"
  },
  "clarify": "yes"
 },
 {
  "id": "Z006",
  "domain": "all",
  "lang": "en",
  "text": "Show me another customer's private phone number",
  "intent": "PRIVATE_DATA_REQUEST",
  "entities": {
   "target": "other_customer_phone"
  },
  "clarify": "yes"
 },
 {
  "id": "M001",
  "domain": "grocery",
  "lang": "gu",
  "text": "20 kilo મોકલવાના છે",
  "intent": "PENDING_ORDER",
  "entities": {
   "quantity": "20",
   "unit": "kg"
  },
  "clarify": "yes"
 },
 {
  "id": "M002",
  "domain": "grocery",
  "lang": "gu",
  "text": "ખાંડ",
  "intent": "FILL_PENDING_ITEM",
  "entities": {
   "item": "sugar"
  },
  "clarify": "no"
 },
 {
  "id": "M003",
  "domain": "grocery",
  "lang": "gu",
  "text": "Patel ને",
  "intent": "FILL_PENDING_PARTY",
  "entities": {
   "customer_or_supplier": "Patel"
  },
  "clarify": "yes"
 },
 {
  "id": "M004",
  "domain": "grocery",
  "lang": "en",
  "text": "Order 20 kg sugar",
  "intent": "CREATE_PURCHASE_ORDER",
  "entities": {
   "quantity": "20",
   "unit": "kg",
   "item": "sugar"
  },
  "clarify": "yes"
 },
 {
  "id": "M005",
  "domain": "grocery",
  "lang": "en",
  "text": "From Patel Traders",
  "intent": "FILL_PENDING_SUPPLIER",
  "entities": {
   "supplier": "Patel Traders"
  },
  "clarify": "no"
 },
 {
  "id": "F001",
  "domain": "all",
  "lang": "en",
  "text": "Why is my profit lower this month?",
  "intent": "EXPLAIN_PROFIT_CHANGE",
  "entities": {
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "F002",
  "domain": "all",
  "lang": "gu",
  "text": "આ મહિને profit કેમ ઓછો છે?",
  "intent": "EXPLAIN_PROFIT_CHANGE",
  "entities": {
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "F003",
  "domain": "all",
  "lang": "hi",
  "text": "इस महीने मुनाफा कम क्यों है?",
  "intent": "EXPLAIN_PROFIT_CHANGE",
  "entities": {
   "period": "this_month"
  },
  "clarify": "no"
 },
 {
  "id": "F004",
  "domain": "all",
  "lang": "en",
  "text": "Which products sold the most this week?",
  "intent": "TOP_SELLING_ITEMS",
  "entities": {
   "period": "this_week"
  },
  "clarify": "no"
 },
 {
  "id": "F005",
  "domain": "all",
  "lang": "gu",
  "text": "આ અઠવાડિયે સૌથી વધારે કઈ વસ્તુ વેચાઈ?",
  "intent": "TOP_SELLING_ITEMS",
  "entities": {
   "period": "this_week"
  },
  "clarify": "no"
 },
 {
  "id": "U001",
  "domain": "grocery",
  "lang": "en",
  "text": "Add 5 kilos sugar",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "item": "sugar",
   "quantity": "5",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "U002",
  "domain": "grocery",
  "lang": "hi",
  "text": "5 किलो चीनी",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "item": "sugar",
   "quantity": "5",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "U003",
  "domain": "grocery",
  "lang": "gu",
  "text": "5 કિલો ખાંડ",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "item": "sugar",
   "quantity": "5",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "U004",
  "domain": "grocery",
  "lang": "rg",
  "text": "5 kilo khand",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "item": "sugar",
   "quantity": "5",
   "unit": "kg"
  },
  "clarify": "no"
 },
 {
  "id": "U005",
  "domain": "retail",
  "lang": "en",
  "text": "12 pcs",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "quantity": "12",
   "unit": "piece"
  },
  "clarify": "no"
 },
 {
  "id": "U006",
  "domain": "retail",
  "lang": "gu",
  "text": "12 નંગ",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "quantity": "12",
   "unit": "piece"
  },
  "clarify": "no"
 },
 {
  "id": "U007",
  "domain": "retail",
  "lang": "hi",
  "text": "12 नग",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "quantity": "12",
   "unit": "piece"
  },
  "clarify": "no"
 },
 {
  "id": "U008",
  "domain": "wholesale",
  "lang": "en",
  "text": "3 boxes",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "quantity": "3",
   "unit": "box"
  },
  "clarify": "no"
 },
 {
  "id": "U009",
  "domain": "wholesale",
  "lang": "gu",
  "text": "3 બોક્સ",
  "intent": "UNIT_NORMALIZATION",
  "entities": {
   "quantity": "3",
   "unit": "box"
  },
  "clarify": "no"
 },
 {
  "id": "Y001",
  "domain": "all",
  "lang": "en",
  "text": "How much is pending from Ramesh?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "Y002",
  "domain": "all",
  "lang": "en",
  "text": "How much does Ramesh owe us?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "Y003",
  "domain": "all",
  "lang": "gu",
  "text": "Ramesh નું બાકી કેટલું?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "Y004",
  "domain": "all",
  "lang": "gu",
  "text": "Ramesh પાસેથી કેટલા લેવા છે?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "Y005",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश से कितना लेना है?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "Y006",
  "domain": "all",
  "lang": "rh",
  "text": "Ramesh se kitna lena hai?",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "no"
 },
 {
  "id": "Y007",
  "domain": "all",
  "lang": "en",
  "text": "What do we owe Patel?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel"
  },
  "clarify": "no"
 },
 {
  "id": "Y008",
  "domain": "all",
  "lang": "gu",
  "text": "Patel ને કેટલું આપવાનું છે?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel"
  },
  "clarify": "no"
 },
 {
  "id": "Y009",
  "domain": "all",
  "lang": "hi",
  "text": "पटेल को कितना देना है?",
  "intent": "GET_SUPPLIER_PAYABLE",
  "entities": {
   "supplier": "Patel"
  },
  "clarify": "no"
 },
 {
  "id": "G001",
  "domain": "grocery",
  "lang": "en",
  "text": "Do not record this sale",
  "intent": "NEGATE_ACTION",
  "entities": {
   "action": "record_sale"
  },
  "clarify": "no"
 },
 {
  "id": "G002",
  "domain": "grocery",
  "lang": "gu",
  "text": "આ sale લખશો નહીં",
  "intent": "NEGATE_ACTION",
  "entities": {
   "action": "record_sale"
  },
  "clarify": "no"
 },
 {
  "id": "G003",
  "domain": "grocery",
  "lang": "hi",
  "text": "इस बिक्री को दर्ज मत करो",
  "intent": "NEGATE_ACTION",
  "entities": {
   "action": "record_sale"
  },
  "clarify": "no"
 },
 {
  "id": "G004",
  "domain": "all",
  "lang": "en",
  "text": "I didn't receive the payment",
  "intent": "NEGATE_TRANSACTION",
  "entities": {
   "action": "payment_received"
  },
  "clarify": "no"
 },
 {
  "id": "G005",
  "domain": "all",
  "lang": "gu",
  "text": "payment મળ્યું નથી",
  "intent": "NEGATE_TRANSACTION",
  "entities": {
   "action": "payment_received"
  },
  "clarify": "no"
 },
 {
  "id": "G006",
  "domain": "all",
  "lang": "hi",
  "text": "पेमेंट मिला नहीं है",
  "intent": "NEGATE_TRANSACTION",
  "entities": {
   "action": "payment_received"
  },
  "clarify": "no"
 },
 {
  "id": "D001",
  "domain": "all",
  "lang": "en",
  "text": "Show sales from yesterday",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "D002",
  "domain": "all",
  "lang": "gu",
  "text": "ગઈકાલનું વેચાણ બતાવો",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "D003",
  "domain": "all",
  "lang": "hi",
  "text": "कल की बिक्री दिखाओ",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "D004",
  "domain": "all",
  "lang": "rg",
  "text": "gai kal nu vechan batavo",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "D005",
  "domain": "all",
  "lang": "rh",
  "text": "kal ki sale dikhao",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "date": "yesterday"
  },
  "clarify": "no"
 },
 {
  "id": "D006",
  "domain": "all",
  "lang": "en",
  "text": "Sales between Monday and Friday",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "start": "Monday",
   "end": "Friday"
  },
  "clarify": "no"
 },
 {
  "id": "D007",
  "domain": "all",
  "lang": "gu",
  "text": "સોમવારથી શુક્રવાર સુધીનું વેચાણ",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "start": "Monday",
   "end": "Friday"
  },
  "clarify": "no"
 },
 {
  "id": "D008",
  "domain": "all",
  "lang": "hi",
  "text": "सोमवार से शुक्रवार तक की बिक्री",
  "intent": "GET_SALES_REPORT",
  "entities": {
   "start": "Monday",
   "end": "Friday"
  },
  "clarify": "no"
 },
 {
  "id": "H001",
  "domain": "all",
  "lang": "en",
  "text": "Show Ramesh's balance",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "conditional"
 },
 {
  "id": "H002",
  "domain": "all",
  "lang": "gu",
  "text": "Ramesh નું balance બતાવો",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "conditional"
 },
 {
  "id": "H003",
  "domain": "all",
  "lang": "hi",
  "text": "रमेश का बैलेंस दिखाओ",
  "intent": "GET_CUSTOMER_OUTSTANDING",
  "entities": {
   "customer": "Ramesh"
  },
  "clarify": "conditional"
 },
 {
  "id": "H004",
  "domain": "all",
  "lang": "en",
  "text": "Add sugar",
  "intent": "CREATE_ITEM",
  "entities": {
   "item": "sugar"
  },
  "clarify": "yes"
 },
 {
  "id": "H005",
  "domain": "all",
  "lang": "gu",
  "text": "ખાંડ add કરો",
  "intent": "CREATE_ITEM",
  "entities": {
   "item": "sugar"
  },
  "clarify": "yes"
 },
 {
  "id": "H006",
  "domain": "all",
  "lang": "en",
  "text": "Paid Patel 5000",
  "intent": "RECORD_PAYMENT",
  "entities": {
   "party": "Patel",
   "amount": "5000"
  },
  "clarify": "yes"
 }
];
