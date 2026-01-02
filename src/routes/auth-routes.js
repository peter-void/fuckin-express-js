import express from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";

const router = express.Router();

router.post("/register", validate({ body: registerSchema }), register);

router.post("/login", validate({ body: loginSchema }), login);

router.post("/refresh", refresh);

router.post("/logout", logout);

export default router;
