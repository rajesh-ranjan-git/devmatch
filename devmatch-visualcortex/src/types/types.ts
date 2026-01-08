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
  status?: string;
  connectionStatus?: string;
  senderId?: UserType;
  sender?: UserType;
  otherUser?: UserType;
  otherUserId?: string;
  receivedRequestOn?: string;
  updatedAt?: string;
  connectedSince?: string;
};

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

export type AuthFormStateType = {
  message: string;
  success?: boolean;
  inputs?: Record<string, FormDataEntryValue>;
  errors?: {
    userName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    firstName?: string[];
  };
  result?: any;
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

export type UserType = {
  id?: string;
  userName?: string;
  email?: string;
  password?: string;
  previousPassword?: string;
  passwordLastUpdated?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
  age?: string;
  phone?: string;
  gender?: string;
  avatarUrl?: string;
  coverPhotoUrl?: string;
  bio?: string;
  maritalStatus?: string;
  jobProfile?: string;
  experience?: string;
  github?: string;
  website?: string;
  organization?: string;
  skills?: string;
  interests?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
} | null;
