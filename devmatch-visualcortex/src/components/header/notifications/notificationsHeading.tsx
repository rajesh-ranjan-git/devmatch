import { ImCross } from "react-icons/im";
import { toTitleCase } from "@/lib/utils/utils";
import { NotificationsHeadingProps } from "@/types/propTypes";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const NotificationsHeading = ({
  type,
  notificationAction,
}: NotificationsHeadingProps) => {
  return (
    <>
      <div className="relative p-2 px-4 w-full font-bold text-lg">
        {`${toTitleCase(type)}s`}
        <button
          className="top-[25%] right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer"
          onClick={() => notificationAction({ type })}
        >
          <ImCross size={10} />
        </button>
      </div>
      <HorizontalSeparator />
    </>
  );
};

export default NotificationsHeading;
