export enum ProseSize {
  SM = "sm",
  DEF = "def",
  LG = "lg",
}

export const WidthSizeLabelsMap = {
  [ProseSize.SM]: "Narrow",
  [ProseSize.DEF]: "Default",
  [ProseSize.LG]: "Wide",
} as const satisfies Record<ProseSize, string>;

export const FontSizeLabelsMap = {
  [ProseSize.SM]: "micro",
  [ProseSize.DEF]: "Default",
  [ProseSize.LG]: "GIGANTIC",
} as const satisfies Record<ProseSize, string>;
