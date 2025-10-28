import Image from "next/image";
import { staticImages } from "@/config/config";
import NameCardContent from "@/components/cards/nameCardContent";
import ProfileCoverEditButton from "@/components/ui/buttons/profileCoverEditButton";

const ProfileCover = () => {
  return (
    <div className="group relative flex justify-center items-center shadow-[0_0.3rem_1rem_rgba(0,0,0,0.2)] rounded-xl w-3/4 h-full overflow-hidden">
      <ProfileCoverEditButton />

      <Image
        src={staticImages.profilePlaceholder.src}
        alt={staticImages.profilePlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
      />

      <NameCardContent name="Rajesh Ranjan" />
    </div>
  );
};

export default ProfileCover;
