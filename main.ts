import { serve } from "./deps.ts";

const PORT = Deno.env.get("PORT") || 5000;

const s = serve({ port: +PORT });

const body = new TextEncoder().encode("Hello World\n");

console.log(`Server started on port ${PORT}`);
for await (const req of s) {
  req.respond({ body });
}