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
    <div
      className={`top-16 right-0 z-50 absolute animate-[fadeIn_0.5s_ease-in-out,slideInFromTop_0.5s_ease-in-out] bg-glass-surface-light backdrop-blur-sm border rounded-xl min-w-40 text-glass-text-primary transition-all duration-500 ease-in-out text-center before:content-[''] before:absolute before:bottom-full before:right-10 before:border-6 before:border-transparent before:border-b-glass-border-bright before:drop-shadow-[0_-1px_0_rgba(255,255,255,0.1)] shadow-md shadow-glass-shadow-heavy ${
        open ? "translate-y-0 opacity-100" : "-translate-y-[50%] opacity-0"
      }`}
      onClick={onClose}
    >
      {children || "Context Menu"}
    </div>
  );
};

export default ContextMenu;
