import rehypeSlug from "rehype-slug";
import rehypeShiki from "rehype-shiki";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import recmaNextjsStaticProps from "recma-nextjs-static-props";

import { postsDirectory } from "./src/lib/next/index.mjs";
import { remarkMdxDefaultLayout as defaultLayout } from "./src/lib/next/remarkMdxDefaultLayout.mjs";

const isProduction = process.env.NODE_ENV === "production";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [rehypeShiki, { theme: "Material-Theme-Palenight" }],
    ],
    recmaPlugins: [recmaNextjsStaticProps],
    remarkPlugins: [
      remarkGfm,
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

/**
 * @type {import('next').NextConfig}
 */
export default withMDX({
  assetPrefix: isProduction ? "/writing" : "",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  compiler: {
    emotion: true,
  },

  experimental: {
    esmExternals: true,
  },

  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Generate sitemap on build time
    if (isServer) {
      console.log("Generating sitemap");
      import("./scripts/generateSitemap.mjs");
    }

    return config;
  },
});
