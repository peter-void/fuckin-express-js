import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  status: z.enum(["todo", "done"]),
});

export const getSingleTodoSchema = z.object({
  id: z.string().min(1, "Id must provide"),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["todo", "done"]),
});
