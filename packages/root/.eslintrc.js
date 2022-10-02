module.exports = {
  extends: "@denkristoffer/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["global", "jsx"] }],
  },
};
