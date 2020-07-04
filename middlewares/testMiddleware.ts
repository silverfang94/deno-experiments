import  { IRequest, IResponse, Next } from "https://deno.land/x/snowlight/mod.ts";


 export default async (req: IRequest, res: IResponse, next: Next) => {

    console.log('======Testing Middleware======');    
    console.log('HTTP Method :: '+req.method); 
    console.log('Base Url :: '+req.url);
    console.log('Path :: '+req.path);
    console.log('Search :: '+req.search);
    console.log('=============================');
    next();

 }