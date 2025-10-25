import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

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
        className={`top-0 right-0 z-50 fixed flex justify-center items-center bg-glass-surface-light backdrop-blur-sm border rounded-l-xl w-96 h-screen font-semibold text-glass-text-primary text-2xl transition-transform duration-500 ease-in-out animate-[slideInFromRight_0.5s_ease-in-out] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="top-2 right-2 absolute p-0.5 border border-glass-border-subtle hover:border-glass-border-bright rounded-md text-sm cursor-pointer"
          onClick={onClose}
        >
          <IoClose />
        </div>
        <div>{children || "Sheet"}</div>
      </div>
    </>
  );
};

export default Sheet;
