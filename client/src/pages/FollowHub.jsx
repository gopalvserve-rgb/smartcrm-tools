import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import LeadStrip from "../components/LeadStrip.jsx";
import HubPreview, { PLATFORM_LIST } from "../components/HubPreview.jsx";
import CopyButton from "../components/CopyButton.jsx";
import { api } from "../lib/api.js";

export default function FollowHub() {
  const [d, setD] = useState({ name: "", tagline: "", links: [{ platform: "instagram", url: "" }] });
  const [saved, setSaved] = useState(null);
  const [busy, setBusy] = useState(false);

  function setLink(i, key, val) {
    const links = d.links.slice();
    links[i] = { ...links[i], [key]: val };
    setD({ ...d, links });
  }
  function addLink() { setD({ ...d, links: [...d.links, { platform: "website", url: "" }] }); }
  function removeLink(i) { setD({ ...d, links: d.links.filter((_, x) => x !== i) }); }

  async function save() {
    setBusy(true);
    try {
      const { generation } = await api.save({ tool: "follow-hub", title: d.name, data: d });
      const url = generation.url.replace("/s/", "/u/");
      const { dataUrl } = await api.qrImage({ content: url });
      setSaved({ url, qr: dataUrl });
    } catch { /* ignore */ }
    setBusy(false);
  }

  return (
    <ToolShell icon="🔗" eyebrow="Social Follow Hub"
      title="All your socials, one tap"
      subtitle="Ek branded page jahan customer aapke saare social accounts ek tap mein follow kare. Plus QR.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card p-6">
          <label className="label">Business name</label>
          <input className="input" placeholder="Adbullet" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
          <label className="label mt-3">Tagline</label>
          <input className="input" placeholder="Performance marketing agency" value={d.tagline} onChange={(e) => setD({ ...d, tagline: e.target.value })} />

          <label className="label mt-4">Social links</label>
          <div className="space-y-2">
            {d.links.map((l, i) => (
              <div key={i} className="flex gap-2">
                <select className="input w-32" value={l.platform} onChange={(e) => setLink(i, "platform", e.target.value)}>
                  {PLATFORM_LIST.map((p) => <option key={p[0]} value={p[0]}>{p[1]}</option>)}
                </select>
                <input className="input" placeholder="https://…" value={l.url} onChange={(e) => setLink(i, "url", e.target.value)} />
                <button onClick={() => removeLink(i)} className="px-2 text-slate-400 hover:text-rose-500">✕</button>
              </div>
            ))}
          </div>
          <button onClick={addLink} className="mt-3 text-sm font-semibold text-violet">+ Add link</button>
          <div className="mt-4">
            <button onClick={save} className="btn-brand w-full" disabled={busy}>{busy ? "Saving…" : "Create my hub"}</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <HubPreview d={d} />
          {saved && (
            <div className="card w-full max-w-sm p-5 text-center">
              <img src={saved.qr} alt="Hub QR" className="mx-auto h-36 w-36 rounded-xl border border-slate-100" />
              <div className="mt-3 break-all rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{saved.url}</div>
              <div className="mt-3 flex justify-center gap-2">
                <CopyButton text={saved.url} />
                <a href={saved.url} target="_blank" rel="noreferrer" className="btn-brand">Open</a>
              </div>
            </div>
          )}
        </div>
      </div>
      <LeadStrip tool="follow-hub" />
    </ToolShell>
  );
}
