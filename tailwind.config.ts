import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        wood: {
          light: "var(--wood-light)",
          mid: "var(--wood-mid)",
          dark: "var(--wood-dark)",
          deep: "var(--wood-deep)",
          shadow: "var(--wood-shadow)",
        },
        cream: {
          white: "var(--cream-white)",
        },
        warm: {
          white: "var(--warm-white)",
        },
        accent: {
          gold: "var(--accent-gold)",
          "gold-light": "var(--accent-gold-light)",
          burgundy: "var(--accent-burgundy)",
          forest: "var(--accent-forest)",
          navy: "var(--accent-navy)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: {
          DEFAULT: "rgba(201,169,110,0.6)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        accent: ["var(--font-accent)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        "sku-raised": "var(--sku-shadow-raised)",
        "sku-pressed": "var(--sku-shadow-pressed)",
        "sku-card": "var(--sku-shadow-card)",
      },
    },
  },
  plugins: [],
};

export default config;

