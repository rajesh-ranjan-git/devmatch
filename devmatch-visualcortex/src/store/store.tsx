import { create } from "zustand";
import { THEMES } from "@/config/constants";
import {
  ContextMenuTypes,
  SheetItemType,
  SheetTypes,
  ThemeTypes,
  UserType,
} from "@/types/types";

type DevMatchAppState = {
  switchTheme: ThemeTypes;
  setSwitchTheme: (value: ThemeTypes) => void;
  loggedInUser: UserType;
  setLoggedInUser: (value: UserType) => void;
  activeSheet: SheetTypes;
  setActiveSheet: (name: SheetTypes) => void;
  activeContextMenu: ContextMenuTypes;
  setActiveContextMenu: (name: ContextMenuTypes) => void;
  connections: SheetItemType[];
  setConnections: (connections: SheetItemType[]) => void;
  requests: SheetItemType[];
  setRequests: (requests: SheetItemType[]) => void;
};

export const useDevMatchAppStore = create<DevMatchAppState>((set) => ({
  switchTheme: THEMES.dark,
  setSwitchTheme: (value) => set({ switchTheme: value }),
  loggedInUser: null,
  setLoggedInUser: (value) => set({ loggedInUser: value }),
  activeSheet: null,
  setActiveSheet: (name) => set({ activeSheet: name }),
  activeContextMenu: null,
  setActiveContextMenu: (name) => set({ activeContextMenu: name }),
  connections: [],
  setConnections: (value) => set({ connections: value }),
  requests: [],
  setRequests: (value) => set({ requests: value }),
}));
