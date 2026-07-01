import { Link, useLocation } from "@tanstack/react-router";
import { Home, Users, BookOpen, Boxes, FileText, Sparkles, Settings, Store, ChevronDown, Plus, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  createWorkspace,
  getActiveWorkspace,
  listWorkspaces,
  switchWorkspace,
} from "@/lib/workspace";

const nav = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/parties", label: "Khata", icon: Users },
  { to: "/cashbook", label: "Cash", icon: BookOpen },
  { to: "/stock", label: "Stock", icon: Boxes },
  { to: "/invoice/new", label: "Bill", icon: FileText },
  { to: "/chat", label: "AI", icon: Sparkles },
] as const;

function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const active = getActiveWorkspace();
  const list = listWorkspaces();

  function add() {
    const name = prompt("Naye shop / workspace ka naam:");
    if (!name?.trim()) return;
    const ws = createWorkspace(name.trim());
    switchWorkspace(ws.id);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-[11px] font-medium hover:bg-accent"
        title="Shop / Workspace switch"
      >
        <Store className="h-3.5 w-3.5 text-primary" />
        <span className="max-w-[100px] truncate">{active.name}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-60 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            <div className="border-b border-border px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Aapke Shops
            </div>
            {list.map((w) => (
              <button
                key={w.id}
                onClick={() => (w.id === active.id ? setOpen(false) : switchWorkspace(w.id))}
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
              >
                <span className="truncate">{w.name}</span>
                {w.id === active.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
            <button
              onClick={add}
              className="flex w-full items-center gap-2 border-t border-border px-3 py-2 text-left text-sm font-medium text-primary hover:bg-primary/5"
            >
              <Plus className="h-4 w-4" /> Naya Shop / Workspace
            </button>
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="block border-t border-border px-3 py-2 text-xs text-muted-foreground hover:bg-accent"
            >
              Manage workspaces →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export function AppShell({ children, title, action }: { children: ReactNode; title?: string; action?: ReactNode }) {
  const loc = useLocation();
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-2 px-4 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold">
              श्री
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-end gap-1">
            <WorkspaceSwitcher />
            {action}
            <Link
              to="/settings"
              className="rounded-lg p-2 text-muted-foreground hover:bg-accent"
              title="Settings & Backup"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {title && (
          <div className="mx-auto max-w-2xl px-4 pb-3">
            <h1 className="font-display text-2xl font-bold">{title}</h1>
          </div>
        )}
      </header>

      <main key={typeof window !== "undefined" ? window.location.pathname : ""} className="mx-auto max-w-2xl px-4 py-5 animate-page-in">{children}</main>

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
