<div align="center">

  <h1><code>Deno books api</code></h1>

  <strong>First we need to install 
  <a href="https://deno.land/">Deno</a> and <a href="https://deno.land/x/denon">Denon</a>.</strong>
</div>

## 🚴 Usage

### 🛠️ Just run  

```
denon run --allow-net app.ts
```

### 🔬 Test with postman

  <strong>Install
  <a href="https://www.postman.com/downloads/">Postman</a>.</strong>

#### Routes

- GET http://localhost:3000/books- get all books
- GET http://localhost:3000/books/:id - get 1 book
- POST http://localhost:3000/books' - create book
- DELETE http://localhost:3000/books/:id - delete book