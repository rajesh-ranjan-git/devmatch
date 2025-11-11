"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNodeProps } from "@/types/propTypes";
import { useEffect } from "react";

const CheckAuthWrapper = ({ children }: ReactNodeProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("debug router : ", router);
    console.log("debug pathname : ", pathname);
  }, [router, pathname]);

  return <>{children}</>;
};

export default CheckAuthWrapper;
