import { TextareaProps } from "@/types/propTypes";

const Textarea = ({
  name,
  rows,
  placeholder,
  value,
  defaultValue,
  className,
}: TextareaProps) => {
  return (
    <div
      className={`flex items-center gap-2 bg-glass-surface-light shadow-glass-shadow-heavy shadow-md pr-4 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full overflow-hidden text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider ${className}`}
    >
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue as string}
        rows={rows}
        className="focus:bg-glass-surface-heavy px-5 py-2 rounded-l-4xl outline-none w-full transition-all ease-in-out caret-glass-text-primary"
      />
    </div>
  );
};

export default Textarea;
