import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@backend/auth/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const protectedPath = pathname.startsWith("/app") || pathname.startsWith("/admin");
  if (protectedPath && !session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
};
