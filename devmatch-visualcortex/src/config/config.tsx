import { UserPlus, Handshake } from "lucide-react";
import { NavbarMenuItem } from "@/types/types";

export const navbarMenuItems: NavbarMenuItem[] = [
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
