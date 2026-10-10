import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, getAdminToken, setAdminToken } from "../lib/api.js";

const TABS = ["Dashboard", "Leads", "Users", "Tools"];

export default function Admin() {
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState({});
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => { if (!getAdminToken()) nav("/admin/login"); }, []);

  useEffect(() => {
    const load = {
      Dashboard: api.adminStats,
      Leads: api.adminLeads,
      Users: api.adminUsers,
      Tools: api.adminTools,
    }[tab];
    load().then((d) => setData((s) => ({ ...s, [tab]: d }))).catch((e) => {
      if (/auth|token|admin/i.test(e.message)) { setAdminToken(null); nav("/admin/login"); }
      else setErr(e.message);
    });
  }, [tab]);

  function logout() { setAdminToken(null); nav("/admin/login"); }

  async function toggle(id, status) {
    await api.adminToggleTool(id, status === "live" ? "draft" : "live").catch(() => {});
    const d = await api.adminTools();
    setData((s) => ({ ...s, Tools: d }));
  }

  return (
    <div className="min-h-screen bg-[#eef0f6]">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="card h-max p-3">
          <div className="flex items-center gap-2 border-b border-slate-100 px-2 pb-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-sm font-black text-white">S</span>
            <b className="text-sm text-ink">Tools Admin</b>
          </div>
          <nav className="mt-2 space-y-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold ${tab === t ? "border-l-2 border-violet bg-slate-100 text-ink" : "border-l-2 border-transparent text-slate-500 hover:text-ink"}`}>
                {t}
              </button>
            ))}
            <button onClick={logout} className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-400 hover:text-rose-500">Logout</button>
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0">
          <h1 className="mb-4 text-xl font-extrabold text-ink">{tab}</h1>
          {err && <p className="text-rose-500">{err}</p>}

          {tab === "Dashboard" && data.Dashboard && <DashboardView d={data.Dashboard} />}
          {tab === "Leads" && data.Leads && <Table rows={data.Leads.items} cols={["name", "phone", "email", "sourceTool", "createdAt"]} />}
          {tab === "Users" && data.Users && <Table rows={data.Users.items} cols={["name", "email", "phone", "plan", "createdAt"]} />}
          {tab === "Tools" && data.Tools && <ToolsView items={data.Tools.items} onToggle={toggle} />}
        </main>
      </div>
    </div>
  );
}

function DashboardView({ d }) {
  const s = d.stats || {};
  const cards = [["Live tools", s.tools], ["Leads", s.leads], ["Users", s.users], ["Pro users", s.proUsers], ["Creations", s.gens]];
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {cards.map(([l, n]) => (
          <div key={l} className="card p-4">
            <div className="text-2xl font-black text-ink">{n ?? 0}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-400">{l}</div>
          </div>
        ))}
      </div>
      <div className="card mt-4 p-5">
        <h3 className="mb-3 font-bold text-ink">Usage by tool</h3>
        {(d.byTool || []).length === 0 && <p className="text-sm text-slate-400">No creations yet.</p>}
        {(d.byTool || []).map((t) => (
          <div key={t._id} className="flex items-center justify-between border-b border-slate-100 py-2 text-sm last:border-0">
            <span className="font-semibold text-ink">{t._id}</span>
            <span className="text-slate-500">{t.uses} uses</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolsView({ items, onToggle }) {
  return (
    <div className="card divide-y divide-slate-100">
      {items.map((t) => (
        <div key={t._id} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">{t.icon}</span>
            <div><p className="font-semibold text-ink">{t.name}</p><p className="text-xs text-slate-400">/{t.slug}</p></div>
          </div>
          <button onClick={() => onToggle(t._id, t.status)}
            className={`pill ${t.status === "live" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
            {t.status === "live" ? "● Live" : "○ Draft"}
          </button>
        </div>
      ))}
    </div>
  );
}

function Table({ rows, cols }) {
  if (!rows || rows.length === 0) return <div className="card p-8 text-center text-slate-400">No records yet.</div>;
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
            {cols.map((c) => <th key={c} className="px-4 py-3 font-semibold">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-slate-50 last:border-0">
              {cols.map((c) => (
                <td key={c} className="px-4 py-3 text-slate-600">
                  {c === "createdAt" ? new Date(r[c]).toLocaleDateString() : (c === "plan" ? <span className="pill bg-slate-100">{r[c]}</span> : (r[c] || "—"))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
