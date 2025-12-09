import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

export interface SessionPayload {
  userId: string;
  emailVerified: boolean;
  ts: number;
}

/**
 * Get session from Next.js App Router request (cookies)
 * Adapted from Pages Router version
 */
export function getSessionFromRequest(req: NextRequest): SessionPayload | null {
  const token = req.cookies.get("arc_session")?.value;
  
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

