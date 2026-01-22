import { InputProps } from "@/types/propTypes";

const Input = ({
  name,
  type,
  placeholder,
  value,
  defaultValue,
  className,
  icon,
  onChange,
  onKeyDown,
  onClick,
}: InputProps) => {
  return (
    <div
      className={`flex items-center gap-2 bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md pr-4 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider ${className}`}
    >
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue as string}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="px-5 py-2 rounded-l-4xl outline-none w-full"
      />
      <span onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
        {icon}
      </span>
    </div>
  );
};

export default Input;
