import { ReactElement } from "react";

export interface WrapperProps {
  children: React.ReactNode;
}

export interface MainProps {
  children: React.ReactNode;
}

export interface ConnectionProps {
  name: string;
  icon: ReactElement;
  label: string;
}

export interface ButtonProps {
  name?: string;
  icon?: ReactElement;
  label?: string;
  children?: ReactElement;
  className?: string;
  onClick?: () => void;
}

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface ContextMenuProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export interface NameCardContentProps {
  name: string;
}

export interface UserDetailsCardContentProps {
  name: string;
  designation: string;
  company: string;
}

export interface AuthProps {
  type: string;
}
