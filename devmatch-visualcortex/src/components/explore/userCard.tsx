import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { staticImages } from "@/config/config";
import { UserCardProps } from "@/types/propTypes";
import NameCardContent from "@/components/explore/nameCardContent";
import UserDetailsCardContent from "@/components/explore/userDetailsCardContent";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";
import { useEffect } from "react";

const UserCard = ({ user, users, setUsers }: UserCardProps) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);
  const rotateRow = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = user?.ID === users?.[users?.length - 1]?.ID;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : Number(user?.ID) % 2 ? 6 : -6;

    return `${rotateRow.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setUsers((prev) =>
        prev.filter((u) => {
          return u?.ID !== user?.ID;
        })
      );
    }
  };

  return (
    <motion.div
      className="group relative flex justify-center items-center shadow-glass-shadow-heavy shadow-md m-2 rounded-2xl w-96 h-[90%] overflow-hidden hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        zIndex: user?.ID,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <UserInfoButton />

      <Image
        src={staticImages.profilePlaceholder.src}
        alt={staticImages.profilePlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover pointer-events-none select-none"
      />

      <NameCardContent name={user?.NAME} />

      <UserDetailsCardContent
        name={user?.NAME}
        jobProfile={user?.JOB_PROFILE}
        organization={user?.ORGANIZATION}
      />
    </motion.div>
  );
};

export default UserCard;
