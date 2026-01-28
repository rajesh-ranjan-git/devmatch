"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  authFormFieldButtonItems,
  cameraDropDownItems,
  staticImages,
} from "@/config/config";
import { getFullName, toTitleCase } from "@/lib/utils/utils";
import { checkAuth } from "@/lib/actions/actions";
import { ProfileComponentProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import useContextMenu from "@/hooks/useContextMenu";
import ProfileTabularData from "@/components/profile/profileTabularData";
import ProfileDetailsUpdateContext from "@/components/profile/profileDetailsUpdateContext";
import SpecificProfileDetailsUpdateContext from "@/components/profile/specificProfileDetailsUpdateContext";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";
import ProfilePhotoEditButton from "@/components/ui/buttons/profilePhotoEditButton";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";

const ProfileDetails = ({ user }: ProfileComponentProps) => {
  if (!user) return;

  const [propertyToUpdate, setPropertyToUpdate] = useState<string | null>(null);

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);
  const setLoggedInUser = useDevMatchAppStore((state) => state.setLoggedInUser);

  const updateProfileDetailsContext = useContextMenu({
    type: "updateProfileDetailsContext",
  });

  const updateSpecificProfileDetailsContext = useContextMenu({
    type: "updateSpecificProfileDetailsContext",
  });

  const selectedUserProperties = Object.fromEntries(
    Object.entries(user ?? {}).filter(
      ([key]) =>
        ![
          "userName",
          "firstName",
          "middleName",
          "lastName",
          "avatarUrl",
          "coverPhotoUrl",
        ].includes(key),
    ),
  );

  useEffect(() => {
    const refreshLoggedInUser = async () => {
      const refreshedLoggedInUser = await checkAuth();

      if (refreshedLoggedInUser) {
        setLoggedInUser(refreshedLoggedInUser);
      }
    };

    if (
      loggedInUser?.userName !== user?.userName ||
      loggedInUser?.firstName !== user?.firstName ||
      loggedInUser?.middleName !== user?.middleName ||
      loggedInUser?.lastName !== user?.lastName ||
      loggedInUser?.avatarUrl !== user?.avatarUrl
    ) {
      refreshLoggedInUser();
    }
  }, [loggedInUser, user]);

  useEffect(() => {
    if (propertyToUpdate) {
      updateSpecificProfileDetailsContext.open();
    } else {
      updateSpecificProfileDetailsContext.close();
    }
  }, [propertyToUpdate]);

  return (
    <div className="relative flex flex-col p-8 pb-4 w-full h-full">
      <div className="flex gap-4">
        <div
          className={`relative border border-glass-border-bright rounded-full w-12 h-11 object-cover ${
            loggedInUser?.id === user?.id && "cursor-pointer"
          }`}
        >
          <Image
            src={user?.avatarUrl ?? staticImages.profilePlaceholder.src}
            alt={staticImages.profilePlaceholder.alt}
            width={100}
            height={100}
            className="bg-white rounded-full w-full h-full object-cover select-none"
          />

          {loggedInUser?.id === user?.id && (
            <ProfilePhotoEditButton popoverTarget="update-profile-photo-dropdown" />
          )}

          <Dropdown id="update-profile-photo-dropdown">
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
        <h2 className="before:-bottom-2.5 before:left-0 before:absolute relative mb-4 before:rounded-full w-full before:w-20 before:h-1 font-arima font-extrabold text-glass-text-primary before:bg-glass-text-primary text-2xl before:content-[''] tracking-wider">
          {user ? toTitleCase(getFullName(user)) : "John Doe"}
        </h2>
      </div>

      <div
        className={`[&::-webkit-scrollbar-track]:bg-transparent pr-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out ${
          loggedInUser?.id === user?.id ? "mt-4 mb-8" : "my-4"
        }`}
      >
        <table className="w-full text-glass-text-primary table-fixed">
          <tbody>
            <ProfileTabularData
              user={selectedUserProperties}
              setPropertyToUpdate={setPropertyToUpdate}
            />
          </tbody>
        </table>
      </div>
      {loggedInUser?.id === user?.id && (
        <div className="flex justify-center items-center gap-4">
          <ButtonNormal
            icon={authFormFieldButtonItems?.updateProfile?.icon}
            text={authFormFieldButtonItems?.updateProfile?.label}
            className="w-52 h-10"
            onClick={updateProfileDetailsContext.toggle}
          />
          <ButtonNormal
            icon={authFormFieldButtonItems?.updatePassword?.icon}
            text={authFormFieldButtonItems?.updatePassword?.label}
            className="w-52 h-10"
          />
          <ButtonDestructive
            icon={authFormFieldButtonItems?.deleteAccount?.icon}
            text={authFormFieldButtonItems?.deleteAccount?.label}
            className="w-52 h-10"
          />
        </div>
      )}

      <ContextMenu
        open={updateProfileDetailsContext.isOpen}
        onClose={updateProfileDetailsContext.close}
      >
        <ProfileDetailsUpdateContext
          user={user}
          onClose={updateProfileDetailsContext.close}
        />
      </ContextMenu>

      <ContextMenu
        open={updateSpecificProfileDetailsContext.isOpen}
        onClose={updateSpecificProfileDetailsContext.close}
      >
        <SpecificProfileDetailsUpdateContext
          user={user}
          property={propertyToUpdate}
          setPropertyToUpdate={setPropertyToUpdate}
        />
      </ContextMenu>
    </div>
  );
};

export default ProfileDetails;
