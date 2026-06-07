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
