import daisyui, { type Config as DaisyConfig } from "daisyui";
import { type Config } from "tailwindcss";
import { THEMES } from "./config.ts";

const config: Config = {
  darkMode: ["variant", ["[data-theme='dark'] &", "[data-theme='aqua'] &"]],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: Object.values(THEMES),
    logs: false,
  } satisfies DaisyConfig,
};

export default config;
