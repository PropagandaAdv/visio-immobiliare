import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        ink: "#12242B",
        "ink-soft": "#33454C",
        brand: {
          DEFAULT: "#1E4E5B",
          dark: "#153940",
          light: "#2E6C7C",
        },
        gold: {
          DEFAULT: "#C5A059",
          dark: "#A98544",
          light: "#D7BA85",
        },
        sage: {
          DEFAULT: "#829F92",
          dark: "#6C8778",
        },
        paper: "#FFFFFF",
        "paper-warm": "#F8F9FA",
        card: "#F1F3F2",
        line: "rgba(18,36,43,0.12)",
        "line-dark": "rgba(255,255,255,0.14)",
        muted: "#5B6B70",
      },
      fontFamily: {
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
