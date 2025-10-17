"use client";

import { Bell, BellDot, ChevronDown } from "lucide-react";
import { navbarMenuItems, profileDropdownItems } from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { Button } from "../ui/button";

const NavRight = () => {
  const switchTheme = useDevMatchAppStore((state) => state.switchTheme);
  const showProfileDropdown = useDevMatchAppStore(
    (state) => state.showProfileDropdown
  );
  const setShowProfileDropdown = useDevMatchAppStore(
    (state) => state.setShowProfileDropdown
  );

  const handleArrowRotate = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <ThemeToggle />
      <Button className="border-none glass-btn">Button</Button>

      {navbarMenuItems.map((item, idx) => (
        <Connections
          key={idx}
          name={item.name}
          icon={item.icon}
          label={item.label}
        />
      ))}

      <Popover>
        <PopoverTrigger>
          <div
            className={`flex justify-center items-center gap-2 p-2 border-1 rounded-lg font-semibold transition-all ease-in-out cursor-pointer ${
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
        <DropdownMenuTrigger
          className="cursor-pointer"
          onPointerDown={handleArrowRotate}
          onPointerUp={handleArrowRotate}
        >
          <div
            className={`flex justify-center items-center gap-2 p-1 border-1  rounded-lg font-semibold ${
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
            <ChevronDown
              className={`${
                showProfileDropdown && "rotate-180"
              } transition-all ease-in-out duration-300`}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="cursor-default glass-interactive">
          <DropdownMenuLabel>Rajesh Ranjan</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {profileDropdownItems.map((item, idx) => (
            <div key={idx}>
              <DropdownMenuItem className="flex justify-between items-center opacity-80 hover:opacity-100 cursor-pointer">
                <span>{item.label}</span>
                <span>{item.icon}</span>
              </DropdownMenuItem>
              <Separator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavRight;
