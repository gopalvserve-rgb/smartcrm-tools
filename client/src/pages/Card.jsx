import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import LeadStrip from "../components/LeadStrip.jsx";
import CardPreview, { vcard } from "../components/CardPreview.jsx";
import CopyButton from "../components/CopyButton.jsx";
import { api } from "../lib/api.js";

const fields = [
  ["name", "Full name", "Gopal Verma"],
  ["title", "Designation", "Founder"],
  ["company", "Company", "SmartCRM Solution"],
  ["phone", "Phone", "+91 98765 43210"],
  ["email", "Email", "you@company.com"],
  ["website", "Website", "smartcrmsolution.com"],
];

export default function Card() {
  const [d, setD] = useState({ name: "", title: "", company: "", phone: "", email: "", website: "" });
  const [saved, setSaved] = useState(null);
  const [busy, setBusy] = useState(false);

  function vcfDownload() {
    const blob = new Blob([vcard(d)], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${d.name || "card"}.vcf`; a.click();
    URL.revokeObjectURL(url);
  }

  async function save() {
    setBusy(true);
    try {
      const { generation } = await api.save({ tool: "card", title: d.name, data: d });
      const url = generation.url.replace("/s/", "/c/");
      const { dataUrl } = await api.qrImage({ content: url });
      setSaved({ url, qr: dataUrl });
    } catch { /* ignore */ }
    setBusy(false);
  }

  return (
    <ToolShell icon="🪪" eyebrow="Visiting Card"
      title="Digital visiting card in 1 minute"
      subtitle="Details bharo, ek shareable card link + QR milega. Ek tap mein contact save ho jata hai.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          {fields.map(([k, label, ph]) => (
            <div key={k} className="mb-3">
              <label className="label">{label}</label>
              <input className="input" placeholder={ph} value={d[k]} onChange={(e) => setD({ ...d, [k]: e.target.value })} />
            </div>
          ))}
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={vcfDownload} className="btn-ghost">⬇ Save .vcf</button>
            <button onClick={save} className="btn-brand" disabled={busy}>{busy ? "Saving…" : "Create share link"}</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <CardPreview d={d} />
          {saved && (
            <div className="card w-full max-w-sm p-5 text-center">
              <img src={saved.qr} alt="Card QR" className="mx-auto h-36 w-36 rounded-xl border border-slate-100" />
              <div className="mt-3 break-all rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{saved.url}</div>
              <div className="mt-3 flex justify-center gap-2">
                <CopyButton text={saved.url} />
                <a href={saved.url} target="_blank" rel="noreferrer" className="btn-brand">Open</a>
              </div>
            </div>
          )}
        </div>
      </div>
      <LeadStrip tool="card" />
    </ToolShell>
  );
}
