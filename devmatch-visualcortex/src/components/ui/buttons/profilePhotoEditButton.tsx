import { BsCamera } from "react-icons/bs";
import { ButtonProps } from "@/types/propTypes";

const ProfilePhotoEditButton = ({ popoverTarget }: ButtonProps) => {
  return (
    <button
      className="group top-0 absolute rounded-full w-full h-full overflow-hidden cursor-pointer"
      popoverTarget={popoverTarget}
    >
      <div className="top-0 absolute flex justify-center items-center bg-glass-surface-heavy opacity-0 group-hover:opacity-100 backdrop-blur-xs w-full h-full transition-all translate-y-full group-hover:translate-y-0 duration-300 ease-in-out">
        <BsCamera />
      </div>
    </button>
  );
};

export default ProfilePhotoEditButton;
