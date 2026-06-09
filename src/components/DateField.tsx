import { useRef } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// Always displays DD/MM/YYYY regardless of browser locale.
// Internally uses a native date input (YYYY-MM-DD) for picking.
export function DateField({
  value,
  onChange,
  className,
}: {
  value: string; // YYYY-MM-DD
  onChange: (v: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const display = (() => {
    if (!value) return "DD/MM/YYYY";
    const [y, m, d] = value.split("-");
    if (!y || !m || !d) return value;
    return `${d}/${m}/${y}`;
  })();

  function openPicker() {
    const el = ref.current;
    if (!el) return;
    // showPicker is the modern API; fall back to focus+click.
    const anyEl = el as HTMLInputElement & { showPicker?: () => void };
    if (typeof anyEl.showPicker === "function") {
      try { anyEl.showPicker(); return; } catch { /* noop */ }
    }
    el.focus();
    el.click();
  }

  return (
    <button
      type="button"
      onClick={openPicker}
      className={cn(
        "relative flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring",
        className,
      )}
    >
      <span className="num">{display}</span>
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <input
        ref={ref}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label="Date"
      />
    </button>
  );
}
