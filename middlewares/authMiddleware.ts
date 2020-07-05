import { RouterContext, validateJwt } from "../deps.ts";
import User from "../models/user.ts";

export const authMiddleware = async (ctx: RouterContext, next: Function) => {
    const headers = ctx.request.headers

    const authHeader = headers.get('Authorization')

    if(!authHeader) {
        ctx.response.status = 401
        return
    }
    const jwt = authHeader.split(' ')[1]
    if(!jwt) {
        ctx.response.status = 401
        return
    }

    const validatedJwt = await validateJwt(jwt, Deno.env.get("JWT_SECRET_KEY")!);
      if (validatedJwt.isValid) { 
        console.log("JWT is valid!\n", validatedJwt)
        const user = await User.findOne({ email: validatedJwt.payload?.iss})
        ctx.state.user = user

        await next()
      } else { 
          console.log("JWT is invalid!\n", validatedJwt)
          ctx.response.status = 401  
      }
}