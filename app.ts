import snowlight, {  IRequest, IResponse } from "https://deno.land/x/snowlight/mod.ts";
import userRoute  from './routers/userRoute.ts';
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";

const port = Deno.env.get("PORT") || 5000;

const app = snowlight();

app.use(app.json());

app.use(app.urlencoded());

app.get("/", async (req: IRequest, res: IResponse) => {
	res.send('Hello world!');
});


app.use( userRoute );
   

app.listen({
	port: +port
}, () =>  {
	const protocol = "http://"
	const url = `${protocol}${"localhost"}:${port}`
	console.log(`${yellow("Listening on:")} ${green(url)}`)
})