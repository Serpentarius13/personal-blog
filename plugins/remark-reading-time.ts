import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import { filter } from "unist-util-filter";

export function remarkReadingTime() {
  return function (tree: Root, { data }: any) {
    // filter out code blocks from reading time
    const textOnPage = toString(filter(tree, (node) => node.type !== "code"));
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}
