import { MdEdit, MdOutlineEdit } from "react-icons/md";

const ProfileCoverEditButton = () => {
  return (
    <div className="group/icon inline-block top-4 right-4 absolute hover:bg-glass-surface-heavy backdrop-blur-3xl border border-glass-border-subtle hover:border-glass-border-bright rounded-sm w-7 h-7 text-glass-text-primary text-2xl transition-all ease-in-out cursor-pointer">
      <MdOutlineEdit className="group-hover/icon:hidden top-0 right-0 absolute" />
      <MdEdit className="hidden group-hover/icon:inline-block top-0 right-0 absolute" />
    </div>
  );
};

export default ProfileCoverEditButton;
