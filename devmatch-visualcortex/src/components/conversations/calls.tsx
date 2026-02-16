import Image from "next/image";
import { IoCallSharp, IoVideocam } from "react-icons/io5";
import { staticImages } from "@/config/config";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import { IoMdKeypad } from "react-icons/io";

const Calls = () => {
  return (
    <>
      <div className="p-2 pt-3">
        <ButtonNormal
          className="p-4 py-5 w-full"
          text="New Call"
          icon={<IoCallSharp />}
        />
      </div>

      <div className="p-2 pr-1 w-full overflow-y-auto">
        <div className="space-y-1 [&::-webkit-scrollbar-thumb]:bg-glass-surface-light [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="items-center gap-2 grid grid-cols-[auto_1fr_auto] bg-glass-surface-light hover:bg-glass-surface-heavy shadow shadow-glass-shadow-medium p-2 border rounded-lg w-full transition-all ease-in-out"
            >
              <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-10 h-10 font-semibold text-white cursor-pointer">
                <Image
                  src={staticImages.avatarPlaceholder.src}
                  alt={staticImages.avatarPlaceholder.alt}
                  width={100}
                  height={100}
                  className="border rounded-full w-full h-full object-cover select-none"
                />
              </div>

              <div className="pt-1 min-w-0">
                <div className="font-medium text-glass-text-primary text-lg truncate">
                  Call {item}
                </div>
              </div>

              <div className="flex gap-2">
                <span className="bg-green-600 hover:bg-green-900 shadow-glass-shadow-heavy shadow-md p-2 rounded-full font-medium text-glass-text-primary text-sm transition-all ease-in-out cursor-pointer">
                  <IoCallSharp />
                </span>
                <span className="bg-blue-600 hover:bg-blue-900 shadow-glass-shadow-heavy shadow-md p-2 rounded-full font-medium text-glass-text-primary text-sm transition-all ease-in-out cursor-pointer">
                  <IoVideocam />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calls;
