import { IoClose } from "react-icons/io5";
import { toTitleCase } from "@/lib/utils/utils";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const NotificationsDropdownHeading = ({ type }: { type: string }) => {
  return (
    <>
      <div className="relative p-2 px-4 w-full font-bold text-lg">
        {toTitleCase(type)}

        <div className="top-[25%] right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer">
          <IoClose />
        </div>
      </div>
      <HorizontalSeparator />
    </>
  );
};

export default NotificationsDropdownHeading;
