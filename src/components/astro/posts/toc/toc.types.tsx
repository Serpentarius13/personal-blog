export interface TocHeading {
  slug: string;
  text: string;
  children?: TocHeading[];
  depth: number;
}
