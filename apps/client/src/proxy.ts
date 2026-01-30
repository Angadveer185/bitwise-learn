import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { URL_ACCESS_MAP } from "./lib/access";
import { checkJWT } from "./lib/authJwt";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes
  const PUBLIC_ROUTES = [
    "/",
    "/about",
    "/contact",
    "/student-login",
    "/multi-login",
    "/admin-login",
  ];
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }
  const roleToken = request.cookies.get("token")?.value
  const { type: role } = checkJWT(roleToken as string);
  ;

  // Not logged in
  if (!role) {
    return NextResponse.redirect(new URL("/student-login", request.url));
  }

  const allowedRoutes = URL_ACCESS_MAP[role];
  const allowedRbunoutes = URL_ACCESS_MAP[role];

  if (!allowedRoutes) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (allowedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
