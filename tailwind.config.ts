import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "#0D0D0D",
        white: "#F7F7F5",
        gray: "#9A9A9A",
        accent: "#0052FF"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.12), 0 16px 40px rgba(0,82,255,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
