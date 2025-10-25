"use client";

import Image from "next/image";
import { LuBell, LuBellDot } from "react-icons/lu";
import { navbarMenuItems, profileDropdownItems } from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import { FaChevronDown } from "react-icons/fa6";
import Button7 from "@/components/ui/buttons/Button7";
import Button8 from "@/components/ui/buttons/Button8";

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
    <div className="flex justify-center items-center">
      <ThemeToggle />

      {navbarMenuItems.map((item, idx) => (
        <Connections
          key={idx}
          name={item.name}
          icon={item.icon}
          label={item.label}
        />
      ))}

      <Button7 icon={<LuBellDot />} />

      <Button8
        child={
          <div className="flex justify-center items-center gap-2 p-3">
            <div className="w-full">
              <Image
                src="/assets/avatar/default-avatar-profile-picture-male-icon.webp"
                alt="avatar-icon"
                width={50}
                height={50}
                className="rounded-full w-full object-contain"
              />
            </div>
            <FaChevronDown
              className={`${
                showProfileDropdown && "rotate-180"
              } transition-all ease-in-out duration-300`}
            />
          </div>
        }
      />
    </div>
  );
};

export default NavRight;
