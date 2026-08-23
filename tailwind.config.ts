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
        scrapbook: {
          cream: "#FAF6E9",
          parchment: "#F6EED9",
          kraft: "#E8D8C0",
          ginghamRed: "#D32F2F",
          ginghamPink: "#FF8E8F",
          ginghamDark: "#9A0007",
          gold: "#D4AF37",
          goldLight: "#F3E5AB",
          amber: "#D97706",
          darkText: "#2C1810",
          brownText: "#4A3525",
          redStamp: "#C62828",
          washiYellow: "#FEF08A",
          washiGreen: "#BBF7D0",
          washiPink: "#FBCFE8",
          washiBlue: "#BAE6FD",
        },
      },
      fontFamily: {
        handwriting: ["Kalam", "Caveat", "Comic Sans MS", "cursive"],
        serifHeading: ["Playfair Display", "Georgia", "serif"],
        display: ["Fredoka", "Comic Sans MS", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        polaroid: "0 8px 24px rgba(44, 24, 16, 0.15), 0 2px 6px rgba(44, 24, 16, 0.1)",
        scrapbook: "0 10px 30px -5px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        tape: "0 2px 4px rgba(0,0,0,0.12)",
        diploma: "0 15px 35px rgba(180, 83, 9, 0.2), 0 5px 15px rgba(0,0,0,0.08)",
      },
      animation: {
        "float-gentle": "float 3s ease-in-out infinite",
        "swing": "swing 3.5s ease-in-out infinite",
        "pulse-slow": "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "bounce-slight": "bounceSlight 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        swing: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2.5deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceSlight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
