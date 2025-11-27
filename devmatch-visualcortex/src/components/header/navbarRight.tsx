"use client";

import Image from "next/image";
import { LuBell } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import {
  accountOptionsDropdownItems,
  navbarMenuItems,
  staticImages,
} from "@/config/config";
import { getUrlString, toTitleCase } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";
import ThemeToggle from "@/components/theme/themeToggle";
import Connections from "@/components/connections/connections";
import NotificationsDropdownItems from "@/components/header/notificationsDropdownItems";
import NavbarButton from "@/components/ui/buttons/navbarButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { ACCOUNT_OPTIONS_DROPDOWN_ITEMS } from "@/config/constants";
import { fetchApiData } from "@/lib/api/fetchApiData";
import { apiUrls } from "@/lib/api/apiUrls";
import { useToast } from "../toast/toast";
import { authRoutes } from "@/lib/routes/routes";
import { useEffect } from "react";

const NavbarRight = () => {
  const pathname = usePathname();
  const router = useRouter();

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const { showToast } = useToast();

  const handleAccountOptionClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    const li = target.closest("[data-url]") as HTMLElement;
    if (!li) return;

    const url = li.dataset.url;

    if (url?.includes(ACCOUNT_OPTIONS_DROPDOWN_ITEMS.logout)) {
      handleLogout();
    } else {
      router.push(url ?? "");
    }
  };

  const handleLogout = async () => {
    const logoutData = await fetchApiData(apiUrls.logout);

    if (logoutData?.success) {
      router.push(getUrlString(authRoutes.login));

      showToast({
        title: "Logout Successful!",
        message: "See you soon!",
        variant: "success",
      });
    }
  };

  useEffect(() => {
    if (pathname.includes(authRoutes.login)) {
      setLoggedInUser(null);
    }
  }, [pathname]);

  return (
    <div className="flex justify-center items-center gap-4">
      <ThemeToggle />

      {loggedInUser && (
        <>
          {navbarMenuItems.map((item, idx) => (
            <Connections key={idx} type={item.type} icon={item.icon} />
          ))}

          <NavbarButton
            popoverTarget="notifications-dropdown"
            icon={<LuBell />}
          />
          <Dropdown id="notifications-dropdown">
            <NotificationsDropdownItems />
          </Dropdown>

          <NavbarButton
            popoverTarget="account-options-dropdown"
            className="w-20"
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
              <FaChevronDown />
            </div>
          </NavbarButton>
          <Dropdown id="account-options-dropdown">
            {loggedInUser?.userName && (
              <p className="p-1 px-4 pb-0 font-bold text-sm">
                {loggedInUser?.userName}
              </p>
            )}
            {loggedInUser?.email && (
              <p className="p-1 px-4 pb-2 font-bold text-md">
                {loggedInUser?.email}
              </p>
            )}
            <HorizontalSeparator />
            <ul
              className="flex flex-col gap-1"
              onClick={handleAccountOptionClick}
            >
              {accountOptionsDropdownItems.map((item) => (
                <li
                  key={item.type}
                  data-url={item.url}
                  data-close-dropdown
                  className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg transition-all ease-in-out cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span className="w-full">{toTitleCase(item.type)}</span>
                </li>
              ))}
            </ul>
          </Dropdown>
        </>
      )}
    </div>
  );
};

export default NavbarRight;
