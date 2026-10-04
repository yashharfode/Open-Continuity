import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0B0D10",
          secondary: "#111318",
        },
        surface: {
          DEFAULT: "#15181D",
          raised: "#1A1D23",
          hover: "#21252C",
        },
        border: {
          subtle: "#292D34",
          default: "#343942",
          active: "#4B5260",
        },
        primary: {
          text: "#F5F7FA",
        },
        secondary: {
          text: "#9CA3AF",
          muted: "#737B87",
        },
        accent: {
          DEFAULT: "#6D5EF5",
          hover: "#5C4CE3",
          subtle: "rgba(109, 94, 245, 0.12)",
          border: "rgba(109, 94, 245, 0.3)",
        },
        status: {
          green: "#22C55E",
          "green-subtle": "rgba(34, 197, 94, 0.12)",
          "green-border": "rgba(34, 197, 94, 0.25)",
          amber: "#F59E0B",
          "amber-subtle": "rgba(245, 158, 11, 0.12)",
          "amber-border": "rgba(245, 158, 11, 0.25)",
          red: "#EF4444",
          "red-subtle": "rgba(239, 68, 68, 0.12)",
          "red-border": "rgba(239, 68, 68, 0.25)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
