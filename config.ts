import type { Theme } from "daisyui";

export const THEMES = {
  bumblebee: "bumblebee",
  aqua: "aqua",
  dark: "dark",
} as const satisfies Record<string, Theme>;

export enum IconSet {
  GAME_ICONS = "game-icons",
  LINE_MD = "line-md",
  CATPPUCCIN = "catppuccin",
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
  },
  [IconSet.CATPPUCCIN]: {
    typescript: "typescript",
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

const SITE_TITLE = "Void Flower";

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

export const CONFIG = {
  NAV_LINKS,
  SITE_TITLE,
  SOCIAL_LINKS,
};
