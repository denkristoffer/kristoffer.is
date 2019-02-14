// eslint-disable @typescript-eslint/camelcase
// eslint-disable-next-line unicorn/filename-case
module.exports = {
  pathPrefix: "/writing",
  siteMetadata: {
    title: "kristoffer is writing",
    author: "Kristoffer Sachse",
    description: "Personal blog of Kristoffer Sachse",
    siteUrl: "https://kristoffer.is/writing",
    social: {
      twitter: "@denkristoffer",
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-code-titles",
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          "gatsby-plugin-catch-links",
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-feed",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "kristoffer.is/writing",
        short_name: "kristoffer.is/writing",
        start_url: "/writing",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "content/assets/icon.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    "gatsby-plugin-remove-trailing-slashes",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        jsx: "jsx",
      },
    },
    "gatsby-plugin-emotion",
  ],
};
