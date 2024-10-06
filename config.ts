import type { Theme } from "daisyui";

export const THEMES = {
  bumblebee: "bumblebee",
  aqua: "aqua",
  dark: "dark",
} as const satisfies Record<string, Theme>;
