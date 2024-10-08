import type { Theme } from "daisyui";
import type { BundledTheme } from "shiki";

export const CODE_THEMES = {
  dark: "ayu-dark",
  light: "rose-pine-dawn",
} as const satisfies Record<string, BundledTheme>;

type DaisyThemeMap = Partial<Record<Theme, Theme>>;

export const DARK_THEMES = {
  luxury: "luxury",
  dark: "dark",
  aqua: "aqua",
} as const satisfies DaisyThemeMap;

export const LIGHT_THEMES = {
  autumn: "autumn",
} as const satisfies DaisyThemeMap;

export const THEMES = {
  ...DARK_THEMES,
  ...LIGHT_THEMES,
} as const satisfies DaisyThemeMap;

export enum IconSet {
  GAME_ICONS = "game-icons",
  LINE_MD = "line-md",
  LINE_AWESOME = "la",
  LOGOS = "logos",
}

export const ICONS = {
  [IconSet.GAME_ICONS]: {
    "dandelion-flower": "dandelion-flower",
  },
  [IconSet.LINE_MD]: {
    "menu-fold-left": "menu-fold-left",
    x: "twitter-x",
    github: "github",
    telegram: "telegram",
    rss: "rss",
    search: "search",
    "arrow-up": "arrow-up",
    close: "close",
  },

  [IconSet.LINE_AWESOME]: {
    "chevron-right": "chevron-right",
  },
  [IconSet.LOGOS]: {
    typescript: "typescript-icon",
  },
} as const satisfies Record<IconSet, Record<string, string>>;

export const getIcon = <S extends IconSet>(
  set: S,
  name: keyof (typeof ICONS)[S],
) => {
  return ICONS[set][name];
};

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

interface Icon<S extends IconSet> {
  set: S;
  name: keyof (typeof ICONS)[S];
}

export const SOCIAL_LINKS = {
  github: {
    label: "GitHub",
    icon: {
      set: IconSet.LINE_MD,
      name: "github",
    },
    url: "https://github.com/Serpentarius13",
  },
  twitter: {
    label: "Twitter",
    icon: {
      set: IconSet.LINE_MD,
      name: "x",
    },
    url: "https://twitter.com/numinosityy",
  },
  telegram: {
    label: "Telegram",
    icon: {
      set: IconSet.LINE_MD,
      name: "telegram",
    },
    url: "https://t.me/numinosityy",
  },
} as const satisfies Record<
  string,
  {
    label: string;
    url: string;
    icon: Icon<any>;
  }
>;

const SITE_URL = import.meta.env.PROD
  ? "https://void-flower.vercel.app"
  : "http://localhost:4321";
const SITE_TITLE = "Void Flower";

export const CONFIG = {
  NAV_LINKS,
  SITE_TITLE,
  SOCIAL_LINKS,
  SITE_URL,
  SEARCH_MODAL_ID: "page-search-modal",
} as const;
