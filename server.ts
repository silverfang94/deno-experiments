import { Application } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
import { router } from "./routes/todo.ts"
import notFound from './middlewares/notFound.ts';
// logger
import logger from './middlewares/logger.ts';

const app = new Application();
const port: number = 8080;

// order of execution is important;
app.use(logger.logger);
app.use(logger.responseTime);

app.use(router.routes());
app.use(router.allowedMethods());
// 404 page
app.use(notFound);

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(
      `${yellow("Listening on:")} ${green(url)}`,
    );
  });
await app.listen({ port });