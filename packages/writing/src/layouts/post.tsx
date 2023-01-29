import { Fragment } from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import dayjs from "dayjs";

import { H1 } from "../components/text";
import Link from "../components/link";
import Analytics from "../app/components/analytics";

export interface Metadata {
  date: string;
  excerpt: string;
  slug: string;
  title: string;
}

interface PostLayoutProps {
  children: React.ReactElement;
  metadata: Metadata;
}

export default function PostLayout({ children, metadata }: PostLayoutProps) {
  const date = dayjs(metadata.date);

  return (
    <Fragment>
      <Head>
        <title>{`${metadata.title} — kristoffer.is/writing`}</title>
        <meta name="description" content={metadata.excerpt} />
      </Head>

      <main>
        <article
          css={css`
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            padding: 50px 0 50px;

            @media screen and (min-width: 700px) {
              padding: 125px 0 100px;
            }
          `}
        >
          <header
            css={(theme) => css`
              margin: 0 auto 50px;
              max-width: ${theme.sizes.maxWidth};
              padding: 0 20px;
              width: 100%;
            `}
          >
            <H1
              css={css`
                padding: 0;
              `}
            >
              {metadata.title}
            </H1>

            <div
              css={(theme) => css`
                color: ${theme.colors.metadata};
                margin: 10px 0 50px;
              `}
            >
              Published{" "}
              <time dateTime={metadata.date}>{date.format("MMMM YYYY")}</time>
            </div>
          </header>

          <div
            css={css`
              .footnote-backref {
                font-size: 14px;
                margin-left: 5px;
                text-decoration: none;
              }
            `}
          >
            {children}
          </div>
        </article>
      </main>

      <footer
        css={(theme) => css`
          color: ${theme.colors.metadata};
          font-size: 16px;
          margin: 0 auto;
          max-width: ${theme.sizes.maxWidth};
          padding: 0 20px 50px;
        `}
      >
        &copy; Kristoffer Sachse —{" "}
        <Link href="/writing/things">
          List of everything I&rsquo;ve written
        </Link>
        <Analytics />
      </footer>
    </Fragment>
  );
}
