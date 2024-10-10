import { createEffect, type Component, type JSX } from "solid-js";
//@ts-expect-error

interface Props {
  children?: JSX.Element;
}

export const Searchy: Component<Props> = ({}) => {
  const bundlePath = `${import.meta.env.BASE_URL}pagefind/`;
  createEffect(() => {
    new PagefindUI({
      element: "#search-container",
      showImages: true,
      bundlePath,
    });
  });
  // createEffect(() => {
  //   Promise.all([
  //     import("/pagefind/pagefind.js").then((r) => {
  //       window.pagefind = r.default;
  //       console.log(r, window.pagefind);
  //       return import("/pagefind/pagefind-ui.js");
  //     }),
  //   ])
  //     .then(() => {
  //       new PagefindUI({
  //         element: "#search-container",
  //         showImages: true,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // });
  return <div id="search-container"></div>;
};
