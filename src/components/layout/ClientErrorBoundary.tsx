'use client';

import { ErrorBoundary as ReactErrorBoundary } from '@/components/ui/error-boundary';

/**
 * 客户端错误边界包装器。
 * 在服务端 layout 中使用 ErrorBoundary 时需要通过此组件桥接。
 */
export function ClientErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ReactErrorBoundary>{children}</ReactErrorBoundary>;
}
