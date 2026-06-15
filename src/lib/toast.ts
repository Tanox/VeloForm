'use client';

import { toast as sonnerToast, Toaster } from 'sonner';

// Re-export toast functions using sonner
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export function toast(type: ToastType, message: string, duration?: number) {
  const options = {
    duration: duration ?? 4000,
  };

  switch (type) {
    case 'success':
      sonnerToast.success(message, options);
      break;
    case 'error':
      sonnerToast.error(message, options);
      break;
    case 'warning':
      sonnerToast.warning(message, options);
      break;
    case 'info':
    default:
      sonnerToast(message, options);
      break;
  }
}

// Legacy exports for backwards compatibility
export const useToastStore = {
  getState: () => ({ toasts: [] }),
  subscribe: () => () => {},
};

// Re-export sonner Toaster component
export const Toast = Toaster;
export { sonnerToast as default };
