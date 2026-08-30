/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: "#10B981",
        cyan: "#06B6D4",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        ink: "linear-gradient(165deg, #090D16 0%, #030712 100%)",
        brand: "linear-gradient(135deg, #10B981 0%, #06B6D4 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(16, 185, 129, 0.18)",
        card: "0 24px 60px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
