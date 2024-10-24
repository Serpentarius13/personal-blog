// @ts-check
import { defineConfig } from "astro/config";

// integrations
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
// import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";
import robots from "astro-robots-txt";
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

// vite
import removeConsole from "vite-plugin-remove-console";

// https://astro.build/config
export default defineConfig({
  site: CONFIG.SITE_URL,

  vite: {
    plugins: [removeConsole()],
  },

  integrations: [
    expressiveCode({
      themes: Object.values(CODE_THEMES),
      themeCssSelector: (theme) => `[data-code-theme="${theme.name}"]`,
      plugins: [pluginLineNumbers(), pluginBlurLines(), pluginIgnoreIndex()],
    }),
    mdx(),
    tailwind({}),

    vue(),
    pagefind(),
    preact({ compat: true }),
    robots({
      sitemap: false,
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/404", "/500", "/test"],
        },
      ],
      host: true,
    }),
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

  adapter: process.env.IS_LOCAL ? node({ mode: "standalone" }) : vercel(),
  output: "hybrid",

  devToolbar: {
    enabled: false,
  },

  prefetch: true,
});
