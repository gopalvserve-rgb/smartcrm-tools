import { Link } from "react-router-dom";

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white font-black shadow-glow">S</span>
      {!compact && (
        <span className="leading-none">
          <b className="block text-[15px] font-extrabold tracking-tight text-ink">SmartCRM Tools</b>
          <small className="block text-[9px] font-semibold uppercase tracking-[2px] text-slate-500">by SmartCRM Solution</small>
        </span>
      )}
    </Link>
  );
}
