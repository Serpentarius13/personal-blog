// @ts-check
import { defineConfig } from "astro/config";

// integrations
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";

// expressive code

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginBlurLines } from "./plugins/expressive-code-blur";

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
        node.properties.dataset = {
          theme: "everforest-light",
        };
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
import { remarkReadingTime } from "./plugins/remark-reading-time";

// adapter
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import { CODE_THEMES, CONFIG, ICONS } from "./config";

// https://astro.build/config
export default defineConfig({
  site: CONFIG.SITE_URL,
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
      themes: Object.values(CODE_THEMES),
      themeCssSelector: (theme) => `[data-code-theme="${theme.name}"]`,
      plugins: [pluginLineNumbers(), pluginBlurLines()],
    }),
    mdx(),
    tailwind(),
    icon({
      include: Object.fromEntries(
        Object.entries(ICONS).map(([key, value]) => [
          key,
          Object.values(value),
        ]),
      ),
    }),
    solidJs(),
    sitemap({
      filter: (page) => page !== "/404" && page !== "/500" && page !== "/test",
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

  adapter: process.env.IS_LOCAL
    ? node({
        mode: "standalone",
      })
    : vercel(),
  output: "hybrid",

  devToolbar: {
    enabled: false,
  },
});
