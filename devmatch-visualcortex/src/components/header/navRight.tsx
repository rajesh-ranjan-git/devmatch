"use client";

import { useDevMatchAppStore } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, BellDot, ChevronUp } from "lucide-react";
import ConnectionRequests from "@/components/connections/connectionRequests";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Connections from "@/components/connections/connections";
import ThemeToggle from "../theme/themeToggle";

const NavRight = () => {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);

  return (
    <div className="flex justify-center items-center gap-2">
      <ThemeToggle />
      <ConnectionRequests />
      <Connections />

      <Popover>
        <PopoverTrigger>
          <div
            className={`flex justify-center items-center gap-2 p-2 border-1  rounded-lg font-semibold transition-all ease-in-out cursor-pointer ${
              switchTheme === "dark"
                ? "hover:border-white"
                : "hover:border-black"
            }`}
          >
            {/* <Bell /> */}
            <BellDot />
          </div>
        </PopoverTrigger>
        <PopoverContent className="glass-interactive">
          Place content for the popover here.
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={`flex justify-center items-center gap-2 p-1 border-1  rounded-lg font-semibold cursor-pointer ${
              switchTheme === "dark"
                ? "hover:border-white"
                : "hover:border-black"
            }`}
          >
            <Avatar className="hover:glass-border border-1 border-transparent active:scale-95 transition-all ease-in-out">
              <AvatarImage src="assets/avatar/default-avatar-profile-picture-male-icon.webp" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>Profile</span>
            <ChevronUp />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-interactive">
          <DropdownMenuLabel>Rajesh Ranjan</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="opacity-80 hover:opacity-100 cursor-pointer">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="opacity-80 hover:opacity-100 cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavRight;
