import Image from "next/image";
import { staticImages } from "@/config/config";

const SentChatBubble = () => {
  return (
    <div className="place-items-end gap-x-3 grid grid-cols-[1fr_auto] py-1">
      <div className="flex gap-1 col-start-1 row-start-1 text-xs select-none">
        Anakin <time className="opacity-50 text-xs">2 hours ago</time>
      </div>

      <div className="before:-right-2 before:bottom-0 before:absolute relative col-start-1 row-end-3 bg-[oklch(60%_0_0)] before:bg-[oklch(60%_0_0)] shadow shadow-glass-shadow-medium px-4 py-2 rounded rounded-ee-none w-fit before:w-3 min-w-10 max-w-[90%] before:h-3 min-h-8 text-white before:content-[''] before:rotate-y-180 before:scale-x-[-1] before:[clip-path:polygon(100%_87%,85%_100%,8%_100%,0%_0%,4%_0%,8%_19%,14%_38%,31%_42%,100%_87%)]">
        I hate you!
      </div>

      <div className="self-end col-start-2 row-span-2">
        <div className="inline-flex relative">
          <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-10 h-8 font-semibold text-white cursor-pointer">
            <Image
              src={staticImages.avatarPlaceholder.src}
              alt={staticImages.avatarPlaceholder.alt}
              width={100}
              height={100}
              className="border rounded-full select-none"
            />
          </div>
        </div>
      </div>

      <div className="col-start-1 opacity-50 text-xs select-none">Seen 2 hours ago</div>
    </div>
  );
};

export default SentChatBubble;
