import { authRoutes, defaultRoutes } from "@/lib/routes/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const AUTH_SESSION_COOKIE = "authSession";

const LOGOUT_COOKIE = "loggedOut";

const BYPASS_PREFIXES = ["/_next", "/api", "/static", "/assets"] as const;

const BYPASS_EXACT = new Set(["/favicon.ico", "/manifest.json"]);

function shouldBypass(pathname: string): boolean {
  if (BYPASS_EXACT.has(pathname)) return true;
  if (BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (/\.[\w]+$/.test(pathname)) return true;
  return false;
}

function isTokenlessAllowedRoute(pathname: string): boolean {
  return (
    pathname.startsWith(authRoutes.verifyEmail) ||
    pathname.startsWith(authRoutes.resetPassword)
  );
}

function isAuthRoute(pathname: string): boolean {
  return Object.values(authRoutes).some((route) => pathname.startsWith(route));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  if (isTokenlessAllowedRoute(pathname)) {
    return NextResponse.next();
  }

  const hasAuthSession = !!request.cookies.get(AUTH_SESSION_COOKIE)?.value;
  const hasRefreshToken = !!request.cookies.get("refreshToken")?.value;
  const isExplicitlyLoggedOut = !!request.cookies.get(LOGOUT_COOKIE)?.value;

  const isAuthenticated =
    !isExplicitlyLoggedOut && (hasAuthSession || hasRefreshToken);

  const onAuthRoute = isAuthRoute(pathname);
  const onLanding = pathname === defaultRoutes.landing;
  const isProtected = !onAuthRoute && !onLanding;

  if (onAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL(authRoutes.login, request.url);

    loginUrl.searchParams.set("redirect", pathname);

    const response = NextResponse.redirect(loginUrl);

    if (isExplicitlyLoggedOut) {
      response.cookies.delete(LOGOUT_COOKIE);
    }

    response.cookies.delete(AUTH_SESSION_COOKIE);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|manifest.json).*)"],
};
