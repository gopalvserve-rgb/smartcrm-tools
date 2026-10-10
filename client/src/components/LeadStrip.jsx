import { useState } from "react";
import { api } from "../lib/api.js";

// Lead-capture + upsell strip shown under every tool's output.
export default function LeadStrip({ tool }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.phone) { setErr("Name aur phone dono chahiye"); return; }
    setBusy(true);
    try {
      await api.lead({ ...form, sourceTool: tool });
      setDone(true);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  if (done)
    return (
      <div className="card mt-5 p-5 text-center">
        <div className="text-2xl">✅</div>
        <p className="mt-1 font-semibold text-ink">Thanks! Hamari team aapse jaldi connect karegi.</p>
        <p className="text-sm text-slate-500">Saved to SmartCRM. Want everything in one place? Create a free account.</p>
      </div>
    );

  return (
    <div className="card mt-5 overflow-hidden">
      <div className="bg-brand px-5 py-3 text-sm font-semibold text-white">
        💾 Save this &amp; manage leads inside SmartCRM — free
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3 p-5 sm:flex-row">
        <input className="input" placeholder="Your name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="WhatsApp number" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <button className="btn-brand whitespace-nowrap" disabled={busy}>{busy ? "Saving…" : "Save free"}</button>
      </form>
      {err && <p className="px-5 pb-4 text-sm text-rose-500">{err}</p>}
    </div>
  );
}
