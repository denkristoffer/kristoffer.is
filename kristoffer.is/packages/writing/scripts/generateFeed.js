const { existsSync, mkdirSync, writeFileSync } = require("fs");
const prettier = require("prettier");

const { getPageFiles, getPathFromPage, getRouteFromPath } = require("./utils");

(async () => {
  const pages = await getPageFiles();
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>kristoffer.is/writing</title>
      <link href="https://kristoffer.is/writing" />
      <updated>2003-12-13T18:30:02Z</updated>
      <author>
        <name>Kristoffer Sachse</name>
      </author>
      <id>https://kristoffer.is/writing</id>
          ${pages
            .map((page) => {
              const path = getPathFromPage(page);
              const route = getRouteFromPath(path);

              const { title } = require(`${process.cwd()}/${page}`);
              const excerpt = "";
              const publicationDate = `2003-12-13T08:29:29-04:00`;

              return `
                <entry>
                  <title>${title}</title>
                  <link href="https://kristoffer.is${route}" />
                  <id>https://kristoffer.is${route}</id>
                  <published>${publicationDate}</published>
                  <summary>${excerpt}</summary>
                </entry>`;
            })
            .join("")}
    </feed>
  `;
  const formatted = prettier.format(sitemap, { parser: "html" });

  if (!existsSync("public")) {
    mkdirSync("public");
  }

  writeFileSync("public/sitemap.xml", formatted);
})();
