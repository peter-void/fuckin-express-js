import express from "express";
import {
  createNewTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo-controller.js";
import { validate } from "../middlewares/validate.js";
import { createTodoSchema } from "../schemas/todo-schema.js";

const router = express.Router();

router.get("/", getTodos);

router.get("/:id", getSingleTodo);

router.post("/", validate({ body: createTodoSchema }), createNewTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
