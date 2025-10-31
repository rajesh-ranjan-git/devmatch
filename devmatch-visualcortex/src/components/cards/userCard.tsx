import Image from "next/image";
import { staticImages } from "@/config/config";
import NameCardContent from "@/components/cards/nameCardContent";
import UserDetailsCardContent from "@/components/cards/userDetailsCardContent";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";

const UserCard = () => {
  return (
    <div className="group relative flex justify-center items-center shadow-glass-shadow-heavy shadow-md m-2 rounded-2xl w-96 h-full overflow-hidden">
      <UserInfoButton />

      <Image
        src={staticImages.profilePlaceholder.src}
        alt={staticImages.profilePlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
      />

      <NameCardContent name="Rajesh Ranjan" />

      <UserDetailsCardContent
        name="Rajesh Ranjan"
        designation="Full Stack Developer"
        company="India Today Group"
      />
    </div>
  );
};

export default UserCard;
