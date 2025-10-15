import { UserPlus, Handshake, User, LogOut } from "lucide-react";
import { MenuItem } from "@/types/types";

export const navbarMenuItems: MenuItem[] = [
  {
    name: "REQUESTS",
    icon: <UserPlus />,
    label: "Requests",
  },
  {
    name: "CONNECTIONS",
    icon: <Handshake />,
    label: "Connections",
  },
];

export const profileDropdownItems: MenuItem[] = [
  {
    name: "PROFILE",
    icon: <User />,
    label: "Profile",
  },
  {
    name: "Logout",
    icon: <LogOut />,
    label: "Logout",
  },
];
