import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { MdBlock, MdCancel, MdCheck } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { CONNECTION_STATUS_PROPERTIES } from "@/config/constants";
import { staticImages } from "@/config/config";
import { profileRoutes } from "@/lib/routes/routes";
import { SingleUserCardProps } from "@/types/propTypes";
import { getFullName, getUrlString, toTitleCase } from "@/lib/utils/utils";
import { useDevMatchAppStore } from "@/store/store";
import NameCardContent from "@/components/explore/nameCardContent";
import UserDetailsCardContent from "@/components/explore/userDetailsCardContent";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonWarning from "@/components/ui/buttons/buttonWarning";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";

const SingleUserCard = ({
  user,
  isFront,
  cardIndex,
  onRemove,
}: SingleUserCardProps) => {
  const requests = useDevMatchAppStore((state) => state.requests);

  const sender = requests.find((r) => r?.sender?.id === user?.id)?.sender;

  const senderData = {
    successButtonIcon: <IoIosChatboxes />,
    successButtonText: "chat",
    onAccept: () =>
      onRemove(sender?.id as string, CONNECTION_STATUS_PROPERTIES.accepted),
    onReject: () =>
      onRemove(sender?.id as string, CONNECTION_STATUS_PROPERTIES.rejected),
    onBlock: () =>
      onRemove(sender?.id as string, CONNECTION_STATUS_PROPERTIES.blocked),
  };

  const x = useMotionValue(0);

  const opacity = useTransform(x, [-150, -50, 0, 50, 150], [0, 1, 1, 1, 0]);
  const rotateRow = useTransform(x, [-150, 150], [-18, 18]);

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : cardIndex % 2 ? 6 : -6;

    return `${rotateRow.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      onRemove(
        user?.id ?? "",
        sender
          ? x.get() > 0
            ? CONNECTION_STATUS_PROPERTIES.accepted
            : CONNECTION_STATUS_PROPERTIES.rejected
          : x.get() > 0
          ? CONNECTION_STATUS_PROPERTIES.interested
          : CONNECTION_STATUS_PROPERTIES.notInterested
      );
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      className="group relative flex justify-center items-center shadow-glass-shadow-heavy shadow-md m-2 rounded-2xl w-108 h-[90%] overflow-hidden hover:cursor-grab active:cursor-grabbing"
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
      {sender && (
        <div className="top-3 left-3 absolute flex gap-2">
          <ButtonSuccess
            icon={<MdCheck />}
            text="accept"
            className="w-24 text-sm"
            onClick={senderData.onAccept}
          />
          <ButtonWarning
            icon={<MdCancel />}
            text="disconnect"
            className="w-32 text-sm"
            onClick={senderData.onReject}
          />
          <ButtonDestructive
            icon={<MdBlock />}
            text="block"
            className="w-24 text-sm"
            onClick={senderData.onBlock}
          />
        </div>
      )}

      <UserInfoButton
        profileUrl={
          user?.id ? `${getUrlString(profileRoutes.profile)}/${user?.id}` : "#"
        }
      />

      <Image
        src={user?.coverPhotoUrl ?? staticImages.avatarPlaceholder.src}
        alt={user?.firstName ?? staticImages.avatarPlaceholder.alt}
        width={600}
        height={400}
        className="bg-white w-full h-full object-cover pointer-events-none select-none"
      />

      <NameCardContent name={toTitleCase(getFullName(user))} />

      <UserDetailsCardContent
        name={toTitleCase(getFullName(user))}
        jobProfile={toTitleCase(user?.jobProfile)}
        organization={toTitleCase(user?.organization)}
        socialMedia={{
          facebook: user?.facebook,
          instagram: user?.instagram,
          twitter: user?.twitter,
          github: user?.github,
          linkedin: user?.linkedin,
          youtube: user?.youtube,
          website: user?.website,
        }}
      />
    </motion.div>
  );
};

export default SingleUserCard;
