const rehypeSlug = require("rehype-slug");
const rehypeShiki = require("rehype-shiki");
const { rehypeAccessibleEmojis } = require("rehype-accessible-emojis");

const { postsDirectory } = require("./src/lib/next");
const defaultLayout = require("./src/lib/next/remarkMdxDefaultLayout");

const isProduction = process.env.NODE_ENV === "production";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [rehypeShiki, { theme: "Material-Theme-Palenight" }],
    ],
    remarkPlugins: [
      [
        defaultLayout,
        {
          path: `${process.cwd()}/src/layouts/post.tsx`,
          condition: (_tree, file) => file.path.startsWith(postsDirectory),
        },
      ],
    ],
  },
});

module.exports = withMDX({
  assetPrefix: isProduction ? "https://kristoffer.is/writing" : "",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  webpack: (config, { isServer }) => {
    config.node = { fs: "empty" };

    // Generate sitemap on build time
    if (isServer) {
      console.log("Generating sitemap");
      require("./scripts/generateSitemap");
    }

    return config;
  },

  target: "serverless",
});
