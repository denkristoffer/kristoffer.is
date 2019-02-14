import Koa from "koa";
import mount from "koa-mount";

import writing from "@kristoffer.is/writing";

const sites: any[] = [{ app: writing, name: "writing" }];

const app = new Koa();

sites.forEach(site => {
  app.use(mount(`/${site.name}`, site.app) as any);
});

// app.listen(3000, () => {
//   console.log("🚀 Serving site on http://localhost:3000");
// });

module.exports = app.callback();
