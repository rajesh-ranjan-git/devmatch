import { ReactNode } from "react";

export type DevMatchAppState = {
  switchTheme: ThemeType;
  setSwitchTheme: (value: ThemeType) => void;
  activeSheet: SheetTypes;
  setActiveSheet: (name: SheetTypes) => void;
  activeContextMenu: ContextMenuTypes;
  setActiveContextMenu: (name: ContextMenuTypes) => void;
};

export type ThemeType = "dark" | "light";

export type ContextMenuTypes =
  | "notificationsContext"
  | "accountOptionsContext"
  | "updateCoverPhotoContext"
  | "updateProfilePhotoContext"
  | null;

export type SheetTypes = "requests" | "connections" | null;

export type NotificationTypes = "request" | "chat" | null;

export type NavbarMenuItemTypes = "requests" | "connections" | null;

export interface NavbarMenuItemType {
  type: NavbarMenuItemTypes;
  icon: ReactNode;
}

export type RequestsSheetItemType = {
  type: NotificationTypes;
  name: string;
  designation: string;
  body: string;
  url: string;
};

export type ConnectionsSheetItemType = {
  type: NotificationTypes;
  name: string;
  designation: string;
  connectedSince: string;
  url: string;
};

export type StorageType = "local" | "session";

export type User = {
  id: number;
  name: string;
  designation: string;
  company: string;
};
