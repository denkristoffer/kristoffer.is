import { basename, dirname, extname, join, relative } from "node:path";
import { fromJs } from "esast-util-from-js";

export function remarkMdxDefaultLayout(options = []) {
  /**
   * @param { import('@types/mdast').Root } root
   */
  return (root, file) => {
    const layouts = Array.isArray(options) ? options : [options];
    layouts.forEach((layout) => {
      if (
        typeof layout.condition === "function" &&
        !layout.condition(root, file)
      ) {
        return;
      }

      const layoutName =
        typeof layout.name === "undefined" ? "_DefaultLayout" : layout.name;
      const layoutPath = typeof layout === "string" ? layout : layout.path;

      const existingLayout = root.children.find(
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

      const ast = {
        type: "mdxjsEsm",
        data: {
          estree: fromJs(
            `import ${layoutName} from ${JSON.stringify(importPath)};
             export default ${layoutName}`,
            { module: true },
          ),
        },
      };

      root.children = [ast, ...root.children];
    });
  };
}
