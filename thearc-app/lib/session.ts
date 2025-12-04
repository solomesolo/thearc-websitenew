import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

export interface SessionPayload {
  userId: string;
  emailVerified: boolean;
  ts: number;
}

export function setLoginSession(res: NextApiResponse, payload: SessionPayload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

  // Secure flag only in production (HTTPS)
  const isProduction = process.env.NODE_ENV === "production";
  const secureFlag = isProduction ? "Secure" : "";

  res.setHeader(
    "Set-Cookie",
    `arc_session=${token}; HttpOnly; ${secureFlag}; Path=/; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
  );
}

export function clearLoginSession(res: NextApiResponse) {
  // Secure flag only in production (HTTPS)
  const isProduction = process.env.NODE_ENV === "production";
  const secureFlag = isProduction ? "Secure" : "";

  res.setHeader(
    "Set-Cookie",
    `arc_session=; HttpOnly; ${secureFlag}; Path=/; SameSite=Lax; Max-Age=0`
  );
}

export function getSessionFromRequest(req: NextApiRequest): SessionPayload | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const token = cookies.arc_session;
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

