// @ts-check
import { defineConfig } from "astro/config";

// integrations
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import playformInline from "@playform/inline";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";

// expressive code

import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginBlurLines } from "./plugins/expressive-code-blur";
import { pluginIgnoreIndex } from "./plugins/expressive-code-ignore-index";

// rehype

import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug, { type Options as SlugOptions } from "rehype-slug";
const rehypeSlugOptions: SlugOptions = {};

import rehypeSectionize from "@hbsnow/rehype-sectionize";
import rehypeAutolink from "rehype-autolink-headings";

// remark

import { remarkReadingTime } from "./plugins/remark-reading-time";

// adapter
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

// conf
import { CODE_THEMES, CONFIG } from "./config";

// https://astro.build/config
export default defineConfig({
  site: CONFIG.SITE_URL,

  integrations: [
    expressiveCode({
      themes: Object.values(CODE_THEMES),
      themeCssSelector: (theme) => `[data-code-theme="${theme.name}"]`,
      plugins: [pluginLineNumbers(), pluginBlurLines(), pluginIgnoreIndex()],
    }),
    mdx(),
    tailwind(),

    sitemap({
      filter: (page) => page !== "/404" && page !== "/500" && page !== "/test",
    }),
    vue(),
    pagefind(),
    preact(),
    playformInline({}),
  ],

  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [rehypeSlug, rehypeSlugOptions],
      rehypeSectionize,
      [rehypeExternalLinks, { target: "_blank" }],
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
