// Offline PIN gate. Stores PBKDF2(SHA-256, 200k iter) hash of (salt + PIN)
// in localStorage. PIN never leaves the device.
//
// Brute-force protection:
//   - After 5 wrong attempts, lock for 60 seconds.
//   - After 10 wrong attempts, lock for 10 minutes.
//   - After 20 wrong attempts, lock for 1 hour. (We don't auto-wipe — that
//     is itself a denial-of-service vector. User can restore from backup.)
//
// Legacy migration: earlier builds stored sha256(salt+pin). On the next
// successful verify with that legacy hash, we transparently upgrade to PBKDF2.

import { pbkdf2Hex } from "./crypto";

const HASH_KEY = "svkf_pin_hash";        // PBKDF2 hex
const LEGACY_KEY = "svkf_pin_hash_v0";   // old sha256 (kept only for migration)
const SALT_KEY = "svkf_pin_salt";
const UNLOCK_KEY = "svkf_unlocked";
const FAILS_KEY = "svkf_pin_fails";
const LOCKED_UNTIL_KEY = "svkf_pin_locked_until";
const KIND_KEY = "svkf_pin_kind"; // "pbkdf2" | "sha256"

async function sha256Hex(input: string): Promise<string> {
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
  const h = await pbkdf2Hex(pin, salt);
  localStorage.setItem(HASH_KEY, h);
  localStorage.setItem(KIND_KEY, "pbkdf2");
  localStorage.removeItem(LEGACY_KEY);
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
  const stored = localStorage.getItem(HASH_KEY);
  if (!stored) return false;
  const kind = localStorage.getItem(KIND_KEY) || "pbkdf2";

  let ok = false;
  if (kind === "pbkdf2") {
    ok = (await pbkdf2Hex(pin, salt)) === stored;
  } else {
    // legacy sha256(salt+pin)
    ok = (await sha256Hex(salt + pin)) === stored;
    if (ok) {
      // transparent upgrade
      const upgraded = await pbkdf2Hex(pin, salt);
      localStorage.setItem(HASH_KEY, upgraded);
      localStorage.setItem(KIND_KEY, "pbkdf2");
    }
  }

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
  localStorage.removeItem(LEGACY_KEY);
  localStorage.removeItem(KIND_KEY);
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
