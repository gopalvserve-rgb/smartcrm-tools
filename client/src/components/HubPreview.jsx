const PLATFORMS = [
  ["instagram", "Instagram", "📸"],
  ["facebook", "Facebook", "👍"],
  ["youtube", "YouTube", "▶️"],
  ["linkedin", "LinkedIn", "in"],
  ["x", "X / Twitter", "𝕏"],
  ["whatsapp", "WhatsApp", "💬"],
  ["website", "Website", "🌐"],
];
export const PLATFORM_LIST = PLATFORMS;

export default function HubPreview({ d = {} }) {
  const links = (d.links || []).filter((l) => l.url);
  const initials = (d.name || "SC").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-soft">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand text-2xl font-black text-white">{initials}</div>
      <h3 className="mt-4 text-xl font-extrabold text-ink">{d.name || "Your Business"}</h3>
      <p className="text-sm text-slate-500">{d.tagline || "Follow us everywhere"}</p>
      <div className="mt-5 space-y-2.5">
        {links.length === 0 && <p className="text-sm text-slate-300">Add social links to see them here</p>}
        {links.map((l, i) => {
          const p = PLATFORMS.find((x) => x[0] === l.platform) || ["", l.platform, "🔗"];
          return (
            <a key={i} href={l.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:border-violet hover:shadow-soft">
              <span className="text-xl">{p[2]}</span>
              <span>{p[1]}</span>
              <span className="ml-auto text-violet">→</span>
            </a>
          );
        })}
      </div>
      <p className="mt-5 text-[11px] text-slate-400">Made with SmartCRM Tools</p>
    </div>
  );
}
