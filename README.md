<div align="center">

  <h1><code>Deno mysql docker api with JWT authorization</code></h1>

  <strong>First we need to install 
  <a href="https://deno.land/">Deno</a>, <a href="https://deno.land/x/denon">Denon</a> and <a href="https://docs.docker.com/docker-for-windows/install/">Docker</a>.</strong>
</div>

## 🚴 Usage

### 🛠️ Just run  

```
docker-compose up --build
```

### 🔬 Test with postman

  <strong>Install
  <a href="https://www.postman.com/downloads/">Postman</a>.</strong>

#### Routes

- GET http://localhost:3000/blogs
- GET http://localhost:3000/blogs/
- POST http://localhost:3000/blogs/:slug
- DELETE http://localhost:3000/blogs/:slug
- POST http://localhost:3000/auth/register
- POST http://localhost:3000/auth/login