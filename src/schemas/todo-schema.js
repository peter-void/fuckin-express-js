import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  status: z.enum(["todo", "done"]),
});
