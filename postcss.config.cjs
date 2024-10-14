module.exports = {
  plugins: [
    require("autoprefixer"),
    require("tailwindcss/nesting"),
    ...(process.env.NODE_ENV === "production" ? [require("cssnano")] : []),
  ],
};
