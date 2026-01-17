import { DropdownProps } from "@/types/propTypes";

const Dropdown = ({ id, className, children }: DropdownProps) => {
  const handleClosePopover = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    const closeElement = target.closest("[data-close-dropdown]");

    if (closeElement) {
      const popover = e.currentTarget as HTMLElement & {
        hidePopover: () => void;
      };
      if (typeof popover.hidePopover === "function") {
        popover.hidePopover();
      }
    }
  };

  return (
    <div
      id={id}
      className={`absolute flex flex-col bg-glass-surface-light shadow-glass-shadow-heavy shadow-md backdrop-blur-md my-2 p-1 border rounded-xl w-max text-glass-text-primary text-center dropdown-menu ${className}`}
      popover="auto"
      onClick={handleClosePopover}
    >
      {children}
    </div>
  );
};

export default Dropdown;
