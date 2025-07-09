// -------------------- PACKAGE IMPORT FILES -------------------- //
import { X } from "lucide-react";
import React, { useState, useContext, createContext, forwardRef, useRef, useEffect, } from "react";

// -------------------- OTHER IMPORT FILES -------------------- //
import { cn } from "../lib/utils";

// Tooltip Components

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
  const [tooltips, setTooltips] = useState([]);

  const addTooltip = (tooltip) => setTooltips((prev) => [...prev, tooltip]);
  const removeTooltip = (id) =>
    setTooltips((prev) => prev.filter((tooltip) => tooltip.id !== id));

  return (
    <TooltipContext.Provider value={{ addTooltip, removeTooltip }}>
      {children}
      <div className="fixed z-50 pointer-events-none">
        {tooltips.map((tooltip) => (
          <Tooltip key={tooltip.id} {...tooltip} />
        ))}
      </div>
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => useContext(TooltipContext);

const Tooltip = forwardRef(({ id, content, side = "top", onClose }, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000); // Hide after 3 seconds
    return () => clearTimeout(timer);
  }, [visible]);

  const tooltipClasses = cn(
    "absolute p-2 bg-gray-800 text-white rounded shadow-lg transition-opacity duration-300",
    side === "top" && "bottom-full mb-2",
    side === "bottom" && "top-full mt-2",
    side === "left" && "right-full mr-2",
    side === "right" && "left-full ml-2",
    visible ? "opacity-100" : "opacity-0",
  );

  return (
    <div ref={ref} className="relative">
      <div
        className={tooltipClasses}
        style={{ transform: `translateY(${side === "bottom" ? "10px" : "0"})` }}
      >
        {content}
        <button
          onClick={onClose}
          className="absolute p-1 text-gray-400 right-1 top-1 hover:text-white"
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
});
Tooltip.displayName = "Tooltip";

// Toast Components

const ToastContext = createContext();

export const ToastProvider = ({ children, duration = 5000 }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => setToasts((prev) => [...prev, toast]);
  const removeToast = (id) =>
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed right-0 top-0 flex max-h-screen w-full flex-col-reverse p-4 md:max-w-[420px]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const Toast = forwardRef(
  (
    { id, title, description, variant = "default", onClose, duration = 5000 },
    ref,
  ) => {
    useEffect(() => {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }, [onClose]);

    const toastClasses = cn(
      "relative flex w-full items-center justify-between p-4 rounded-md shadow-lg transition-transform duration-300",
      variant === "destructive"
        ? "bg-red-500 text-white"
        : "bg-gray-800 text-white",
    );

    return (
      <div ref={ref} className={toastClasses}>
        <div className="flex-1">
          {title && <p className="text-lg font-semibold">{title}</p>}
          {description && <p className="text-sm">{description}</p>}
        </div>
        <button
          onClick={onClose}
          className="absolute text-gray-300 right-2 top-2 hover:text-white focus:outline-none"
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    );
  },
);
Toast.displayName = "Toast";

export { TooltipProvider, Tooltip, ToastProvider, Toast };
