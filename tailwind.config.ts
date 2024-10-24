import { addIconSelectors } from "@iconify/tailwind";
import typography from "@tailwindcss/typography";
import daisyui, { type Config as DaisyConfig } from "daisyui";
import scrollbar from "tailwind-scrollbar";
import { type Config } from "tailwindcss";
import { DARK_THEMES, SOCIAL_LINKS, THEMES } from "./config";

const config: Config = {
  darkMode: ["variant", Object.values(DARK_THEMES).map((theme) => `[data-theme='${theme}'] &`)],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [...Object.values(SOCIAL_LINKS).map(({ icon }) => icon)],
  theme: {
    extend: {
      screens: {
        "-2xl": { max: "1535px" },
        "-xl": { max: "1279px" },
        "-lg": { max: "1023px" },
        "-md": { max: "767px" },
        "-sm": { max: "639px" },
        xs: { min: "440px" },
        "-xs": { max: "440px" },
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
        caveat: ["Caveat Variable", "cursive"],
      },
    },
  },
  plugins: [
    daisyui,
    typography,
    addIconSelectors({
      prefixes: ["line-md", "logos", "la", "game-icons", "fluent"],
    }),
    scrollbar,
  ],

  daisyui: {
    themes: Object.values(THEMES),
    logs: false,
  } satisfies DaisyConfig,
};

export default config;
