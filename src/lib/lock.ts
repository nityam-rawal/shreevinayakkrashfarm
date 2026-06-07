// Simple offline PIN gate. Stores SHA-256(PIN + salt) in localStorage.
// PIN is never transmitted. Salt is random per-device and stored alongside.
// This protects casual access (lost/stolen phone). For deeper security,
// users should also enable phone-level lock screen + encrypted device storage.

const HASH_KEY = "svkf_pin_hash";
const SALT_KEY = "svkf_pin_salt";
const UNLOCK_KEY = "svkf_unlocked"; // sessionStorage flag

async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const h = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(h))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function ensureSalt(): string {
  let s = localStorage.getItem(SALT_KEY);
  if (!s) {
    const arr = crypto.getRandomValues(new Uint8Array(16));
    s = Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
    localStorage.setItem(SALT_KEY, s);
  }
  return s;
}

export function hasPin(): boolean {
  return !!localStorage.getItem(HASH_KEY);
}

export async function setPin(pin: string): Promise<void> {
  if (!/^\d{4,8}$/.test(pin)) throw new Error("PIN 4-8 digits ka hona chahiye");
  const salt = ensureSalt();
  const h = await sha256(salt + pin);
  localStorage.setItem(HASH_KEY, h);
  sessionStorage.setItem(UNLOCK_KEY, "1");
}

export async function verifyPin(pin: string): Promise<boolean> {
  const salt = ensureSalt();
  const h = await sha256(salt + pin);
  const ok = h === localStorage.getItem(HASH_KEY);
  if (ok) sessionStorage.setItem(UNLOCK_KEY, "1");
  return ok;
}

export function clearPin(): void {
  localStorage.removeItem(HASH_KEY);
  sessionStorage.removeItem(UNLOCK_KEY);
}

export function isUnlocked(): boolean {
  return !hasPin() || sessionStorage.getItem(UNLOCK_KEY) === "1";
}

export function lock(): void {
  sessionStorage.removeItem(UNLOCK_KEY);
}
