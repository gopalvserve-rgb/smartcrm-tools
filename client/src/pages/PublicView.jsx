import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api.js";
import CardPreview, { vcard } from "../components/CardPreview.jsx";
import HubPreview from "../components/HubPreview.jsx";

export default function PublicView() {
  const { shortId } = useParams();
  const [gen, setGen] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.publicView(shortId).then(setGen).catch(() => setErr("This link doesn't exist or was removed."));
  }, [shortId]);

  function vcf(d) {
    const blob = new Blob([vcard(d)], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${d.name || "contact"}.vcf`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-4 py-10">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-5">
        {err && (
          <div className="card p-8 text-center">
            <p className="text-slate-500">{err}</p>
            <Link to="/" className="btn-brand mt-4">Go to SmartCRM Tools</Link>
          </div>
        )}

        {gen && gen.tool === "card" && (
          <>
            <CardPreview d={gen.data} />
            <button onClick={() => vcf(gen.data)} className="btn-brand w-full max-w-sm">⬇ Save to contacts</button>
          </>
        )}

        {gen && gen.tool === "follow-hub" && <HubPreview d={gen.data} />}

        {gen && gen.tool === "whatsapp" && (
          <div className="card p-8 text-center">
            <div className="text-4xl">💬</div>
            <p className="mt-2 font-semibold text-ink">Chat on WhatsApp</p>
            <a href={buildWa(gen.data)} target="_blank" rel="noreferrer" className="btn-brand mt-4">Open chat</a>
          </div>
        )}

        {gen && (
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">⚡ Make your own — free on SmartCRM Tools</Link>
        )}
      </div>
    </div>
  );
}

function buildWa(d = {}) {
  const n = (d.number || "").replace(/[^0-9]/g, "");
  const t = d.message ? "?text=" + encodeURIComponent(d.message) : "";
  return `https://wa.me/${n}${t}`;
}
