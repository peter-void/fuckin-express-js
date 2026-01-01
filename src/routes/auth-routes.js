import express from "express";
import { login, register } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../schemas/auth-schema.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", validate({ body: loginSchema }), login);

export default router;
