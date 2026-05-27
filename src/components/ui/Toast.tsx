'use client';

import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore, type Toast as ToastType } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

const bgMap = {
  success: 'bg-emerald-50 dark:bg-emerald-950/30',
  error: 'bg-red-50 dark:bg-red-950/30',
  warning: 'bg-amber-50 dark:bg-amber-950/30',
  info: 'bg-blue-50 dark:bg-blue-950/30',
};

const borderMap = {
  success: 'border-emerald-200 dark:border-emerald-800',
  error: 'border-red-200 dark:border-red-800',
  warning: 'border-amber-200 dark:border-amber-800',
  info: 'border-blue-200 dark:border-blue-800',
};

function Toast({ toast }: { toast: ToastType }) {
  const Icon = iconMap[toast.type];
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg',
        bgMap[toast.type],
        borderMap[toast.type]
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', colorMap[toast.type])} />
      <p className="text-sm font-medium text-foreground">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-auto p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4 text-muted" />
      </button>
    </motion.div>
  );
}

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
