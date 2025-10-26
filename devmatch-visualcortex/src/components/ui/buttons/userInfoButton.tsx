import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";

const UserInfoButton = () => {
  return (
    <div className="group/icon inline-block top-4 right-4 absolute cursor-pointer">
      <BsInfoCircle className="group-hover/icon:hidden top-0 right-0 absolute text-2xl" />
      <BsInfoCircleFill className="hidden group-hover/icon:inline-block top-0 right-0 absolute text-2xl" />
    </div>
  );
};

export default UserInfoButton;
