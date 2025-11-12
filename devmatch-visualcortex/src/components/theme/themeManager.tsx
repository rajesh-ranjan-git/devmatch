"use client";

import { useEffect } from "react";
import { THEMES } from "@/config/constants";
import { useDevMatchAppStore } from "@/store/store";

export default function ThemeManager() {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  useEffect(() => {
    if (switchTheme === THEMES.dark) {
      document.documentElement.classList.add(THEMES.dark);
      document.documentElement.classList.remove(THEMES.light);
    } else {
      document.documentElement.classList.add(THEMES.light);
      document.documentElement.classList.remove(THEMES.dark);
    }

    return () => {
      document.documentElement.classList.remove(THEMES.dark);
    };
  }, [switchTheme]);

  return null;
}
