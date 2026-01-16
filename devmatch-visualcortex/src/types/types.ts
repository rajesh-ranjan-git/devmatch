import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
  ACCOUNT_OPTIONS_DROPDOWN_ITEMS,
  AUTH_FORM_FIELDS,
  INPUT_TYPES,
  NAVBAR_MENU_ITEMS,
  NOTIFICATION_TYPES,
  SOCIAL_MEDIA,
  STORAGE,
  THEMES,
  USER_PROPERTIES,
} from "@/config/constants";

export type ThemeTypes = keyof typeof THEMES;

export type StorageTypes = keyof typeof STORAGE;

export type NavbarMenuItemTypes = keyof typeof NAVBAR_MENU_ITEMS;

export type NavbarMenuItemType = {
  type: NavbarMenuItemTypes;
  icon: ReactNode;
};

export type NotificationItemType = {
  id: string;
  from: UserType;
  status: string;
  title: string;
  body: string;
  type: keyof typeof NOTIFICATION_TYPES;
};

export type ContextMenuTypes =
  | "updateCoverPhotoContext"
  | "updateProfilePhotoContext"
  | "updateProfileDetailsContext"
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

export type ProfileFormFieldTypes = keyof typeof USER_PROPERTIES;

export type ProfileFormFieldInputType = {
  name: ProfileFormFieldTypes;
  type: keyof typeof INPUT_TYPES;
  label?: string;
  placeholder: string;
  icon: ReactNode;
};

export type ProfileFormFieldInputItemsType = Partial<
  Record<ProfileFormFieldTypes, ProfileFormFieldInputType>
>;

export type StaticImageType = Record<
  string,
  {
    src: string;
    alt: string;
  }
>;

export type SocialMediaTypes = keyof typeof SOCIAL_MEDIA;

export type SocialMediaIconType = Record<SocialMediaTypes, { Icon: IconType }>;

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
  facebook?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  organization?: string;
  skills?: string;
  interests?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
} | null;

export type NotificationActionType = {
  type?: string;
  id?: string;
  removeNotificationFlag?: boolean;
};
