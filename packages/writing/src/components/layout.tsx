import { Fragment } from "react";
import { Global, css } from "@emotion/core";
import { Link } from "gatsby";

import { rhythm, scale } from "../utils/typography";

const Layout = ({ children, location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        css={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          css={{
            boxShadow: "none",
            textDecoration: "none",
            color: "inherit",
          }}
          to="/"
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        css={{
          fontFamily: "Montserrat, sans-serif",
          marginTop: 0,
        }}
      >
        <Link
          css={{
            boxShadow: "none",
            textDecoration: "none",
            color: "inherit",
          }}
          to="/"
        >
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <Fragment>
      <Global
        styles={css`
          .gatsby-highlight-code-line {
            background-color: #feb;
            display: block;
            margin-right: -1em;
            margin-left: -1em;
            padding-right: 1em;
            padding-left: 0.75em;
            border-left: 0.25em solid #f99;
          }

          .gatsby-code-title {
            margin-bottom: -0.6rem;
            padding: 0.5em 1em;
            font-family: Consolas, "Andale Mono WT", "Andale Mono",
              "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono",
              "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L",
              Monaco, "Courier New", Courier, monospace;

            background-color: #fdf6e3;
            color: #586e75;
            z-index: 0;

            border-top-left-radius: 0.3em;
            border-top-right-radius: 0.3em;
          }
        `}
      />

      <div
        css={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer />
      </div>
    </Fragment>
  );
};

export default Layout;
