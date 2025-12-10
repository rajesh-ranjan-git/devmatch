import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes } from "@/lib/routes/routes";
import { getUrlString } from "@/lib/utils/utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = Object.values(authRoutes).some((route) =>
    pathname.startsWith(getUrlString(route))
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("authToken")?.value;
  const flashCookie = request.cookies.get("flash");

  if (!authToken) {
    const response = NextResponse.redirect(
      new URL(authRoutes.login, request.nextUrl.origin)
    );

    if (!flashCookie) {
      response.cookies.set(
        "flash",
        JSON.stringify({
          type: "error",
          title: "Authentication Failed!",
          message: "Please login to continue!",
          authenticated: false,
        }),
        {
          maxAge: 10,
          path: "/",
        }
      );
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|assets/|login|register|forgot-password|\\.well-known/appspecific).*)",
  ],
};
