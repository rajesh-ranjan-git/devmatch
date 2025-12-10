"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNodeProps } from "@/types/propTypes";
import { checkAuth } from "@/lib/actions/actions";
import { authRoutes, defaultRoutes } from "@/lib/routes/routes";
import { getUrlString } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/components/toast/toast";

const CheckAuth = ({ children }: ReactNodeProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const { showToast } = useToast();

  const isPublicRoute = Object.values(authRoutes).some((route) =>
    pathname.startsWith(getUrlString(route))
  );

  useEffect(() => {
    const getLoggedInUser = async () => {
      const user = await checkAuth();

      if (!user) {
        showToast({
          title: "Authentication Failed!",
          message: "Please login to continue!",
          variant: "error",
        });

        router.push(getUrlString(authRoutes.login));
      }

      setLoggedInUser(user);
    };

    if ((isPublicRoute || pathname === defaultRoutes.home) && loggedInUser) {
      router.push(getUrlString(defaultRoutes.explore));
    }

    if (!isPublicRoute && !loggedInUser) {
      getLoggedInUser();
    }
  }, [pathname, loggedInUser]);

  return <>{children}</>;
};

export default CheckAuth;
