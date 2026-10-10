import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getToken } from "../lib/api.js";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (!getToken()) { nav("/login"); return; }
    Promise.all([api.me().then((r) => setMe(r.user)).catch(() => {}), api.mine().then((r) => setItems(r.items)).catch(() => {})])
      .finally(() => setLoading(false));
  }, []);

  async function del(id) {
    await api.remove(id).catch(() => {});
    setItems((x) => x.filter((i) => i.id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Hi {me?.name || "there"} 👋</h1>
          <p className="text-slate-500">Your saved creations · plan: <span className="font-semibold text-violet">{me?.plan || "free"}</span></p>
        </div>
        <Link to="/" className="btn-brand">+ New creation</Link>
      </div>

      {loading ? (
        <p className="mt-10 text-slate-400">Loading…</p>
      ) : items.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <div className="text-4xl">✨</div>
          <p className="mt-2 font-semibold text-ink">Abhi tak kuch save nahi kiya</p>
          <p className="text-sm text-slate-500">Koi tool kholo aur apni pehli creation banao.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link to="/card" className="btn-ghost">Visiting Card</Link>
            <Link to="/follow-hub" className="btn-ghost">Follow Hub</Link>
            <Link to="/qr" className="btn-ghost">QR Code</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.id} className="card flex items-center justify-between gap-3 p-5">
              <div className="min-w-0">
                <p className="truncate font-bold text-ink">{it.title || it.tool}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">{it.tool} · {it.views} views</p>
                <a href={it.url} target="_blank" rel="noreferrer" className="mt-1 block truncate text-sm text-violet">{it.url}</a>
              </div>
              <button onClick={() => del(it.id)} className="text-slate-300 hover:text-rose-500">🗑</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
