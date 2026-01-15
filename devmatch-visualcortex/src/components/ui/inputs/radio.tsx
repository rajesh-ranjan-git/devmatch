import { useState } from "react";
import { toTitleCase } from "@/lib/utils/utils";
import { RadioProps } from "@/types/propTypes";

const Radio = ({ name, options, value, className, icon }: RadioProps) => {
  if (!options || options?.length <= 0) return null;

  const [updatedValue, setUpdatedValue] = useState(value);

  return (
    <div
      className={`flex justify-between items-center px-4 py-2 w-full overflow-hidden text-glass-text-primary text-md tracking-wider  ${className}`}
    >
      <div className="flex items-center gap-8">
        {options?.map((option, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              name={name}
              id={option}
              type="radio"
              checked={updatedValue === option}
              value={updatedValue}
              onChange={() => setUpdatedValue(option)}
              className="px-5 py-2 rounded-l-4xl outline-none w-full"
            />
            <label htmlFor={option}>{toTitleCase(option)}</label>
          </div>
        ))}
      </div>
      {icon}
    </div>
  );
};

export default Radio;
