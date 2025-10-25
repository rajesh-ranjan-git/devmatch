import { create } from "zustand";
import { DevMatchAppState } from "@/types/types";

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: "dark",
  setSwitchTheme: (value) => set({ switchTheme: value }),
  showProfileDropdown: false,
  setShowProfileDropdown: (value) => set({ showProfileDropdown: value }),
  toggleConnectionSheet: false,
  setToggleConnectionSheet: (value) => set({ toggleConnectionSheet: value }),
}));
