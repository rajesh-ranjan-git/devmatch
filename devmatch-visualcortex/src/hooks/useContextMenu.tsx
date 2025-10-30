"use client";

import { useEffect } from "react";
import { useDevMatchAppStore } from "@/store/store";

const useContextMenu = () => {
  const activeContextMenu = useDevMatchAppStore(
    (state) => state.activeContextMenu
  );
  const setActiveContextMenu = useDevMatchAppStore(
    (state) => state.setActiveContextMenu
  );

  useEffect(() => {
    if (activeContextMenu) {
      if (activeContextMenu === "notifications") {
        setShowProfileDropdown(false);
        setShowNotifications(true);
      } else if (activeContextMenu === "accountOptions") {
        setShowNotifications(false);
        setShowProfileDropdown(true);
      }
    } else {
      setShowNotifications(false);
      setShowProfileDropdown(false);
    }
  }, [activeContextMenu]);

  return <div></div>;
};

export default useContextMenu;
