import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  ACCOUNT_OPTIONS_DROPDOWN_ITEMS,
  AUTH_FORM_FIELDS,
  INPUT_TYPES,
  NAVBAR_MENU_ITEMS,
  SOCIAL_MEDIA,
  STORAGE,
  THEMES,
} from "@/config/constants";

export type DevMatchAppState = {
  switchTheme: ThemeTypes;
  setSwitchTheme: (value: ThemeTypes) => void;
  activeSheet: SheetTypes;
  setActiveSheet: (name: SheetTypes) => void;
  activeContextMenu: ContextMenuTypes;
  setActiveContextMenu: (name: ContextMenuTypes) => void;
};

export type ThemeTypes = keyof typeof THEMES;

export type StorageTypes = keyof typeof STORAGE;

export type NavbarMenuItemTypes = keyof typeof NAVBAR_MENU_ITEMS;

export type NavbarMenuItemType = {
  type: NavbarMenuItemTypes;
  icon: ReactNode;
};

export type NotificationTypes = "request" | "chat";

export type NotificationItemType = {
  name: string;
  designation: string;
  body: string;
  url: string;
};

export type NotificationsItemsType = Record<
  NotificationTypes,
  NotificationItemType[]
>;

export type ContextMenuTypes =
  | "notificationsContext"
  | "accountOptionsContext"
  | "updateCoverPhotoContext"
  | "updateProfilePhotoContext"
  | null;

export type SheetTypes = "requests" | "connections" | null;

export type SheetItemType = {
  name: string;
  designation: string;
  body?: string;
  connectedSince?: string;
  url: string;
};

export type SheetItemsType = Partial<
  Record<Exclude<SheetTypes, null>, SheetItemType[]>
>;

export type AccountOptionsDropdownTypes =
  keyof typeof ACCOUNT_OPTIONS_DROPDOWN_ITEMS;

export type AccountOptionsDropdownItemType = {
  type: AccountOptionsDropdownTypes;
  url: string;
  icon: ReactNode;
};

export type CameraDropDownTypes = "fromCamera" | "fromDevice";

export type CameraDropdownItemType = {
  type: CameraDropDownTypes;
  label: string;
  icon: ReactNode;
};

export type AuthFormFieldTypes = keyof typeof AUTH_FORM_FIELDS;

export type AuthFormFieldInputType = {
  name: AuthFormFieldTypes;
  type: keyof typeof INPUT_TYPES;
  label?: string;
  placeholder: string;
  icon: ReactNode;
};

export type AuthFormFieldButtonType = {
  name: AuthFormFieldTypes;
  type?: keyof typeof INPUT_TYPES;
  label: string;
  url: string;
  icon: ReactNode;
};

export type AuthFormFieldInputItemsType = Partial<
  Record<AuthFormFieldTypes, AuthFormFieldInputType>
>;

export type AuthFormFieldButtonItemsType = Partial<
  Record<AuthFormFieldTypes, AuthFormFieldButtonType>
>;

export type StaticImageType = Record<
  string,
  {
    src: string;
    alt: string;
  }
>;

export type SocialMediaTypes = keyof typeof SOCIAL_MEDIA;

export type SocialMediaIconType = Record<
  SocialMediaTypes,
  { url: string; Icon: IconType }
>;

export type ErrorMessageType = Record<string, string>;

export type FallbackMessages = Record<string, string>;

export type UserType = {
  id: number;
  name: string;
  designation: string;
  company: string;
};
