import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: "dark",
  setSwitchTheme: (value) => set({ switchTheme: value }),
  activeSheet: null,
  setActiveSheet: (name) => set({ activeSheet: name }),
  activeContextMenu: null,
  setActiveContextMenu: (name) => set({ activeContextMenu: name }),
}));
