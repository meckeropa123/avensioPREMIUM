import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export type JwtPayload = { sub: string; role: string; email: string };

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);
export const signAccessToken = (payload: JwtPayload) => jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
export const signRefreshToken = (payload: JwtPayload) => jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" });
