import Image from "next/image";
import { staticImages } from "@/config/config";
import { ChatBubbleProps } from "@/types/propTypes";
import { getFullName, toTitleCase } from "@/lib/utils/utils";

const ReceivedChatBubble = ({ user, message }: ChatBubbleProps) => {
  console.log("debug from ReceivedChatBubble message : ", message);

  return (
    <div className="items-start gap-x-3 grid grid-cols-[auto_1fr] py-1">
      <div className="self-end row-span-2">
        <div className="inline-flex relative">
          <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-10 h-10 font-semibold text-glass-text-primary cursor-pointer">
            <Image
              src={user?.avatarUrl ?? staticImages.avatarPlaceholder.src}
              alt={staticImages.avatarPlaceholder.alt}
              width={100}
              height={100}
              className="border rounded-full w-full h-full object-cover select-none"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-1 col-start-2 row-start-1 text-xs select-none">
        {toTitleCase(getFullName(user))}{" "}
        <time className="opacity-50 text-xs">2 hours ago</time>
      </div>

      <div className="before:bottom-0 before:-left-2 before:absolute relative flex flex-col col-start-2 row-end-3 shadow shadow-glass-shadow-medium px-4 py-2 rounded-xl rounded-es-none w-fit before:w-3 min-w-10 max-w-[90%] before:h-3 min-h-8 text-glass-text-primary before:content-[''] bg-glass-accent-blue-bright before:bg-glass-accent-blue-bright before:[clip-path:polygon(0%_87%,15%_100%,92%_100%,100%_0%,96%_0%,92%_19%,86%_38%,69%_42%,0%_87%)]">
        {message.split("\n").map((m, idx) => (
          <span key={idx}>{m}</span>
        ))}
      </div>
    </div>
  );
};

export default ReceivedChatBubble;
