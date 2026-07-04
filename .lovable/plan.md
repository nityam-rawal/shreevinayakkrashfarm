# Vinayak AI → Offline Agentic Upgrade

Goal: make Vinayak a true offline agent that (1) listens to a whole day's dictation, (2) synthesizes it into a structured summary, (3) shows a confirm sheet, (4) on approval executes tool-calls that create bills, update khata ledger, cash entries, and stock — all 100% on-device.

## Inspiration (offline/private prior art)
- **whisper.cpp / Transformers.js Whisper** — already integrated for STT.
- **Rasa / Snips NLU** (offline intent+slot parsing) → we mimic with our own rules + fuzzy matcher.
- **LangChain "tools + confirm"** and **OpenAI function-calling** → agent-loop pattern, but executed with our deterministic parser (no LLM roundtrip needed, so it stays offline & secure).
- **Home Assistant Assist / Willow** (offline voice agent that runs *actions*) → confirm-then-execute UX.
- **Vikunja / Actual Budget / Frappe ERPNext** command-palette style bulk entry.

We are not adding any network dependency. Everything runs in the browser using existing `nlp.ts` + Dexie + Whisper WASM.

## What we build

### 1. Agent core (`src/lib/agent.ts` — new)
A deterministic tool-calling agent with a tiny schema:
- `Tool` = `{ name, description, argsSchema, run(args) }`
- Tools registered: `createInvoice`, `addPayment`, `addExpense`, `addIncome`, `upsertParty`, `adjustStock`, `answerQuery`.
- `planFromText(text)` → splits multi-sentence dictation into atomic actions using our upgraded NLP (sentence segmenter + `parseCommand` per segment + de-dup).
- `synthesizeDay(text)` → returns `{ actions: PlannedAction[], summary: string, totals: {...} }` where each action carries `status: "pending" | "needs-review" | "auto"` and a `confidence` score.

### 2. Whole-day dictation UI (`src/routes/chat.tsx` upgrade)
- New "🎙️ Din bhar ka hisab" mode alongside single-command mode.
- User records/pastes a long transcript (Whisper streams into a textarea).
- "Synthesis" button → agent plans all actions → opens a **Confirm Sheet**.

### 3. Confirm Sheet (`src/components/AgentConfirmSheet.tsx` — new)
- Grouped list: Bills, Payments IN, Payments OUT, Expenses, Stock changes.
- Each row is editable inline (party, amount, item, qty, rate, date).
- "Fix" chips for low-confidence rows (party not found → PartyCombobox with "create new").
- Totals footer: expected cash delta, receivables delta, stock delta.
- "Sab confirm karo" → runs tools in a single Dexie transaction → toast summary + links to created bills.

### 4. Tool executors (in `agent.ts`)
Wrap existing db helpers:
- `createInvoice` uses `nextInvoiceNumber` + `adjustStockForLines` in a `db.transaction("rw", ...)`.
- `addPayment` writes ledger credit + cash income (or debit + expense for OUT).
- `upsertParty` uses fuzzy match; only creates if not found (fixes your earlier point about billing auto-fill for new users).
- All tools return a human line for the summary toast.

### 5. NLP upgrades (`src/lib/nlp.ts`)
- Sentence segmenter that respects Hinglish connectors (`aur`, `phir`, `uske baad`, `,`, `.`, newlines).
- Multi-action extractor: one paragraph → many `Action`s.
- Confidence score per action based on: party match distance, amount presence, item match.
- Detect **compound bills**: "Ram ko 2 brass reti aur 10 bag cement diya" → one invoice with 2 lines.

### 6. Real-time cross-language chat answers
- Extend `answerQuery` to hit live Dexie reads (already partly done) for: today totals, party balance, top receivables, stock of X, sales of item X this month.
- Auto-detect Hindi/Hinglish/Gujarati and mirror language in reply.

### 7. Small quality wins
- Search bar on `/` already routes actionable Qs to chat; wire `auto=1` to jump straight into synthesis if the query looks like multi-action dictation.
- Invoice PDF (already photo/image) — no change needed here, was done previously.

## Files
- **new**: `src/lib/agent.ts`, `src/components/AgentConfirmSheet.tsx`
- **edit**: `src/lib/nlp.ts` (segmenter, multi-action, confidence), `src/routes/chat.tsx` (day-mode + confirm sheet), `src/routes/index.tsx` (route long queries to synthesis), `src/lib/db.ts` (tiny helper: `runInvoiceTx`)

## Out of scope (call out honestly)
- No cloud LLM. The "understanding" ceiling is our rules + fuzzy matcher; it will handle 90% of shopkeeper phrasing but won't do free-form reasoning like GPT.
- No background mic. Recording is user-initiated (browser policy).
- Multi-tab concurrent writes still rely on Dexie; we add transactions but not cross-tab locks.

## Verification
- Extend `ai-test.tsx` with a "Day synthesis" test: feeds a 10-line Hinglish paragraph and asserts N actions parsed with expected totals.
- Manual: dictate a day, hit synthesis, edit one row, confirm, verify bill + ledger + cash + stock all updated in one shot.
