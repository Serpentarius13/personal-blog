import type { Theme } from "daisyui";

const THEMES = {
  bumblebee: "bumblebee",
  aqua: "aqua",
  dark: "dark",
} as const satisfies Record<string, Theme>;

interface NavLink {
  title: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  {
    title: "About me",
    href: "/about",
  },
];

const SITE_TITLE = "Void Flower";

export const CONFIG = {
  NAV_LINKS,
  SITE_TITLE,
  THEMES,
};
