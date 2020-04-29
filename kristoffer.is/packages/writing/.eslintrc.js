module.exports = {
  root: true,
  extends: ["@denkristoffer/eslint-config", "plugin:mdx/recommended"],
  plugins: ["@emotion/eslint-plugin"],

  overrides: [
    {
      files: ["**/*.mdx"],
      rules: {
        "unicorn/filename-case": "off",
      },
    },
  ],
  rules: {
    "@emotion/jsx-import": "error",
    "@emotion/syntax-preference": ["error", "string"],
  },
};
