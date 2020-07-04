import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
// controller
import todoController from "../controllers/todoController.ts";

router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export { router }