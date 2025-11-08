import { useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaChevronDown, FaEllipsisVertical } from "react-icons/fa6";
import {
  sheetDropdownItems,
  profileDropdownItems,
  staticImages,
} from "@/config/config";
import HorizontalSeparator from "@/components/ui/separators/horizontalSeparator";
import ContextMenu from "@/components/ui/contextMenu/contextMenu";
import ButtonNormal from "@/components/ui/buttons/buttonNormal";

const RequestsSheetItems = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const requestActionsContext2 = {
    isOpen: openIndex,
    toggle: (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    },
  };

  return (
    <div className="h-[92%]">
      <div className="[&::-webkit-scrollbar-track]:bg-transparent pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full w-full [&::-webkit-scrollbar]:w-1 h-full overflow-y-scroll [&::-webkit-scrollbar-thumb]:bg-glass-text-tertiary [&::-webkit-scrollbar-thumb]:hover:bg-glass-text-tertiary transition-all ease-in-out">
        {Object.values(sheetDropdownItems)[0].map((item, index) => (
          <div
            className="relative flex items-center gap-2 hover:bg-glass-surface-heavy p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
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
              <div className="relative my-4">
                <ButtonNormal
                  icon={<FaEllipsisVertical />}
                  label="Actions"
                  className="text-sm"
                  onClick={() => requestActionsContext2.toggle(index)}
                >
                  <FaChevronDown
                    className={`${
                      requestActionsContext2.isOpen === index && "rotate-180"
                    } transition-all ease-in-out duration-500`}
                  />
                </ButtonNormal>
                <ContextMenu
                  open={requestActionsContext2.isOpen === index}
                  className="top-16 before:right-full left-0 before:left-4 w-52"
                >
                  <p className="p-2 px-4 font-bold text-lg">Rajesh Ranjan</p>
                  <HorizontalSeparator />
                  <div className="flex flex-col gap-1 p-1">
                    {Object.values(profileDropdownItems).map((item) => (
                      <p
                        key={item.name}
                        className="flex justify-between items-center hover:bg-glass-surface-heavy p-1 rounded-lg w-full transition-all ease-in-out cursor-pointer"
                      >
                        <span>{item.icon}</span>
                        <span className="mr-4 w-full">{item.label}</span>
                      </p>
                    ))}
                  </div>
                </ContextMenu>
              </div>
              <div className="top-[40%] right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer">
                <IoClose />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsSheetItems;
