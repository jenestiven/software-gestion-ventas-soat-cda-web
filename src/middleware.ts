import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const userCookie = request.cookies.get("user")?.value;

  // console.log("MIDDLEWARE | user cookie RAW:", userCookie);

  if (!userCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    const user = JSON.parse(decodeURIComponent(userCookie));
    const role = user?.role;
    const path = url.pathname;

    if (path.startsWith("/admin") && !["admin"].includes(role)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (path.startsWith("/asesor") && role !== "asesor") {
      return NextResponse.redirect(new URL("/asesor", request.url));
    }

    return NextResponse.next();
  } catch (e) {
    console.error("MIDDLEWARE | ERROR parsing user cookie:", e);
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/asesor/:path*", "/api/:path*"],
};
