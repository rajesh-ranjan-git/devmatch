import { useEffect, useState } from "react";
import Image from "next/image";
import { BsInfoCircleFill } from "react-icons/bs";
import { PiCheckBold, PiChecksBold } from "react-icons/pi";
import { staticImages } from "@/config/config";
import { ChatBubbleProps } from "@/types/propTypes";
import { useDevMatchAppStore } from "@/store/store";
import { formatChatMessageTime, toTitleCase } from "@/lib/utils/utils";

const SentChatBubble = ({ message, isLatestMessage }: ChatBubbleProps) => {
  const [, setTick] = useState(0);

  const loggedInUser = useDevMatchAppStore((state) => state.loggedInUser);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="place-items-end gap-x-3 grid grid-cols-[1fr_auto] py-1">
      <div className="flex gap-1 col-start-1 row-start-1 text-xs select-none">
        {toTitleCase(loggedInUser?.firstName)}

        {message?.sentAt && (
          <time className="opacity-50 text-xs">
            {formatChatMessageTime(message?.sentAt)}
          </time>
        )}
      </div>

      <div className="before:-right-2 before:bottom-0 before:absolute relative flex flex-col col-start-1 row-end-3 shadow shadow-glass-shadow-medium px-4 py-2 rounded-xl rounded-ee-none w-fit before:w-3 min-w-10 max-w-[90%] before:h-3 min-h-8 text-glass-text-primary before:content-[''] before:rotate-y-180 before:scale-x-[-1] bg-glass-accent-green-bright before:bg-glass-accent-green-bright before:[clip-path:polygon(100%_87%,85%_100%,8%_100%,0%_0%,4%_0%,8%_19%,14%_38%,31%_42%,100%_87%)]">
        {message?.text &&
          message.text.split("\n").map((m, idx) => <span key={idx}>{m}</span>)}
      </div>

      <div className="self-end col-start-2 row-span-2">
        <div className="inline-flex relative">
          <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-10 h-10 font-semibold text-glass-text-primary cursor-pointer">
            <Image
              src={
                loggedInUser?.avatarUrl ?? staticImages.avatarPlaceholder.src
              }
              alt={staticImages.avatarPlaceholder.alt}
              width={100}
              height={100}
              className="border rounded-full w-full h-full object-cover select-none"
            />
          </div>
        </div>
      </div>

      <div className="col-start-1 opacity-50 text-xs select-none">
        {isLatestMessage && (
          <>
            {message?.deliveredAt && message?.seen ? (
              <PiChecksBold className="text-glass-accent-blue-bright" />
            ) : message?.deliveredAt && !message?.seen ? (
              <PiChecksBold />
            ) : !message?.deliveredAt && message?.sentAt ? (
              <PiCheckBold />
            ) : (
              <BsInfoCircleFill />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SentChatBubble;
