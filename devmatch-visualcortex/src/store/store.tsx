import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";
import { themes } from "@/config/config";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: themes[0].type,
  setSwitchTheme: (value) => set({ switchTheme: value }),
  activeSheet: null,
  setActiveSheet: (name) => set({ activeSheet: name }),
  activeContextMenu: null,
  setActiveContextMenu: (name) => set({ activeContextMenu: name }),
}));
