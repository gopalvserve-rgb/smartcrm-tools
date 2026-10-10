import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

const tools = [
  { to: "/whatsapp", icon: "💬", name: "WhatsApp Direct", desc: "Chat to any number without saving it. Get a wa.me link + QR." },
  { to: "/qr", icon: "🔳", name: "QR Code Generator", desc: "QR for a URL, UPI, text or WhatsApp — with custom colors." },
  { to: "/card", icon: "🪪", name: "Visiting Card Maker", desc: "A digital business card with a shareable link + QR." },
  { to: "/follow-hub", icon: "🔗", name: "Social Follow Hub", desc: "All your social links on one branded page + QR." },
];

export default function Tools() {
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

        <p className="mt-8 text-center text-sm text-slate-400">Aur tools jaldi aa rahe hain — Invoice maker, Link-in-bio, Review collector…</p>
      </section>
    </div>
  );
}
