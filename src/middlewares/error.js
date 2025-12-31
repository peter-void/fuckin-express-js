import { ZodError } from "zod";

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: err.issues[0].message ?? "Something went wrong",
    });
  }

  res
    .status(err.statusCode || 500)
    .json({ error: err.message || "Internal server error" });
};
