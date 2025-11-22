import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { notificationsDropdownItems, staticImages } from "@/config/config";
import { toTitleCase } from "@/lib/utils/utils";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";

const NotificationsDropdownItems = () => {
  return (
    <div className="flex flex-col gap-1 min-w-92 max-h-[80vh]">
      <div className="[&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
        {Object.entries(notificationsDropdownItems).map(([type, items]) => (
          <div key={type}>
            <div className="relative p-2 px-4 w-full font-bold text-lg">
              {toTitleCase(type)}

              <div className="top-[25%] right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer">
                <IoClose />
              </div>
            </div>
            <HorizontalSeparator />
            {items.map((item, index) => (
              <div
                className="relative flex items-center gap-2 hover:bg-glass-surface-heavy my-1 p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
                key={index}
              >
                <div className="border border-glass-border-bright rounded-full w-12 h-10 object-cover">
                  <Image
                    src={staticImages.profilePlaceholder.src}
                    alt={staticImages.profilePlaceholder.alt}
                    width={100}
                    height={100}
                    className="rounded-full w-full h-full object-cover select-none"
                  />
                </div>
                <div className="pr-8 w-full text-glass-text-primary text-left">
                  <p className="w-full font-semibold text-sm">{item.name}</p>
                  <p className="w-full text-xs">{item.designation}</p>
                  <p className="w-full text-sm">{item.body}</p>
                </div>
                <div className="top-[35%] right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer">
                  <IoClose />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <HorizontalSeparator />
      <div className="hover:bg-glass-surface-heavy m-1 p-1 px-4 rounded-lg text-sm cursor-pointer">
        Clear
      </div>
    </div>
  );
};

export default NotificationsDropdownItems;
