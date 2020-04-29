/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import Head from "next/head";
import { GetStaticProps } from "next";

import { getAllPosts } from "../../lib/utils";
import Link from "../../components/link";
import { H2, Text } from "../../components/text";

interface ArchivePost {
  excerpt?: string;
  slug: string;
  title: string;
}

interface ArchiveProps {
  posts: ArchivePost[];
}

const ArchiveH1 = H2.withComponent("h1");

export default function Archive({ posts }: ArchiveProps): React.ReactElement {
  return (
    <>
      <Head>
        <title>Everything – kristoffer.is/writing</title>
        <meta name="Description" content="Everything I’ve published." />
      </Head>

      <main>
        <ul
          css={css`
            list-style: none;
            margin: 0;
            padding: 125px 0 100px;
          `}
        >
          {posts.map((post) => {
            return (
              <li
                css={css`
                  & + & {
                    margin-top: 100px;
                  }
                `}
                key={post.slug}
              >
                <article
                  css={(theme) => css`
                    margin: 0 auto;
                    max-width: ${theme.sizes.maxWidth};
                    width: 100%;
                  `}
                >
                  <header>
                    <ArchiveH1
                      css={css`
                        font-size: 32px;
                        margin-top: 0;
                      `}
                    >
                      <Link
                        css={css`
                          color: inherit;
                          text-decoration: inherit;
                        `}
                        href={`/writing/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </ArchiveH1>
                  </header>

                  {post.excerpt ? (
                    <>
                      <Text>{post.excerpt}</Text>
                    </>
                  ) : null}

                  <Text>
                    <Link href={`/writing/${post.slug}`}>Read article</Link>
                  </Text>
                </article>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(["excerpt", "slug", "title"]);

  return {
    props: {
      posts,
    },
  };
};
