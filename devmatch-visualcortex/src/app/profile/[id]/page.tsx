"use client";

import { useEffect } from "react";
import { useDevMatchAppStore } from "@/store/store";
import AnimatedFloatingSquares from "@/components/background/animatedFloatingSquares";
import ProfileCover from "@/components/profile/profileCover";
import ProfileDetails from "@/components/profile/profileDetails";
import VerticalSeparator from "@/components/ui/separators/verticalSeparator";
import { getUserDetails } from "@/lib/actions/actions";
import { useToast } from "@/components/toast/toast";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = await getUserDetails(id);

      if (!user) {
        showToast({
          title: "Failed!",
          message: "Unable to fetch user profile!",
          variant: "error",
        });

        return;
      }

      showToast({
        title: "Success!",
        message: "User profile fetched!",
        variant: "success",
      });
    };

    fetchUserDetails();
  }, [id]);

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

export default ProfilePage;
