// @ts-check
import { defineConfig } from "astro/config";

// integrations
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";

// rehype

import rehypeSlug, { type Options as SlugOptions } from "rehype-slug";
const rehypeSlugOptions: SlugOptions = {
  prefix: "bh-",
};

import rehypeSectionize from "@hbsnow/rehype-sectionize";

import { visit } from "unist-util-visit";
const rehypeCodePlugin = () => {
  return function (tree: Root) {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "pre") {
        if (!node.properties.className) {
          node.properties.className = "not-prose";
        } else {
          node.properties.className += " not-prose";
        }
      }
    });
  };
};

// remark

import type { Root } from "mdast";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

// adapter
import vercel from "@astrojs/vercel/serverless";
import { ICONS } from "./config";

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
  integrations: [
    expressiveCode({
      themes: ["night-owl", "ayu-dark"],
      shiki: {},
    }),
    mdx(),
    react(),
    tailwind(),
    icon({
      include: Object.fromEntries(
        Object.entries(ICONS).map(([key, value]) => [
          key,
          Object.values(value),
        ]),
      ),
    }),
  ],

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [rehypeSlug, rehypeSlugOptions],
      rehypeSectionize,
      rehypeCodePlugin as any,
    ],
  },

  adapter: vercel(),
  output: "hybrid",

  devToolbar: {
    enabled: false,
  },
});

function remarkReadingTime() {
  return function (tree: Root, { data }: any) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}
