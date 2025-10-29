import Link from "next/link";
import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";
import { profileDropdownItems } from "@/config/config";

const UserInfoButton = () => {
  return (
    <Link
      className="group/icon inline-block top-4 right-4 absolute text-glass-text-primary text-2xl cursor-pointer"
      href={profileDropdownItems[0].url || "#"}
    >
      <BsInfoCircle className="group-hover/icon:hidden top-0 right-0 absolute" />
      <BsInfoCircleFill className="hidden group-hover/icon:inline-block top-0 right-0 absolute" />
    </Link>
  );
};

export default UserInfoButton;
