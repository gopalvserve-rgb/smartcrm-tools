import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <div className="text-6xl font-black gradient-text">404</div>
        <p className="mt-2 text-slate-500">Page nahi mila.</p>
        <Link to="/" className="btn-brand mt-5">Back to home</Link>
      </div>
    </div>
  );
}
