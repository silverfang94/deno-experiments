import { Application, Context } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { get_all_books, get_book, create_book, delete_book } from './controllers/bookController.ts';

const app = new Application();

// static files
app.static('/','./public');

// routes
app.get('/', async (ctx: Context) => {
    await ctx.file('./public/index.html');
});
app.get('/about-us',async () => {
    console.log('request made');
})
app.get("/hello", (c) => {
    return "Hello, Abc!";
  })

app
    .get('/books', get_all_books)
    .get('/books/:id', get_book)
    .post('/books', create_book)
    .delete('/books/:id', delete_book);
  
    app.start({ port: 3000 });