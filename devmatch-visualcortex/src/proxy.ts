import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes } from "@/lib/routes/routes";
import { getUrlString } from "@/lib/utils/utils";
import { apiUrls } from "@/lib/api/apiUrls";
import { api } from "@/lib/api/apiHandler";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute = Object.values(authRoutes).some((route) =>
    pathname.startsWith(getUrlString(route))
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    const response = NextResponse.redirect(
      new URL(authRoutes.login, request.nextUrl.origin)
    );
    response.cookies.set(
      "flash",
      JSON.stringify({
        type: "error",
        message: "Please login to access this page",
        authenticated: false,
      }),
      {
        maxAge: 10,
        path: "/",
      }
    );
    return response;
  }

  try {
    const checkAuthResponse = await api.get(apiUrls.checkAuth);

    if (!checkAuthResponse.success) {
      const response = NextResponse.redirect(
        new URL(authRoutes.login, request.nextUrl.origin)
      );
      response.cookies.set(
        "flash",
        JSON.stringify({
          type: "error",
          message: "Session expired. Please login again",
          authenticated: false,
        }),
        {
          maxAge: 10,
          path: "/",
        }
      );
      response.cookies.delete("authToken");
      return response;
    }

    const response = NextResponse.next();
    response.cookies.set(
      "flash",
      JSON.stringify({
        type: "success",
        message: "Authentication successful",
        authenticated: true,
      }),
      {
        maxAge: 10,
        path: "/",
      }
    );
    return response;
  } catch (error) {
    const response = NextResponse.redirect(
      new URL(authRoutes.login, request.nextUrl.origin)
    );
    response.cookies.set(
      "flash",
      JSON.stringify({
        type: "error",
        message: "Authentication error. Please try again",
        authenticated: false,
      }),
      {
        maxAge: 10,
        path: "/",
      }
    );
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|assets/|login|register|forgot-password).*)",
  ],
};
