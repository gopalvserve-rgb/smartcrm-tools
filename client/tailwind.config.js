/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mute: "#64748b",
        violet: "#7c5cff",
        brandblue: "#5b8cff",
        cyan: "#22d3ee",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        brand: "linear-gradient(135deg,#7c5cff,#5b8cff 50%,#22d3ee)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15,23,42,.08)",
        glow: "0 14px 40px rgba(124,92,255,.25)",
      },
    },
  },
  plugins: [],
};
