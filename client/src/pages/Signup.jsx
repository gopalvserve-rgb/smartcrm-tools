import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setToken } from "../lib/api.js";
import { AuthWrap } from "./Login.jsx";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const { token } = await api.signup(form);
      setToken(token);
      nav("/dashboard");
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  return (
    <AuthWrap title="Create free account" sub="Save your tools and get every lead in SmartCRM.">
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label">Name</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="label">Phone</label>
          <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        <div><label className="label">Password</label>
          <input className="input" type="password" placeholder="6+ characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        {err && <p className="text-sm text-rose-500">{err}</p>}
        <button className="btn-brand w-full" disabled={busy}>{busy ? "…" : "Create account"}</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-semibold text-violet">Log in</Link></p>
    </AuthWrap>
  );
}
