import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { staticImages } from "@/config/config";
import { NotificationsItemProps } from "@/types/propTypes";
import { getFullName, toTitleCase } from "@/lib/utils/utils";

const NotificationsItem = ({
  notification,
  notificationAction,
}: NotificationsItemProps) => {
  return (
    <div
      className="relative flex items-center gap-2 hover:bg-glass-surface-heavy my-1 p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
      key={notification?.id}
      onClick={(e) => {
        e.stopPropagation();

        notificationAction({ id: notification?.id });
      }}
    >
      <div className="border border-glass-border-bright rounded-full w-12 h-10 object-cover">
        <Image
          src={
            notification?.from?.avatarUrl ?? staticImages.profilePlaceholder.src
          }
          alt={
            notification?.from?.firstName ?? staticImages.profilePlaceholder.alt
          }
          width={100}
          height={100}
          className="rounded-full w-full h-full object-cover select-none"
        />
      </div>
      <div className="pr-8 w-full text-glass-text-primary text-left">
        <p className="w-full font-semibold text-sm">
          {toTitleCase(getFullName(notification?.from))}
        </p>
        <p className="w-full text-xs">
          {toTitleCase(notification?.from?.jobProfile)}
        </p>
        <p className="w-full text-sm">{notification?.body}</p>
      </div>
      <button
        className="top-[35%] right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();

          notificationAction({
            id: notification?.id,
            removeNotificationFlag: true,
          });
        }}
      >
        <IoClose />
      </button>
    </div>
  );
};

export default NotificationsItem;
