/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Head from "next/head";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { H1 } from "../components/text";

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

export default function PostLayout({
  children,
  metadata,
}: PostLayoutProps): React.ReactElement {
  const date = dayjs(metadata.date);
  const { pathname } = useRouter();
  const slug = pathname.replace("/writing/", "");

  return (
    <>
      <Head>
        <title>{metadata.title} — kristoffer.is/writing</title>
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

          {children}
        </article>
      </main>

      <footer
        css={(theme) => css`
          color: ${theme.colors.metadata};
          font-size: 16px;
          margin: 0 auto 50px;
          max-width: ${theme.sizes.maxWidth};
          padding: 0 20px;
        `}
      >
        &copy; 2020 Kristoffer Sachse
        {typeof window !== "undefined" &&
        window.location.host === "kristoffer.is" ? (
          <img
            alt=""
            src={`https://kristoffer.goatcounter.com/count?p=/${slug}`}
          />
        ) : null}
      </footer>
    </>
  );
}
