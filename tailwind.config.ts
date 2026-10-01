import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        gold: "var(--gold)",
        "gold-deep": "var(--gold-deep)",
        "gold-light": "var(--gold-light)",
        wine: "var(--wine)",
        emerald: "var(--emerald)",
        "emerald-deep": "var(--emerald-deep)",
        line: "var(--line)",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
