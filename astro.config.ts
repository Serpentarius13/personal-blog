// @ts-check
import { defineConfig } from "astro/config";

// integrations
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// rehype
import { transformerNotationHighlight } from "@shikijs/transformers";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
const prettyCodeOptions: Options = {
  theme: {
    aurora: "aurora-x",
    dark: "ayu-dark",
    light: "catppuccin-frappe",
  },

  transformers: [transformerNotationHighlight()],
};

// adapter

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },

  integrations: [mdx(), react(), tailwind()],
  adapter: vercel(),
  output: "hybrid",
});
