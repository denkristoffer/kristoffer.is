import { join } from "path";
import Koa from "koa";
import serveStatic from "koa-static-server";

const app = new Koa();

app.use(serveStatic({ rootDir: join(__dirname, "../", "public") }));

export default app;
