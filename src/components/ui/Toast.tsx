import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { IconButton } from './IconButton';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ duration = 4000, ...toast }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newToast: ToastItem = { ...toast, id, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Floating Toast Notification Container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4 sm:p-0"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItemCard key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastItemCard: React.FC<{
  toast: ToastItem;
  onDismiss: () => void;
}> = ({ toast, onDismiss }) => {
  const variant = toast.variant || 'info';

  const icons = {
    info: <Info className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    danger: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
  }[variant];

  const borders = {
    info: 'border-teal-200 dark:border-teal-800',
    success: 'border-emerald-200 dark:border-emerald-800',
    warning: 'border-amber-200 dark:border-amber-800',
    danger: 'border-red-200 dark:border-red-800',
  }[variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      role="alert"
      className={`pointer-events-auto bg-white dark:bg-slate-900 border ${borders} rounded-2xl p-4 shadow-lg flex items-start gap-3 select-none`}
    >
      <div className="shrink-0 mt-0.5">{icons}</div>

      <div className="flex-1 min-w-0">
        <h4 className="text-small font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-caption text-slate-600 dark:text-slate-400 mt-1 leading-snug">
            {toast.message}
          </p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onDismiss();
            }}
            className="text-caption font-bold text-[#0F766E] hover:underline mt-2 inline-block cursor-pointer"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <IconButton
        aria-label="Dismiss toast"
        variant="ghost"
        size="sm"
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 -mr-1 -mt-1"
      >
        <X className="w-4 h-4" />
      </IconButton>
    </motion.div>
  );
};
