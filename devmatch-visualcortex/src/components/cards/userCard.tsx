import Image from "next/image";
import UserDetailsCardContent from "@/components/cards/userDetailsCardContent";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";

const UserCard = () => {
  return (
    <div className="group relative flex justify-center items-center shadow-[0_0.3rem_1rem_rgba(0,0,0,0.2)] m-2 rounded-2xl w-96 h-full overflow-hidden">
      <UserInfoButton />

      <Image
        src="/assets/profile_photo_square.png"
        alt="pic"
        width={600}
        height={400}
        className="w-full h-full object-cover select-none"
      />

      <UserDetailsCardContent
        name="Rajesh Ranjan"
        designation="Full Stack Developer"
        company="India Today Group"
      />
    </div>
  );
};

export default UserCard;
