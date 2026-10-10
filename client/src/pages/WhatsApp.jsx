import { useEffect, useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import LeadStrip from "../components/LeadStrip.jsx";
import { api } from "../lib/api.js";
import CopyButton from "../components/CopyButton.jsx";

export default function WhatsApp() {
  const [cc, setCc] = useState("91");
  const [num, setNum] = useState("");
  const [msg, setMsg] = useState("Hi, I'm interested in your service.");
  const [qr, setQr] = useState("");

  const link = useMemo(() => {
    const n = (cc + num).replace(/[^0-9]/g, "");
    if (!n) return "";
    const t = msg ? "?text=" + encodeURIComponent(msg) : "";
    return `https://wa.me/${n}${t}`;
  }, [cc, num, msg]);

  useEffect(() => {
    let active = true;
    if (!link) { setQr(""); return; }
    const id = setTimeout(async () => {
      try { const { dataUrl } = await api.qrImage({ content: link, dark: "#128C7E" }); if (active) setQr(dataUrl); }
      catch { /* ignore */ }
    }, 350);
    return () => { active = false; clearTimeout(id); };
  }, [link]);

  return (
    <ToolShell icon="💬" eyebrow="WhatsApp Direct"
      title="WhatsApp link without saving the number"
      subtitle="Apna number daalo, ek click-to-chat link aur QR turant ban jayega. Customers bina number save kiye chat kar sakte hain.">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Input */}
        <div className="card p-6">
          <label className="label">WhatsApp number</label>
          <div className="flex gap-2">
            <input className="input w-20" value={cc} onChange={(e) => setCc(e.target.value)} />
            <input className="input" placeholder="98765 43210" value={num} onChange={(e) => setNum(e.target.value)} />
          </div>
          <label className="label mt-4">Pre-filled message (optional)</label>
          <textarea className="input min-h-[90px]" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <p className="mt-2 text-xs text-slate-400">Country code ke saath number (India = 91).</p>
        </div>

        {/* Preview */}
        <div className="card flex flex-col items-center justify-center gap-4 p-6">
          {link ? (
            <>
              {qr ? <img src={qr} alt="WhatsApp QR" className="h-44 w-44 rounded-xl border border-slate-100" />
                  : <div className="grid h-44 w-44 place-items-center text-slate-300">Generating…</div>}
              <div className="w-full break-all rounded-xl bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-600">{link}</div>
              <div className="flex w-full flex-wrap justify-center gap-2">
                <CopyButton text={link} />
                <a href={link} target="_blank" rel="noreferrer" className="btn-brand">Open chat</a>
              </div>
            </>
          ) : (
            <p className="text-center text-slate-400">Number daalte hi yahan link + QR dikhega 👆</p>
          )}
        </div>
      </div>
      <LeadStrip tool="whatsapp" />
    </ToolShell>
  );
}
