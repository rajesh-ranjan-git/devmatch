"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const TOAST_VARIANTS = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
} as const;

export const TOAST_POSITIONS = {
  topLeft: "top-left",
  topRight: "top-right",
  topCenter: "top-center",
  bottomLeft: "bottom-left",
  bottomRight: "bottom-right",
  bottomCenter: "bottom-center",
} as const;

export const TOAST_PROGRESS_POSITIONS = {
  top: "top",
  bottom: "bottom",
} as const;

export const TOAST_PROGRESS_DIRECTIONS = {
  leftToRight: "left-to-right",
  rightToLeft: "right-to-left",
} as const;

// Types
type ToastVariant = keyof typeof TOAST_VARIANTS;
type ToastPosition = (typeof TOAST_POSITIONS)[keyof typeof TOAST_POSITIONS];
type ToastProgressPosition = keyof typeof TOAST_PROGRESS_POSITIONS;
type ToastProgressDirection =
  (typeof TOAST_PROGRESS_DIRECTIONS)[keyof typeof TOAST_PROGRESS_DIRECTIONS];

interface ToastConfig {
  title: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  toastProgressPosition?: ToastProgressPosition;
  toastProgressDirection?: ToastProgressDirection;
}

interface Toast extends ToastConfig {
  id: string;
  variant: ToastVariant;
  duration: number;
  toastProgressPosition: ToastProgressPosition;
  toastProgressDirection: ToastProgressDirection;
}

interface ToastContextType {
  toasts: Toast[];
  position: ToastPosition;
  setPosition: (position: ToastPosition) => void;
  showToast: (config: ToastConfig) => void;
  removeToast: (id: string) => void;
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Variant configurations
const variantConfig = {
  success: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-800",
    icon: FiCheckCircle,
    iconColor: "text-green-500",
    progress: "bg-green-500",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: FiAlertCircle,
    iconColor: "text-red-500",
    progress: "bg-red-500",
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-yellow-800",
    icon: TbAlertTriangle,
    iconColor: "text-yellow-500",
    progress: "bg-yellow-500",
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    icon: FaInfoCircle,
    iconColor: "text-blue-500",
    progress: "bg-blue-500",
  },
};

// Position styles
const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

// Toast Component
const ToastItem: React.FC<{
  toast: Toast;
  onRemove: (id: string) => void;
  index: number;
}> = ({ toast, onRemove, index }) => {
  const [progress, setProgress] = useState(100);
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    const startTime = Date.now();
    const duration = toast.duration;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        onRemove(toast.id);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [toast.id, toast.duration, onRemove]);

  const progressStyle = {
    width: `${progress}%`,
    transformOrigin:
      toast.toastProgressDirection ===
      (TOAST_PROGRESS_DIRECTIONS.rightToLeft as string)
        ? "right"
        : "left",
  };

  return (
    <div
      className={`relative w-80 ${config.bg} border rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-out`}
      style={{
        marginBottom: index > 0 ? "8px" : "0",
        transform: `translateY(${index * 4}px) scale(${1 - index * 0.02})`,
        opacity: 1 - index * 0.1,
        zIndex: 1000 - index,
      }}
    >
      {toast.toastProgressPosition === "top" && (
        <div className="bg-gray-200 h-1">
          <div
            className={`h-full ${config.progress} transition-all duration-100 ease-linear`}
            style={progressStyle}
          />
        </div>
      )}

      <div className="flex items-start gap-3 p-4">
        <Icon className={`${config.iconColor} shrink-0 mt-0.5`} size={20} />

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold ${config.text} text-sm mb-1`}>
            {toast.title}
          </h3>
          <p className={`${config.text} text-sm opacity-90`}>{toast.message}</p>
        </div>

        <button
          onClick={() => onRemove(toast.id)}
          className={`${config.text} hover:opacity-70 transition-opacity shrink-0`}
        >
          <IoClose size={18} />
        </button>
      </div>

      {toast.toastProgressPosition === "bottom" && (
        <div className="bg-gray-200 h-1">
          <div
            className={`h-full ${config.progress} transition-all duration-100 ease-linear`}
            style={progressStyle}
          />
        </div>
      )}
    </div>
  );
};

// Toast Container
const ToastContainer: React.FC<{
  toasts: Toast[];
  position: ToastPosition;
  onRemove: (id: string) => void;
}> = ({ toasts, position, onRemove }) => {
  return (
    <div className={`fixed ${positionStyles[position]} z-50 flex flex-col`}>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
          index={index}
        />
      ))}
    </div>
  );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<ToastPosition>(
    TOAST_POSITIONS.topRight
  );

  const showToast = useCallback((config: ToastConfig) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      title: config.title,
      message: config.message,
      variant: config.variant || TOAST_VARIANTS.info,
      duration: config.duration || 30000,
      toastProgressPosition:
        config.toastProgressPosition || TOAST_PROGRESS_POSITIONS.bottom,
      toastProgressDirection:
        config.toastProgressDirection || TOAST_PROGRESS_DIRECTIONS.leftToRight,
    };

    setToasts((prev) => [newToast, ...prev]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, position, setPosition, showToast, removeToast }}
    >
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        onRemove={removeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
