import Image from "next/image";
import { MdBlock, MdCancel, MdCheck } from "react-icons/md";
import { staticImages } from "@/config/config";
import { RequestsSheetItemProps } from "@/types/propTypes";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";
import ButtonWarning from "@/components/ui/buttons/buttonWarning";
import ButtonDestructive from "@/components/ui/buttons/buttonDestructive";
import UserInfoButton from "@/components/ui/buttons/userInfoButton";
import { formatDate, getFullName, toTitleCase } from "@/lib/utils/utils";

const RequestsSheetItem = ({ request }: RequestsSheetItemProps) => {
  return (
    <div className="relative flex items-center gap-2 hover:bg-glass-surface-heavy p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer">
      <div className="border border-glass-border-bright rounded-full w-12 h-10 object-cover">
        <Image
          src={
            request?.sender?.avatarUrl || staticImages.profilePlaceholder.src
          }
          alt={
            request?.sender?.firstName || staticImages.profilePlaceholder.alt
          }
          width={100}
          height={100}
          className="rounded-full w-full h-full object-cover select-none"
        />
      </div>
      <div className="w-full text-glass-text-primary text-left">
        <p className="w-full font-semibold text-sm">
          {toTitleCase(getFullName(request?.sender))}
        </p>
        <p className="w-full text-xs">
          {toTitleCase(request?.sender?.jobProfile)}
        </p>
        <p className="w-full text-sm">
          <span className="font-semibold">Received on : </span>
          <span className="font-normal">
            {formatDate(request?.receivedRequestOn).split(",")[0]}
          </span>
        </p>
        <div className="relative flex gap-2 my-4">
          <ButtonSuccess
            icon={<MdCheck />}
            text="accept"
            className="w-24 text-sm"
          />
          <ButtonWarning
            icon={<MdCancel />}
            text="reject"
            className="w-24 text-sm"
          />
          <ButtonDestructive
            icon={<MdBlock />}
            text="block"
            className="w-24 text-sm"
          />
        </div>
      </div>
      <UserInfoButton profileUrl="#" />
    </div>
  );
};

export default RequestsSheetItem;
