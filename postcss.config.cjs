module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/nesting"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};
