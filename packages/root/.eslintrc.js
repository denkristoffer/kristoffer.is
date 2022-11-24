module.exports = {
  extends: ["@denkristoffer/eslint-config", "plugin:@next/next/recommended"],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["global", "jsx"] }],
  },
};
