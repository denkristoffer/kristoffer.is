const u = require("unist-builder");
const { basename, dirname, extname, join, relative } = require("path");

const remarkMdxDefaultLayout = (options = []) => (tree, file) => {
  const layouts = Array.isArray(options) ? options : [options];

  layouts.forEach((layout) => {
    if (
      typeof layout.condition === "function" &&
      !layout.condition(tree, file)
    ) {
      return;
    }

    const layoutName =
      typeof layout.name === "undefined" ? "_DefaultLayout" : layout.name;

    const layoutPath = typeof layout === "string" ? layout : layout.path;

    const existingLayout = tree.children.find(
      (node) => node.type === "export" && node.default,
    );

    if (typeof existingLayout !== "undefined") {
      return;
    }

    const extension = extname(layoutPath);
    const importPath = join(
      relative(dirname(file.path), dirname(layoutPath)) || ".",
      basename(layoutPath, extension),
    );

    const importNode = u(
      "import",
      `import ${layoutName} from ${JSON.stringify(importPath)}`,
    );
    const exportNode = u("export", {
      default: true,
      value: `export default ${layoutName}`,
    });

    tree.children = [importNode, exportNode, ...tree.children];
  });
};

module.exports = remarkMdxDefaultLayout;
