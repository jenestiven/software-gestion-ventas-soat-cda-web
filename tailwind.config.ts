import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary: "#a60d12",
        primary_transparent: "#a60d12cc",
        secondary: "#aeafb1",
        accent: "#f2f0f0",
        accent_contrast: "#2e2e2f",
        color_mix_primary: "color-mix(in srgb, #a60d12 70%, transparent)",
        color_mix_secondary: "color-mix(in srgb, #aeafb1 90%, transparent)",
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
