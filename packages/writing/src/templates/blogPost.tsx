import { graphql, Link } from "gatsby";
import { WindowLocation } from "@reach/router";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Tags from "../components/tags";
import { rhythm, scale } from "../utils/typography";

interface Page {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
}

const BlogPostTemplate = ({
  data,
  location,
  pageContext,
}: {
  data: {
    markdownRemark: {
      excerpt: string;
      frontmatter: {
        date: string;
        tags: string[];
        title: string;
      };
      html: string;
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: WindowLocation;
  pageContext: {
    next: Page;
    previous: Page;
  };
}) => {
  const { excerpt, frontmatter, html } = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={frontmatter.title} description={excerpt} />

      <article>
        <h1>{frontmatter.title}</h1>
        <p
          css={{
            ...scale(-1 / 5),
            display: "block",
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <footer>
          <Tags tags={frontmatter.tags.map(tag => ({ tag }))} />
        </footer>
      </article>

      <hr
        css={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />

      <ul
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          listStyle: "none",
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        tags
        title
      }
      html
      id
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
