"use client";

import Image from "next/image";
import { cameraDropDownItems, staticImages } from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import NameCardContent from "@/components/explore/nameCardContent";
import ProfileCoverEditButton from "@/components/ui/buttons/profileCoverEditButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";

const ProfileCover = () => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  return (
    <div className="group relative flex justify-center items-center shadow-[0_0.3rem_1rem_rgba(0,0,0,0.2)] rounded-xl w-3/4 h-full overflow-hidden">
      <Image
        src={
          loggedInUser && loggedInUser?.avatarUrl
            ? loggedInUser?.avatarUrl
            : staticImages.profilePlaceholder.src
        }
        alt={staticImages.profilePlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
      />

      <div className="top-0 right-0 absolute">
        <ProfileCoverEditButton popoverTarget="update-profile-cover-dropdown" />

        <Dropdown
          id="update-profile-cover-dropdown"
          className="right-[anchor(right)]"
        >
          <div>
            <p className="p-2 font-bold text-md">Update profile photo</p>
            <HorizontalSeparator />
            <div className="flex flex-col gap-1">
              {cameraDropDownItems.map((item) => (
                <p
                  key={item.type}
                  className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg w-full min-w-48 transition-all ease-in-out cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span className="w-full">{item.label}</span>
                </p>
              ))}
            </div>
          </div>
        </Dropdown>
      </div>

      <NameCardContent name="Rajesh Ranjan" />
    </div>
  );
};

export default ProfileCover;
