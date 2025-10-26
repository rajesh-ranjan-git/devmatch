"use client";

import Image from "next/image";
import { LuBell, LuBellDot } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { navbarMenuItems, profileDropdownItems } from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";
import NotificationsButton from "@/components/ui/buttons/notificationsButton";
import ProfileButton from "@/components/ui/buttons/profileButton";

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

      <div className="relative">
        <NotificationsButton
          icon={<LuBellDot />}
          className={`${showNotifications && "z-100"}`}
          onClick={() => setShowNotifications(!showNotifications)}
        />
        <ContextMenu
          open={showNotifications}
          onClose={() => setShowNotifications(false)}
        >
          Notifications
        </ContextMenu>
      </div>

      <div className="relative">
        <ProfileButton
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className={`${showProfileDropdown && "z-100"}`}
        >
          <div className="flex justify-center items-center gap-2 p-3">
            <div className="w-full object-contain">
              <Image
                src="/assets/avatar/default-avatar-profile-picture-male-icon.webp"
                alt="avatar-icon"
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
        </ProfileButton>
        <ContextMenu
          open={showProfileDropdown}
          onClose={() => setShowProfileDropdown(false)}
        >
          Profile
        </ContextMenu>
      </div>
    </div>
  );
};

export default NavRight;
