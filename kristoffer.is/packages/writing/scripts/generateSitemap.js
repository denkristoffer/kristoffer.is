const { writeFileSync } = require("fs");
const globby = require("globby");
const prettier = require("prettier");

void (async () => {
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

  writeFileSync("public/sitemap.xml", formatted);
})();
