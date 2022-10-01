module.exports = {
  extends: "@denkristoffer/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  plugins: ["@emotion/eslint-plugin"],
  root: true,
  rules: {
    "@emotion/jsx-import": "off",
    "@emotion/syntax-preference": ["error", "string"],
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/react-in-jsx-scope": "off",
  },
};
