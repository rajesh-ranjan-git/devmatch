import { navbarMenuItems } from "@/config/config";

export type DevMatchAppState = {
  switchTheme: string;
  setSwitchTheme: (value: string) => void;
  activeSheet: string | null;
  setActiveSheet: (name: string | null) => void;
  activeContextMenu: string | null;
  setActiveContextMenu: (name: string | null) => void;
};

export type ContextMenuTypes =
  | "notificationsContext"
  | "accountOptionsContext"
  | "updateCoverPhotoContext"
  | "updateProfilePhotoContext";

export type SheetTypes = "REQUESTS" | "CONNECTIONS";

export type StorageType = "local" | "session";

export type User = {
  id: number;
  name: string;
  designation: string;
  company: string;
};
