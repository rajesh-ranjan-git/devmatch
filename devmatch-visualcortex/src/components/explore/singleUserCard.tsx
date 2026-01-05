import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { staticImages } from "@/config/config";
import { SingleUserCardProps } from "@/types/propTypes";
import { getFullName, toTitleCase } from "@/lib/utils/utils";
import NameCardContent from "@/components/explore/nameCardContent";
import UserDetailsCardContent from "@/components/explore/userDetailsCardContent";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";

const SingleUserCard = ({
  user,
  isFront,
  cardIndex,
  onRemove,
}: SingleUserCardProps) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);
  const rotateRow = useTransform(x, [-150, 150], [-18, 18]);

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : cardIndex % 2 ? 6 : -6;

    return `${rotateRow.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      onRemove(user?.id ?? "");
    } else {
      x.set(0);
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
        zIndex: cardIndex,
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    >
      <UserInfoButton />

      <Image
        src={user?.avatarUrl ?? staticImages.avatarPlaceholder.src}
        alt={user?.firstName ?? staticImages.avatarPlaceholder.alt}
        width={600}
        height={400}
        className="w-full h-full object-cover pointer-events-none select-none"
      />

      <NameCardContent name={toTitleCase(getFullName(user))} />

      <UserDetailsCardContent
        name={toTitleCase(getFullName(user))}
        jobProfile={toTitleCase(user?.jobProfile)}
        organization={toTitleCase(user?.organization)}
      />
    </motion.div>
  );
};

export default SingleUserCard;
