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
          sand: "#F7F3EA",
          dark: "#EFE8DA",
        },
        ink: "#1C2B3D",
        gold: {
          accent: "#D4AF37",
          light: "#F3E5AB",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "Playfair Display", "cursive", "serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
