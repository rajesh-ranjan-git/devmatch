import { InputProps } from "@/types/propTypes";

const Input = ({
  name,
  type,
  placeholder,
  defaultValue,
  className,
}: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue as string}
      className={`bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mt-3 px-5 py-2 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider ${className}`}
    />
  );
};

export default Input;
