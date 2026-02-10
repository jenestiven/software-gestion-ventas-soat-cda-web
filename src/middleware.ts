import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("__session")?.value; // Look for __session cookie

  if (!sessionCookie) {
    console.log("MIDDLEWARE | Redirecting to /auth: No session cookie");
    //return NextResponse.redirect(new URL("/auth", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If session cookie exists, allow the request to proceed.
  // Role-based authorization will happen on the server-side (e.g., in layout.tsx or server components).
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/asesor/:path*',
    // Protect all API routes except the login route
    '/api/((?!server/login).*)',
  ],
};
