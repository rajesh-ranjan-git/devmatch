import { toTitleCase } from "@/lib/utils/utils";
import { RadioProps } from "@/types/propTypes";

const Radio = ({
  name,
  options,
  defaultValue,
  className,
  icon,
}: RadioProps) => {
  if (options?.length <= 0) return null;

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 w-full overflow-hidden text-glass-text-primary text-md tracking-wider  ${className}`}
    >
      <div className="flex items-center gap-8">
        {options?.map((option, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              name={name}
              id={option}
              type="radio"
              checked={defaultValue === option}
              value={option}
              className="px-5 py-2 rounded-l-4xl outline-none w-full"
            />
            <label for={option}>{toTitleCase(option)}</label>
          </div>
        ))}
      </div>
      {icon}
    </div>
  );
};

export default Radio;
