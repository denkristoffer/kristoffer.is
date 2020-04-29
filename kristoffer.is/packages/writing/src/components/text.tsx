import styled from "@emotion/styled";

import { styleCite } from "../lib/styles";

export const A = styled("a")`
  color: #0366d6;
  cursor: pointer;
  text-decoration: underline;

  @media (prefers-color-scheme: dark) {
    color: #4dacfd;
  }
`;

export const Blockquote = styled("blockquote")`
  border-left: 2px solid #aaa;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  padding: 0 0 0 20px;

  p + & {
    margin-top: 25px;
  }

  & + & {
    margin-top: 30px;
  }

  cite {
    ${styleCite};
    display: block;
    line-height: ${({ theme }) => theme.typography.lineHeight};
    margin: 20px auto 0;
    max-width: ${({ theme }) => theme.sizes.maxWidth};
  }

  & > p {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Code = styled("code")`
  background: #f3f3f3;
  border-radius: 3px;
  font-size: 14px;
  padding: 3px 5px;

  @media (prefers-color-scheme: dark) {
    background: #2c2c2c;
  }

  pre & {
    background: none;
  }
`;

export const H1 = styled("h1")`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  padding: 0 20px;
`;

export const H2 = styled(H1.withComponent("h2"))`
  font-size: 32px;
  margin: 60px auto 20px;
`;

// shiki or rehype-shiki isn't inlining the background colour for `<pre>`
// properly at the moment, so we add it manually
export const Pre = styled("pre")`
  background: #292d3e; /* shiki fix */
  border-radius: 3px;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  padding: 0 20px;

  & code {
    display: block;
    line-height: 1.5;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.sizes.maxWidth};
    padding: 17px 0;
  }
`;

export const Text = styled("p")`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize};
  line-height: ${({ theme }) => theme.typography.lineHeight};
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  padding: 0 20px;
  text-align: left;

  blockquote + &,
  & + blockquote,
  & + &,
  & + pre,
  pre + & {
    margin-top: 25px;
  }
`;