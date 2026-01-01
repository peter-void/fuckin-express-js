import express from "express";
import {
  createNewTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo-controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createTodoSchema,
  getSingleTodoSchema,
  updateTodoSchema,
} from "../schemas/todo-schema.js";

const router = express.Router();

router.get("/", getTodos);

router.get("/:id", validate({ params: getSingleTodoSchema }), getSingleTodo);

router.post("/", validate({ body: createTodoSchema }), createNewTodo);

router.put("/:id", validate({ body: updateTodoSchema }), updateTodo);

router.delete("/:id", validate({ params: getSingleTodoSchema }), deleteTodo);

export default router;
