import { ReactElement } from "react";

export type DevMatchAppState = {
  switchTheme: string;
  setSwitchTheme: (value: string) => void;
  showNotifications: boolean;
  setShowNotifications: (value: boolean) => void;
  showAccountOptionsDropdown: boolean;
  setShowAccountOptionsDropdown: (value: boolean) => void;
  activeConnectionSheet: string | null;
  setActiveConnectionSheet: (name: string | null) => void;
  activeContextMenu: string | null;
  setActiveContextMenu: (name: string | null) => void;
};
