import { Application, Router, RouterContext } from "./deps.ts";
import router from "./router.ts";
import { staticFileMiddleware } from "./middlewares/staticFileMiddleware.ts";

const app: Application = new Application();

app.addEventListener('listen', ({ hostname, port, secure}) => {
    console.log(`Listening on ${secure ? 'https://': 'http://'}${hostname || 'localhost'}:${port}`)
});

app.addEventListener('error', e => {
    console.log(e.error)
})

app.use(staticFileMiddleware)

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({ port: 8000 })