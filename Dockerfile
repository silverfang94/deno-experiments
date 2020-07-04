FROM hayd/alpine-deno

EXPOSE 5000

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "main.ts"]