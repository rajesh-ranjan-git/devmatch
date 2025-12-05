import { ButtonProps } from "@/types/propTypes";
import { BsCamera, BsFillCameraFill } from "react-icons/bs";

const ProfileCoverEditButton = ({ popoverTarget, onClick }: ButtonProps) => {
  return (
    <button
      className="group/icon top-4 right-4 absolute hover:bg-glass-surface-heavy backdrop-blur-3xl border border-glass-border-subtle hover:border-glass-border-bright rounded-sm w-8.5 h-8 text-glass-text-primary text-2xl transition-all ease-in-out cursor-pointer"
      popoverTarget={popoverTarget}
      onClick={onClick}
    >
      <BsCamera className="group-hover/icon:hidden inline-block top-0.5 right-1 absolute" />
      <BsFillCameraFill className="hidden group-hover/icon:inline-block top-0.5 right-1 absolute" />
    </button>
  );
};

export default ProfileCoverEditButton;
