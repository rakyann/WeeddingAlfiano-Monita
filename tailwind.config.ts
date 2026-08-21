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
        espresso: {
          DEFAULT: "#2C1D18",
          dark: "#201410",
          deep: "#2D1E18",
          card: "#3B2B24",
          light: "#4A3B34",
        },
        cream: {
          DEFAULT: "#FAF6F0",
          paper: "#F5EFEB",
          sand: "#E8DFC9",
          soft: "#FFFDF9",
        },
        baroque: {
          gold: "#C5A059",
          amber: "#D4AF37",
          bronze: "#A67C43",
          pearl: "#F0EAE1",
        },
        ink: {
          DEFAULT: "#2C1D18",
          dark: "#1A100C",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "Playfair Display", "Great Vibes", "cursive", "serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        baroque: "0 10px 30px rgba(0, 0, 0, 0.4)",
        card: "0 8px 25px rgba(32, 20, 15, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
