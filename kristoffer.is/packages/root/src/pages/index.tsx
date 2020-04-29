import React from "react";
import Link from "next/link";

export default function Index(): React.ReactElement {
  return (
    <>
      <h1>kristoffer is&hellip;</h1>

      <ul>
        <li>
          <a href="https://github.com/denkristoffer">&hellip;coding</a>
        </li>
        <li>
          <Link href="/writing">&hellip;writing</Link>
        </li>
      </ul>

      <style global jsx>
        {`
          html,
          body {
            background: #fff;
            color: #080808;
            font-family: system-ui, -apple-system, "Segoe UI", Helvetica, Arial,
              sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol";
            font-size: 18px;
            margin: 0;
            padding: 0;
          }

          body {
            display: flex;
            height: 100vh;
            width: 100vw;
            align-items: center; /* horizontal */
            justify-content: center; /* vertical */
          }

          h1 {
            font-size: 56px;
            font-style: italic;
            font-weight: 650;
            margin-top: 0;
          }

          ul {
            font-style: italic;
            list-style: none;
            margin-bottom: 0;
          }

          li {
            line-height: 1.5em;
          }

          a {
            color: #0366d6;
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
