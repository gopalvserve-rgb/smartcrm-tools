import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

const plans = [
  { name: "Free", price: "₹0", note: "forever", pop: false,
    features: ["All tools, unlimited basic use", "Shareable links + QR", "Leads saved to SmartCRM", "SmartCRM badge on output"],
    cta: "Start free", to: "/signup" },
  { name: "Pro", price: "₹299", note: "/month", pop: true,
    features: ["Everything in Free", "Remove branding badge", "Premium card & hub themes", "Dynamic QR + scan tracking", "Priority support"],
    cta: "Go Pro", to: "/signup" },
  { name: "Bundle", price: "₹2,999", note: "/year", pop: false,
    features: ["All Pro features", "All current + future tools", "Custom domain for hubs", "Best value for agencies"],
    cta: "Get bundle", to: "/signup" },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Reveal>
        <div className="text-center">
          <h1 className="text-3xl font-black text-ink sm:text-4xl">Simple, honest pricing</h1>
          <p className="mx-auto mt-3 max-w-md text-slate-500">Free se shuru karo. Jab zarurat ho, Pro pe upgrade karo. Payments via Razorpay.</p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <div className={`card relative p-7 ${p.pop ? "ring-2 ring-violet" : ""}`}>
              {p.pop && <span className="pill absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white">Most popular</span>}
              <h3 className="text-lg font-bold text-ink">{p.name}</h3>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-black text-ink">{p.price}</span>
                <span className="pb-1 text-sm text-slate-400">{p.note}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-violet">✓</span>{f}</li>)}
              </ul>
              <Link to={p.to} className={`mt-6 w-full ${p.pop ? "btn-brand" : "btn-ghost"}`}>{p.cta}</Link>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-slate-400">Razorpay se payment · GST invoice · kabhi bhi cancel</p>
    </div>
  );
}
