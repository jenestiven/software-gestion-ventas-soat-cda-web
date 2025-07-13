import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const userCookie = request.cookies.get("user")?.value;

  console.log("MIDDLEWARE | full URL:", request.url);
  console.log("MIDDLEWARE | pathname:", url.pathname);
  console.log("MIDDLEWARE | user cookie RAW:", userCookie);

  if (!userCookie) {
    console.log("MIDDLEWARE | NO USER COOKIE, redirect to /auth");
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    const user = JSON.parse(decodeURIComponent(userCookie));
    console.log("MIDDLEWARE | user parsed:", user);

    const role = user?.role;
    const path = url.pathname;

    if (path.startsWith("/admin") && !["admin"].includes(role)) {
      console.log("MIDDLEWARE | trying to access /admin but role:", role);
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (path.startsWith("/asesor") && role !== "asesor") {
      console.log("MIDDLEWARE | trying to access /asesor but role:", role);
      return NextResponse.redirect(new URL("/asesor", request.url));
    }

    console.log("MIDDLEWARE | access granted to:", path);
    return NextResponse.next();
  } catch (e) {
    console.error("MIDDLEWARE | ERROR parsing user cookie:", e);
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/asesor/:path*", "/api/:path*"],
};
