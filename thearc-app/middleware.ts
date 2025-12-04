import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production";

// Paths that require the user to be logged in
// Dashboard is now accessible without login for demo purposes
const protectedRoutes = ["/account", "/privacy", "/settings"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect certain routes
  if (!protectedRoutes.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("arc_session");

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(cookie.value, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/account/:path*",
    "/privacy/:path*",
    "/settings/:path*",
  ],
};

