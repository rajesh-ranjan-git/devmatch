import { ReactElement } from "react";

export type DevMatchAppState = {
  switchTheme: string;
  setSwitchTheme: (value: string) => void;
  showProfileDropdown: boolean;
  setShowProfileDropdown: (value: boolean) => void;
  toggleConnectionSheet: boolean;
  setToggleConnectionSheet: (value: boolean) => void;
  activeConnectionSheet: string | null;
  setActiveConnectionSheet: (name: string | null) => void;
};

export type MenuItem = {
  name: string;
  icon: ReactElement;
  label: string;
};
