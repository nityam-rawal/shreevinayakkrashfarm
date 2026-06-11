import { useEffect, useMemo, useRef, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, type Party, type PartyType } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { Check, UserPlus, Search } from "lucide-react";

/**
 * Smart party picker:
 * - Type to filter existing parties (case-insensitive substring + token match)
 * - Click a suggestion to select an existing party
 * - If no match, "Add new: <text>" creates a fresh party on the fly
 *
 * Controlled by (partyId, name). Parent typically tracks both:
 *   - if partyId is set → existing party
 *   - else if name is set → will be auto-created on save
 */
export function PartyCombobox({
  partyId,
  name,
  onChange,
  defaultType = "customer",
  placeholder = "Party ka naam likho ya chuno…",
}: {
  partyId?: number;
  name?: string;
  onChange: (v: { partyId?: number; name: string }) => void;
  defaultType?: PartyType;
  placeholder?: string;
}) {
  const parties = useLiveQuery(() => db.parties.orderBy("name").toArray(), [], []);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(name ?? "");
  const wrapRef = useRef<HTMLDivElement>(null);

  // Sync external name (e.g. preselected partyId)
  useEffect(() => {
    if (partyId) {
      const p = parties.find((x) => x.id === partyId);
      if (p && p.name !== query) setQuery(p.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partyId, parties.length]);

  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parties.slice(0, 8);
    return parties
      .filter((p) => p.name.toLowerCase().includes(q) || (p.phone ?? "").includes(q))
      .slice(0, 8);
  }, [parties, query]);

  const exactExists = parties.some((p) => p.name.toLowerCase() === query.trim().toLowerCase());

  function pick(p: Party) {
    setQuery(p.name);
    onChange({ partyId: p.id, name: p.name });
    setOpen(false);
  }

  async function createNew() {
    const nm = query.trim();
    if (!nm) return;
    const id = await db.parties.add({ name: nm, type: defaultType, createdAt: Date.now() });
    onChange({ partyId: id, name: nm });
    setOpen(false);
  }

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange({ partyId: undefined, name: e.target.value });
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="pl-9"
          autoComplete="off"
        />
      </div>
      {open && (matches.length > 0 || (query.trim() && !exactExists)) && (
        <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-xl border border-border bg-popover p-1 shadow-lg">
          {matches.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => pick(p)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-accent"
            >
              <span>
                <span className="font-medium">{p.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">({p.type})</span>
                {p.phone && <span className="ml-2 text-xs text-muted-foreground">{p.phone}</span>}
              </span>
              {partyId === p.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
          {query.trim() && !exactExists && (
            <button
              type="button"
              onClick={createNew}
              className="mt-1 flex w-full items-center gap-2 rounded-lg border-t border-border px-3 py-2 text-left text-sm text-primary hover:bg-primary/10"
            >
              <UserPlus className="h-4 w-4" />
              Naya party banao: <span className="font-semibold">{query.trim()}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
