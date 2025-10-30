"use client";

import Image from "next/image";
import { LuBell, LuBellDot } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import {
  contextMenus,
  navbarMenuItems,
  profileDropdownItems,
  staticImages,
} from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";
import NotificationsButton from "@/components/ui/buttons/notificationsButton";
import AccountOptionsButton from "@/components/ui/buttons/accountOptionsButton";
import HorizontalSeparator from "@/components/ui/separator/horizontalSeparator";

const NavRight = () => {
  const showNotifications = useDevMatchAppStore(
    (state) => state.showNotifications
  );
  const setShowNotifications = useDevMatchAppStore(
    (state) => state.setShowNotifications
  );
  const showProfileDropdown = useDevMatchAppStore(
    (state) => state.showProfileDropdown
  );
  const setShowProfileDropdown = useDevMatchAppStore(
    (state) => state.setShowProfileDropdown
  );

  return (
    <div className="flex justify-center items-center gap-4">
      <ThemeToggle />

      {navbarMenuItems.map((item, idx) => (
        <Connections
          key={idx}
          name={item.name}
          icon={item.icon}
          label={item.label}
        />
      ))}

      <div className="relative">
        <NotificationsButton
          icon={<LuBellDot />}
          className={`${showNotifications && "z-100"}`}
          onClick={() => setShowNotifications(!showNotifications)}
        />
        <ContextMenu
          type={contextMenus.notifications.type}
          open={showNotifications}
          onClose={() => setShowNotifications(false)}
        >
          Notifications
        </ContextMenu>
      </div>

      <div className="relative">
        <AccountOptionsButton
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className={`${showProfileDropdown && "z-100"}`}
        >
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
            <FaChevronDown
              className={`${
                showProfileDropdown && "rotate-180"
              } transition-all ease-in-out duration-500`}
            />
          </div>
        </AccountOptionsButton>
        <ContextMenu
          type={contextMenus.accountOptions.type}
          open={showProfileDropdown}
          onClose={() => setShowProfileDropdown(false)}
        >
          <p className="p-2 px-4 font-bold text-lg">Rajesh Ranjan</p>
          <HorizontalSeparator />
          <div className="flex flex-col gap-1 p-1">
            {profileDropdownItems.map((item) => (
              <p
                key={item.name}
                className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
              >
                <span>{item.icon}</span>
                <span className="mr-4 w-full">{item.label}</span>
              </p>
            ))}
          </div>
        </ContextMenu>
      </div>
    </div>
  );
};

export default NavRight;
