"use client";

import { useEffect } from "react";
import { THEMES } from "@/config/constants";
import { useDevMatchAppStore } from "@/store/store";
import { useWebStorage } from "@/hooks/useWebStorage";
import { ThemeTypes } from "@/types/types";

export default function ThemeManager() {
  const [storedValue, setWebStorageValue] = useWebStorage<ThemeTypes>({
    key: "activeTheme",
    value: THEMES.dark,
  });

  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);
  const setSwitchTheme = useDevMatchAppStore((state) => state.setSwitchTheme);

  useEffect(() => {
    const isDark = switchTheme === THEMES.dark;

    document.documentElement.classList.toggle(THEMES.dark, isDark);
    document.documentElement.classList.toggle(THEMES.light, !isDark);

    setWebStorageValue(isDark ? THEMES.dark : THEMES.light);

    return () => {
      document.documentElement.classList.remove(THEMES.dark, THEMES.light);
    };
  }, [switchTheme, storedValue, setWebStorageValue, setSwitchTheme]);

  return null;
}
