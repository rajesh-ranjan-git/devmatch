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
        {options?.map((option, idx) => {
          const safeId = `${name}-${option}-${idx}`;
          const isActive = updatedValue === option;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2 shadow-glass-shadow-heavy shadow-md px-4 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full min-w-fit overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary cursor-pointer transition-all duration-300 ${
                isActive ? "bg-glass-surface-heavy" : ""
              }`}
              onClick={() => setUpdatedValue(option)}
            >
              <input
                name={name}
                id={safeId}
                type="radio"
                checked={isActive}
                value={updatedValue}
                onChange={() => setUpdatedValue(option)}
                className="hidden"
              />
              <div
                className={`
                  w-4 h-4 border flex items-center justify-center
                  transition-all duration-300 rounded-full outline-none cursor-pointer
                  ${isActive ? "border-cyan-900" : "border-gray-400"}
                `}
              >
                <div
                  className={`
                    w-2 h-2 rounded-full bg-cyan-900
                    transition-all duration-300
                    ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                  `}
                />
              </div>
              <label htmlFor={name} className="cursor-pointer">
                {toTitleCase(option)}
              </label>
            </div>
          );
        })}
      </div>
      {icon && (
        <span className="bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mr-2 p-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-full outline-none min-w-fit overflow-hidden text-glass-text-primary">
          {icon}
        </span>
      )}
    </div>
  );
};

export default Radio;
