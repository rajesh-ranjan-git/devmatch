export type DevMatchAppState = {
  switchTheme: string;
  setSwitchTheme: (value: string) => void;
  activeConnectionSheet: string | null;
  setActiveConnectionSheet: (name: string | null) => void;
  activeContextMenu: string | null;
  setActiveContextMenu: (name: string | null) => void;
};
