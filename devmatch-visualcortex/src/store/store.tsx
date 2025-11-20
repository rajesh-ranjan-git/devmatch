import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";
import { THEMES } from "@/config/constants";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: THEMES.dark,
  setSwitchTheme: (value) => set({ switchTheme: value }),
  loggedInUser: null,
  setLoggedInUser: (value) => set({ loggedInUser: value }),
  activeSheet: null,
  setActiveSheet: (name) => set({ activeSheet: name }),
  activeContextMenu: null,
  setActiveContextMenu: (name) => set({ activeContextMenu: name }),
}));
