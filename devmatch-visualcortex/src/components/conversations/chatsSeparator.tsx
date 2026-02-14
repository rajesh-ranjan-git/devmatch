import { formatChatSeparatorTime } from "@/lib/utils/utils";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const ChatsSeparator = ({ date }: { date: string }) => {
  return (
    <div className="relative p-2 select-none">
      <div className="-top-0.5 left-0 absolute flex justify-center items-center w-full">
        <span className="bg-glass-surface-heavy shadow shadow-glass-shadow-heavy backdrop-blur-3xl p-0.5 px-4 rounded-xl text-xs">
          {formatChatSeparatorTime(date)}
        </span>
      </div>

      <HorizontalSeparator />
    </div>
  );
};

export default ChatsSeparator;
