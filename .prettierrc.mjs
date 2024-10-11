/** @type {import("prettier").Config} */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-vue",
    "prettier-plugin-sh",
    "prettier-plugin-css-order",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.vue",
      options: {
        parser: "vue",
      },
    },
    {
      files: "*.sh",
      options: {
        parser: "sh",
      },
    },
  ],
};
