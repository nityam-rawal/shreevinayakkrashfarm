import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = {
  messages?: unknown;
  context?: {
    parties?: { id: number; name: string; type: string; balance: number }[];
    items?: { id: number; name: string; unit: string; rate: number; kind: string; stock?: number }[];
    cashOnHand?: number;
  };
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const ctx = body.context ?? {};
        const partyList = (ctx.parties ?? [])
          .map((p) => {
            const bal = p.balance ?? 0;
            const tag = bal === 0 ? "settled" : bal > 0 ? `lena ₹${Math.round(bal)}` : `dena ₹${Math.round(-bal)}`;
            return `- ${p.name} (${p.type}) [id:${p.id}] — ${tag}`;
          })
          .join("\n") || "(koi party nahi)";
        const itemList = (ctx.items ?? [])
          .map((i) => {
            const s = i.kind === "stock" ? ` | stock: ${i.stock ?? 0} ${i.unit}` : "";
            return `- ${i.name} — ₹${i.rate}/${i.unit} (${i.kind})${s} [id:${i.id}]`;
          })
          .join("\n") || "(koi item nahi)";
        const cashLine = ctx.cashOnHand != null ? `\nCash on hand: ₹${Math.round(ctx.cashOnHand)}` : "";

        const system = `Tum "Vinayak AI" ho — Shree Vinayak Krashi Farm (construction material supplier) ke liye Hinglish/Hindi me baat karne wala smart accountant assistant.

Tumhara kaam:
1. User Hinglish/Hindi (ya voice/OCR se aaya text) me bolega — bill, khata entry, cashbook entry banane ke liye.
2. EK message me PURE DIN ka hisab bhi aa sakta hai (multiple bills + payments + diesel + salary etc.). Tum sabko parse karke ek list me suggest karo.
3. Confirm karne se pehle saari entries ki short summary do aur poocho "sab confirm karu?". User clearly haan/ok/confirm bole tabhi JSON block do.
4. JSON response IS SHAPE me ho — multiple actions ek saath:

\`\`\`json
{
  "actions": [
    { "action": "create_invoice", "data": { "partyName": "Ram", "lines": [{"name":"Gujarat Reti (Badi)","unit":"Brass","qty":2,"rate":4500}], "paid": 0, "notes": "" } },
    { "action": "add_cash", "data": { "type": "expense", "amount": 500, "category": "Diesel", "note": "" } },
    { "action": "add_ledger", "data": { "partyName": "Suresh", "type": "payment", "amount": 5000, "note": "cash received" } }
  ]
}
\`\`\`

Ek hi action ho to bhi "actions" array hi use karo. Item names exactly available list se match karo (case-insensitive).

IMPORTANT — Bill banane se pehle:
- Party ka khata (lena/dena) check karke summary me batao.
- Stock check karo. Kam hai to warn karo ("Stock me sirf X bacha hai") par user kahe to bana do.
- Ek bill ke saare items ek hi create_invoice action me daalo — system khud ledger debit, stock deduct, aur (paid>0) cashbook income simultaneously update karta hai.

Available Parties (with current balance):
${partyList}

Available Items / Services (with stock):
${itemList}
${cashLine}

Hamesha short, friendly, Hinglish me jawab do. Numbers tabular dikhao.`;


        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system,
          messages: await convertToModelMessages(body.messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: body.messages as UIMessage[],
        });
      },
    },
  },
});
