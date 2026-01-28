import { useState, useEffect } from "react";
import { ContextMenuProps } from "@/types/propTypes";
import { ImCross } from "react-icons/im";

const ContextMenu = ({
  open,
  onClose,
  className,
  children,
}: ContextMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isVisible) return null;

  return (
    <div
      className={`top-1/2 left-1/2 z-10 absolute bg-glass-surface-light shadow-glass-shadow-heavy shadow-md backdrop-blur-md p-2 border rounded-xl min-w-80 min-h-40 overflow-hidden text-glass-text-primary text-center transition-all -translate-x-1/2 -translate-y-1/2 animate-[fadeIn_0.5s_ease-in-out,slideInFromBottom_0.5s_ease-in-out] duration-500 ease-in-out ${
        open ? "opacity-100" : "opacity-0"
      } ${className ? className : ""}`}
    >
      <button
        className="top-1 right-1 absolute p-1 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer"
        onClick={onClose}
      >
        <ImCross size={10} />
      </button>
      {children || "Context Menu"}
    </div>
  );
};

export default ContextMenu;
