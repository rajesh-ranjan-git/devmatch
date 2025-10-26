const Input = ({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-glass-surface-heavy shadow-glass-shadow-heavy shadow-md mt-5 px-5 py-2.5 border border-glass-border-bright border-r-glass-border-subtle border-b-glass-border-subtle border-none rounded-4xl outline-none w-full text-glass-text-primary text-md placeholder:text-glass-text-secondary tracking-wider"
    />
  );
};

export default Input;
