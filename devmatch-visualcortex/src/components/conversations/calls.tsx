import Image from "next/image";
import { IoCallSharp } from "react-icons/io5";
import { staticImages } from "@/config/config";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";
import { IoMdKeypad } from "react-icons/io";

const Calls = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-2 p-2 pt-3">
        <ButtonNormal
          className="p-4 py-5 w-full"
          text="New Call"
          icon={<IoCallSharp />}
        />
        <ButtonNormal icon={<IoMdKeypad size={24} />} className="py-5" />
      </div>

      <div className="p-2 pr-1 h-[72%]">
        <div className="space-y-1 [&::-webkit-scrollbar-thumb]:bg-glass-surface-light [&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 bg-glass-surface-light hover:bg-glass-surface-heavy shadow shadow-glass-shadow-medium p-2 border rounded-lg transition-all ease-in-out cursor-pointer"
            >
              <div className="flex justify-center items-center shadow-glass-shadow-heavy shadow-md rounded-full w-12 h-10 font-semibold text-white">
                <Image
                  src={staticImages.avatarPlaceholder.src}
                  alt={staticImages.avatarPlaceholder.alt}
                  width={100}
                  height={100}
                  className="border rounded-full"
                />
              </div>
              <div className="flex justify-between items-center pt-1 w-full">
                <span className="mb-1 font-medium text-glass-text-primary text-lg">
                  Call {item}
                </span>
                <span className="bg-green-600 hover:bg-green-900 shadow-glass-shadow-heavy shadow-md mb-1 p-2 rounded-full font-medium text-glass-text-primary text-sm transition-all ease-in-out">
                  <IoCallSharp />
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
