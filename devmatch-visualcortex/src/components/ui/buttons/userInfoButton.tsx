import { BsInfoCircle, BsInfoCircleFill } from "react-icons/bs";

const UserInfoButton = () => {
  return (
    <div className="group/icon inline-block top-4 right-4 absolute text-glass-text-primary text-2xl cursor-pointer">
      <BsInfoCircle className="group-hover/icon:hidden top-0 right-0 absolute" />
      <BsInfoCircleFill className="hidden group-hover/icon:inline-block top-0 right-0 absolute" />
    </div>
  );
};

export default UserInfoButton;
