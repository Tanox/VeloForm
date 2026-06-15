'use client';

import { Suspense, ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 异步数据加载边界组件。
 * 组合了 Suspense（处理 loading）和 ErrorBoundary（处理错误），
 * 适用于需要异步获取数据的区域。
 */
export function AsyncBoundary({
  children,
  loadingFallback,
  errorFallback,
}: {
  children: ReactNode;
  /** Suspense 的 fallback（loading 状态） */
  loadingFallback?: ReactNode;
  /** ErrorBoundary 的 fallback（错误状态） */
  errorFallback?: ReactNode;
}) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense
        fallback={
          loadingFallback || (
            <div className="space-y-4">
              <div className="animate-pulse space-y-3">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-16 w-full rounded-xl" />
              </div>
            </div>
          )
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
