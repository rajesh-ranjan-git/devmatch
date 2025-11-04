export type DevMatchAppState = {
  switchTheme: string;
  setSwitchTheme: (value: string) => void;
  activeSheet: string | null;
  setActiveSheet: (name: string | null) => void;
  activeContextMenu: string | null;
  setActiveContextMenu: (name: string | null) => void;
};
