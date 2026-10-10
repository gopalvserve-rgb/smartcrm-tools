import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import { getToken, setToken } from "../lib/api.js";

const links = [
  { to: "/whatsapp", label: "WhatsApp" },
  { to: "/qr", label: "QR Code" },
  { to: "/card", label: "Visiting Card" },
  { to: "/follow-hub", label: "Follow Hub" },
  { to: "/pricing", label: "Pricing" },
];

export default function Layout() {
  const [authed, setAuthed] = useState(!!getToken());
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  useEffect(() => { setAuthed(!!getToken()); }, []);

  function logout() { setToken(null); setAuthed(false); nav("/"); }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "text-violet" : "text-slate-600 hover:text-ink"}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {authed ? (
              <>
                <Link to="/dashboard" className="hidden btn-ghost sm:inline-flex">Dashboard</Link>
                <button onClick={logout} className="text-sm font-semibold text-slate-500 hover:text-ink">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden text-sm font-semibold text-slate-600 hover:text-ink sm:block">Login</Link>
                <Link to="/signup" className="btn-brand text-sm">Get started</Link>
              </>
            )}
            <button className="md:hidden text-2xl leading-none text-slate-600" onClick={() => setOpen((v) => !v)}>≡</button>
          </div>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-2 md:hidden">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700">{l.label}</Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} SmartCRM Solution · Free tools that grow your business</p>
          <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-600">Admin</Link>
        </div>
      </footer>
    </div>
  );
}
