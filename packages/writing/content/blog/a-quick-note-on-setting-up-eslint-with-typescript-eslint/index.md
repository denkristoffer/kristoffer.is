---
title: A quick note on setting up ESLint with @typescript-eslint
date: "2019-02-06T15:00:00.000Z"
tags: ["typescript", "tech"]
---

In January, the TypeScript team shared their [roadmap for TypeScript's development in the first half of 2019](https://github.com/Microsoft/TypeScript/issues/29288). Amongst many other things, they announced that they intend to focus on bringing ESLint's TypeScript support to parity with the existing TSLint project.

Not long after, the [`typescript-eslint`](https://github.com/typescript-eslint/typescript-eslint) project [was announced on the ESLint blog](https://eslint.org/blog/2019/01/future-typescript-eslint), which aims to bring TypeScript support to ESLint.

At the time I originally looked into it I had difficulty finding documentation on getting it set up, so here's a quick note on how to do just that.

## Install required packages

In addition to ESLint you need `@typescript-eslint`'s ESLint plugin and parser:

`yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint`

## Configure ESLint to use the TypeScript parser

```json:title=.eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"]
}
```

With this, ESLint is ready to lint your TypeScript. You can enable the recommended `@typescript-eslint/eslint-plugin` rules like you would with other ESLint plugins:

```json:title=.eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"]
}
```

## A note on usage with Prettier

If you use Prettier and thus want to disable style related rules from `@typescript-eslint/eslint-plugin`, you can do so with [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) version 4.0.0 and up.

Run `yarn add -D eslint-config-prettier` and add it to your ESLint configuration.

Final `.eslintrc.json`:

```json:title=.eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ]
}
```

## Include .ts files when linting

ESLint doesn't lint .ts files by default, so the `--ext` flag has to be passed to the `eslint` binary. Unfortunately it's not possible to set this option in the ESLint configuration at the moment, so you will most likely want to create a custom lint script that includes .ts files for ease of use.

```json:title=package.json
"scripts": {
  "lint": "eslint . --ext .js,.ts"
}
```

Now you're ready to lint TypeScript by running `yarn lint` in your terminal 🙌
