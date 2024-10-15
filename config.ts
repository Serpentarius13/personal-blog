import type { Theme } from "daisyui";
import type { BundledTheme } from "shiki";

export const CODE_THEMES = {
  dark: "ayu-dark",
  light: "rose-pine-dawn",
} as const satisfies Record<string, BundledTheme>;

type DaisyThemeMap = Partial<Record<Theme, Theme>>;

export const DARK_THEMES = {
  luxury: "luxury",
  night: "night",
} as const satisfies DaisyThemeMap;

export const LIGHT_THEMES = {
  autumn: "autumn",
  nord: "nord",
} as const satisfies DaisyThemeMap;

export const THEMES = {
  ...DARK_THEMES,
  ...LIGHT_THEMES,
} as const satisfies DaisyThemeMap;

export interface NavLink {
  title: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  // {
  //   title: "About me",
  //   href: "/about",
  // },
];

export const SOCIAL_LINKS = {
  github: {
    label: "GitHub",
    icon: "line-md--github",
    url: "https://github.com/Serpentarius13",
  },
  twitter: {
    label: "Twitter",
    icon: "line-md--twitter-x",
    url: "https://twitter.com/numinosityy",
  },
  telegram: {
    label: "Telegram",
    icon: "line-md--telegram",
    url: "https://t.me/numinosityy",
  },
} as const satisfies Record<
  string,
  {
    label: string;
    url: string;
    icon: string;
  }
>;

const SITE_URL = import.meta.env.PROD ? "https://void-flower.vercel.app" : "http://localhost:4321";
const API_URL = import.meta.env.PROD
  ? "https://blog-server-pi-two.vercel.app/api"
  : "http://localhost:3000/api";
const SITE_TITLE = "Void Flower";

export const CONFIG = {
  NAV_LINKS,
  SITE_TITLE,
  SOCIAL_LINKS,
  SITE_URL,
  API_URL,
  SEARCH_MODAL_ID: "page-search-modal",
  ARTICLE_BODY_ID: "article-body",
} as const;
