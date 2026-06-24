'use client';

/**
 * 代码分割与懒加载工具。
 *
 * 使用 next/dynamic 实现组件级代码分割，
 * 减少首屏 bundle 大小，按需加载非关键组件。
 * Next.js dynamic import 支持 SSR 和服务端流式渲染。
 */
import dynamic from 'next/dynamic';
import { Suspense, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * 懒加载包装组件。
 * 自动包裹 Suspense，简化懒加载组件的使用。
 */
export function LazyComponent({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <Suspense fallback={fallback || <Skeleton className="h-20 w-full rounded-xl" />}>
      {children}
    </Suspense>
  );
}

// --- 预定义懒加载组件（使用 next/dynamic） ---

/** ComponentDetailModal: 组件详情弹窗，仅用户点击时加载 */
export const LazyComponentDetailModal = dynamic(
  () =>
    import('@/components/configurator/ComponentDetailModal').then((m) => m.ComponentDetailModal),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full rounded-2xl" />,
  }
);

/** ShareModal: 分享弹窗，仅用户点击分享时加载 */
export const LazyShareModal = dynamic(
  () => import('@/components/configurator/ShareModal').then((m) => m.ShareModal),
  {
    ssr: false,
    loading: () => <Skeleton className="h-48 w-full rounded-2xl" />,
  }
);

/** ComparePanel: 对比面板，按需加载 */
export const LazyComparePanel = dynamic(
  () => import('@/components/configurator/ComparePanel').then((m) => m.ComparePanel),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full rounded-2xl" />,
  }
);

/** OnboardingGuide: 新手引导，按需加载 */
export const LazyOnboardingGuide = dynamic(
  () => import('@/components/ui/OnboardingGuide').then((m) => m.OnboardingGuide),
  {
    ssr: false,
    loading: () => <Skeleton className="h-96 w-full rounded-2xl" />,
  }
);

/** SupportModal: 支持弹窗，按需加载 */
export const LazySupportModal = dynamic(
  () => import('@/components/ui/SupportModal').then((m) => m.SupportModal),
  {
    ssr: false,
    loading: () => <Skeleton className="h-48 w-full rounded-2xl" />,
  }
);

/** CostBreakdownChart: 成本图表，按需加载 */
export const LazyCostBreakdownChart = dynamic(
  () => import('@/components/configurator/CostBreakdownChart').then((m) => m.CostBreakdownChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full rounded-2xl" />,
  }
);
