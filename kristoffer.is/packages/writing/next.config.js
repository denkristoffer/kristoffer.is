const rehypeSlug = require("rehype-slug");
const rehypeShiki = require("rehype-shiki");
const { rehypeAccessibleEmojis } = require("rehype-accessible-emojis");

const isProduction = process.env.NODE_ENV === "production";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [rehypeShiki, { theme: "Material-Theme-Palenight" }],
    ],
    remarkPlugins: [],
  },
});

module.exports = withMDX({
  assetPrefix: isProduction ? "https://kristoffer.is/writing" : "",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  webpack: (config) => {
    config.node = { fs: "empty" };
    return config;
  },

  target: "serverless",
});