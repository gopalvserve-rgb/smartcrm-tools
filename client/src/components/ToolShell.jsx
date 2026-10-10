import Reveal from "./Reveal.jsx";

// Standard tool page skeleton: eyebrow + hero, then a 2-col input/preview grid slot.
export default function ToolShell({ icon, eyebrow, title, subtitle, children }) {
  return (
    <div className="relative overflow-hidden">
      <div className="float-orb -left-20 -top-24 h-72 w-72 bg-violet" style={{ animation: "floaty 12s ease-in-out infinite" }} />
      <div className="float-orb -right-16 -top-16 h-64 w-64 bg-cyan" style={{ animation: "floaty 15s ease-in-out infinite" }} />
      <div className="relative mx-auto max-w-5xl px-4 py-12">
        <Reveal>
          <div className="text-center">
            <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-soft">{icon}</div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-violet">{eyebrow}</p>
            <h1 className="mx-auto mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">{subtitle}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
              <span className="pill bg-slate-100">⚡ Instant</span>
              <span className="pill bg-slate-100">🆓 Free to use</span>
              <span className="pill bg-slate-100">🔒 No login needed</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80} className="mt-8">{children}</Reveal>
      </div>
    </div>
  );
}
