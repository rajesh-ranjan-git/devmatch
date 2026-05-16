"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { authRoutes } from "@/lib/routes/routes";

const AuthWrapper = ({ children }: ReactNodeProps) => {
  const [isChecking, setIsChecking] = useState(true);

  const router = useRouter();

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
      logger.debug("debug from auth wrapper refreshToken:", refreshToken);

      if (!refreshToken) {
        clearSessionState();

        if (isMounted) setIsChecking(false);
        return;
      }

      logger.debug("debug from auth wrapper loggedInUser:", loggedInUser);
      logger.debug("debug from auth wrapper accessToken:", accessToken);
      logger.debug(
        "debug from auth wrapper loggedInUser && accessToken:",
        loggedInUser && accessToken,
      );
      if (loggedInUser && accessToken) {
        if (isMounted) setIsChecking(false);
        return;
      }

      let token = accessToken;
      logger.debug("debug from auth wrapper before if token:", token);

      if (!token) {
        const refreshResponse = await refreshTokens();
        logger.debug(
          "debug from auth wrapper inside if refreshResponse:",
          refreshResponse,
        );

        if (refreshResponse?.success) {
          const refreshData = refreshResponse.data as RefreshResponseType;

          token = refreshData.accessToken;
          logger.debug(
            "debug from auth wrapper inside if refreshData.accessToken:",
            token,
          );
          setAccessToken(token);
        } else {
          showToast({
            title: "SESSION EXPIRED",
            message: "Your session has expired, please login again!",
            variant: "error",
          });

          await logoutAction();

          clearSessionState();

          router.push(authRoutes.login);

          if (isMounted) setIsChecking(false);
          return;
        }
      }

      const response = await fetchMe(token);
      logger.debug(
        "debug from auth wrapper after if fetchMe response:",
        response,
      );

      if (response?.success) {
        const data = response.data as FetchMeResponseType;

        setLoggedInUser(data.user);
      } else {
        clearSessionState();

        await logoutAction();

        if (Number(response?.statusCode) >= 500) {
          showToast({
            title: toTitleCase(response.code),
            message: response.message ?? "",
            variant: "error",
          });
        }
      }

      if (isMounted) setIsChecking(false);
    };

    logger.debug("debug from auth wrapper starting debug");

    validateUser();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
