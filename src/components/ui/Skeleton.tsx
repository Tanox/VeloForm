'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  /** 骨架动画方向 */
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}

/**
 * 基础骨架屏组件。
 * 使用 Tailwind 的 animate-pulse 模拟内容加载占位。
 */
export function Skeleton({ className, direction = 'horizontal' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md bg-zinc-200 dark:bg-zinc-800 animate-pulse',
        className
      )}
      role="status"
      aria-label="Loading..."
    />
  );
}

/**
 * 骨架卡片：模拟卡片组件的骨架屏。
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-2xl bg-surface-secondary p-4 space-y-3', className)}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="pt-2 space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-1/3" />
      </div>
    </div>
  );
}

/**
 * 骨架行：模拟列表项的骨架屏。
 */
export function SkeletonLine({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)}>
      <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full flex-shrink-0" />
    </div>
  );
}

/**
 * 骨架图表：模拟图表组件的骨架屏。
 */
export function SkeletonChart({ className }: { className?: string }) {
  const heights = [65, 45, 80, 55, 90, 70, 60];
  return (
    <div className={cn('rounded-2xl bg-surface-secondary p-4 space-y-3', className)}>
      <div className="flex items-end gap-2 h-32">
        {heights.map((h, i) => (
          <div
            key={i}
            className={cn('flex-1 rounded-t-md bg-zinc-200 dark:bg-zinc-800 animate-pulse')}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {['车架', '传动', '轮组', '前叉', '车把', '轮胎', '刹车'].map((label, i) => (
          <Skeleton key={i} className="h-2 w-8" />
        ))}
      </div>
    </div>
  );
}

/**
 * 骨架配置器行：模拟 BuildList 组件行的骨架屏。
 */
export function SkeletonBuildItem({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-between py-4 border-b border-border-light', className)}>
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right space-y-1">
          <Skeleton className="h-4 w-20 ml-auto" />
          <Skeleton className="h-3 w-14 ml-auto" />
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}
