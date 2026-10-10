import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ToolShell from "../components/ToolShell.jsx";
import LeadStrip from "../components/LeadStrip.jsx";
import { api } from "../lib/api.js";

export default function ComingSoon() {
  const { slug } = useParams();
  const [tool, setTool] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.tools()
      .then((r) => setTool((r.tools || []).find((t) => t.slug === slug) || null))
      .catch(() => setTool(null))
      .finally(() => setLoaded(true));
  }, [slug]);

  if (loaded && !tool) {
    return (
      <div className="grid min-h-[50vh] place-items-center px-4 text-center">
        <div>
          <p className="text-slate-500">Ye tool nahi mila.</p>
          <Link to="/tools" className="btn-brand mt-4">All tools</Link>
        </div>
      </div>
    );
  }

  return (
    <ToolShell
      icon={tool?.icon || "🛠️"}
      eyebrow="Coming soon"
      title={tool?.name || "This tool"}
      subtitle={(tool?.tagline ? tool.tagline + " — " : "") + "Ye tool jaldi aa raha hai. Notify karne ke liye niche apna number chhod do."}
    >
      <div className="card p-8 text-center">
        <div className="text-4xl">🚧</div>
        <h2 className="mt-2 text-xl font-extrabold text-ink">Building this one next</h2>
        <p className="mt-1 text-slate-500">Launch hote hi hum aapko WhatsApp pe bata denge.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link to="/tools" className="btn-ghost">← All tools</Link>
          <Link to="/whatsapp" className="btn-brand">Try a live tool</Link>
        </div>
      </div>
      <LeadStrip tool={slug} />
    </ToolShell>
  );
}
