import { useState } from "react";

export default function CopyButton({ text, label = "Copy link" }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      // fallback: select nothing, just show hint
      setDone(false);
    }
  }
  return (
    <button onClick={copy} className="btn-ghost">
      {done ? "✓ Copied" : label}
    </button>
  );
}
