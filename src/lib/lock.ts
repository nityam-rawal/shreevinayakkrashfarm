// Offline PIN gate. Stores SHA-256(salt + PIN) in localStorage.
// PIN never leaves the device.
//
// Brute-force protection:
//   - After 5 wrong attempts, lock for 60 seconds.
//   - After 10 wrong attempts, lock for 10 minutes.
//   - After 20 wrong attempts, lock for 1 hour (data stays — user can still
//     restore from backup if they truly forgot the PIN; we don't wipe on
//     wrong PINs because that itself is a denial-of-service vector).

const HASH_KEY = "svkf_pin_hash";
const SALT_KEY = "svkf_pin_salt";
const UNLOCK_KEY = "svkf_unlocked";
const FAILS_KEY = "svkf_pin_fails";
const LOCKED_UNTIL_KEY = "svkf_pin_locked_until";

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
  localStorage.removeItem(FAILS_KEY);
  localStorage.removeItem(LOCKED_UNTIL_KEY);
  sessionStorage.setItem(UNLOCK_KEY, "1");
}

export function lockoutRemainingMs(): number {
  const until = parseInt(localStorage.getItem(LOCKED_UNTIL_KEY) || "0", 10);
  if (!until) return 0;
  const rem = until - Date.now();
  return rem > 0 ? rem : 0;
}

function applyFailPenalty(): void {
  const fails = parseInt(localStorage.getItem(FAILS_KEY) || "0", 10) + 1;
  localStorage.setItem(FAILS_KEY, String(fails));
  let penaltyMs = 0;
  if (fails >= 20) penaltyMs = 60 * 60 * 1000;
  else if (fails >= 10) penaltyMs = 10 * 60 * 1000;
  else if (fails >= 5) penaltyMs = 60 * 1000;
  if (penaltyMs > 0) {
    localStorage.setItem(LOCKED_UNTIL_KEY, String(Date.now() + penaltyMs));
  }
}

export async function verifyPin(pin: string): Promise<boolean> {
  if (lockoutRemainingMs() > 0) return false;
  const salt = ensureSalt();
  const h = await sha256(salt + pin);
  const ok = h === localStorage.getItem(HASH_KEY);
  if (ok) {
    sessionStorage.setItem(UNLOCK_KEY, "1");
    localStorage.removeItem(FAILS_KEY);
    localStorage.removeItem(LOCKED_UNTIL_KEY);
  } else {
    applyFailPenalty();
  }
  return ok;
}

export async function changePin(oldPin: string, newPin: string): Promise<void> {
  const ok = await verifyPin(oldPin);
  if (!ok) throw new Error("Purana PIN galat hai");
  await setPin(newPin);
}

export function clearPin(): void {
  localStorage.removeItem(HASH_KEY);
  localStorage.removeItem(FAILS_KEY);
  localStorage.removeItem(LOCKED_UNTIL_KEY);
  sessionStorage.removeItem(UNLOCK_KEY);
}

export function isUnlocked(): boolean {
  return !hasPin() || sessionStorage.getItem(UNLOCK_KEY) === "1";
}

export function lock(): void {
  sessionStorage.removeItem(UNLOCK_KEY);
}
