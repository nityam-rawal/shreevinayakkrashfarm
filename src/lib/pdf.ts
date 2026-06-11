import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice, Party } from "./db";
import { fmtINR, fmtDate } from "./format";

// Convert number to Indian English words (Lakh, Crore). Up to 999 Cr.
function numToWords(n: number): string {
  n = Math.round(n);
  if (n === 0) return "Zero";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (x: number): string => x < 20 ? a[x] : (b[Math.floor(x / 10)] + (x % 10 ? " " + a[x % 10] : ""));
  const three = (x: number): string => {
    const h = Math.floor(x / 100), r = x % 100;
    return (h ? a[h] + " Hundred" + (r ? " " : "") : "") + (r ? two(r) : "");
  };
  const cr = Math.floor(n / 10000000); n %= 10000000;
  const lk = Math.floor(n / 100000); n %= 100000;
  const th = Math.floor(n / 1000); n %= 1000;
  let s = "";
  if (cr) s += two(cr) + " Crore ";
  if (lk) s += two(lk) + " Lakh ";
  if (th) s += two(th) + " Thousand ";
  if (n) s += three(n);
  return s.trim();
}


export function buildInvoicePDF(invoice: Invoice, party: Party): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(150, 70, 40);
  doc.rect(0, 0, pageW, 90, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("SHREE VINAYAK KRASHI FARM", 40, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Construction Material Supplier & Contractor", 40, 58);
  doc.text("Reti  •  Patthar  •  Cement  •  Dumper  •  JCB  •  Tanker", 40, 72);

  // Invoice meta
  doc.setTextColor(40);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE / BILL", 40, 125);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`No: ${invoice.number}`, pageW - 220, 115);
  doc.text(`Date: ${fmtDate(invoice.date)}`, pageW - 220, 130);

  // Bill to
  doc.setFont("helvetica", "bold");
  doc.text("Bill To:", 40, 150);
  doc.setFont("helvetica", "normal");
  doc.text(party.name, 40, 165);
  if (party.phone) doc.text(`Ph: ${party.phone}`, 40, 178);
  if (party.address) doc.text(party.address, 40, 191);

  // Items table
  autoTable(doc, {
    startY: 215,
    head: [["#", "Item / Service", "Unit", "Qty", "Rate", "Amount"]],
    body: invoice.lines.map((l, i) => [
      String(i + 1),
      l.name,
      l.unit,
      String(l.qty),
      fmtINR(l.rate),
      fmtINR(l.amount),
    ]),
    headStyles: { fillColor: [150, 70, 40], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 6 },
    columnStyles: {
      0: { cellWidth: 30 },
      3: { halign: "right" },
      4: { halign: "right" },
      5: { halign: "right" },
    },
  });

  // Totals
  const afterTable = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20;
  const rightX = pageW - 40;
  const labelX = pageW - 200;
  doc.setFontSize(11);
  doc.text("Subtotal:", labelX, afterTable);
  doc.text(fmtINR(invoice.subtotal), rightX, afterTable, { align: "right" });
  if (invoice.discount > 0) {
    doc.text("Discount:", labelX, afterTable + 16);
    doc.text(`- ${fmtINR(invoice.discount)}`, rightX, afterTable + 16, { align: "right" });
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL:", labelX, afterTable + 40);
  doc.text(fmtINR(invoice.total), rightX, afterTable + 40, { align: "right" });
  if (invoice.paid > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Paid:", labelX, afterTable + 60);
    doc.text(fmtINR(invoice.paid), rightX, afterTable + 60, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text("Balance Due:", labelX, afterTable + 78);
    doc.text(fmtINR(invoice.total - invoice.paid), rightX, afterTable + 78, { align: "right" });
  }

  // Amount in words
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(`Rupees ${numToWords(invoice.total)} Only`, 40, afterTable + 60);

  if (invoice.notes) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.text(`Note: ${invoice.notes}`, 40, afterTable + 130);
  }

  // Signature block
  const sigY = doc.internal.pageSize.getHeight() - 90;
  doc.setDrawColor(150);
  doc.line(pageW - 200, sigY, pageW - 40, sigY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.text("Authorised Signatory", pageW - 120, sigY + 14, { align: "center" });
  doc.text("for Shree Vinayak Krashi Farm", pageW - 120, sigY + 28, { align: "center" });

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "Thank you for your business — Shree Vinayak Krashi Farm",
    pageW / 2,
    doc.internal.pageSize.getHeight() - 30,
    { align: "center" },
  );

  return doc;
}


export function buildLedgerPDF(party: Party, entries: { date: string; type: string; debit: number; credit: number; note?: string }[], balance: number): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  doc.setFillColor(150, 70, 40);
  doc.rect(0, 0, pageW, 70, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SHREE VINAYAK KRASHI FARM", 40, 32);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Party Khata Statement", 40, 52);

  doc.setTextColor(40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(party.name, 40, 100);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Type: ${party.type.toUpperCase()}`, 40, 116);
  if (party.phone) doc.text(`Ph: ${party.phone}`, 200, 116);

  let running = 0;
  autoTable(doc, {
    startY: 135,
    head: [["Date", "Particulars", "Debit", "Credit", "Balance"]],
    body: entries.map((e) => {
      running += e.debit - e.credit;
      return [
        fmtDate(e.date),
        `${e.type.toUpperCase()}${e.note ? " — " + e.note : ""}`,
        e.debit ? fmtINR(e.debit) : "",
        e.credit ? fmtINR(e.credit) : "",
        fmtINR(running),
      ];
    }),
    headStyles: { fillColor: [150, 70, 40], textColor: 255 },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: { 2: { halign: "right" }, 3: { halign: "right" }, 4: { halign: "right" } },
  });

  const afterTable = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const lbl = balance >= 0 ? "Net Receivable (They owe us):" : "Net Payable (We owe them):";
  doc.text(lbl, 40, afterTable);
  doc.text(fmtINR(Math.abs(balance)), pageW - 40, afterTable, { align: "right" });

  return doc;
}

export async function shareOrDownloadPDF(doc: jsPDF, filename: string, text: string) {
  const blob = doc.output("blob");
  const file = new File([blob], filename, { type: "application/pdf" });
  const navAny = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  if (navAny.canShare && navAny.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: filename, text });
      return;
    } catch {
      // user cancelled or share failed — fall through to download
    }
  }
  // Fallback: download + open WhatsApp web share
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  // Open WhatsApp with text — user attaches the downloaded PDF manually
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

// ====== IMAGE (PNG) renderers — so WhatsApp shows the bill as a photo ======

const BRAND_RGB = "rgb(150,70,40)";

function canvas2D(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  return { c, ctx };
}

function drawHeader(ctx: CanvasRenderingContext2D, w: number, title: string, subtitle: string) {
  ctx.fillStyle = BRAND_RGB;
  ctx.fillRect(0, 0, w, 110);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px system-ui, sans-serif";
  ctx.fillText("SHREE VINAYAK KRASHI FARM", 28, 46);
  ctx.font = "16px system-ui, sans-serif";
  ctx.fillText(title, 28, 75);
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillText(subtitle, 28, 96);
}

function blobFromCanvas(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("png fail"))), "image/png", 0.95));
}

export async function buildInvoiceImage(invoice: Invoice, party: Party): Promise<Blob> {
  const W = 820;
  const rowH = 34;
  const headerH = 110;
  const metaH = 150;
  const totalsH = 180 + (invoice.paid > 0 ? 50 : 0);
  const H = headerH + metaH + invoice.lines.length * rowH + 60 + totalsH + 80;
  const { c, ctx } = canvas2D(W, H);
  drawHeader(ctx, W, `Invoice / Bill — ${invoice.number}`, fmtDate(invoice.date));

  // Bill To
  ctx.fillStyle = "#222";
  ctx.font = "bold 14px system-ui";
  ctx.fillText("BILL TO", 28, headerH + 30);
  ctx.font = "bold 18px system-ui";
  ctx.fillText(party.name, 28, headerH + 54);
  ctx.font = "13px system-ui";
  let y = headerH + 74;
  if (party.phone) { ctx.fillText(`Ph: ${party.phone}`, 28, y); y += 18; }
  if (party.address) { ctx.fillText(party.address, 28, y); y += 18; }

  // Items table header
  const tableY = headerH + metaH;
  ctx.fillStyle = BRAND_RGB;
  ctx.fillRect(20, tableY, W - 40, 32);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 13px system-ui";
  ctx.fillText("#", 30, tableY + 21);
  ctx.fillText("Item / Service", 60, tableY + 21);
  ctx.textAlign = "right";
  ctx.fillText("Qty", W - 320, tableY + 21);
  ctx.fillText("Rate", W - 200, tableY + 21);
  ctx.fillText("Amount", W - 30, tableY + 21);
  ctx.textAlign = "left";

  // Rows
  ctx.fillStyle = "#333";
  ctx.font = "13px system-ui";
  invoice.lines.forEach((l, i) => {
    const ry = tableY + 32 + i * rowH;
    if (i % 2 === 1) { ctx.fillStyle = "#f6f1ee"; ctx.fillRect(20, ry, W - 40, rowH); }
    ctx.fillStyle = "#222";
    ctx.fillText(String(i + 1), 30, ry + 22);
    ctx.fillText(`${l.name} (${l.unit})`, 60, ry + 22);
    ctx.textAlign = "right";
    ctx.fillText(String(l.qty), W - 320, ry + 22);
    ctx.fillText(fmtINR(l.rate), W - 200, ry + 22);
    ctx.font = "bold 13px system-ui";
    ctx.fillText(fmtINR(l.amount), W - 30, ry + 22);
    ctx.font = "13px system-ui";
    ctx.textAlign = "left";
  });

  // Totals
  const tY = tableY + 32 + invoice.lines.length * rowH + 30;
  ctx.strokeStyle = "#ddd";
  ctx.beginPath(); ctx.moveTo(W / 2, tY); ctx.lineTo(W - 20, tY); ctx.stroke();
  ctx.fillStyle = "#333";
  ctx.textAlign = "right";
  ctx.font = "14px system-ui";
  ctx.fillText("Subtotal", W - 200, tY + 24); ctx.fillText(fmtINR(invoice.subtotal), W - 30, tY + 24);
  if (invoice.discount > 0) {
    ctx.fillText("Discount", W - 200, tY + 46); ctx.fillText("- " + fmtINR(invoice.discount), W - 30, tY + 46);
  }
  ctx.font = "bold 18px system-ui";
  ctx.fillStyle = BRAND_RGB;
  ctx.fillText("TOTAL", W - 200, tY + 80); ctx.fillText(fmtINR(invoice.total), W - 30, tY + 80);
  if (invoice.paid > 0) {
    ctx.fillStyle = "#333"; ctx.font = "14px system-ui";
    ctx.fillText("Paid", W - 200, tY + 108); ctx.fillText(fmtINR(invoice.paid), W - 30, tY + 108);
    ctx.font = "bold 14px system-ui";
    ctx.fillText("Balance", W - 200, tY + 130); ctx.fillText(fmtINR(invoice.total - invoice.paid), W - 30, tY + 130);
  }
  ctx.textAlign = "left";

  // Amount in words
  ctx.fillStyle = "#666";
  ctx.font = "italic 12px system-ui";
  ctx.fillText(`Rupees ${numToWords(invoice.total)} Only`, 28, tY + 80);

  // Footer
  ctx.fillStyle = "#999"; ctx.font = "11px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("Thank you for your business — Shree Vinayak Krashi Farm", W / 2, H - 20);

  return blobFromCanvas(c);
}

export async function buildLedgerImage(
  party: Party,
  entries: { date: string; type: string; debit: number; credit: number; note?: string }[],
  balance: number,
): Promise<Blob> {
  const W = 820;
  const rowH = 30;
  const headerH = 110;
  const metaH = 90;
  const H = headerH + metaH + (entries.length + 1) * rowH + 120;
  const { c, ctx } = canvas2D(W, H);
  drawHeader(ctx, W, `Khata Statement`, `${party.name}${party.phone ? "  •  " + party.phone : ""}`);

  // Table header
  const tY = headerH + metaH;
  ctx.fillStyle = BRAND_RGB; ctx.fillRect(20, tY, W - 40, 30);
  ctx.fillStyle = "#fff"; ctx.font = "bold 12px system-ui";
  ctx.fillText("DATE", 30, tY + 20);
  ctx.fillText("PARTICULARS", 130, tY + 20);
  ctx.textAlign = "right";
  ctx.fillText("DEBIT", W - 300, tY + 20);
  ctx.fillText("CREDIT", W - 170, tY + 20);
  ctx.fillText("BALANCE", W - 30, tY + 20);
  ctx.textAlign = "left";

  let running = 0;
  ctx.font = "12px system-ui";
  entries.forEach((e, i) => {
    const ry = tY + 30 + i * rowH;
    if (i % 2 === 0) { ctx.fillStyle = "#faf6f3"; ctx.fillRect(20, ry, W - 40, rowH); }
    running += e.debit - e.credit;
    ctx.fillStyle = "#222";
    ctx.fillText(fmtDate(e.date), 30, ry + 20);
    const partic = `${e.type.toUpperCase()}${e.note ? " — " + e.note : ""}`;
    ctx.fillText(partic.length > 50 ? partic.slice(0, 48) + "…" : partic, 130, ry + 20);
    ctx.textAlign = "right";
    if (e.debit) ctx.fillText(fmtINR(e.debit), W - 300, ry + 20);
    if (e.credit) ctx.fillText(fmtINR(e.credit), W - 170, ry + 20);
    ctx.font = "bold 12px system-ui";
    ctx.fillText(fmtINR(running), W - 30, ry + 20);
    ctx.font = "12px system-ui";
    ctx.textAlign = "left";
  });

  // Final balance bar
  const bY = tY + 30 + entries.length * rowH + 30;
  ctx.fillStyle = balance >= 0 ? "#1d6f3a" : "#a23b2b";
  ctx.fillRect(20, bY, W - 40, 44);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px system-ui";
  ctx.fillText(balance >= 0 ? "Lena hai (Receivable)" : "Dena hai (Payable)", 36, bY + 28);
  ctx.textAlign = "right";
  ctx.font = "bold 20px system-ui";
  ctx.fillText(fmtINR(Math.abs(balance)), W - 36, bY + 30);
  ctx.textAlign = "left";

  ctx.fillStyle = "#999"; ctx.font = "11px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(`Generated: ${fmtDate(new Date().toISOString().slice(0, 10))}`, W / 2, H - 20);

  return blobFromCanvas(c);
}

/**
 * Try to share as IMAGE first (best WhatsApp UX → opens as photo).
 * Fallback to PDF share. Fallback to download + WhatsApp text.
 */
export async function shareAsImageOrPDF(
  imageBlob: Blob,
  pdfDoc: jsPDF,
  baseName: string,
  text: string,
) {
  const navAny = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
  const imgFile = new File([imageBlob], `${baseName}.png`, { type: "image/png" });
  if (navAny.canShare && navAny.canShare({ files: [imgFile] })) {
    try { await navigator.share({ files: [imgFile], title: baseName, text }); return; } catch { /* fall through */ }
  }
  // Try PDF share next
  const pdfBlob = pdfDoc.output("blob");
  const pdfFile = new File([pdfBlob], `${baseName}.pdf`, { type: "application/pdf" });
  if (navAny.canShare && navAny.canShare({ files: [pdfFile] })) {
    try { await navigator.share({ files: [pdfFile], title: baseName, text }); return; } catch { /* fall through */ }
  }
  // Last fallback: download the IMAGE so user can attach as photo on WhatsApp
  const url = URL.createObjectURL(imageBlob);
  const a = document.createElement("a");
  a.href = url; a.download = `${baseName}.png`; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}
