"use client";

import { useEffect } from "react";
import { useDevMatchAppStore } from "@/store/store";

export default function ThemeManager() {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  useEffect(() => {
    if (switchTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [switchTheme]);

  return null;
}
