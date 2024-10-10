import { type ExpressiveCodePlugin } from "@expressive-code/core";
import { setProperty } from "@expressive-code/core/hast";

export interface PluginIgnoreIndex {}

declare module "@expressive-code/core" {
  export interface ExpressiveCodeBlockProps extends PluginIgnoreIndex {}
}

export function pluginIgnoreIndex(): ExpressiveCodePlugin {
  return {
    name: "Ignore index",

    hooks: {
      postprocessRenderedBlock: ({ renderData }) => {
        setProperty(renderData.blockAst, "data-pagefind-ignore", "all");
      },
    },
  };
}
