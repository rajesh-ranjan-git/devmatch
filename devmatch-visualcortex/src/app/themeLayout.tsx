"use client";

import { useDevMatchAppStore } from "@/store/store";
import { useEffect } from "react";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  useEffect(() => {
    console.log("debug switchTheme : ", switchTheme);
  }, [switchTheme]);

  return <div className={switchTheme ? "dark" : ""}>{children}</div>;
}
