<div align="center">

  <h1><code>Deno-Postgres products api</code></h1>

  <strong>First we need to install 
  <a href="https://deno.land/">Deno</a>,<a href="https://deno.land/x/denon">Denon</a> and <a href="https://www.postgresql.org/download/">Deno</a> .</strong>
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

- GET http://localhost:5000/api/v1/products- get all products
- GET http://localhost:5000/api/v1/products/:id - get 1 products
- POST http://localhost:5000/api/v1/products - create product
- PUT http://localhost:5000/api/v1/products/:id - update product
- DELETE http://localhost:5000/api/v1/products/:id - delete products
