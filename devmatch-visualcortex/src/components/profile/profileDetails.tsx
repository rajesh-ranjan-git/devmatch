"use client";

import Image from "next/image";
import { MdEdit, MdOutlineEdit } from "react-icons/md";
import {
  authFormFieldButtonItems,
  cameraDropDownItems,
  staticImages,
} from "@/config/config";
import { useDevMatchAppStore } from "@/store/store";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import Dropdown from "@/components/ui/dropdown/dropdown";
import ProfilePhotoEditButton from "@/components/ui/buttons/profilePhotoEditButton";
import { getFullName, toTitleCase } from "@/lib/utils/utils";

const ProfileDetails = () => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  return (
    <div className="relative flex flex-col p-8 pb-4 w-full h-full">
      <div className="flex gap-4">
        <div className="relative border border-glass-border-bright rounded-full w-12 h-11 object-cover cursor-pointer">
          <Image
            src={
              loggedInUser && loggedInUser?.avatarUrl
                ? loggedInUser?.avatarUrl
                : staticImages.profilePlaceholder.src
            }
            alt={staticImages.profilePlaceholder.alt}
            width={100}
            height={100}
            className="rounded-full w-full h-full object-cover select-none"
          />

          <ProfilePhotoEditButton popoverTarget="update-profile-photo-dropdown" />

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
          {loggedInUser ? toTitleCase(getFullName(loggedInUser)) : "John Doe"}
        </h2>
      </div>

      <div className="[&::-webkit-scrollbar-track]:bg-transparent mt-4 mb-8 pr-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar]:w-1 overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
        <table className="w-full text-glass-text-primary table-fixed">
          <tbody>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Nick Name
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full overflow-hidden">
                  <div className="pr-4 w-full">
                    <span>Rajesh</span>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Job Profile
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full overflow-hidden">
                  <div className="pr-4 w-full">
                    <span>Full Stack Developer</span>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm w-7glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Company
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full overflow-hidden">
                  <div className="pr-4 w-full">
                    <span>Business Today Technology</span>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Organization
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full overflow-hidden">
                  <div className="pr-4 w-full">
                    <span>India Today Group</span>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm w-7glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Experience
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full overflow-hidden">
                  <div className="pr-4 w-full">
                    <span>7+ yrs</span>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Skills
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full overflow-hidden">
                  <div className="pr-4 w-full overflow-hidden">
                    <ul className="flex flex-wrap w-full wrap-break-words">
                      {[
                        "JavaScript",
                        "TypeScript",
                        "Next JS",
                        "React JS",
                        "Mongo DB",
                        "MySQL",
                        "Java",
                        "Python",
                      ].map((hobby, i, arr) => (
                        <li
                          key={i}
                          className="mr-1 after:content-[','] last:after:content-['']"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm w-7glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Hobbies
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full">
                  <div className="pr-4 w-full overflow-hidden">
                    <ul className="flex flex-wrap w-full wrap-break-words">
                      {[
                        "Computer Games",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Vibe Coding",
                      ].map((hobby, i, arr) => (
                        <li
                          key={i}
                          className="mr-1 after:content-[','] last:after:content-['']"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Hobbies
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full">
                  <div className="pr-4 w-full overflow-hidden">
                    <ul className="flex flex-wrap w-full wrap-break-words">
                      {[
                        "Computer Games",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Vibe Coding",
                      ].map((hobby, i, arr) => (
                        <li
                          key={i}
                          className="mr-1 after:content-[','] last:after:content-['']"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Hobbies
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full">
                  <div className="pr-4 w-full overflow-hidden">
                    <ul className="flex flex-wrap w-full wrap-break-words">
                      {[
                        "Computer Games",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Vibe Coding",
                      ].map((hobby, i, arr) => (
                        <li
                          key={i}
                          className="mr-1 after:content-[','] last:after:content-['']"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="w-full table-fixed">
              <td className="py-1 w-1/4 font-semibold text-glass-text-primary text-sm align-top">
                Hobbies
              </td>
              <td className="py-1 w-3/4 font-normal text-glass-text-secondary text-sm align-top">
                <div className="flex justify-between items-start w-full">
                  <div className="pr-4 w-full overflow-hidden">
                    <ul className="flex flex-wrap w-full wrap-break-words">
                      {[
                        "Computer Games",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Taekwondo",
                        "Vibe Coding",
                      ].map((hobby, i, arr) => (
                        <li
                          key={i}
                          className="mr-1 after:content-[','] last:after:content-['']"
                        >
                          {hobby}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="group/icon flex justify-center items-center hover:bg-glass-surface-heavy backdrop-blur-3xl border-transparent hover:border-glass-border-bright rounded-sm text-glass-text-secondary text-2xl transition-all ease-in-out cursor-pointer">
                    <MdOutlineEdit className="group-hover/icon:hidden" />
                    <MdEdit className="hidden group-hover/icon:block" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-4">
        <ButtonNormal
          icon={authFormFieldButtonItems?.update_profile?.icon}
          text={authFormFieldButtonItems?.update_profile?.label}
          className="w-46 h-10"
        />
        <ButtonDestructive
          icon={authFormFieldButtonItems?.delete_account?.icon}
          text={authFormFieldButtonItems?.delete_account?.label}
          className="w-46 h-10"
        />
      </div>
    </div>
  );
};

export default ProfileDetails;
