import React from "react";
import { AppProps } from "next/app";
import { CacheProvider, css, Global, ThemeProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { MDXProvider } from "@mdx-js/react";

import { theme } from "../lib/theme";
import Link from "../components/link";
import {
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  Hr,
  Ol,
  Pre,
  Sup,
  Text,
  Ul,
} from "../components/text";

const mdxComponents = {
  a: Link,
  blockquote: Blockquote,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  hr: Hr,
  inlineCode: Code,
  ol: Ol,
  p: Text,
  pre: Pre,
  sup: Sup,
  ul: Ul,
};

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactElement {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <MDXProvider components={mdxComponents}>
          <Global
            styles={(theme) => css`
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }

              body {
                background: ${theme.colors.background};
                color: ${theme.colors.color};
                font-family: ${theme.typography.fontFamily};
              }

              @media (prefers-color-scheme: dark) {
                body {
                  background: ${theme.dark.background};
                  color: ${theme.dark.color};
                }
              }
            `}
          />

          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
