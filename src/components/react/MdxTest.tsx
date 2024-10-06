import { useEffect, useState, type FC, type ReactNode } from "react";
import { ShikiMagicMove } from "shiki-magic-move/react";
import { createHighlighter, type HighlighterCore } from "shiki/bundle-web.mjs";

import "shiki-magic-move/dist/style.css";

interface Props {
  children?: ReactNode;
}

export const MdxTest: FC<Props> = ({}) => {
  const [code, setCode] = useState(`const hello = 'world'`);
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    async function initializeHighlighter() {
      const highlighter = await createHighlighter({
        themes: ["nord"],
        langs: ["javascript", "typescript"],
      });
      setHighlighter(highlighter);
    }
    initializeHighlighter();
  }, []);

  function animate() {
    setCode(`let hi = 'hello'`);
  }

  return (
    <div>
      {highlighter && (
        <>
          <ShikiMagicMove
            lang="ts"
            theme="nord"
            highlighter={highlighter}
            code={code}
            options={{ duration: 800, stagger: 0.3, lineNumbers: true }}
          />
          <button onClick={animate}>Animate</button>
        </>
      )}
    </div>
  );
};
