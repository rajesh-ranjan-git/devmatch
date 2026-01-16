import { useState } from "react";
import { toTitleCase } from "@/lib/utils/utils";
import { RadioProps } from "@/types/propTypes";

const Radio = ({ name, options, value, className, icon }: RadioProps) => {
  if (!options || options?.length <= 0) return null;

  const [updatedValue, setUpdatedValue] = useState(value);

  return (
    <div
      className={`flex justify-between items-center w-full text-glass-text-primary text-md tracking-wider select-none ${className}`}
    >
      <div className="flex items-center gap-8 py-2">
        {options?.map((option, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md px-4 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full min-w-fit overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary cursor-pointer"
            onClick={() => setUpdatedValue(option)}
          >
            <input
              name={name}
              id={option}
              type="radio"
              checked={updatedValue === option}
              value={updatedValue}
              onChange={() => setUpdatedValue(option)}
              className="px-5 py-2 rounded-l-4xl outline-none w-full cursor-pointer"
            />
            <label htmlFor={option} className="cursor-pointer">
              {toTitleCase(option)}
            </label>
          </div>
        ))}
      </div>
      <span className="bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mr-2 p-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-full outline-none min-w-fit overflow-hidden text-glass-text-primary">
        {icon}
      </span>
    </div>
  );
};

export default Radio;
