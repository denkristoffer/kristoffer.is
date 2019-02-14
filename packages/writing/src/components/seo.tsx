import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const Seo = ({
  description,
  lang = "en",
  meta = [],
  keywords = [],
  title,
}: {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: "description",
                content: metaDescription,
              },
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:creator",
                content: data.site.siteMetadata.author,
              },
              {
                name: "twitter:title",
                content: title,
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", "),
                    }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
};

export default Seo;

const detailsQuery = graphql`
  query DefaultSeoQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
