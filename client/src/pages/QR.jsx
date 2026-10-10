import { useEffect, useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import LeadStrip from "../components/LeadStrip.jsx";
import { api } from "../lib/api.js";

const TYPES = [
  { key: "url", label: "Website / URL", ph: "https://smartcrmsolution.com" },
  { key: "text", label: "Plain text", ph: "Any text…" },
  { key: "upi", label: "UPI Pay", ph: "yourname@upi" },
  { key: "wa", label: "WhatsApp", ph: "919876543210" },
];

export default function QR() {
  const [type, setType] = useState("url");
  const [value, setValue] = useState("");
  const [dark, setDark] = useState("#0f172a");
  const [qr, setQr] = useState("");

  const content = useMemo(() => {
    const v = value.trim();
    if (!v) return "";
    if (type === "upi") return `upi://pay?pa=${encodeURIComponent(v)}&cu=INR`;
    if (type === "wa") return `https://wa.me/${v.replace(/[^0-9]/g, "")}`;
    return v;
  }, [type, value]);

  useEffect(() => {
    let active = true;
    if (!content) { setQr(""); return; }
    const id = setTimeout(async () => {
      try { const { dataUrl } = await api.qrImage({ content, dark }); if (active) setQr(dataUrl); }
      catch { /* ignore */ }
    }, 350);
    return () => { active = false; clearTimeout(id); };
  }, [content, dark]);

  const cur = TYPES.find((t) => t.key === type);

  return (
    <ToolShell icon="🔳" eyebrow="QR Generator"
      title="QR code for anything"
      subtitle="URL, UPI payment, text ya WhatsApp — color choose karo aur QR download karo.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <label className="label">QR type</label>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button key={t.key} onClick={() => setType(t.key)}
                className={`pill border ${type === t.key ? "bg-brand text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <label className="label mt-4">{cur.label}</label>
          <input className="input" placeholder={cur.ph} value={value} onChange={(e) => setValue(e.target.value)} />
          <label className="label mt-4">Color</label>
          <div className="flex items-center gap-3">
            <input type="color" value={dark} onChange={(e) => setDark(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200" />
            <span className="text-sm text-slate-500">{dark}</span>
          </div>
        </div>

        <div className="card flex flex-col items-center justify-center gap-4 p-6">
          {qr ? (
            <>
              <img src={qr} alt="QR" className="h-52 w-52 rounded-xl border border-slate-100" />
              <a href={qr} download="smartcrm-qr.png" className="btn-brand">⬇ Download PNG</a>
            </>
          ) : (
            <p className="text-center text-slate-400">Content daalo, QR yahan banega 👆</p>
          )}
        </div>
      </div>
      <LeadStrip tool="qr" />
    </ToolShell>
  );
}
