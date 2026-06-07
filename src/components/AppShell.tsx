import { Link, useLocation } from "@tanstack/react-router";
import { Home, Users, BookOpen, Boxes, FileText, Sparkles, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { hasPin, lock } from "@/lib/lock";


const nav = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/parties", label: "Khata", icon: Users },
  { to: "/cashbook", label: "Cash", icon: BookOpen },
  { to: "/stock", label: "Stock", icon: Boxes },
  { to: "/invoice/new", label: "Bill", icon: FileText },
  { to: "/chat", label: "AI", icon: Sparkles },
] as const;

export function AppShell({ children, title, action }: { children: ReactNode; title?: string; action?: ReactNode }) {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold">
              श्री
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-bold">Shree Vinayak</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Krashi Farm</div>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            {action}
            {hasPin() && (
              <button
                onClick={() => { lock(); location.reload(); }}
                className="rounded-lg p-2 text-muted-foreground hover:bg-accent"
                title="Lock app"
              >
                <Lock className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {title && (
          <div className="mx-auto max-w-2xl px-4 pb-3">
            <h1 className="font-display text-2xl font-bold">{title}</h1>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-2xl px-4 py-5">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-6">
          {nav.map((n) => {
            const Icon = n.icon;
            const active =
              n.to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
