// @ts-check
import { defineConfig } from "astro/config";

// integrations
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";

// expressive code

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginBlurLines } from "./plugins/expressive-code-blur";
import { pluginIgnoreIndex } from "./plugins/expressive-code-ignore-index";

// rehype

import rehypeSlug, { type Options as SlugOptions } from "rehype-slug";
const rehypeSlugOptions: SlugOptions = {};

import rehypeSectionize from "@hbsnow/rehype-sectionize";
import rehypeAutolink from "rehype-autolink-headings";

// remark

import { remarkReadingTime } from "./plugins/remark-reading-time";

// adapter
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import { CODE_THEMES, CONFIG, ICONS } from "./config";

import vue from "@astrojs/vue";

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
      plugins: [pluginLineNumbers(), pluginBlurLines(), pluginIgnoreIndex()],
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
    vue(),
    pagefind(),
  ],

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [rehypeSlug, rehypeSlugOptions],
      rehypeSectionize,
      [rehypeAutolink, { behavior: "wrap" }],
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
