import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { IconType } from "react-icons";
import {
  ContextMenuTypes,
  ConversationTabsType,
  NavbarMenuItemTypes,
  NotificationActionType,
  NotificationItemType,
  SheetItemType,
  SheetTypes,
  StorageTypes,
  UserType,
} from "@/types/types";

export interface ReactNodeProps {
  children: ReactNode;
}

export interface ConsoleBannerProps {
  nodeVersion: string;
}

export interface ConnectionProps {
  type: SheetTypes;
  icon: ReactNode;
}

export interface ButtonProps {
  popoverTarget?: string | undefined;
  text?: string | null;
  type?: "button" | "submit";
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface FormErrorMessageProps {
  errors: string[] | null;
  className?: string;
}

export interface DropdownProps {
  id: string;
  className?: string;
  children?: ReactNode;
}

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export interface ContextMenuProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  children?: ReactNode;
}

export interface NameCardContentProps {
  name?: string;
}

export interface UserDetailsCardContentProps {
  name?: string;
  jobProfile?: string;
  organization?: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
  };
}

export interface AuthFormWrapperProps {
  type: string;
}

export interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  icon?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export interface RadioProps {
  name: string;
  options: string[];
  value?: string;
  className?: string;
  icon?: ReactNode;
}

export interface TextareaProps {
  name: string;
  placeholder: string;
  rows: number;
  value?: string;
  defaultValue?: string;
  className?: string;
}

export interface ChipsProps {
  name: string;
  type: string;
  values?: string[];
  className?: string;
  icon?: ReactNode;
}

export interface SocialMediaProps {
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
  };
}

export interface SocialMediaItemProps {
  url: string;
  Icon: IconType;
  idx: number;
}

export interface UseContextMenuProps {
  type: ContextMenuTypes;
}

export interface UseSheetProps {
  type: SheetTypes;
}

export interface UseOutsideClickProps {
  ref: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[];
  when: boolean;
  callback: () => void;
}

export interface UseWebStorageProps<T> {
  key: string;
  value: T;
  type?: StorageTypes;
  expiresIn?: number;
}

export interface StoredData<T> {
  data: T;
  expiresAt?: number;
}

export interface ProfileDetailsProps {
  user: UserType;
}

export interface ProfileDetailsComponentProps {
  user: UserType;
  propertyToUpdate: keyof UserType | null;
  setPropertyToUpdate: Dispatch<SetStateAction<keyof UserType | null>>;
}

export interface ProfileDetailsUpdateContextProps {
  user: UserType;
  onClose: () => void;
}

export interface UserCardsProps {
  allUsers: UserType[];
}

export interface SingleUserCardProps {
  user: UserType;
  isFront: boolean;
  cardIndex: number;
  onRemove: (
    userId: string,
    status: string,
    type?: "right" | "left" | null,
  ) => void;
}

export interface UserInfoButtonProps {
  profileUrl: string;
  onClick?: () => void;
}

export interface SheetItemProps {
  type: NavbarMenuItemTypes;
  connection?: SheetItemType;
  request?: SheetItemType;
  handleConnectionAction?: (id: string, status: string) => void;
  onSheetClose: () => void;
}

export interface NotificationsHeadingProps {
  type: string;
  notificationAction: (notification: NotificationActionType) => void;
}

export interface NotificationsItemProps {
  notification: NotificationItemType;
  notificationAction: (notification: NotificationActionType) => void;
}

export interface ProfileDetailsUpdateDropdownProps {
  name: string;
  value: number;
  placeholder: string;
  propertyToUpdate?: string | null;
}

export interface ConversationsProps {
  user: UserType;
}

export interface ConversationTabProps {
  tab: ConversationTabsType;
  activeTab: ConversationTabsType;
  setActiveTab: Dispatch<SetStateAction<ConversationTabsType>>;
  icon: ReactNode;
  className?: string;
}
