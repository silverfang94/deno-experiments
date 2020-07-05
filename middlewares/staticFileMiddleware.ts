import { Context, send } from "../deps.ts";
import { fileExists } from "../helpers.ts";

export const staticFileMiddleware = async (ctx: Context, next: Function ) => {
    let path = `${Deno.cwd()}/assets${ctx.request.url.pathname}`
    
    // path = "C:/Users/Silver/Desktop/Web Projects/deno-experiments/assets/app.css"
    console.log(path)
    if (await fileExists(path)) {
        await send(ctx,ctx.request.url.pathname), {
            root: `${Deno.cwd()}/assets`
        }
    } else {
        await next()
    }
}