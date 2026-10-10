import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setToken } from "../lib/api.js";
import Logo from "../components/Logo.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      const { token } = await api.login(form);
      setToken(token);
      nav("/dashboard");
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  return (
    <AuthWrap title="Welcome back" sub="Log in to manage your tools and leads.">
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="label">Password</label>
          <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        {err && <p className="text-sm text-rose-500">{err}</p>}
        <button className="btn-brand w-full" disabled={busy}>{busy ? "…" : "Log in"}</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">No account? <Link to="/signup" className="font-semibold text-violet">Sign up free</Link></p>
    </AuthWrap>
  );
}

export function AuthWrap({ title, sub, children }) {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-6 flex justify-center"><Logo /></div>
      <div className="card p-7">
        <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
        <p className="mb-5 mt-1 text-sm text-slate-500">{sub}</p>
        {children}
      </div>
    </div>
  );
}
