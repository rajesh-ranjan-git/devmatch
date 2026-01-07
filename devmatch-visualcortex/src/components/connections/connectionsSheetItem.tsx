import Image from "next/image";
import { MdCancel, MdBlock } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { staticImages } from "@/config/config";
import { ConnectionsSheetItemProps } from "@/types/propTypes";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonWarning from "@/components/ui/buttons/buttonWarning";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";
import {
  formatDate,
  getFullName,
  getUrlString,
  toTitleCase,
} from "@/lib/utils/utils";
import { profileRoutes } from "@/lib/routes/routes";
import { CONNECTION_STATUS_PROPERTIES } from "@/config/constants";

const ConnectionsSheetItem = ({
  connection,
  handleConnectionAction,
  onSheetClose,
}: ConnectionsSheetItemProps) => {
  return (
    <div className="relative flex flex-col items-center gap-2 hover:bg-glass-surface-heavy p-2 rounded-lg w-full transition-all ease-in-out">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="border border-glass-border-bright rounded-full w-12 h-10 object-cover">
          <Image
            src={
              connection?.otherUser?.avatarUrl ||
              staticImages.profilePlaceholder.src
            }
            alt={
              connection?.otherUser?.firstName ||
              staticImages.profilePlaceholder.alt
            }
            width={100}
            height={100}
            className="rounded-full w-full h-full object-cover select-none"
          />
        </div>
        <div className="w-full text-glass-text-primary text-left">
          <p className="w-full font-semibold text-sm">
            {toTitleCase(getFullName(connection?.otherUser))}
          </p>
          <p className="w-full text-xs">
            {toTitleCase(connection?.otherUser?.jobProfile)}
          </p>
          <p className="w-full text-sm">
            <span className="font-semibold">Connected since : </span>
            <span className="font-normal">
              {formatDate(connection?.connectedSince).split(",")[0]}
            </span>
          </p>
        </div>
      </div>
      <div className="relative flex gap-2">
        <ButtonSuccess
          icon={<IoIosChatboxes />}
          text="chat"
          className="w-24 text-sm"
        />
        <ButtonWarning
          icon={<MdCancel />}
          text="disconnect"
          className="w-32 text-sm"
          onClick={() =>
            handleConnectionAction?.(
              CONNECTION_STATUS_PROPERTIES.rejected,
              connection?.otherUserId as string
            )
          }
        />
        <ButtonDestructive
          icon={<MdBlock />}
          text="block"
          className="w-24 text-sm"
          onClick={() =>
            handleConnectionAction?.(
              CONNECTION_STATUS_PROPERTIES.blocked,
              connection?.otherUserId as string
            )
          }
        />
      </div>
      <UserInfoButton
        profileUrl={
          connection?.otherUserId
            ? `${getUrlString(profileRoutes.profile)}/${
                connection?.otherUserId
              }`
            : "#"
        }
        onClick={onSheetClose}
      />
    </div>
  );
};

export default ConnectionsSheetItem;
