import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authRoutes, defaultRoutes } from "@/lib/routes/routes";

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

  const token = request.cookies.get("refreshToken")?.value ?? null;

  const isAuthRoute = Object.values(authRoutes).some((route) =>
    pathname.startsWith(route),
  );

  const isProtected = !isAuthRoute && pathname !== defaultRoutes.landing;

  if (isAuthRoute && token) {
    logger.debug("debug from proxy redirected from isAuthRoute && token");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtected && !token) {
    logger.debug("debug from proxy redirected from isProtected && !token");
    logger.debug("debug from proxy pathname:", pathname);
    logger.debug("debug from proxy request.cookies:", request.cookies);
    logger.debug("debug from proxy request.url:", request.url);
    return NextResponse.redirect(new URL(authRoutes.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next|favicon.ico|manifest.json|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif|bmp|tiff|flf)$).*)",
  ],
};
