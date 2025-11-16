import { DropdownProps } from "@/types/propTypes";

const Dropdown = ({ id, className, children }: DropdownProps) => {
  return (
    <div
      id={id}
      className={`absolute bg-glass-surface-light shadow-glass-shadow-heavy shadow-md backdrop-blur-md my-2 p-1 border rounded-xl w-max min-w-40 text-glass-text-primary text-center transition-all duration-500 ease-in-out dropdown-menu ${className}`}
      popover=""
    >
      {children}
    </div>
  );
};

export default Dropdown;
