"use client";

import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import {
  FetchMeResponseType,
  RefreshResponseType,
} from "@/types/types/response.types";
import { ReactNodeProps } from "@/types/props/common.props.types";
import { useAppStore } from "@/store/store";
import { toTitleCase } from "@/utils/common.utils";
import { useToast } from "@/hooks/toast";
import { fetchMe, refreshTokens } from "@/lib/actions/common.actions";
import { logoutAction } from "@/lib/actions/auth.actions";
import { getCookies } from "@/lib/api/cookiesHandler";
import { authRoutes, defaultRoutes } from "@/lib/routes/routes";

const AuthWrapper = ({ children }: ReactNodeProps) => {
  const [isChecking, setIsChecking] = useState(true);

  const pathname = usePathname();

  const { showToast } = useToast();

  const loggedInUser = useAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useAppStore((state) => state.setLoggedInUser);
  const accessToken = useAppStore((state) => state.accessToken);
  const setAccessToken = useAppStore((state) => state.setAccessToken);
  const isLoggingOut = useAppStore((state) => state.isLoggingOut);
  const clearSessionState = useAppStore((state) => state.clearSessionState);

  useEffect(() => {
    if (isLoggingOut) return;

    let isMounted = true;

    const validateUser = async () => {
      const refreshToken = await getCookies("refreshToken");

      if (!refreshToken) {
        clearSessionState();

        if (isMounted) setIsChecking(false);

        redirect(authRoutes.login);
      }

      if (loggedInUser && accessToken) {
        if (isMounted) setIsChecking(false);
        return;
      }

      let token = accessToken;

      if (!token) {
        const refreshResponse = await refreshTokens();

        if (refreshResponse?.success) {
          const refreshData = refreshResponse.data as RefreshResponseType;

          token = refreshData.accessToken;
          setAccessToken(token);
        } else {
          showToast({
            title: "SESSION EXPIRED",
            message: "Your session has expired, please login again!",
            variant: "error",
          });

          await logoutAction();

          clearSessionState();

          if (isMounted) setIsChecking(false);

          redirect(authRoutes.login);
        }
      }

      const response = await fetchMe(token);

      if (response?.success) {
        const data = response.data as FetchMeResponseType;

        setLoggedInUser(data.user);
      } else {
        await logoutAction();

        clearSessionState();

        if (Number(response?.statusCode) >= 500) {
          showToast({
            title: toTitleCase(response.code),
            message: response.message,
            variant: "error",
          });
        }
      }

      if (isMounted) setIsChecking(false);
    };

    const isProtectedRoute =
      pathname !== defaultRoutes.landing &&
      !pathname.startsWith(defaultRoutes.discover) &&
      !Object.values(authRoutes).find((route) => pathname.startsWith(route));

    if (isProtectedRoute) {
      validateUser();
    } else {
      if (isMounted) setIsChecking(false);
    }
    return () => {
      isMounted = false;
    };
  }, [pathname]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
