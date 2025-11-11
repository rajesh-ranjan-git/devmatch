"use client";

import { useRef } from "react";
import Image from "next/image";
import { cameraDropdownItems, staticImages } from "@/config/config";
import useContextMenu from "@/hooks/useContextMenu";
import useOutsideClick from "@/hooks/useOutsideClick";
import NameCardContent from "@/components/cards/nameCardContent";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";
import ProfileCoverEditButton from "@/components/ui/buttons/profileCoverEditButton";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const ProfileCover = () => {
  const showCoverPhotoContextRef = useRef(null);

  const showCoverPhotoContext = useContextMenu({
    type: "showCoverPhotoContext",
  });

  useOutsideClick({
    ref: showCoverPhotoContextRef,
    when: showCoverPhotoContext.isOpen,
    callback: () => showCoverPhotoContext.close(),
  });

  return (
    <div className="group relative flex justify-center items-center shadow-[0_0.3rem_1rem_rgba(0,0,0,0.2)] rounded-xl w-3/4 h-full overflow-hidden">
      <Image
        src={staticImages.profilePlaceholder.src}
        alt={staticImages.profilePlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
      />

      <div className="top-0 right-0 absolute" ref={showCoverPhotoContextRef}>
        <ProfileCoverEditButton
          onClick={() => showCoverPhotoContext.toggle()}
        />

        <ContextMenu
          open={showCoverPhotoContext.isOpen}
          className="right-2 before:right-5 w-52"
        >
          <p className="p-2 font-bold text-md">Update cover photo</p>
          <HorizontalSeparator />
          <div className="flex flex-col gap-1 p-1">
            {Object.values(cameraDropdownItems).map((item) => (
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
      </div>

      <NameCardContent name="Rajesh Ranjan" />
    </div>
  );
};

export default ProfileCover;
