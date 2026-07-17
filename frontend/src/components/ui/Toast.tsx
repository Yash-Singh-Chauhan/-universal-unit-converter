import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastType, ReactNode> = {
  success: <CheckCircle size={16} />,
  error: <AlertCircle size={16} />,
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
};

const iconColors: Record<ToastType, string> = {
  success: "text-[var(--color-success)]",
  error: "text-[var(--color-error)]",
  info: "text-[var(--color-info)]",
  warning: "text-[var(--color-warning)]",
};

const borderColors: Record<ToastType, string> = {
  success: "border-l-[var(--color-success)]",
  error: "border-l-[var(--color-error)]",
  info: "border-l-[var(--color-info)]",
  warning: "border-l-[var(--color-warning)]",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] border-l-4",
                borderColors[toast.type]
              )}
            >
              <span className={cn("mt-0.5", iconColors[toast.type])}>
                {icons[toast.type]}
              </span>
              <p className="flex-1 text-sm text-[var(--color-text)]">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
