"use client";

import { ReactNodeProps } from "@/types/propTypes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiUrls } from "@/lib/api/apiUrls";
import { fetchApiData } from "@/lib/api/fetchApiData";
import { authRoutes } from "@/lib/routes/routes";
import { getUrlString } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/components/toast/toast";

const CheckAuthFormWrapper = ({ children }: ReactNodeProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const { showToast } = useToast();

  const publicRoutes = Object.values(authRoutes).map((url) =>
    getUrlString(url)
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (loggedInUser) return;

    if (!loggedInUser && isPublicRoute) return;

    let isMounted = true;

    const fetchLoggedInUser = async () => {
      const result = await fetchApiData(apiUrls.checkAuth);

      if (!isMounted) return;

      if (result.success && result.data && result.data.user) {
        setLoggedInUser(result.data.user);
        if (isPublicRoute) {
          router.push("/explore");
          showToast({
            title: "Authentication success!",
            message: "Welcome to DevMatch!",
            variant: "success",
          });
        }
      } else {
        if (!isPublicRoute) {
          router.push("/login");
          showToast({
            title: "Authentication Failed!",
            message: "Please login to continue!",
            variant: "error",
          });
        }
      }
    };

    fetchLoggedInUser();

    return () => {
      isMounted = false;
    };
  }, [loggedInUser, isPublicRoute, router]);

  return <>{children}</>;
};

export default CheckAuthFormWrapper;
