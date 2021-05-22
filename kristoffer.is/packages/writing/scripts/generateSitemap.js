const { existsSync, mkdirSync, writeFileSync } = require("fs");
const prettier = require("prettier");

const { getPageFiles, getPathFromPage, getRouteFromPath } = require("./utils");

(async () => {
  const pages = await getPageFiles();
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = getPathFromPage(page);
            const route = getRouteFromPath(path);

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
