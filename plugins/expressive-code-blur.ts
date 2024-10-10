import { type ExpressiveCodePlugin } from "@expressive-code/core";
import { addClassName } from "@expressive-code/core/hast";

export interface PluginBlurSettings {
  blurredLines: Record<number, boolean> | undefined;
}

declare module "@expressive-code/core" {
  export interface ExpressiveCodeBlockProps extends PluginBlurSettings {}
}

export function pluginBlurLines(): ExpressiveCodePlugin {
  return {
    name: "Blur lines",
    baseStyles: `
      .blurred:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1;
        backdrop-filter: blur(4px);
      }
      
      .blurred {
        position: relative;
      }     
    `,
    hooks: {
      preprocessMetadata: ({ codeBlock: { metaOptions, props } }) => {
        // Transfer meta options (if any) to props
        const range = metaOptions.getRange("blurredLines");

        if (range) {
          const blurredLines: Record<number, boolean> = {};
          const matches = range.matchAll(/(\d+-\d+)|(\d+(?!-))/g);
          for (const m of matches) {
            const value = m[0];

            if (value.indexOf("-") > -1) {
              const [start, end] = value.split("-").map(Number);
              if (end <= start) throw new Error("Invalid range");
              for (let i = start; i <= end; i++) {
                blurredLines[i] = true;
              }
              continue;
            }
            blurredLines[Number(value)] = true;
          }

          const map: Record<number, boolean> = {};

          props.blurredLines = blurredLines;
        }
      },
      postprocessRenderedLine: ({ codeBlock, renderData, lineIndex, line }) => {
        if (codeBlock.props.blurredLines) {
          if (lineIndex + 1 in codeBlock.props.blurredLines) {
            addClassName(renderData.lineAst, "blurred");
          }
        }
      },
    },
  };
}
