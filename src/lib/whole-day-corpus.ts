// AUTO-DERIVED from the whole-day business narration dataset (offline, no network).
// Each record: a full-day narration + the business event types it must produce.

export interface WholeDayRecord { id: string; domain: string; lang: string; text: string; events: string[] }

export const WHOLE_DAY_CORPUS: WholeDayRecord[] = [
 {
  "id": "D001",
  "domain": "services",
  "lang": "himix",
  "text": "Subah shop open ki. Patel Traders se 7 cleaning service aaye. Amit ko 2 cleaning service ₹250 me sell kiye, kuch credit par hai. Old outstanding me Amit ne ₹10000 UPI se diye. rent expense ₹750 hua. Staff ko ₹7500 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D002",
  "domain": "restaurant",
  "lang": "rh",
  "text": "subah business khola. Mehta Suppliers se 15 thali aaye. dopahar me Neha ko 10 thali ₹1500 me diye, kuch udhaar raha. Neha se purane baki ke badle ₹1500 mile. repair ka ₹500 business kharch hua. staff ko ₹250 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D003",
  "domain": "construction",
  "lang": "rh",
  "text": "subah business khola. Shah Distributors se 8 tiles aaye. dopahar me Patel ko 3 tiles ₹750 me diye, kuch udhaar raha. Patel se purane baki ke badle ₹1500 mile. fuel ka ₹2500 business kharch hua. staff ko ₹750 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D004",
  "domain": "clothing",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Shah Distributors પાસેથી 25 t-shirt આવ્યા. બપોરે Suresh ને 20 t-shirt ₹3000 માં આપ્યા, થોડું ઉધાર રહ્યું. Suresh પાસેથી જૂના બાકી સામે ₹3000 મળ્યા. electricity માટે ₹250 business ખર્ચ થયો. staff ને ₹1200 advance આપ્યો. ઘરે ₹900 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D005",
  "domain": "grocery",
  "lang": "himix",
  "text": "Subah shop open ki. Kumar Agency se 15 oil aaye. Neha ko 10 oil ₹2000 me sell kiye, kuch credit par hai. Old outstanding me Neha ne ₹2500 UPI se diye. phone/internet expense ₹500 hua. Staff ko ₹7500 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D006",
  "domain": "salon",
  "lang": "en",
  "text": "Opened the business in the morning. Patel Traders delivered 25 units of facial. Sold 20 units to Suresh for ₹1500; part of the sale is on credit. Suresh paid ₹2500 against an old outstanding balance. Business fuel cost ₹1500. Paid staff ₹3000 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D007",
  "domain": "wholesale",
  "lang": "rg",
  "text": "savare business kholyo. Kumar Agency pase thi 17 soap cartons aavya. bapore Suresh ne 12 soap cartons ₹2500 ma aapya, thodu udhar rahyu. Suresh pase thi old baki same ₹250 malya. courier mate ₹750 business kharch thayo. staff ne ₹250 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D008",
  "domain": "mixed",
  "lang": "gjmix",
  "text": "Aaje shop ma Ramesh ne 5 carton udhar aapya. Patel Traders pase thi 10 carton aavya. Amit e old baki ma ₹3000 aapya. Neha ne ₹1500 staff advance aapyo. Supplier ne ₹5000 UPI thi aapya. Ghar mate ₹900 no saman lidho, personal rakhjo. Ek invoice nu PDF banavanu che.",
  "events": []
 },
 {
  "id": "D009",
  "domain": "pharmacy",
  "lang": "rg",
  "text": "savare business kholyo. Shah Distributors pase thi 8 paracetamol aavya. bapore Ramesh ne 3 paracetamol ₹5000 ma aapya, thodu udhar rahyu. Ramesh pase thi old baki same ₹7500 malya. packing mate ₹250 business kharch thayo. staff ne ₹10000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D010",
  "domain": "services",
  "lang": "en",
  "text": "Opened the business in the morning. Shah Distributors delivered 8 units of repair job. Sold 3 units to Ramesh for ₹1200; part of the sale is on credit. Ramesh paid ₹7500 against an old outstanding balance. Business phone/internet cost ₹5000. Paid staff ₹2000 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D011",
  "domain": "grocery",
  "lang": "rh",
  "text": "subah business khola. Mehta Suppliers se 25 rice aaye. dopahar me Neha ko 20 rice ₹2000 me diye, kuch udhaar raha. Neha se purane baki ke badle ₹7500 mile. fuel ka ₹1500 business kharch hua. staff ko ₹2000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D012",
  "domain": "home_business",
  "lang": "en",
  "text": "Opened the business in the morning. Kumar Agency delivered 15 units of snacks. Sold 10 units to Patel for ₹1000; part of the sale is on credit. Patel paid ₹1000 against an old outstanding balance. Business rent cost ₹10000. Paid staff ₹1200 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D013",
  "domain": "wholesale",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Patel Traders પાસેથી 15 soap cartons આવ્યા. બપોરે Kiran ને 10 soap cartons ₹750 માં આપ્યા, થોડું ઉધાર રહ્યું. Kiran પાસેથી જૂના બાકી સામે ₹500 મળ્યા. phone/internet માટે ₹2000 business ખર્ચ થયો. staff ને ₹500 advance આપ્યો. ઘરે ₹900 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D014",
  "domain": "hardware",
  "lang": "rh",
  "text": "subah business khola. Mehta Suppliers se 10 wire aaye. dopahar me Amit ko 5 wire ₹250 me diye, kuch udhaar raha. Amit se purane baki ke badle ₹250 mile. rent ka ₹1200 business kharch hua. staff ko ₹250 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D015",
  "domain": "grocery",
  "lang": "rg",
  "text": "savare business kholyo. Mehta Suppliers pase thi 25 biscuits aavya. bapore Suresh ne 20 biscuits ₹1500 ma aapya, thodu udhar rahyu. Suresh pase thi old baki same ₹2500 malya. courier mate ₹5000 business kharch thayo. staff ne ₹5000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D016",
  "domain": "clothing",
  "lang": "en",
  "text": "Opened the business in the morning. Kumar Agency delivered 15 units of shirt. Sold 10 units to Patel for ₹2500; part of the sale is on credit. Patel paid ₹1200 against an old outstanding balance. Business transport cost ₹2500. Paid staff ₹500 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D017",
  "domain": "electronics",
  "lang": "hi",
  "text": "सुबह बिजनेस खोला। Patel Traders से 7 earphones आए। दोपहर में Ramesh को 2 earphones ₹1000 में दिए, कुछ उधार रहा। Ramesh से पुराने बकाये के बदले ₹2500 मिले। courier का ₹500 business खर्च हुआ। staff को ₹10000 advance दिया। घर के लिए ₹700 का सामान लिया, इसे personal रखना है। शाम को cash और UPI मिलाया।",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D018",
  "domain": "electronics",
  "lang": "en",
  "text": "Opened the business in the morning. Patel Traders delivered 7 units of earphones. Sold 2 units to Neha for ₹10000; part of the sale is on credit. Neha paid ₹1000 against an old outstanding balance. Business courier cost ₹2500. Paid staff ₹1500 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D019",
  "domain": "grocery",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Shah Distributors પાસેથી 25 biscuits આવ્યા. Suresh ને 20 biscuits ₹3000 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Suresh એ ₹7500 UPIથી આપ્યા. rent expense ₹5000 થયો. Staff ને ₹7500 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D020",
  "domain": "hardware",
  "lang": "himix",
  "text": "Subah shop open ki. Shah Distributors se 7 cement aaye. Suresh ko 2 cement ₹1500 me sell kiye, kuch credit par hai. Old outstanding me Suresh ne ₹500 UPI se diye. packing expense ₹2000 hua. Staff ko ₹2500 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D021",
  "domain": "clothing",
  "lang": "en",
  "text": "Opened the business in the morning. Mehta Suppliers delivered 15 units of shirt. Sold 10 units to Suresh for ₹10000; part of the sale is on credit. Suresh paid ₹3000 against an old outstanding balance. Business fuel cost ₹750. Paid staff ₹250 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D022",
  "domain": "wholesale",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Patel Traders પાસેથી 7 soap cartons આવ્યા. Amit ને 2 soap cartons ₹5000 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Amit એ ₹10000 UPIથી આપ્યા. fuel expense ₹10000 થયો. Staff ને ₹500 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D023",
  "domain": "electronics",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Mehta Suppliers પાસેથી 25 LED bulb આવ્યા. બપોરે Suresh ને 20 LED bulb ₹2500 માં આપ્યા, થોડું ઉધાર રહ્યું. Suresh પાસેથી જૂના બાકી સામે ₹7500 મળ્યા. fuel માટે ₹250 business ખર્ચ થયો. staff ને ₹2000 advance આપ્યો. ઘરે ₹900 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D024",
  "domain": "grocery",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Shah Distributors પાસેથી 8 rice આવ્યા. Patel ને 3 rice ₹1000 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Patel એ ₹1000 UPIથી આપ્યા. courier expense ₹7500 થયો. Staff ને ₹250 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D025",
  "domain": "salon",
  "lang": "en",
  "text": "Opened the business in the morning. Mehta Suppliers delivered 15 units of shampoo. Sold 10 units to Neha for ₹1200; part of the sale is on credit. Neha paid ₹250 against an old outstanding balance. Business packing cost ₹3000. Paid staff ₹1200 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D026",
  "domain": "wholesale",
  "lang": "himix",
  "text": "Subah shop open ki. Shah Distributors se 10 rice bags aaye. Mehul ko 5 rice bags ₹1500 me sell kiye, kuch credit par hai. Old outstanding me Mehul ne ₹1000 UPI se diye. phone/internet expense ₹250 hua. Staff ko ₹750 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D027",
  "domain": "clothing",
  "lang": "rg",
  "text": "savare business kholyo. Patel Traders pase thi 25 saree aavya. bapore Neha ne 20 saree ₹750 ma aapya, thodu udhar rahyu. Neha pase thi old baki same ₹750 malya. transport mate ₹750 business kharch thayo. staff ne ₹250 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D028",
  "domain": "hardware",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Kumar Agency પાસેથી 10 cement આવ્યા. Amit ને 5 cement ₹250 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Amit એ ₹250 UPIથી આપ્યા. packing expense ₹750 થયો. Staff ને ₹500 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D029",
  "domain": "services",
  "lang": "rh",
  "text": "subah business khola. Patel Traders se 17 cleaning service aaye. dopahar me Kiran ko 12 cleaning service ₹250 me diye, kuch udhaar raha. Kiran se purane baki ke badle ₹1200 mile. fuel ka ₹750 business kharch hua. staff ko ₹1000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D030",
  "domain": "services",
  "lang": "rh",
  "text": "subah business khola. Mehta Suppliers se 25 cleaning service aaye. dopahar me Ramesh ko 20 cleaning service ₹3000 me diye, kuch udhaar raha. Ramesh se purane baki ke badle ₹2000 mile. packing ka ₹7500 business kharch hua. staff ko ₹7500 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D031",
  "domain": "home_business",
  "lang": "himix",
  "text": "Subah shop open ki. Kumar Agency se 7 candles aaye. Patel ko 2 candles ₹7500 me sell kiye, kuch credit par hai. Old outstanding me Patel ne ₹2500 UPI se diye. repair expense ₹500 hua. Staff ko ₹1500 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D032",
  "domain": "home_business",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Shah Distributors પાસેથી 8 gift boxes આવ્યા. બપોરે Kiran ને 3 gift boxes ₹1000 માં આપ્યા, થોડું ઉધાર રહ્યું. Kiran પાસેથી જૂના બાકી સામે ₹750 મળ્યા. packing માટે ₹500 business ખર્ચ થયો. staff ને ₹10000 advance આપ્યો. ઘરે ₹700 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D033",
  "domain": "services",
  "lang": "en",
  "text": "Opened the business in the morning. Mehta Suppliers delivered 17 units of cleaning service. Sold 12 units to Neha for ₹750; part of the sale is on credit. Neha paid ₹1500 against an old outstanding balance. Business courier cost ₹1500. Paid staff ₹500 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D034",
  "domain": "salon",
  "lang": "himix",
  "text": "Subah shop open ki. Mehta Suppliers se 10 hair color aaye. Mehul ko 5 hair color ₹1200 me sell kiye, kuch credit par hai. Old outstanding me Mehul ne ₹5000 UPI se diye. repair expense ₹250 hua. Staff ko ₹7500 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D035",
  "domain": "pharmacy",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Kumar Agency પાસેથી 17 bandage આવ્યા. Patel ને 12 bandage ₹750 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Patel એ ₹2500 UPIથી આપ્યા. rent expense ₹1000 થયો. Staff ને ₹2000 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D036",
  "domain": "grocery",
  "lang": "rh",
  "text": "subah business khola. Patel Traders se 15 flour aaye. dopahar me Amit ko 10 flour ₹250 me diye, kuch udhaar raha. Amit se purane baki ke badle ₹1200 mile. fuel ka ₹1000 business kharch hua. staff ko ₹750 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D037",
  "domain": "hardware",
  "lang": "rh",
  "text": "subah business khola. Kumar Agency se 17 switch aaye. dopahar me Rajesh ko 12 switch ₹1200 me diye, kuch udhaar raha. Rajesh se purane baki ke badle ₹1000 mile. repair ka ₹10000 business kharch hua. staff ko ₹1000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D038",
  "domain": "grocery",
  "lang": "rg",
  "text": "savare business kholyo. Mehta Suppliers pase thi 25 tea aavya. bapore Rajesh ne 20 tea ₹2000 ma aapya, thodu udhar rahyu. Rajesh pase thi old baki same ₹1500 malya. courier mate ₹7500 business kharch thayo. staff ne ₹250 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D039",
  "domain": "wholesale",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Mehta Suppliers પાસેથી 8 rice bags આવ્યા. Rajesh ને 3 rice bags ₹7500 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Rajesh એ ₹1000 UPIથી આપ્યા. repair expense ₹10000 થયો. Staff ને ₹500 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D040",
  "domain": "salon",
  "lang": "rg",
  "text": "savare business kholyo. Kumar Agency pase thi 17 haircut aavya. bapore Patel ne 12 haircut ₹10000 ma aapya, thodu udhar rahyu. Patel pase thi old baki same ₹2500 malya. rent mate ₹2000 business kharch thayo. staff ne ₹500 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D041",
  "domain": "clothing",
  "lang": "rh",
  "text": "subah business khola. Shah Distributors se 7 saree aaye. dopahar me Kiran ko 2 saree ₹1200 me diye, kuch udhaar raha. Kiran se purane baki ke badle ₹1200 mile. fuel ka ₹1000 business kharch hua. staff ko ₹3000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D042",
  "domain": "restaurant",
  "lang": "rg",
  "text": "savare business kholyo. Shah Distributors pase thi 7 coffee aavya. bapore Kiran ne 2 coffee ₹5000 ma aapya, thodu udhar rahyu. Kiran pase thi old baki same ₹750 malya. packing mate ₹500 business kharch thayo. staff ne ₹10000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D043",
  "domain": "home_business",
  "lang": "rg",
  "text": "savare business kholyo. Patel Traders pase thi 17 candles aavya. bapore Rajesh ne 12 candles ₹7500 ma aapya, thodu udhar rahyu. Rajesh pase thi old baki same ₹500 malya. electricity mate ₹2000 business kharch thayo. staff ne ₹10000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D044",
  "domain": "clothing",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Shah Distributors પાસેથી 17 saree આવ્યા. Neha ને 12 saree ₹750 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Neha એ ₹3000 UPIથી આપ્યા. courier expense ₹3000 થયો. Staff ને ₹250 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D045",
  "domain": "wholesale",
  "lang": "rh",
  "text": "subah business khola. Kumar Agency se 17 soap cartons aaye. dopahar me Kiran ko 12 soap cartons ₹2500 me diye, kuch udhaar raha. Kiran se purane baki ke badle ₹2500 mile. electricity ka ₹750 business kharch hua. staff ko ₹2000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D046",
  "domain": "clothing",
  "lang": "rg",
  "text": "savare business kholyo. Shah Distributors pase thi 15 jeans aavya. bapore Rajesh ne 10 jeans ₹7500 ma aapya, thodu udhar rahyu. Rajesh pase thi old baki same ₹500 malya. phone/internet mate ₹1500 business kharch thayo. staff ne ₹10000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D047",
  "domain": "wholesale",
  "lang": "himix",
  "text": "Subah shop open ki. Patel Traders se 10 oil cartons aaye. Rajesh ko 5 oil cartons ₹3000 me sell kiye, kuch credit par hai. Old outstanding me Rajesh ne ₹2000 UPI se diye. repair expense ₹7500 hua. Staff ko ₹10000 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D048",
  "domain": "restaurant",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Patel Traders પાસેથી 8 tea આવ્યા. Neha ને 3 tea ₹10000 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Neha એ ₹10000 UPIથી આપ્યા. packing expense ₹250 થયો. Staff ને ₹1200 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D049",
  "domain": "wholesale",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Mehta Suppliers પાસેથી 17 oil cartons આવ્યા. Amit ને 12 oil cartons ₹1200 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Amit એ ₹750 UPIથી આપ્યા. courier expense ₹2500 થયો. Staff ને ₹1200 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D050",
  "domain": "construction",
  "lang": "himix",
  "text": "Subah shop open ki. Mehta Suppliers se 25 cement aaye. Amit ko 20 cement ₹7500 me sell kiye, kuch credit par hai. Old outstanding me Amit ne ₹250 UPI se diye. rent expense ₹250 hua. Staff ko ₹5000 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D051",
  "domain": "manufacturing",
  "lang": "hi",
  "text": "सुबह बिजनेस खोला। Shah Distributors से 25 aluminium आए। दोपहर में Mehul को 20 aluminium ₹1000 में दिए, कुछ उधार रहा। Mehul से पुराने बकाये के बदले ₹750 मिले। electricity का ₹2500 business खर्च हुआ। staff को ₹500 advance दिया। घर के लिए ₹700 का सामान लिया, इसे personal रखना है। शाम को cash और UPI मिलाया।",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D052",
  "domain": "hardware",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Patel Traders પાસેથી 25 paint આવ્યા. બપોરે Suresh ને 20 paint ₹1500 માં આપ્યા, થોડું ઉધાર રહ્યું. Suresh પાસેથી જૂના બાકી સામે ₹1500 મળ્યા. courier માટે ₹250 business ખર્ચ થયો. staff ને ₹3000 advance આપ્યો. ઘરે ₹700 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D053",
  "domain": "clothing",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Shah Distributors પાસેથી 15 jeans આવ્યા. બપોરે Kiran ને 10 jeans ₹10000 માં આપ્યા, થોડું ઉધાર રહ્યું. Kiran પાસેથી જૂના બાકી સામે ₹1000 મળ્યા. courier માટે ₹1000 business ખર્ચ થયો. staff ને ₹3000 advance આપ્યો. ઘરે ₹700 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D054",
  "domain": "services",
  "lang": "en",
  "text": "Opened the business in the morning. Patel Traders delivered 10 units of installation. Sold 5 units to Amit for ₹3000; part of the sale is on credit. Amit paid ₹1200 against an old outstanding balance. Business repair cost ₹1200. Paid staff ₹7500 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D055",
  "domain": "salon",
  "lang": "en",
  "text": "Opened the business in the morning. Kumar Agency delivered 10 units of shampoo. Sold 5 units to Rajesh for ₹3000; part of the sale is on credit. Rajesh paid ₹3000 against an old outstanding balance. Business fuel cost ₹1200. Paid staff ₹1500 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D056",
  "domain": "services",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Patel Traders પાસેથી 15 maintenance job આવ્યા. Ramesh ને 10 maintenance job ₹10000 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Ramesh એ ₹5000 UPIથી આપ્યા. fuel expense ₹1000 થયો. Staff ને ₹1200 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D057",
  "domain": "hardware",
  "lang": "hi",
  "text": "सुबह बिजनेस खोला। Patel Traders से 10 cement आए। दोपहर में Patel को 5 cement ₹1200 में दिए, कुछ उधार रहा। Patel से पुराने बकाये के बदले ₹750 मिले। transport का ₹250 business खर्च हुआ। staff को ₹1200 advance दिया। घर के लिए ₹700 का सामान लिया, इसे personal रखना है। शाम को cash और UPI मिलाया।",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D058",
  "domain": "pharmacy",
  "lang": "rg",
  "text": "savare business kholyo. Shah Distributors pase thi 17 ointment aavya. bapore Mehul ne 12 ointment ₹250 ma aapya, thodu udhar rahyu. Mehul pase thi old baki same ₹3000 malya. courier mate ₹250 business kharch thayo. staff ne ₹1200 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D059",
  "domain": "home_business",
  "lang": "himix",
  "text": "Subah shop open ki. Shah Distributors se 15 papad aaye. Rajesh ko 10 papad ₹750 me sell kiye, kuch credit par hai. Old outstanding me Rajesh ne ₹2000 UPI se diye. fuel expense ₹1200 hua. Staff ko ₹2000 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D060",
  "domain": "wholesale",
  "lang": "rh",
  "text": "subah business khola. Patel Traders se 25 carton biscuits aaye. dopahar me Amit ko 20 carton biscuits ₹1500 me diye, kuch udhaar raha. Amit se purane baki ke badle ₹3000 mile. rent ka ₹10000 business kharch hua. staff ko ₹500 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D061",
  "domain": "manufacturing",
  "lang": "rh",
  "text": "subah business khola. Shah Distributors se 15 aluminium aaye. dopahar me Patel ko 10 aluminium ₹750 me diye, kuch udhaar raha. Patel se purane baki ke badle ₹1200 mile. packing ka ₹750 business kharch hua. staff ko ₹10000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D062",
  "domain": "grocery",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Mehta Suppliers પાસેથી 10 spices આવ્યા. Amit ને 5 spices ₹250 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Amit એ ₹2000 UPIથી આપ્યા. repair expense ₹750 થયો. Staff ને ₹3000 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D063",
  "domain": "home_business",
  "lang": "en",
  "text": "Opened the business in the morning. Shah Distributors delivered 10 units of candles. Sold 5 units to Rajesh for ₹5000; part of the sale is on credit. Rajesh paid ₹2000 against an old outstanding balance. Business electricity cost ₹250. Paid staff ₹2500 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D064",
  "domain": "salon",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Mehta Suppliers પાસેથી 25 facial આવ્યા. Patel ને 20 facial ₹750 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Patel એ ₹2000 UPIથી આપ્યા. phone/internet expense ₹7500 થયો. Staff ને ₹2500 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D065",
  "domain": "services",
  "lang": "rg",
  "text": "savare business kholyo. Kumar Agency pase thi 15 maintenance job aavya. bapore Ramesh ne 10 maintenance job ₹10000 ma aapya, thodu udhar rahyu. Ramesh pase thi old baki same ₹500 malya. courier mate ₹2500 business kharch thayo. staff ne ₹10000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D066",
  "domain": "hardware",
  "lang": "rg",
  "text": "savare business kholyo. Patel Traders pase thi 17 paint aavya. bapore Amit ne 12 paint ₹10000 ma aapya, thodu udhar rahyu. Amit pase thi old baki same ₹500 malya. packing mate ₹1000 business kharch thayo. staff ne ₹750 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D067",
  "domain": "wholesale",
  "lang": "en",
  "text": "Opened the business in the morning. Mehta Suppliers delivered 15 units of rice bags. Sold 10 units to Neha for ₹1200; part of the sale is on credit. Neha paid ₹1200 against an old outstanding balance. Business rent cost ₹7500. Paid staff ₹2000 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D068",
  "domain": "construction",
  "lang": "himix",
  "text": "Subah shop open ki. Kumar Agency se 15 tiles aaye. Patel ko 10 tiles ₹750 me sell kiye, kuch credit par hai. Old outstanding me Patel ne ₹1000 UPI se diye. phone/internet expense ₹250 hua. Staff ko ₹10000 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D069",
  "domain": "wholesale",
  "lang": "rg",
  "text": "savare business kholyo. Mehta Suppliers pase thi 25 soap cartons aavya. bapore Rajesh ne 20 soap cartons ₹2000 ma aapya, thodu udhar rahyu. Rajesh pase thi old baki same ₹5000 malya. phone/internet mate ₹1200 business kharch thayo. staff ne ₹1000 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D070",
  "domain": "electronics",
  "lang": "gu",
  "text": "સવારે દુકાન/બિઝનેસ ખોલ્યો. Kumar Agency પાસેથી 7 cable આવ્યા. બપોરે Ramesh ને 2 cable ₹2500 માં આપ્યા, થોડું ઉધાર રહ્યું. Ramesh પાસેથી જૂના બાકી સામે ₹250 મળ્યા. fuel માટે ₹500 business ખર્ચ થયો. staff ને ₹1200 advance આપ્યો. ઘરે ₹900 નો સામાન લીધો, એ personal છે. સાંજે cash અને UPI ચેક કર્યા.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D071",
  "domain": "restaurant",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Patel Traders પાસેથી 7 dosa આવ્યા. Mehul ને 2 dosa ₹7500 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Mehul એ ₹7500 UPIથી આપ્યા. fuel expense ₹1200 થયો. Staff ને ₹750 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D072",
  "domain": "electronics",
  "lang": "rh",
  "text": "subah business khola. Mehta Suppliers se 7 power bank aaye. dopahar me Kiran ko 2 power bank ₹2000 me diye, kuch udhaar raha. Kiran se purane baki ke badle ₹1000 mile. fuel ka ₹1200 business kharch hua. staff ko ₹3000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D073",
  "domain": "salon",
  "lang": "gjmix",
  "text": "સવારે shop open કરી. Patel Traders પાસેથી 15 haircut આવ્યા. Ramesh ને 10 haircut ₹1200 માં sale કર્યા, થોડું credit પર છે. Old outstanding માંથી Ramesh એ ₹10000 UPIથી આપ્યા. transport expense ₹1200 થયો. Staff ને ₹5000 advance આપ્યો. Home માટે ₹700 grocery લીધી, business expenseમાં ન નાખવી. Endમાં cash/UPI reconcile કરવું.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D074",
  "domain": "electronics",
  "lang": "rg",
  "text": "savare business kholyo. Kumar Agency pase thi 8 cable aavya. bapore Rajesh ne 3 cable ₹1000 ma aapya, thodu udhar rahyu. Rajesh pase thi old baki same ₹2000 malya. fuel mate ₹750 business kharch thayo. staff ne ₹2500 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D075",
  "domain": "pharmacy",
  "lang": "hi",
  "text": "सुबह बिजनेस खोला। Shah Distributors से 8 syrup आए। दोपहर में Patel को 3 syrup ₹750 में दिए, कुछ उधार रहा। Patel से पुराने बकाये के बदले ₹7500 मिले। courier का ₹3000 business खर्च हुआ। staff को ₹500 advance दिया। घर के लिए ₹400 का सामान लिया, इसे personal रखना है। शाम को cash और UPI मिलाया।",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D076",
  "domain": "restaurant",
  "lang": "rh",
  "text": "subah business khola. Shah Distributors se 7 coffee aaye. dopahar me Ramesh ko 2 coffee ₹2500 me diye, kuch udhaar raha. Ramesh se purane baki ke badle ₹2500 mile. packing ka ₹7500 business kharch hua. staff ko ₹2000 advance diya. ghar ke liye ₹700 ka saman liya, personal rakhna hai. shaam ko cash aur UPI milaya.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D077",
  "domain": "restaurant",
  "lang": "en",
  "text": "Opened the business in the morning. Kumar Agency delivered 7 units of coffee. Sold 2 units to Ramesh for ₹1200; part of the sale is on credit. Ramesh paid ₹7500 against an old outstanding balance. Business electricity cost ₹1200. Paid staff ₹1000 as an advance. Bought ₹700 of household goods; keep this personal and outside business expenses. Reconciled cash and UPI at closing.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D078",
  "domain": "construction",
  "lang": "himix",
  "text": "Subah shop open ki. Kumar Agency se 25 tiles aaye. Rajesh ko 20 tiles ₹1200 me sell kiye, kuch credit par hai. Old outstanding me Rajesh ne ₹1500 UPI se diye. phone/internet expense ₹2500 hua. Staff ko ₹2000 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D079",
  "domain": "manufacturing",
  "lang": "rg",
  "text": "savare business kholyo. Shah Distributors pase thi 15 plastic granules aavya. bapore Suresh ne 10 plastic granules ₹7500 ma aapya, thodu udhar rahyu. Suresh pase thi old baki same ₹10000 malya. transport mate ₹3000 business kharch thayo. staff ne ₹1500 advance aapyo. ghare ₹700 no saman lidho, e personal che. sanje cash ane UPI check karyu.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 },
 {
  "id": "D080",
  "domain": "hardware",
  "lang": "himix",
  "text": "Subah shop open ki. Shah Distributors se 17 tap aaye. Kiran ko 12 tap ₹250 me sell kiye, kuch credit par hai. Old outstanding me Kiran ne ₹1200 UPI se diye. transport expense ₹500 hua. Staff ko ₹500 advance diya. Home ke liye ₹700 ka saman liya, business expense me mat daalna. End me cash/UPI reconcile karna.",
  "events": [
   "BUSINESS_EXPENSE",
   "CUSTOMER_RECEIPT",
   "PERSONAL_EXPENSE",
   "PURCHASE_RECEIPT",
   "RECONCILIATION",
   "SALE",
   "STAFF_ADVANCE"
  ]
 }
];
