"use client";

import { useState } from "react";
import Image from "next/image";
import { cameraDropdownItems, staticImages } from "@/config/config";
import NameCardContent from "@/components/cards/nameCardContent";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";
import ProfileCoverEditButton from "@/components/ui/buttons/profileCoverEditButton";
import HorizontalSeparator from "@/components/ui/separator/horizontalSeparator";

const ProfileCover = () => {
  const [showCoverPhotoContext, setShowCoverPhotoContext] = useState(false);

  return (
    <div className="group relative flex justify-center items-center shadow-[0_0.3rem_1rem_rgba(0,0,0,0.2)] rounded-xl w-3/4 h-full overflow-hidden">
      <ProfileCoverEditButton
        onClick={() => setShowCoverPhotoContext(!showCoverPhotoContext)}
      />

      <Image
        src={staticImages.profilePlaceholder.src}
        alt={staticImages.profilePlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
      />

      <ContextMenu
        open={showCoverPhotoContext}
        onClose={() => setShowCoverPhotoContext(false)}
        className="right-2 before:right-5 w-52"
      >
        <p className="p-2 font-bold text-md">Update cover photo</p>
        <HorizontalSeparator />
        <div className="flex flex-col gap-1 p-1">
          {cameraDropdownItems.map((item) => (
            <p
              key={item.name}
              className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
            >
              <span>{item.icon}</span>
              <span className="w-full">{item.label}</span>
            </p>
          ))}
        </div>
      </ContextMenu>

      <NameCardContent name="Rajesh Ranjan" />
    </div>
  );
};

export default ProfileCover;
