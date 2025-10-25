import { ReactElement } from "react";

export interface ConnectionProps {
  name: string;
  icon: ReactElement;
  label: string;
}

export interface ButtonProps {
  name?: string;
  icon?: ReactElement;
  label?: string;
  child?: ReactElement;
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
