"use client";

import { useCallback } from "react";
import { useDevMatchAppStore } from "@/store/store";
import { UseSheetProps } from "@/types/propTypes";

const useSheet = ({ type }: UseSheetProps) => {
  const activeSheet = useDevMatchAppStore((state) => state.activeSheet);
  const setActiveSheet = useDevMatchAppStore((state) => state.setActiveSheet);

  const open = useCallback(() => setActiveSheet(type), [type, activeSheet]);

  const close = useCallback(() => setActiveSheet(null), [activeSheet]);

  const toggle = useCallback(() => {
    setActiveSheet(activeSheet === type ? null : type);
  }, [type, activeSheet, setActiveSheet]);

  const isOpen = activeSheet === type;

  return { open, close, toggle, isOpen };
};

export default useSheet;
