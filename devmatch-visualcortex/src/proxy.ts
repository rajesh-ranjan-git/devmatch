import { authRoutes, defaultRoutes } from "@/lib/routes/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith(authRoutes.verifyEmail) ||
    pathname.startsWith(authRoutes.resetPassword)
  ) {
    return NextResponse.next();
  }

  logger.debug("debug from proxy starts");

  const token = request.cookies.get("refreshToken")?.value ?? null;
  logger.info("debug from proxy token:", token);

  const isAuthRoute = Object.values(authRoutes).some((route) =>
    pathname.startsWith(route),
  );
  logger.info("debug from proxy isAuthRoute:", isAuthRoute);

  const isProtected = !isAuthRoute && pathname !== defaultRoutes.landing;
  logger.info("debug from proxy isProtected:", isProtected);

  logger.info("debug from proxy isAuthRoute && token:", isAuthRoute && token);
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  logger.info("debug from proxy isProtected && !token:", isProtected && !token);
  if (isProtected && !token) {
    const loginUrl = new URL(authRoutes.login, request.url);
    return NextResponse.redirect(loginUrl);
  }

  logger.info("debug from proxy ends");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|manifest.json).*)"],
};
