const globby = require("globby");

const getPageFiles = () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  return globby([
    "src/pages/**/*{.mdx,.tsx}",
    "!src/pages/_*.tsx",
    "!src/pages/api",
  ]);
};

const getPathFromPage = (page) => {
  return page.replace("src/pages", "").replace(".mdx", "").replace(".tsx", "");
};

const getRouteFromPath = (path) => {
  return path.replace("/index", "");
};

module.exports = {
  getPageFiles,
  getPathFromPage,
  getRouteFromPath,
};
