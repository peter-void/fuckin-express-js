import { throwHttpError } from "../utils/http-error.js";
import jwt from "jsonwebtoken";

const todoMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    throwHttpError(401, "Unauthorized");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throwHttpError(401, "Unauthorized");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.sub,
    };

    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  } catch (error) {
    throwHttpError(401, "Unauthorized");
  }
};

export default todoMiddleware;
