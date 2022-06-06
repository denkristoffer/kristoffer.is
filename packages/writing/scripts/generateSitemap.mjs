import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { globby } from "globby";
import prettier from "prettier";

(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby([
    "src/pages/**/*{.mdx,.tsx}",
    "!src/pages/_*.tsx",
    "!src/pages/api",
  ]);
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("src/pages", "")
              .replace(".mdx", "")
              .replace(".tsx", "");
            const route = path.replace("/index", "");

            return `
              <url>
                <loc>${`https://kristoffer.is${route}`}</loc>
              </url>`;
          })
          .join("")}
    </urlset>
  `;
  const formatted = prettier.format(sitemap, { parser: "html" });

  if (!existsSync("public")) {
    mkdirSync("public");
  }

  writeFileSync("public/sitemap.xml", formatted);
})();
