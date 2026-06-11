'use client';

/**
 * 代码分割与懒加载工具。
 *
 * 使用 React.lazy + Suspense 实现组件级代码分割，
 * 减少首屏 bundle 大小，按需加载非关键组件。
 */
import { lazy, Suspense, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

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

// --- 预定义懒加载组件 ---

/** ComponentDetailModal: 组件详情弹窗，仅用户点击时加载 */
export const LazyComponentDetailModal = lazy(
  () =>
    import('@/components/configurator/ComponentDetailModal').then((m) => ({
      default: m.ComponentDetailModal,
    }))
);

/** ShareModal: 分享弹窗，仅用户点击分享时加载 */
export const LazyShareModal = lazy(
  () =>
    import('@/components/configurator/ShareModal').then((m) => ({
      default: m.ShareModal,
    }))
);

/** ComparePanel: 对比面板，按需加载 */
export const LazyComparePanel = lazy(
  () =>
    import('@/components/configurator/ComparePanel').then((m) => ({
      default: m.ComparePanel,
    }))
);

/** OnboardingGuide: 新手引导，按需加载 */
export const LazyOnboardingGuide = lazy(
  () =>
    import('@/components/ui/OnboardingGuide').then((m) => ({
      default: m.OnboardingGuide,
    }))
);

/** SupportModal: 支持弹窗，按需加载 */
export const LazySupportModal = lazy(
  () =>
    import('@/components/ui/SupportModal').then((m) => ({
      default: m.SupportModal,
    }))
);

/** CostBreakdownChart: 成本图表，按需加载 */
export const LazyCostBreakdownChart = lazy(
  () =>
    import('@/components/configurator/CostBreakdownChart').then((m) => ({
      default: m.CostBreakdownChart,
    }))
);
