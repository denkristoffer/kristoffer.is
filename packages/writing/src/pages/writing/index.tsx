import { Fragment } from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import NextLink from "next/link";

import Button from "../../components/button";
import Link from "../../components/link";
import { H3, Text, Ul } from "../../components/text";

const Heading = H3.withComponent("h2");

export default function Index(): React.ReactElement {
  return (
    <Fragment>
      <Head>
        <title>kristoffer.is/writing</title>
        <meta name="description" content="Writings of Kristoffer Sachse." />
      </Head>

      <main
        css={(theme) => css`
          margin: 0 auto;
          max-width: ${theme.sizes.maxWidth};
          padding: 50px 0 50px;

          @media screen and (min-width: 700px) {
            padding: 125px 0 100px;
          }
        `}
      >
        <Text>
          Hi{" "}
          <span aria-label="waving hand" role="img">
            👋
          </span>
        </Text>
        <Text>
          I&rsquo;m Kristoffer. I&rsquo;m a programmer interested in design and
          technology. This place is where I publish my writings: Articles,
          guides, notes and thoughts on everything and nothing. They&rsquo;re
          not all finished or complete. Sometimes I circle back to things, other
          times I don&rsquo;t.
        </Text>

        <Text>
          If you find any of it useful or interesting, please feel free to share
          it. You can always{" "}
          <Link href="mailto:hi@kristoffer.is">reach out to me</Link> with
          thoughts and comments, feedback is always nice{" "}
          <span aria-label="folded hands" role="img">
            🙏
          </span>
        </Text>

        <Heading>My personal favourites</Heading>

        <Ul>
          <li>
            <Link href="/writing/single-purpose-websites">
              Single-purpose websites
            </Link>
          </li>
          <li>
            <Link href="/writing/what-i-learned-from-working-at-my-first-startup">
              What I learned from working at my first startup
            </Link>
          </li>
        </Ul>

        <NextLink href="/writing/things" passHref>
          <Button
            css={css`
              margin: 50px 20px 0;
            `}
          >
            View a list of everything{" "}
            <span
              aria-label="open book"
              css={css`
                display: inline-block;
                margin-left: 10px;
              `}
              role="img"
            >
              📖
            </span>
          </Button>
        </NextLink>
      </main>
    </Fragment>
  );
}
