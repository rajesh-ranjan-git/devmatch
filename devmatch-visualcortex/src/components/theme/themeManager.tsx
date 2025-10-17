"use client";

import { useEffect } from "react";
import { useDevMatchAppStore } from "@/store/store";

export default function ThemeManager() {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  useEffect(() => {
    if (switchTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    return () => {
      document.body.classList.remove("dark");
    };
  }, [switchTheme]);

  return null;
}
