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
    "jest/no-commented-out-tests": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/react-in-jsx-scope": "off",
  },
};
