// Offline data backup/restore. Two flavours:
//   • plain JSON (svkf-backup-YYYY-MM-DD.json)
//   • encrypted JSON (svkf-backup-YYYY-MM-DD.enc.json) — AES-GCM + PBKDF2
//     so even if the backup leaks (WhatsApp, Drive), data stays sealed.

import { db } from "./db";
import { encryptJSON, decryptJSON, type EncryptedBlob } from "./crypto";

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

function trigger(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function downloadBackup(): Promise<void> {
  const data = await exportBackup();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const ts = new Date().toISOString().slice(0, 10);
  trigger(blob, `svkf-backup-${ts}.json`);
}

export async function downloadEncryptedBackup(passphrase: string): Promise<void> {
  const data = await exportBackup();
  const enc = await encryptJSON(data, passphrase);
  const wrap = { app: "svkf-enc", ...enc };
  const blob = new Blob([JSON.stringify(wrap)], { type: "application/json" });
  const ts = new Date().toISOString().slice(0, 10);
  trigger(blob, `svkf-backup-${ts}.enc.json`);
}

export async function importBackup(
  file: File,
  mode: "replace" | "merge",
  passphrase?: string,
): Promise<{ parties: number; ledger: number; cash: number; items: number; invoices: number }> {
  const text = await file.text();
  const raw = JSON.parse(text) as Record<string, unknown>;

  let data: BackupFile;
  if (raw.app === "svkf-enc") {
    if (!passphrase) throw new Error("Yeh encrypted backup hai — passphrase do");
    data = await decryptJSON<BackupFile>(raw as unknown as EncryptedBlob, passphrase);
  } else if (raw.app === "svkf") {
    data = raw as unknown as BackupFile;
  } else {
    throw new Error("Yeh file is app ki backup nahi hai");
  }

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
