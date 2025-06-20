import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const userCookie = request.cookies.get("user")?.value;

  if (!userCookie) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }

  try {
    const user = JSON.parse(decodeURIComponent(userCookie));
    const role = user?.role;
    const path = url.pathname;

    if (path.startsWith("/admin") && !["admin"].includes(role)) {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    if (path.startsWith("/asesor") && role !== "asesor") {
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (e) {
    console.error("Error en middleware:", e);
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/asesor/:path*"],
};
