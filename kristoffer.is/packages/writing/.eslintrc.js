module.exports = {
  extends: "@denkristoffer/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  plugins: ["@emotion/eslint-plugin"],
  root: true,
  rules: {
    "@emotion/jsx-import": "error",
    "@emotion/syntax-preference": ["error", "string"],
  },
};
