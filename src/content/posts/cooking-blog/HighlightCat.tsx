import { type Component, type JSX } from "solid-js";

interface Props {
  children?: JSX.Element;
}

export const HighlightCat: Component<Props> = ({}) => {
  const handleClick = () => {
    const catButton = document.querySelector("#cat-button");

    let classes = window.matchMedia("(prefers-reduced-motion)").matches
      ? ["ring-2", "ring-red-500"]
      : [
          "ring-2",
          "ring-red-500",
          "scale-[3]",
          "-translate-x-[60px]",
          "translate-y-[120px]",
          "bg-base-100",
        ];

    catButton?.classList.add(...classes);

    const sound = new Audio("/sounds/cat.mp3");
    sound.play();
    setTimeout(() => {
      catButton?.classList.remove(...classes);
    }, 2500);
  }
  return <button id="cat-highlighter" onClick={handleClick} class="btn btn-sm inline-block"> Click here </button>;
};



