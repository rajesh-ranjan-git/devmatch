import { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { SheetProps } from "@/types/propTypes";

const Sheet = ({ open, onClose, children }: SheetProps) => {
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
        className={`top-0 right-0 z-50 fixed bg-glass-surface-light backdrop-blur-sm p-2 border rounded-l-xl min-w-96 h-screen overflow-hidden font-semibold text-glass-text-primary text-2xl transition-transform animate-[slideInFromRight_0.5s_ease-in-out] duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="top-2 right-2 absolute p-1 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer"
          onClick={onClose}
        >
          <ImCross size={10} />
        </div>
        {children || "Sheet"}
      </div>
    </>
  );
};

export default Sheet;
