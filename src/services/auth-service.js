import { pool } from "../db/index.js";
import { throwHttpError } from "../utils/http-error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerService = async ({ email, password }) => {
  const query = `
  SELECT *
  FROM users
  WHERE email = $1
  `;

  const existingUser = await pool.query(query, [email]);

  if (existingUser.rowCount > 0) {
    throwHttpError(409, "Email already registered");
  }

  const passwordHash = await bcryptjs.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING *
    `,
    [email, passwordHash]
  );

  return result.rows[0];
};

export const loginService = async ({ email, password }) => {
  const query = `
    SELECT id, password_hash
    FROM users
    WHERE email = $1
  `;

  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throwHttpError(401, "Invalid Credentials");
  }

  const user = result.rows[0];

  const isValidPassword = await bcryptjs.compare(password, user.password_hash);

  if (!isValidPassword) {
    throwHttpError(401, "Invalid Credentials");
  }

  const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
  const refreshToken = crypto.randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await pool.query(
    `
      INSERT INTO refresh_token (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `,
    [user.id, refreshToken, expiresAt]
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (refreshToken) => {
  const result = await pool.query(
    `
    SELECT * FROM refresh_token
    WHERE token = $1
    `,
    [refreshToken]
  );

  if (result.rowCount === 0) {
    throwHttpError(401, "Invalid refresh token");
  }

  const session = result.rows[0];

  if (new Date(session.expires_at) < new Date()) {
    throwHttpError(401, "Refresh token is expired");
  }

  const payload = {
    sub: session.user_id,
  };

  const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  return newAccessToken;
};
