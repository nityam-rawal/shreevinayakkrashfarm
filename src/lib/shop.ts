// Shop profile stored in localStorage. Used for invoice headers,
// WhatsApp reminders, and UPI deep-links. 100% offline.

const KEY = "svkf_shop_v1";

export interface ShopProfile {
  name: string;
  phone: string;
  address: string;
  gstin: string;
  upiId: string;        // e.g. shree@oksbi
  upiName: string;      // payee name on UPI
}

const DEFAULT: ShopProfile = {
  name: "Shree Vinayak Krashi Farm",
  phone: "",
  address: "",
  gstin: "",
  upiId: "",
  upiName: "Shree Vinayak Krashi Farm",
};

export function getShop(): ShopProfile {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveShop(p: ShopProfile): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

/**
 * Builds a UPI deep-link per NPCI spec. Works in GPay / PhonePe / Paytm / BHIM
 * when tapped from WhatsApp on Android. Returns empty string if no UPI ID set.
 */
export function upiLink(amount: number, note: string): string {
  const s = getShop();
  if (!s.upiId) return "";
  const params = new URLSearchParams({
    pa: s.upiId,
    pn: s.upiName || s.name,
    am: String(Math.max(0, Math.round(amount))),
    cu: "INR",
    tn: note.slice(0, 80),
  });
  return `upi://pay?${params.toString()}`;
}
