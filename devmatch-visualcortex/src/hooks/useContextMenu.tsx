"use client";

import { useCallback } from "react";
import { useDevMatchAppStore } from "@/store/store";
import { UseContextMenuProps } from "@/types/propTypes";

const useContextMenu = ({ type }: UseContextMenuProps) => {
  const activeContextMenu = useDevMatchAppStore(
    (state) => state.activeContextMenu
  );
  const setActiveContextMenu = useDevMatchAppStore(
    (state) => state.setActiveContextMenu
  );

  const open = useCallback(
    () => setActiveContextMenu(type),
    [type, activeContextMenu]
  );

  const close = useCallback(
    () => setActiveContextMenu(null),
    [type, activeContextMenu]
  );

  const toggle = useCallback(() => {
    setActiveContextMenu(activeContextMenu === type ? null : type);
  }, [type, activeContextMenu]);

  const isOpen = activeContextMenu === type;

  return { open, close, toggle, isOpen };
};

export default useContextMenu;
