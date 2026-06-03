'use client';

import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore, type Toast as ToastType } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  success: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800',
  error: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
  warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
};

const progressMap = {
  success: 'bg-emerald-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
};

function ToastItem({ toast }: { toast: ToastType }) {
  const Icon = iconMap[toast.type];
  const removeToast = useToastStore((state) => state.removeToast);
  const [progress, setProgress] = useState(100);
  const duration = toast.duration || 3000;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  const handleClose = () => {
    removeToast(toast.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="relative overflow-hidden rounded-xl border shadow-lg"
    >
      <div className={cn('flex items-center gap-3 px-4 py-3', bgMap[toast.type])}>
        <Icon className={cn('w-5 h-5 flex-shrink-0', colorMap[toast.type])} />
        <p className="text-sm font-medium text-foreground flex-1">{toast.message}</p>
        <button
          onClick={handleClose}
          className="ml-auto p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label="关闭通知"
        >
          <X className="w-4 h-4 text-muted" />
        </button>
      </div>
      <motion.div
        className={cn('h-1', progressMap[toast.type])}
        initial={{ width: '100%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.05, ease: 'linear' }}
      />
    </motion.div>
  );
}

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4"
      role="region"
      aria-label="通知"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
