// Offline data backup/restore. Exports the full Dexie database as a
// single JSON file the user can save anywhere (WhatsApp self-message,
// Drive, USB, email). Restore reads the same JSON back.

import { db } from "./db";

export interface BackupFile {
  app: "svkf";
  version: 1;
  exportedAt: string;
  parties: unknown[];
  ledger: unknown[];
  cash: unknown[];
  items: unknown[];
  invoices: unknown[];
}

export async function exportBackup(): Promise<BackupFile> {
  const [parties, ledger, cash, items, invoices] = await Promise.all([
    db.parties.toArray(),
    db.ledger.toArray(),
    db.cash.toArray(),
    db.items.toArray(),
    db.invoices.toArray(),
  ]);
  return {
    app: "svkf",
    version: 1,
    exportedAt: new Date().toISOString(),
    parties, ledger, cash, items, invoices,
  };
}

export async function downloadBackup(): Promise<void> {
  const data = await exportBackup();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const ts = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `svkf-backup-${ts}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function importBackup(file: File, mode: "replace" | "merge"): Promise<{
  parties: number; ledger: number; cash: number; items: number; invoices: number;
}> {
  const text = await file.text();
  const data = JSON.parse(text) as BackupFile;
  if (data.app !== "svkf") throw new Error("Yeh file is app ki backup nahi hai");

  await db.transaction("rw", [db.parties, db.ledger, db.cash, db.items, db.invoices], async () => {
    if (mode === "replace") {
      await Promise.all([
        db.parties.clear(),
        db.ledger.clear(),
        db.cash.clear(),
        db.items.clear(),
        db.invoices.clear(),
      ]);
    }
    if (Array.isArray(data.parties)) await db.parties.bulkAdd(data.parties as never);
    if (Array.isArray(data.ledger)) await db.ledger.bulkAdd(data.ledger as never);
    if (Array.isArray(data.cash)) await db.cash.bulkAdd(data.cash as never);
    if (Array.isArray(data.items)) await db.items.bulkAdd(data.items as never);
    if (Array.isArray(data.invoices)) await db.invoices.bulkAdd(data.invoices as never);
  });

  return {
    parties: data.parties?.length ?? 0,
    ledger: data.ledger?.length ?? 0,
    cash: data.cash?.length ?? 0,
    items: data.items?.length ?? 0,
    invoices: data.invoices?.length ?? 0,
  };
}

export async function wipeAll(): Promise<void> {
  await db.transaction("rw", [db.parties, db.ledger, db.cash, db.items, db.invoices], async () => {
    await Promise.all([
      db.parties.clear(),
      db.ledger.clear(),
      db.cash.clear(),
      db.items.clear(),
      db.invoices.clear(),
    ]);
  });
}
