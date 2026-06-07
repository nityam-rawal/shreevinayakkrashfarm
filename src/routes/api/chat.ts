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
1. User Hinglish/Hindi me bolega — bill, khata entry, cashbook entry banane ke liye.
2. Tum natural language samjho aur structured suggestion do.
3. JAB BHI invoice ya entry banana ho, response me ek JSON code block do is shape me:

\`\`\`json
{
  "action": "create_invoice" | "add_cash" | "add_ledger",
  "data": { ... }
}
\`\`\`

create_invoice shape:
{ "partyName": "Ram Construction", "lines": [{"name": "Gujarat Reti Badi", "unit": "Brass", "qty": 2, "rate": 4500}], "paid": 0, "notes": "" }

add_cash shape:
{ "date": "YYYY-MM-DD optional", "type": "income"|"expense", "amount": 500, "category": "Diesel", "note": "" }

add_ledger shape:
{ "partyName": "Ram", "type": "payment"|"invoice"|"adjustment", "amount": 1000, "note": "" }

Confirm karne se pehle user ko summary bata do aur poocho. JSON tabhi do jab user clearly haan bole ya khud kuch karne ko bole.

Available Parties:
${partyList}

Available Items / Services (rates):
${itemList}

Hamesha short, friendly, Hinglish me jawab do. Numbers tabular dikhao jab samajh me aaye.`;

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
