import Link from "next/link";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";
import { UserInfoButtonProps } from "@/types/propTypes";

const UserInfoButton = ({ profileUrl, onClick }: UserInfoButtonProps) => {
  return (
    <Link
      className="group/icon inline-block top-4 right-4 absolute text-glass-text-primary text-2xl cursor-pointer"
      href={profileUrl}
      onClick={onClick}
    >
      <BsInfoCircle className="group-hover/icon:hidden top-0 right-0 absolute" />
      <BsInfoCircleFill className="hidden group-hover/icon:inline-block top-0 right-0 absolute" />
    </Link>
  );
};

export default UserInfoButton;
