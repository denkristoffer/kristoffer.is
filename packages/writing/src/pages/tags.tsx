import { WindowLocation } from "@reach/router";
import { graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Tags from "../components/tags";
import { rhythm } from "../utils/typography";

const TagsPage = ({
  data,
  location,
}: {
  data: {
    allMarkdownRemark: {
      group: [{ fieldValue: string; totalCount: number }];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: WindowLocation;
}) => {
  const { group } = data.allMarkdownRemark;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All tags" />

      <h1>All tags</h1>

      <Tags
        tags={group.map(({ fieldValue: tag, totalCount }) => ({
          tag,
          extra: totalCount
            ? `(${totalCount} post${totalCount === 1 ? "" : "s"})`
            : undefined,
        }))}
      />

      <hr
        css={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio />
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
