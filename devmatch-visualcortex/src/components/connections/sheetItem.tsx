import Image from "next/image";
import { MdCancel, MdBlock, MdCheck } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { CONNECTION_STATUS_PROPERTIES } from "@/config/constants";
import { navbarMenuItems, staticImages } from "@/config/config";
import { profileRoutes } from "@/lib/routes/routes";
import { SheetItemProps } from "@/types/propTypes";
import {
  formatDate,
  getFullName,
  getUrlString,
  toTitleCase,
} from "@/lib/utils/utils";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonWarning from "@/components/ui/buttons/buttonWarning";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";
import { useRouter } from "next/navigation";

const SheetItem = ({
  type,
  connection,
  request,
  handleConnectionAction,
  onSheetClose,
}: SheetItemProps) => {
  const router = useRouter();

  let sheetItemData = {
    imageSrc: staticImages.profilePlaceholder.src,
    name: "John Doe",
    jobProfile: "John Doe's job profile",
    dateLabel: "",
    date: "",
    successButtonIcon: <></>,
    successButtonText: "",
    profileUrl: "",
    onAccept: () => {},
    onReject: () => {},
    onBlock: () => {},
  };

  if (type === navbarMenuItems[0].type) {
    sheetItemData.imageSrc =
      connection?.otherUser?.avatarUrl ?? sheetItemData.imageSrc;
    sheetItemData.name =
      toTitleCase(getFullName(connection?.otherUser)) ?? sheetItemData.name;
    sheetItemData.jobProfile =
      toTitleCase(connection?.otherUser?.jobProfile) ??
      sheetItemData.jobProfile;
    sheetItemData.dateLabel = "Connected since";
    sheetItemData.date =
      formatDate(connection?.connectedSince).split(",")[0] ??
      sheetItemData.date;
    sheetItemData.successButtonIcon = <IoIosChatboxes />;
    sheetItemData.successButtonText = "chat";
    sheetItemData.profileUrl = `${getUrlString(profileRoutes.profile)}/${
      connection?.otherUser?.id
    }`;
    sheetItemData.onAccept = () =>
      connection?.otherUser?.id
        ? openChatWindow(connection?.otherUser?.id)
        : null;
    sheetItemData.onReject = () =>
      handleConnectionAction?.(
        CONNECTION_STATUS_PROPERTIES.rejected,
        connection?.otherUser?.id as string,
      );
    sheetItemData.onBlock = () =>
      handleConnectionAction?.(
        CONNECTION_STATUS_PROPERTIES.blocked,
        connection?.otherUser?.id as string,
      );
  } else if (type === navbarMenuItems[1].type) {
    sheetItemData.imageSrc =
      request?.sender?.avatarUrl ?? sheetItemData.imageSrc;
    sheetItemData.name =
      toTitleCase(getFullName(request?.sender)) ?? sheetItemData.name;
    sheetItemData.jobProfile =
      toTitleCase(request?.sender?.jobProfile) ?? sheetItemData.jobProfile;
    sheetItemData.dateLabel = "Received on";
    sheetItemData.date =
      formatDate(request?.receivedRequestOn).split(",")[0] ??
      sheetItemData.date;
    sheetItemData.successButtonIcon = <MdCheck />;
    sheetItemData.successButtonText = "accept";
    sheetItemData.profileUrl = `${getUrlString(profileRoutes.profile)}/${
      request?.sender?.id
    }`;
    sheetItemData.onAccept = () =>
      handleConnectionAction?.(
        CONNECTION_STATUS_PROPERTIES.accepted,
        request?.sender?.id as string,
      );
    sheetItemData.onReject = () =>
      handleConnectionAction?.(
        CONNECTION_STATUS_PROPERTIES.rejected,
        request?.sender?.id as string,
      );
    sheetItemData.onBlock = () =>
      handleConnectionAction?.(
        CONNECTION_STATUS_PROPERTIES.blocked,
        request?.sender?.id as string,
      );
  }

  const openChatWindow = (userId: string) => {
    router.push(`/conversations/${userId}`);
    onSheetClose();
  };

  return (
    <div className="relative flex flex-col items-center gap-2 hover:bg-glass-surface-heavy p-2 rounded-lg w-full transition-all ease-in-out">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="border border-glass-border-bright rounded-full w-12 h-10 object-cover">
          <Image
            src={sheetItemData.imageSrc}
            alt={sheetItemData.name}
            width={100}
            height={100}
            className="rounded-full w-full h-full object-cover select-none"
          />
        </div>
        <div className="w-full text-glass-text-primary text-left">
          <p className="w-full font-semibold text-sm">{sheetItemData.name}</p>
          <p className="w-full text-xs">{sheetItemData.jobProfile}</p>
          <p className="flex gap-1 w-full text-sm">
            <span className="font-semibold">{sheetItemData.dateLabel}</span>
            <span className="font-normal">{sheetItemData.date}</span>
          </p>
        </div>
      </div>
      <div className="relative flex gap-2">
        <ButtonSuccess
          icon={sheetItemData.successButtonIcon}
          text={sheetItemData.successButtonText}
          className="w-24 text-sm"
          onClick={sheetItemData.onAccept}
        />
        <ButtonWarning
          icon={<MdCancel />}
          text="disconnect"
          className="w-32 text-sm"
          onClick={sheetItemData.onReject}
        />
        <ButtonDestructive
          icon={<MdBlock />}
          text="block"
          className="w-24 text-sm"
          onClick={sheetItemData.onBlock}
        />
      </div>
      <UserInfoButton
        profileUrl={sheetItemData.profileUrl}
        onClick={onSheetClose}
      />
    </div>
  );
};

export default SheetItem;
