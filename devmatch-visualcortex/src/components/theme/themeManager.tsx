"use client";

import { useEffect } from "react";
import { useDevMatchAppStore } from "@/store/store";
import { themes } from "@/config/config";

export default function ThemeManager() {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  useEffect(() => {
    if (switchTheme === themes[0].type) {
      document.documentElement.classList.add(themes[0].type);
      document.documentElement.classList.remove(themes[1].type);
    } else {
      document.documentElement.classList.add(themes[1].type);
      document.documentElement.classList.remove(themes[0].type);
    }

    return () => {
      document.documentElement.classList.remove(themes[0].type);
    };
  }, [switchTheme]);

  return null;
}
