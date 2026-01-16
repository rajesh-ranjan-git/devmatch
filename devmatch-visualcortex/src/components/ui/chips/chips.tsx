import { useState } from "react";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { toTitleCase } from "@/lib/utils/utils";
import { ChipsProps } from "@/types/propTypes";
import ButtonSuccess from "@/components/ui/buttons/buttonSuccess";

const Chips = ({ values, className, icon }: ChipsProps) => {
  if (!values || values?.length <= 0) return null;

  const [updatedValue, setUpdatedValue] = useState(values);

  return (
    <div
      className={`flex justify-between items-start w-full text-glass-text-primary text-md tracking-wider select-none  ${className}`}
    >
      <div className="flex flex-wrap items-center gap-4">
        {values?.map((value, idx) => {
          return (
            <div
              key={idx}
              className="relative flex items-center gap-2 bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md px-4 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none min-w-fit text-glass-text-primary text-md placeholder:text-glass-text-secondary transition-all duration-300"
            >
              <span>{toTitleCase(value)}</span>
              <span className="-top-0.5 -right-0.5 absolute text-glass-text-secondary hover:text-glass-text-primary cursor-pointer">
                <ImCross size={10} />
              </span>
            </div>
          );
        })}
        <ButtonSuccess text="Add" icon={<FaPlus />} className="p-4" />
      </div>
      {icon && (
        <span className="bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mr-2 p-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-full outline-none min-w-fit overflow-hidden text-glass-text-primary">
          {icon}
        </span>
      )}
    </div>
  );
};

export default Chips;
