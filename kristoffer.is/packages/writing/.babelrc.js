module.exports = {
  plugins: [
    [
      "@emotion/babel-plugin",
      {
        cssPropOptimization: false,
      },
    ],
  ],
  presets: ["next/babel"],
};
