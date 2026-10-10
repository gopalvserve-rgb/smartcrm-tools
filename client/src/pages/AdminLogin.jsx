import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAdminToken } from "../lib/api.js";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const { token } = await api.adminLogin(form);
      setAdminToken(token);
      nav("/admin");
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-glow">
        <div className="mb-5 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-black text-white">S</span>
          <b className="text-ink">Tools Admin</b>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div><label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className="label">Password</label>
            <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          {err && <p className="text-sm text-rose-500">{err}</p>}
          <button className="btn-brand w-full" disabled={busy}>{busy ? "…" : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}
