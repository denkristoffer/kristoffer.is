import React from "react";
import Head from "next/head";

export const config = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_runtimeJS: false,
};

export default function Index(): React.ReactElement {
  return (
    <>
      <Head>
        <title>kristoffer is&hellip;</title>

        <link rel="icon" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" href="/favicon-180.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#ff6c6c" />
      </Head>

      <h1>kristoffer is&hellip;</h1>

      <ul>
        <li>
          <a href="https://github.com/denkristoffer">&hellip;coding</a>
        </li>
        <li>
          <a href="https://twitter.com/denkristoffer">&hellip;tweeting</a>
        </li>
        <li>
          <a href="/writing">&hellip;writing</a>
        </li>
      </ul>

      <style global jsx>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          html,
          body {
            background: #fff;
            color: #080808;
            font-family: system-ui, -apple-system, "Segoe UI", Helvetica, Arial,
              sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol";
            font-size: 18px;
            height: 100%;
            width: 100%;
          }

          body {
            align-items: center; /* horizontal */
            display: flex;
            justify-content: center; /* vertical */
          }

          h1 {
            font-size: 56px;
            font-style: italic;
            font-weight: 650;
            letter-spacing: -1px;
            margin-bottom: 20px;
            text-align: center;
          }

          ul {
            display: flex;
            flex-direction: row;
            font-style: italic;
            justify-content: center;
            list-style: none;
          }

          li {
            line-height: 2.67;
          }

          li + li {
            margin-left: 80px;
          }

          a {
            color: #0366d6;
            display: inline-block;
          }

          @media (prefers-color-scheme: dark) {
            body {
              background: #181a1c;
              color: #fdfdfd;
            }

            a {
              color: #4dacfd;
            }
          }
        `}
      </style>
    </>
  );
}
