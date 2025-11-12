"use client";

import { useRef } from "react";
import Image from "next/image";
import { LuBell } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import {
  accountOptionsDropdownItems,
  navbarMenuItems,
  staticImages,
} from "@/config/config";
import useContextMenu from "@/hooks/useContextMenu";
import useOutsideClick from "@/hooks/useOutsideClick";
import { toTitleCase } from "@/lib/utils";
import Connections from "@/components/connections/connections";
import ThemeToggle from "@/components/theme/themeToggle";
import NotificationsContextItems from "@/components/header/notificationsContextItems";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";
import NotificationsButton from "@/components/ui/buttons/notificationsButton";
import AccountOptionsButton from "@/components/ui/buttons/accountOptionsButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const NavbarRight = () => {
  const notificationsContextRef = useRef(null);
  const accountOptionsContextRef = useRef(null);

  const notificationsContext = useContextMenu({ type: "notificationsContext" });
  const accountOptionsContext = useContextMenu({
    type: "accountOptionsContext",
  });

  useOutsideClick({
    ref: notificationsContextRef,
    when: notificationsContext.isOpen,
    callback: () => notificationsContext.close(),
  });

  useOutsideClick({
    ref: accountOptionsContextRef,
    when: accountOptionsContext.isOpen,
    callback: () => accountOptionsContext.close(),
  });

  return (
    <div className="flex justify-center items-center gap-4">
      <ThemeToggle />

      {navbarMenuItems.map((item, idx) => (
        <Connections key={idx} type={item.type} icon={item.icon} />
      ))}

      <div className="relative" ref={notificationsContextRef}>
        <NotificationsButton
          icon={<LuBell />}
          className={`${notificationsContext.isOpen && "z-100"}`}
          onClick={() => notificationsContext.toggle()}
        />
        <ContextMenu
          open={notificationsContext.isOpen}
          className="before:right-5"
        >
          <NotificationsContextItems />
        </ContextMenu>
      </div>

      <div className="relative" ref={accountOptionsContextRef}>
        <AccountOptionsButton
          onClick={() => accountOptionsContext.toggle()}
          className={`${accountOptionsContext.isOpen && "z-100"}`}
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
                accountOptionsContext.isOpen && "rotate-180"
              } transition-all ease-in-out duration-500`}
            />
          </div>
        </AccountOptionsButton>
        <ContextMenu
          open={accountOptionsContext.isOpen}
          className="before:right-9"
        >
          <p className="p-2 px-4 font-bold text-lg">Rajesh Ranjan</p>
          <HorizontalSeparator />
          <div className="flex flex-col gap-1 p-1">
            {accountOptionsDropdownItems.map((item) => (
              <p
                key={item.type}
                className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
              >
                <span>{item.icon}</span>
                <span className="mr-4 w-full">{toTitleCase(item.type)}</span>
              </p>
            ))}
          </div>
        </ContextMenu>
      </div>
    </div>
  );
};

export default NavbarRight;
