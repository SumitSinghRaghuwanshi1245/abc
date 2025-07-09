import { createContext, useContext, useMemo } from "react";
import toast from "react-hot-toast";

const ToastContext = createContext();

const ErrorType = {
    Success: "success",
    Error: "error",
    Info: "info",
    Warning: "warning"
}
export const ToastContextProvider = ({ children }) => {
    const initiateToast = (toastType, message, duration = 1000) => {
        toast.dismiss();
        const options = { duration };
        switch (toastType) {
            case ErrorType.Success:
                toast.success(message, options);
                break;
            case ErrorType.Error:
                toast.error(message, options);
                break;
            case ErrorType.Info:
                toast(message, { ...options, icon: "ℹ️" });
                break;
            case ErrorType.Warning:
                toast(message, { ...options, icon: "⚠️" });
                break;
            default:
                toast(message, options);
        }
    };

    class Toast {
        static error(message, duration = 1000) {
            initiateToast(ErrorType.Error, message, duration)
        }
        static success(message, duration = 1000) {
            initiateToast(ErrorType.Success, message, duration)
        }
        static info(message, duration = 1000) {
            initiateToast(ErrorType.Info, message, duration)
        }
        static warning(message, duration = 1000) {
            initiateToast(ErrorType.Warning, message, duration)
        }
    }


    const contextValue = useMemo(() => ({ initiateToast, Toast }), []);

    return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);


