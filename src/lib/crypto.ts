// AES-GCM encryption helpers with PBKDF2-derived key.
// Used for encrypted backups + future at-rest encryption.

const ITER = 200_000;

function toAB(u: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u.byteLength);
  new Uint8Array(ab).set(u);
  return ab;
}

async function deriveKey(pass: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pass),
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: toAB(salt), iterations: ITER, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function b64(buf: ArrayBuffer | Uint8Array): string {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}
function ub64(s: string): Uint8Array {
  const bin = atob(s);
  const u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}

export interface EncryptedBlob {
  v: 1;
  alg: "AES-GCM";
  kdf: "PBKDF2-SHA256";
  iter: number;
  salt: string;
  iv: string;
  ct: string;
}

export async function encryptJSON(data: unknown, pass: string): Promise<EncryptedBlob> {
  if (!pass || pass.length < 6) throw new Error("Passphrase 6+ chars hona chahiye");
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pass, salt);
  const plain = new TextEncoder().encode(JSON.stringify(data));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: toAB(iv) }, key, toAB(plain));
  return { v: 1, alg: "AES-GCM", kdf: "PBKDF2-SHA256", iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) };
}

export async function decryptJSON<T = unknown>(blob: EncryptedBlob, pass: string): Promise<T> {
  if (blob.v !== 1 || blob.alg !== "AES-GCM") throw new Error("Unsupported blob");
  const key = await deriveKey(pass, ub64(blob.salt));
  try {
    const buf = await crypto.subtle.decrypt({ name: "AES-GCM", iv: toAB(ub64(blob.iv)) }, key, toAB(ub64(blob.ct)));
    return JSON.parse(new TextDecoder().decode(buf)) as T;
  } catch {
    throw new Error("Galat passphrase ya corrupt file");
  }
}

// PBKDF2-based PIN hash (raw hex output) for the lock screen.
export async function pbkdf2Hex(pass: string, saltHex: string, iter = ITER): Promise<string> {
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), { name: "PBKDF2" }, false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: toAB(salt), iterations: iter, hash: "SHA-256" }, base, 256);
  return Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
