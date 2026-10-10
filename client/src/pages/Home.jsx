import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

const DEMO = "https://wa.me/917290093333?text=" + encodeURIComponent("Hi, I'd like a Smart CRM demo.");

const CHIPS = ["📥 Auto Lead Capture", "📞 Auto-Dial New Lead", "🤖 AI WhatsApp Bot", "📣 Bulk WhatsApp", "🟢 Live Team Status", "🎧 Call Recording"];

const FEATURES = [
  ["📥", "15+ Lead Sources", "Facebook, Google, IndiaMART, website & more — every lead auto-captured into one inbox."],
  ["📞", "Auto-Dial in 60 sec", "Tap-to-call push the moment a lead lands, with round-robin distribution & auto-retry."],
  ["🆔", "Smart Caller-ID", "Caller's name, stage & last remark on your screen before you even pick up."],
  ["🎧", "Call Recording + AI Audit", "Every call recorded, transcribed, rated & scored by AI with a next-best-action."],
  ["⏱️", "TAT Violation Alerts", "No call in 10 min? Rep pinged, admin escalation, daily violation digest to leadership."],
  ["🟢", "Live Team Monitoring", "See who's calling, idle or offline in real time — talk-time & idle-time tracking."],
  ["📊", "Pipeline Funnel & Forecast", "A visual funnel that shows where deals leak and forecasts future revenue."],
  ["🤖", "WhatsApp Automation", "AI bot + bulk WhatsApp with delivery, read, response & engagement analytics."],
  ["🔔", "Smart Follow-Up Reminders", "Mobile + desktop alerts, overdue reminders & daily follow-up nudges — never miss a lead."],
  ["🧑‍💼", "Attendance, Payroll & Tasks", "GPS check-in, leave management, task assignment & auto salary slips in one click."],
  ["💬", "Ask-AI Insights", "Plain-English answers: \"New leads today?\", \"Who's out of TAT?\", \"Top performer this week?\""],
  ["🧾", "GST Invoicing & GSTR-1", "Quotation → GST invoice → GSTR-1 export in 3 clicks, with customer ledger & ageing."],
];

const PLANS = [
  { name: "3 Users", price: "₹7,999", note: "+ GST / year", pop: true,
    features: ["All CRM features included", "15+ lead sources auto-capture", "Call recording + AI call audit", "WhatsApp automation + bulk", "Free 1-to-1 setup & training"] },
  { name: "5 Users", price: "Talk to us", note: "best for growing teams", pop: false,
    features: ["Everything in 3 Users", "Auto-dial & smart caller ID", "Attendance, GPS & payroll", "GST invoice & ledger", "Priority support"] },
  { name: "7 Users", price: "Talk to us", note: "best value per user", pop: false,
    features: ["Everything in 5 Users", "Advanced pipeline & funnel reports", "AI call scoring for full team", "Role-based access control", "Dedicated account manager"] },
];

export default function Home() {
  const [chip, setChip] = useState(0);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setChip((v) => (v + 1) % CHIPS.length), 1800);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="float-orb -left-24 -top-28 h-80 w-80 bg-violet" style={{ animation: "floaty 13s ease-in-out infinite" }} />
        <div className="float-orb right-0 -top-16 h-72 w-72 bg-cyan" style={{ animation: "floaty 16s ease-in-out infinite" }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-14 md:grid-cols-2">
          <div>
            <Reveal>
              <span className="pill bg-white shadow-soft text-violet">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" style={{ animation: "heroPulse 1.6s ease-in-out infinite" }} />
                All-in-one Sales CRM
              </span>
              <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-ink sm:text-5xl">
                Lead CRM + Call Recording + <span className="gradient-text">WhatsApp Automation + AI</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-slate-500">
                From lead capture to invoice — Smart CRM unifies 15+ sources, call recording with AI audit, WhatsApp automation, auto-dial, attendance, payroll & GST into one mobile + web app.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={DEMO} target="_blank" rel="noreferrer" className="btn-brand">Request a Demo</a>
                <Link to="/tools" className="btn-ghost">🧰 Try Free Tools</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {CHIPS.map((c, i) => (
                  <span key={c} className={`pill border text-xs transition-all duration-300 ${chip === i ? "bg-brand text-white border-transparent scale-105" : "bg-white border-slate-200 text-slate-500"}`}>{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <DashboardMock reduce={reduce} />
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-4 text-sm font-semibold text-slate-500">
          <span>15+ lead sources</span><span className="text-slate-300">•</span>
          <span>AI call audit</span><span className="text-slate-300">•</span>
          <span>WhatsApp automation</span><span className="text-slate-300">•</span>
          <span>GPS attendance & payroll</span><span className="text-slate-300">•</span>
          <span>GST invoicing</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[2px] text-violet">Everything inside</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">One screen to run your whole sales operation</h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([icon, title, desc], i) => (
            <Reveal key={title} delay={(i % 3) * 70}>
              <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-violet/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 text-2xl">{icon}</span>
                <h3 className="mt-4 font-bold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FREE TOOLS BAND */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="flex flex-col items-center justify-between gap-5 bg-gradient-to-r from-violet/10 to-cyan/10 p-8 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="text-xl font-black text-ink">🧰 Free business tools — no login needed</h3>
                <p className="mt-1 text-slate-500">WhatsApp link, QR generator, visiting card & social hub. Try them free, every lead flows into SmartCRM.</p>
              </div>
              <Link to="/tools" className="btn-brand whitespace-nowrap">Open Free Tools →</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-14">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Simple yearly plans</h2>
            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              <b className="text-ink">₹7,999 + GST</b> for 1 year for 3 users. Every plan includes all features and 1-to-1 setup help. No per-feature charges.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className={`card relative h-full p-7 ${p.pop ? "ring-2 ring-violet" : ""}`}>
                {p.pop && <span className="pill absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white">Most popular</span>}
                <h3 className="text-lg font-bold text-ink">{p.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-3xl font-black text-ink">{p.price}</span>
                  <span className="pb-1 text-sm text-slate-400">{p.note}</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-violet">✓</span>{f}</li>)}
                </ul>
                <a href={DEMO} target="_blank" rel="noreferrer" className={`mt-6 w-full ${p.pop ? "btn-brand" : "btn-ghost"}`}>Request For Demo →</a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">₹7,999 + GST includes 1 year of Smart CRM for 3 users, every feature, free data import and 1-to-1 onboarding.</p>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="bg-brand p-8 text-center text-white sm:p-12">
              <h2 className="text-2xl font-black sm:text-3xl">Ready to run your whole sales operation on one screen?</h2>
              <p className="mx-auto mt-2 max-w-md text-white/85">₹7,999 + GST · 1 year · 3 users · 1-to-1 setup help</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={DEMO} target="_blank" rel="noreferrer" className="btn bg-white text-violet hover:brightness-95">Request a Demo</a>
                <a href={DEMO} target="_blank" rel="noreferrer" className="btn border border-white/60 text-white hover:bg-white/10">Book a Live Demo</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes ringGlow { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.5)} 70%{box-shadow:0 0 0 10px rgba(16,185,129,0)} }
        @keyframes grow { from{height:8%} }
      `}</style>
    </div>
  );
}

function DashboardMock({ reduce }) {
  return (
    <div className="mx-auto w-full max-w-md" style={{ animation: reduce ? "none" : "floaty 7s ease-in-out infinite" }}>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400" /><span className="h-3 w-3 rounded-full bg-amber-400" /><span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-semibold text-slate-400">Smart CRM · Dashboard</span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {[["New leads", "128"], ["Calls today", "342"], ["Out of TAT", "6"]].map(([l, n]) => (
              <div key={l} className="rounded-xl bg-slate-50 p-3">
                <div className="text-lg font-black text-ink">{n}</div>
                <div className="text-[10px] uppercase tracking-wide text-slate-400">{l}</div>
              </div>
            ))}
          </div>
          {/* incoming call row */}
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white" style={{ animation: reduce ? "none" : "ringGlow 1.8s ease-in-out infinite" }}>📞</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">Incoming · Rahul Sharma</p>
              <p className="text-[11px] text-slate-500">Hot lead · Stage: Negotiation · IndiaMART</p>
            </div>
          </div>
          {/* mini funnel */}
          <div className="mt-3 flex items-end gap-1.5" style={{ height: 70 }}>
            {[90, 70, 52, 38, 22].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-brand" style={{ height: `${h}%`, opacity: 0.55 + i * 0.09, animation: reduce ? "none" : "grow .9s ease" }} />
            ))}
          </div>
          <p className="mt-2 text-center text-[10px] uppercase tracking-wide text-slate-400">Pipeline funnel</p>
        </div>
      </div>
    </div>
  );
}
