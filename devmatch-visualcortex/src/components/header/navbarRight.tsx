"use client";

import Image from "next/image";
import { LuBell } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import {
  accountOptionsDropdownItems,
  navbarMenuItems,
  staticImages,
} from "@/config/config";
import { toTitleCase } from "@/lib/utils";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import NotificationsDropdownItems from "@/components/header/notificationsDropdownItems";
import NavbarButton from "@/components/ui/buttons/navbarButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";

const NavbarRight = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <ThemeToggle />

      {navbarMenuItems.map((item, idx) => (
        <Connections key={idx} type={item.type} icon={item.icon} />
      ))}

      <NavbarButton popoverTarget="notifications-dropdown" icon={<LuBell />} />
      <Dropdown id="notifications-dropdown">
        <NotificationsDropdownItems />
      </Dropdown>

      <NavbarButton popoverTarget="account-options-dropdown" className="w-20">
        <div className="flex justify-center items-center gap-2 p-3">
          <div className="w-full object-contain">
            <Image
              src={staticImages.avatarPlaceholder.src}
              alt={staticImages.avatarPlaceholder.alt}
              width={50}
              height={50}
              className="rounded-full w-full"
            />
          </div>
          <FaChevronDown />
        </div>
      </NavbarButton>
      <Dropdown id="account-options-dropdown">
        <p className="p-2 px-4 font-bold text-lg">Rajesh Ranjan</p>
        <HorizontalSeparator />
        <div className="flex flex-col gap-1">
          {accountOptionsDropdownItems.map((item) => (
            <p
              key={item.type}
              className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg transition-all ease-in-out cursor-pointer"
            >
              <span>{item.icon}</span>
              <span className="w-full">{toTitleCase(item.type)}</span>
            </p>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default NavbarRight;
