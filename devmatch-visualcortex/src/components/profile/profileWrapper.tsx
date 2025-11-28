"use client";

import { useDevMatchAppStore } from "@/store/store";
import AnimatedFloatingSquares from "@/components/background/animatedFloatingSquares";
import ProfileCover from "@/components/profile/profileCover";
import ProfileDetails from "@/components/profile/profileDetails";
import VerticalSeparator from "@/components/ui/separators/verticalSeparator";

const ProfileWrapper = () => {
  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  if (!loggedInUser) return;

  return (
    <div className="relative flex justify-center items-center w-full h-[85vh] overflow-hidden">
      <div className="relative flex gap-2 bg-glass-surface shadow-glass-shadow-heavy shadow-md p-2 border border-glass-border-bright rounded-xl w-full max-w-7xl h-[95%]">
        <AnimatedFloatingSquares />
        <ProfileCover />
        <VerticalSeparator />
        <ProfileDetails />
      </div>
    </div>
  );
};

export default ProfileWrapper;
