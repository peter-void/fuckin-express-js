import express from "express";
import { login, refresh, register } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";

const router = express.Router();

router.post("/register", validate({ body: registerSchema }), register);

router.post("/login", validate({ body: loginSchema }), login);

router.post("/refresh", refresh);

export default router;
