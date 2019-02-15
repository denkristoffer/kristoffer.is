const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve("./src/templates/blogPost.tsx");
  const tagPage = path.resolve("src/templates/tagPage.tsx");

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `,
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });

    // Create tag pages
    let allTags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(post => {
      if (
        post &&
        post.node &&
        post.node.frontmatter &&
        post.node.frontmatter.tags
      ) {
        allTags = allTags.concat(post.node.frontmatter.tags);
      }
    });

    const tags = [...new Set(allTags)];

    tags.forEach(tag => {
      createPage({
        path: `/tag/${tag}`,
        component: tagPage,
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode, trailingSlash: false });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};
