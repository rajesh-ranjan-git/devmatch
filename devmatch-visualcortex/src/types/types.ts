import { ReactElement } from "react";

export type DevMatchAppState = {
  switchTheme: String;
  setSwitchTheme: (value: String) => void;
  showProfileDropdown: boolean;
  setShowProfileDropdown: (value: boolean) => void;
};

export type MenuItem = {
  name: String;
  icon: ReactElement;
  label: String;
};
