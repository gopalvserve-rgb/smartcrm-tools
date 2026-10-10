import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

const tools = [
  { to: "/whatsapp", icon: "💬", name: "WhatsApp Direct", desc: "Chat to any number without saving it. Get a wa.me link + QR." },
  { to: "/qr", icon: "🔳", name: "QR Code Generator", desc: "QR for a URL, UPI, text or WhatsApp — with custom colors." },
  { to: "/card", icon: "🪪", name: "Visiting Card Maker", desc: "A digital business card with a shareable link + QR." },
  { to: "/follow-hub", icon: "🔗", name: "Social Follow Hub", desc: "All your social links on one branded page + QR." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="float-orb -left-24 -top-28 h-80 w-80 bg-violet" style={{ animation: "floaty 13s ease-in-out infinite" }} />
        <div className="float-orb right-0 -top-20 h-72 w-72 bg-cyan" style={{ animation: "floaty 16s ease-in-out infinite" }} />
        <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-16 text-center">
          <Reveal>
            <span className="pill bg-white shadow-soft text-violet">✦ Free business tools by SmartCRM</span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-ink sm:text-6xl">
              Small tools that get you <span className="gradient-text">more customers</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
              WhatsApp links, QR codes, visiting cards and more — ready in seconds. Free to use, and every lead flows into SmartCRM.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/whatsapp" className="btn-brand">Try a tool free</Link>
              <Link to="/pricing" className="btn-ghost">See Pro</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t, i) => (
            <Reveal key={t.to} delay={i * 70}>
              <Link to={t.to}
                className="card group block p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow hover:border-violet/40">
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-slate-50 text-2xl">{t.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{t.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-violet">Open tool →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <Reveal>
          <h2 className="text-center text-2xl font-extrabold text-ink">Kaise kaam karta hai</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            ["1", "Pick a tool", "Koi bhi tool kholo — kuch bhi save karne ki zarurat nahi."],
            ["2", "Create instantly", "Live preview ke saath apna link, QR ya card banao."],
            ["3", "Share & grow", "Link ya QR share karo. Leads seedha SmartCRM mein."],
          ].map(([n, h, p], i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="card p-6 text-center">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand font-bold text-white">{n}</div>
                <h3 className="mt-3 font-bold text-ink">{h}</h3>
                <p className="mt-1 text-sm text-slate-500">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <Reveal>
          <div className="card overflow-hidden">
            <div className="bg-brand p-8 text-center text-white sm:p-12">
              <h2 className="text-2xl font-black sm:text-3xl">Ready to turn tools into leads?</h2>
              <p className="mx-auto mt-2 max-w-md text-white/85">Create a free account to save your creations and manage every lead in SmartCRM.</p>
              <Link to="/signup" className="btn mt-5 bg-white text-violet hover:brightness-95">Create free account</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
