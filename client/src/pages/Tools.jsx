import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { api } from "../lib/api.js";

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.tools()
      .then((r) => setTools(r.tools || []))
      .catch(() => setTools([]))
      .finally(() => setLoading(false));
  }, []);

  const live = tools.filter((t) => !t.comingSoon);
  const soon = tools.filter((t) => t.comingSoon);

  return (
    <div>
      {/* Compact header */}
      <section className="relative overflow-hidden border-b border-slate-200/70">
        <div className="float-orb -left-20 -top-24 h-64 w-64 bg-violet" style={{ animation: "floaty 13s ease-in-out infinite" }} />
        <div className="float-orb right-0 -top-16 h-56 w-56 bg-cyan" style={{ animation: "floaty 16s ease-in-out infinite" }} />
        <div className="relative mx-auto max-w-5xl px-4 py-12 text-center">
          <Reveal>
            <span className="pill bg-white shadow-soft text-violet">Free tools by SmartCRM</span>
            <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight text-ink sm:text-4xl">
              SmartCRM <span className="gradient-text">Free Tools</span>
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              Koi bhi tool kholo, seconds mein banao aur share karo. Free — aur har lead seedha SmartCRM mein.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        {loading ? (
          <p className="text-center text-slate-400">Loading tools…</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {live.map((t, i) => <ToolCard key={t.slug} t={t} i={i} />)}
            </div>

            {soon.length > 0 && (
              <>
                <div className="mt-12 mb-5 flex items-center gap-3">
                  <h2 className="text-lg font-extrabold text-ink">Coming soon</h2>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {soon.map((t, i) => <ToolCard key={t.slug} t={t} i={i} />)}
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function ToolCard({ t, i }) {
  return (
    <Reveal delay={(i % 3) * 70}>
      <Link to={t.href || "/tools"}
        className="card group relative block p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-violet/40">
        {t.comingSoon && (
          <span className="pill absolute right-4 top-4 bg-amber-100 text-amber-700 text-[10px]">Soon</span>
        )}
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-slate-50 text-2xl">{t.icon}</span>
          <div>
            <h3 className="text-lg font-bold text-ink">{t.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.tagline}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-violet">
              {t.comingSoon ? "Get notified →" : "Open tool →"}
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
