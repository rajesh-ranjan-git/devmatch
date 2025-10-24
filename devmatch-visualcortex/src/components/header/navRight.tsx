"use client";

import Image from "next/image";
import { LuBell, LuBellDot } from "react-icons/lu";
import { navbarMenuItems, profileDropdownItems } from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import { FaChevronDown } from "react-icons/fa6";

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
      <div className="border-none">Button</div>

      {navbarMenuItems.map((item, idx) => (
        <Connections
          key={idx}
          name={item.name}
          icon={item.icon}
          label={item.label}
        />
      ))}

      <div
        className={`flex justify-center items-center gap-2 p-2 border rounded-lg font-semibold transition-all ease-in-out cursor-pointer ${
          switchTheme === "dark" ? "hover:border-white" : "hover:border-black"
        }`}
      >
        <LuBell />
        <LuBellDot />
      </div>

      <div
        className={`flex justify-center items-center gap-2 p-1 border  rounded-lg font-semibold ${
          switchTheme === "dark" ? "hover:border-white" : "hover:border-black"
        }`}
      >
        <Image
          src="/assets/avatar/default-avatar-profile-picture-male-icon.webp"
          alt="avatar-icon"
          width={50}
          height={50}
        />
        <span>Profile</span>
        <FaChevronDown
          className={`${
            showProfileDropdown && "rotate-180"
          } transition-all ease-in-out duration-300`}
        />
      </div>
    </div>
  );
};

export default NavRight;
