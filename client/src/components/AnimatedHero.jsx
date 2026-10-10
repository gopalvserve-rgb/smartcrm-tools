import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WORDS = ["more customers", "more leads", "more sales", "more reviews"];

export default function AnimatedHero() {
  const [screen, setScreen] = useState(0);
  const [word, setWord] = useState(0);
  const reduce = typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return;
    const s = setInterval(() => setScreen((v) => (v + 1) % 3), 3000);
    const w = setInterval(() => setWord((v) => (v + 1) % WORDS.length), 2200);
    return () => { clearInterval(s); clearInterval(w); };
  }, [reduce]);

  return (
    <section className="relative overflow-hidden">
      <div className="float-orb -left-24 -top-28 h-80 w-80 bg-violet" style={{ animation: "floaty 13s ease-in-out infinite" }} />
      <div className="float-orb right-0 -top-16 h-72 w-72 bg-cyan" style={{ animation: "floaty 16s ease-in-out infinite" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-14 md:grid-cols-2">
        {/* Left: copy */}
        <div>
          <span className="pill bg-white shadow-soft text-violet">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" style={{ animation: "heroPulse 1.6s ease-in-out infinite" }} />
            Free business tools by SmartCRM
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Small tools that get you<br />
            <span className="relative inline-block">
              <span key={word} className="gradient-text animate-[wordIn_.5s_ease]">{WORDS[word]}</span>
            </span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-slate-500">
            WhatsApp links, QR codes, visiting cards aur bahut kuch — seconds mein. Free, aur har lead seedha SmartCRM mein.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/whatsapp" className="btn-brand">Try a tool free</Link>
            <Link to="/pricing" className="btn-ghost">See Pro</Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>⚡ Instant</span><span>🆓 No login to try</span><span>🔒 Secure</span>
          </div>
        </div>

        {/* Right: animated phone */}
        <div className="flex justify-center">
          <div className="relative" style={{ animation: reduce ? "none" : "phoneFloat 6s ease-in-out infinite" }}>
            <div className="relative h-[480px] w-[248px] rounded-[2.4rem] border-[7px] border-slate-900 bg-slate-900 shadow-2xl">
              <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
              <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-slate-50 to-slate-100">
                <Screen active={screen === 0}><WhatsAppScreen on={screen === 0 && !reduce} /></Screen>
                <Screen active={screen === 1}><QRScreen on={screen === 1 && !reduce} /></Screen>
                <Screen active={screen === 2}><CardScreen /></Screen>
              </div>
            </div>
            {/* dots */}
            <div className="mt-4 flex justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`h-1.5 rounded-full transition-all ${screen === i ? "w-5 bg-violet" : "w-1.5 bg-slate-300"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wordIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        @keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes phoneFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes scanline { 0%{top:12%} 50%{top:78%} 100%{top:12%} }
        @keyframes typing { 0%,60%,100%{opacity:.25;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)} }
        @keyframes bubbleIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
      `}</style>
    </section>
  );
}

function Screen({ active, children }) {
  return (
    <div className="absolute inset-0 transition-all duration-700"
      style={{ opacity: active ? 1 : 0, transform: active ? "translateX(0)" : "translateX(12px)", pointerEvents: active ? "auto" : "none" }}>
      {children}
    </div>
  );
}

function WhatsAppScreen({ on }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 bg-[#128C7E] px-3 py-3 text-white">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">💬</span>
        <div><p className="text-sm font-bold leading-none">Adbullet</p><p className="text-[10px] opacity-80">online</p></div>
      </div>
      <div className="flex-1 space-y-2 bg-[#e5ddd5] p-3">
        <div className="max-w-[75%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-xs shadow" style={{ animation: on ? "bubbleIn .5s ease" : "none" }}>
          Hi! Interested in your service 👋
        </div>
        <div className="ml-auto max-w-[75%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2 text-xs shadow" style={{ animation: on ? "bubbleIn .5s ease .4s both" : "none" }}>
          Great! Here's the link ✅
        </div>
        <div className="flex w-14 items-center gap-1 rounded-lg bg-white px-3 py-2 shadow">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-400"
              style={{ animation: on ? `typing 1.2s ease-in-out ${i * 0.2}s infinite` : "none" }} />
          ))}
        </div>
      </div>
      <div className="bg-white px-3 py-2 text-center text-[10px] font-semibold text-[#128C7E]">wa.me/919876543210</div>
    </div>
  );
}

function QRScreen({ on }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-5 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-violet">Scan to pay</p>
      <div className="relative rounded-xl bg-white p-3 shadow-soft">
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 49 }).map((_, i) => (
            <span key={i} className={`h-3 w-3 rounded-[2px] ${((i * 7 + i) % 3 === 0 || i % 5 === 0) ? "bg-slate-900" : "bg-transparent"}`} />
          ))}
        </div>
        {on && <span className="absolute left-2 right-2 h-0.5 rounded bg-cyan shadow-[0_0_8px_#22d3ee]" style={{ animation: "scanline 2s ease-in-out infinite" }} />}
      </div>
      <p className="text-sm font-bold text-ink">₹499 · SmartCRM</p>
    </div>
  );
}

function CardScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-5">
      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-soft">
        <div className="bg-brand px-4 pb-8 pt-5"><div className="grid h-12 w-12 place-items-center rounded-xl bg-white/20 text-lg font-black text-white">GV</div></div>
        <div className="-mt-5 px-4 pb-4">
          <div className="rounded-xl bg-white p-3 shadow-soft">
            <p className="text-base font-extrabold text-ink">Gopal Verma</p>
            <p className="text-xs font-semibold text-violet">Founder · SmartCRM</p>
            <div className="mt-2 space-y-1 text-[11px] text-slate-500">
              <p>📞 +91 98765 43210</p><p>🌐 smartcrmsolution.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">Tap to save contact</p>
    </div>
  );
}
