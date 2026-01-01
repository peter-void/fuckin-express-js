import express from "express";
import todoRoutes from "./routes/todo-routes.js";
import authRoutes from "./routes/auth-routes.js";
import todoMiddleware from "./middlewares/logger.js";
import { errorMiddleware } from "./middlewares/error.js";
import "dotenv/config";
import { pool } from "./db/index.js";

const app = express();

app.use(express.json());

app.get("/health", async (req, res) => {
  const result = await pool.query("SELECT 1");
  res.json({ db: "Connected", result: result.rows });
});

app.use("/todos", todoMiddleware);

app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;
