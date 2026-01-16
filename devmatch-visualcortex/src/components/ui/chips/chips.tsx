import { useState } from "react";
import { toTitleCase } from "@/lib/utils/utils";
import { ChipsProps } from "@/types/propTypes";

const Chips = ({ values, className, icon }: ChipsProps) => {
  if (!values || values?.length <= 0) return null;

  const [updatedValue, setUpdatedValue] = useState(values);

  return (
    <div
      className={`flex justify-between items-center w-full text-glass-text-primary text-md tracking-wider select-none ${className}`}
    >
      <div className="flex items-center gap-8 py-2">
        {values?.map((value, idx) => {
          const safeId = `${name}-${value}-${idx}`;

          return (
            <div
              key={idx}
              className="flex items-center gap-2 shadow-glass-shadow-heavy shadow-md px-4 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full min-w-fit overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-center items-center border rounded-full outline-none w-4 h-4 transition-all duration-300 cursor-pointer">
                <div className="bg-cyan-900 rounded-full w-2 h-2 transition-all duration-300" />
              </div>
              <span>{toTitleCase(value)}</span>
            </div>
          );
        })}
      </div>
      <span className="bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mr-2 p-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-full outline-none min-w-fit overflow-hidden text-glass-text-primary">
        {icon}
      </span>
    </div>
  );
};

export default Chips;
