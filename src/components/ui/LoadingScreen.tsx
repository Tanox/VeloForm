'use client';

import { motion } from 'framer-motion';
import { Bike } from 'lucide-react';

/**
 * 全屏加载指示器。
 * 适用于路由切换、页面初始加载等场景。
 */
export function LoadingScreen({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="mb-6"
      >
        <Bike className="w-12 h-12 text-primary" />
      </motion.div>
      <div className="space-y-3 text-center">
        <h2 className="text-xl font-semibold text-foreground">Veloform</h2>
        <p className="text-sm text-muted">
          {message || '正在加载...'}
        </p>
      </div>
      <div className="mt-8 w-48 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

/**
 * 行内加载指示器（用于按钮内等场景）。
 */
export function InlineLoading({ className }: { className?: string }) {
  return (
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className={className}
      aria-hidden="true"
    >
      <Bike className="w-4 h-4" />
    </motion.span>
  );
}
