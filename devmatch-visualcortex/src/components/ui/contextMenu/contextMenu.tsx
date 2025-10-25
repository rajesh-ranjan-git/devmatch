import { useState, useEffect } from "react";
import { ContextMenuProps } from "@/types/propTypes";

const ContextMenu = ({ open, onClose, children }: ContextMenuProps) => {
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
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-500 animate-[fadeIn_0.5s_ease-in-out] ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`z-50 right-16 fixed flex justify-center items-center bg-glass-surface-light backdrop-blur-sm border rounded-xl min-w-64 min-h-64 font-semibold text-glass-text-primary text-2xl transition-all duration-500 ease-in-out animate-[slideInFromTop_0.5s_ease-in-out] ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div>{children || "Context Menu"}</div>
      </div>
    </>
  );
};

export default ContextMenu;
