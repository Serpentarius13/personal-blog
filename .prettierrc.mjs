/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-vue",
    "prettier-plugin-sh",
    "prettier-plugin-css-order",
    // "prettier-plugin-classnames",
    // "prettier-plugin-merge",
  ],
  // endingPosition: 'absolute-with-indent',
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },

    {
      files: "*.sh",
      options: {
        parser: "sh",
      },
    },
  ],
  printWidth: 100,
};
