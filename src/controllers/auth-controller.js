import { loginService, registerService } from "../services/auth-service.js";
import { asyncHandler } from "../utils/async-handler.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerService(req.body);

  res.status(201).json({ data: user });
});

export const login = asyncHandler(async (req, res) => {
  const token = await loginService(req.body);

  res.status(201).json({ accessToken: token });
});
