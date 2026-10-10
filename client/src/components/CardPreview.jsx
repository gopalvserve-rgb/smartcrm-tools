// Shared visiting-card visual, used in the builder and the public /c/ page.
export default function CardPreview({ d = {} }) {
  const initials = (d.name || "SC").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-soft">
      <div className="bg-brand px-6 pb-10 pt-6 text-white">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 text-2xl font-black backdrop-blur">{initials}</div>
      </div>
      <div className="px-6 pb-6 -mt-6">
        <div className="rounded-2xl bg-white p-5 shadow-soft">
          <h3 className="text-xl font-extrabold text-ink">{d.name || "Your Name"}</h3>
          <p className="text-sm font-semibold text-violet">{d.title || "Your Title"}{d.company ? ` · ${d.company}` : ""}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            {d.phone && <p>📞 {d.phone}</p>}
            {d.email && <p>✉️ {d.email}</p>}
            {d.website && <p>🌐 {d.website}</p>}
            {d.address && <p>📍 {d.address}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function vcard(d = {}) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${d.name || ""}`,
    d.company ? `ORG:${d.company}` : "",
    d.title ? `TITLE:${d.title}` : "",
    d.phone ? `TEL;TYPE=CELL:${d.phone}` : "",
    d.email ? `EMAIL:${d.email}` : "",
    d.website ? `URL:${d.website}` : "",
    d.address ? `ADR:;;${d.address};;;;` : "",
    "END:VCARD",
  ].filter(Boolean).join("\n");
}
