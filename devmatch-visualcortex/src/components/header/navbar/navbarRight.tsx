"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LuBell } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa6";
import { ACCOUNT_OPTIONS_DROPDOWN_ITEMS } from "@/config/constants";
import {
  accountOptionsDropdownItems,
  navbarMenuItems,
  staticImages,
} from "@/config/config";
import { authRoutes } from "@/lib/routes/routes";
import { apiUrls } from "@/lib/api/apiUtils";
import { apiRequest } from "@/lib/api/api";
import { getFullName, getUrlString, toTitleCase } from "@/lib/utils/utils";
import { setCookies } from "@/lib/api/cookiesHandler";
import { useDevMatchAppStore } from "@/store/store";
import { useToast } from "@/components/toast/toast";
import ThemeToggle from "@/components/theme/themeToggle";
import Connections from "@/components/connections/connections";
import NotificationsDropdownItems from "@/components/header/notifications/notifications";
import NavbarButton from "@/components/ui/buttons/navbarButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";

const NavbarRight = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { showToast } = useToast();

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const loggedInUserFullName = getFullName(loggedInUser);

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
    const logoutData = await apiRequest({ url: apiUrls.logout });

    if (logoutData?.success) {
      showToast({
        title: "Logout Successful!",
        message: "See you soon!",
        variant: "success",
      });

      const cookieName = "flash";

      const cookieValue = JSON.stringify({
        type: "success",
        title: "Logout Successful!",
        message: "See you soon!",
        authenticated: true,
      });

      const cookieOptions = {
        maxAge: 1,
        path: "/",
      };

      const flashCookie = [
        `${cookieName}=${cookieValue}`,
        cookieOptions.maxAge ? `Max-Age=${cookieOptions.maxAge}` : "",
        cookieOptions.path ? `Path=${cookieOptions.path}` : "",
      ]
        .filter(Boolean)
        .join("; ");

      setCookies([flashCookie]);
      router.push(getUrlString(authRoutes.login));
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
            <div className="flex justify-center items-center gap-2 p-3 w-full">
              <div className="bg-red-900 rounded-full w-20 h-10 object-cover">
                <Image
                  src={
                    loggedInUser && loggedInUser?.avatarUrl
                      ? loggedInUser?.avatarUrl
                      : staticImages.profilePlaceholder.src
                  }
                  alt={staticImages.avatarPlaceholder.alt}
                  width={100}
                  height={100}
                  className="rounded-full w-full h-full object-cover select-none"
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
            {loggedInUserFullName ? (
              <p className="p-1 px-4 pb-2 font-bold text-md">
                {toTitleCase(loggedInUserFullName)}
              </p>
            ) : (
              loggedInUser?.email && (
                <p className="p-1 px-4 pb-2 font-bold text-md">
                  {loggedInUser?.email}
                </p>
              )
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
