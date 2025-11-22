"use client";

import { ReactNodeProps } from "@/types/propTypes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiUrls } from "@/lib/api/apiUrls";
import { fetchApiData } from "@/lib/api/fetchApiData";
import { publicClientRoutes } from "@/lib/routes/routes";
import { getUrlString } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";

const CheckAuthFormWrapper = ({ children }: ReactNodeProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const publicRoutes = Object.values(publicClientRoutes).map((url) =>
    getUrlString(url)
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (loggedInUser) return;

    let isMounted = true;

    const fetchLoggedInUser = async () => {
      const result = await fetchApiData(apiUrls.checkAuth);

      if (!isMounted) return;

      if (result.success && result.data) {
        setLoggedInUser(result.data);
        if (isPublicRoute) {
          router.push("/explore");
        }
      } else {
        if (!isPublicRoute) {
          router.push("/login");
        }
      }
    };

    fetchLoggedInUser();

    return () => {
      isMounted = false;
    };
  }, [loggedInUser, isPublicRoute, router, setLoggedInUser]);

  return <>{children}</>;
};

export default CheckAuthFormWrapper;
