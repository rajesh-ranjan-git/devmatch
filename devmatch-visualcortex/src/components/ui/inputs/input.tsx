import { InputProps } from "@/types/propTypes";

const Input = ({
  name,
  type,
  placeholder,
  defaultValue,
  className,
  icon,
}: InputProps) => {
  return (
    <div
      className={`flex items-center gap-2 bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md pr-4 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider ${className}`}
    >
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue as string}
        className="px-5 py-2 rounded-l-4xl outline-none w-full"
      />
      {icon}
    </div>
  );
};

export default Input;
