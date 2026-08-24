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
        navy: {
          deep: "#17335C",
          accent: "#3E5C8A",
        },
        blue: {
          mid: "#7C97C4",
          light: "#B7C7E3",
        },
        cream: {
          DEFAULT: "#F7F3EA",
          soft: "#FFFDF9",
        },
        ink: {
          DEFAULT: "#1C2B3D",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E5C97A",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "Great Vibes", "cursive"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Inter", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(23,51,92,0.15)",
        deep: "0 8px 30px rgba(23,51,92,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
