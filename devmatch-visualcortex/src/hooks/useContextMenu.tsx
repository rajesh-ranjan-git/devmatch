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
        setShowAccountOptionsDropdown(false);
        setShowNotifications(true);
      } else if (activeContextMenu === "accountOptions") {
        setShowNotifications(false);
        setShowAccountOptionsDropdown(true);
      }
    } else {
      setShowNotifications(false);
      setShowAccountOptionsDropdown(false);
    }
  }, [activeContextMenu]);

  return <div></div>;
};

export default useContextMenu;
