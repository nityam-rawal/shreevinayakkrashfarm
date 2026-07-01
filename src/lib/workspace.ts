// Multi-workspace (multi-shop) support. Each workspace is a separate IndexedDB
// database, fully isolated. Switching workspaces reloads the page so Dexie
// re-opens the correct DB. 100% offline, all metadata in localStorage.

const LIST_KEY = "svkf_workspaces_v1";
const ACTIVE_KEY = "svkf_active_workspace_v1";

export interface Workspace {
  id: string;      // used as DB name suffix
  name: string;    // human-readable shop name
  createdAt: number;
}

const DEFAULT: Workspace = {
  id: "default",
  name: "Shree Vinayak Krashi Farm",
  createdAt: Date.now(),
};

export function listWorkspaces(): Workspace[] {
  try {
    const raw = localStorage.getItem(LIST_KEY);
    if (!raw) {
      localStorage.setItem(LIST_KEY, JSON.stringify([DEFAULT]));
      return [DEFAULT];
    }
    const arr = JSON.parse(raw) as Workspace[];
    return arr.length ? arr : [DEFAULT];
  } catch {
    return [DEFAULT];
  }
}

export function getActiveWorkspaceId(): string {
  if (typeof localStorage === "undefined") return "default";
  const id = localStorage.getItem(ACTIVE_KEY);
  if (id) return id;
  const list = listWorkspaces();
  const first = list[0]?.id ?? "default";
  localStorage.setItem(ACTIVE_KEY, first);
  return first;
}

export function getActiveWorkspace(): Workspace {
  const id = getActiveWorkspaceId();
  return listWorkspaces().find((w) => w.id === id) ?? DEFAULT;
}

export function createWorkspace(name: string): Workspace {
  const id = "ws_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const ws: Workspace = { id, name: name.trim() || "New Shop", createdAt: Date.now() };
  const list = listWorkspaces();
  list.push(ws);
  localStorage.setItem(LIST_KEY, JSON.stringify(list));
  return ws;
}

export function renameWorkspace(id: string, name: string): void {
  const list = listWorkspaces().map((w) => (w.id === id ? { ...w, name } : w));
  localStorage.setItem(LIST_KEY, JSON.stringify(list));
}

export function deleteWorkspace(id: string): void {
  const list = listWorkspaces().filter((w) => w.id !== id);
  if (!list.length) list.push(DEFAULT);
  localStorage.setItem(LIST_KEY, JSON.stringify(list));
  if (getActiveWorkspaceId() === id) {
    localStorage.setItem(ACTIVE_KEY, list[0].id);
  }
  // Best-effort: delete the underlying DB
  try {
    indexedDB.deleteDatabase(`svkf_${id}`);
  } catch { /* noop */ }
}

export function switchWorkspace(id: string): void {
  localStorage.setItem(ACTIVE_KEY, id);
  location.reload();
}

export function dbName(): string {
  return `svkf_${getActiveWorkspaceId()}`;
}
