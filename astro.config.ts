// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// rehype
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

import react from "@astrojs/react";
import type { ShikiTransformer } from "shiki";

import { visit } from "unist-util-visit";

import { transformerNotationHighlight } from "@shikijs/transformers";

const shikiTransformer: ShikiTransformer = {
  name: "shiki-transformer",
  code(node) {
    node.children.push({
      type: "element",
      tagName: "button",
      properties: {
        type: "button",
      },
      children: [
        {
          type: "text",
          value: "Copy",
        },
      ],
    });
  },
};

const prettyCodeOptions: Options = {
  theme: {
    aurora: "aurora-x",
    dark: "ayu-dark",
    light: "catppuccin-frappe",
  },

  transformers: [shikiTransformer, transformerNotationHighlight()],
};

import type { Root } from "mdast";

import tailwind from "@astrojs/tailwind";

const remarkPlugin = () => {
  return function (tree: Root) {
    visit(tree, "code", (node, index, parent) => {});
  };
};

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkPlugin],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },

  integrations: [mdx(), react(), tailwind()],
});