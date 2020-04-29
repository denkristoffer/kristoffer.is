/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Head from "next/head";
import Link from "next/link";

import Button from "../../components/button";
import { Text } from "../../components/text";

export default function Index(): React.ReactElement {
  return (
    <>
      <Head>
        <title>kristoffer.is/writing</title>
        <meta name="Description" content="Writings of Kristoffer Sachse." />
      </Head>

      <div
        css={(theme) => css`
          margin: 0 auto;
          max-width: ${theme.sizes.maxWidth};
          padding: 125px 0 100px;
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

        <Link href="/writing/things" passHref>
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
        </Link>
      </div>
    </>
  );
}
