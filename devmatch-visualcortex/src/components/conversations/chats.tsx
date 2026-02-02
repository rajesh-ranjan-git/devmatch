import Image from "next/image";
import { FaRocketchat } from "react-icons/fa6";
import { staticImages } from "@/config/config";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";

const Chats = () => {
  return (
    <>
      <div className="p-2 pt-3">
        <ButtonNormal
          className="p-4 py-5 w-full"
          text="New Chat"
          icon={<FaRocketchat />}
        />
      </div>

      <div className="p-2 pr-1 h-[72%]">
        <div className="space-y-1 [&::-webkit-scrollbar-thumb]:bg-glass-surface-light [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-glass-surface-light hover:bg-glass-surface-heavy shadow shadow-glass-shadow-medium p-2 border rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-10 h-8 font-semibold text-white cursor-pointer">
                <Image
                  src={staticImages.avatarPlaceholder.src}
                  alt={staticImages.avatarPlaceholder.alt}
                  width={100}
                  height={100}
                  className="border rounded-full"
                />
              </div>
              <div>
                <h3 className="mb-1 font-medium text-glass-text-primary text-sm">
                  Chat {item}
                </h3>
                <p className="text-glass-text-secondary text-xs truncate">
                  Last message preview goes here...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chats;
