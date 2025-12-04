import { NextApiRequest } from "next";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return argon2.verify(hash, password);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}

export function getUserFromCookie(req: NextApiRequest) {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("arc_session="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      emailVerified: boolean;
      ts: number;
      iat: number;
      exp: number;
    };

    return decoded;
  } catch (err) {
    return null;
  }
}

