import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { error: "Password is required" }),
});

export const registerSchema = z.object({
  email: z.email({ error: "Email is invalid" }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters" }),
});
