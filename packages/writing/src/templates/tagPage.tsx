import { WindowLocation } from "@reach/router";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { rhythm } from "../utils/typography";

const TagPageTemplate = ({
  data,
  location,
  pageContext,
}: {
  data: {
    allMarkdownRemark: {
      totalCount: number;
      posts: Array<{
        post: {
          fields: {
            slug: string;
          };
          frontmatter: {
            title: string;
          };
        };
      }>;
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: WindowLocation;
  pageContext: {
    tag: string;
  };
}) => {
  const { tag } = pageContext;
  const { posts, totalCount } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged #${tag}`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`All posts tagged #${tag}`} />

      <h1>{tagHeader}</h1>
      <ul>
        {posts.map(({ post }) => {
          const { slug } = post.fields;
          const { title } = post.frontmatter;

          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>

      <Link to="/tags">All tags</Link>

      <hr
        css={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />
    </Layout>
  );
};

export default TagPageTemplate;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: edges {
        post: node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
      totalCount
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
