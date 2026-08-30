import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./frontend/**/*.{ts,tsx}",
    "./backend/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1A43",
          deep: "#06102C",
          mist: "#152454",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          soft: "#E4E4DC",
        },
        gold: {
          DEFAULT: "#D4AF37",
          bright: "#E8C547",
          flare: "#DAFF57",
          hover: "#C19B2E",
          soft: "#F6EFD2",
        },
        cream: {
          DEFAULT: "#FFFFF0",
          muted: "#F9F9F4",
        },
        teal: {
          DEFAULT: "#4BADA6",
          soft: "#E4F5F3",
        },
        canvas: "#FFFFF0",
        surface: "#FFFEF7",
        line: "#D6D6CE",
        ink: {
          DEFAULT: "#0B1A43",
          muted: "#333333",
          faint: "#484488",
        },
        accent: {
          DEFAULT: "#D4AF37",
          hover: "#C19B2E",
          soft: "#F6EFD2",
        },
        forest: {
          DEFAULT: "#4BADA6",
          soft: "#E4F5F3",
        },
        terracotta: {
          DEFAULT: "#A85A44",
          soft: "#F6E8E3",
        },
        amber: {
          DEFAULT: "#C4A04A",
          soft: "#F7F1DC",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Montserrat", "var(--font-arabic)", "Noto Sans Arabic", "ui-sans-serif", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "Noto Sans Arabic", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "Cormorant", "var(--font-display-ar)", "Noto Naskh Arabic", "Georgia", "serif"],
        "display-ar": ["var(--font-display-ar)", "Noto Naskh Arabic", "Georgia", "serif"],
        mono: ["Montserrat", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 28px rgba(11, 26, 67, 0.07)",
        lift: "0 16px 36px rgba(11, 26, 67, 0.12)",
        gold: "0 10px 28px rgba(212, 175, 55, 0.32)",
        navy: "0 18px 44px rgba(11, 26, 67, 0.28)",
      },
      borderRadius: {
        card: "16px",
        control: "12px",
      },
      backgroundImage: {
        "navy-gradient":
          "linear-gradient(165deg, #152454 0%, #0B1A43 48%, #06102C 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #8C6E1F 0%, #D4AF37 46%, #F3E5AB 78%, #D4AF37 100%)",
        "gold-metallic":
          "linear-gradient(90deg, #8C6E1F 0%, #D4AF37 40%, #F6E79C 70%, #C19B2E 100%)",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
