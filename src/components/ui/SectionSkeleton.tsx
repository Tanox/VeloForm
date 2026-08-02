/**
 * 区块级骨架屏占位。
 * 用于首页异步区块（推荐配置/定价/CTA）的 Suspense fallback，
 * 提供与内容区尺寸匹配的占位，避免白屏突兀。
 */
export function SectionSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div
      className={`${height} animate-pulse rounded-2xl border border-border-light bg-surface-secondary/60`}
      role="status"
      aria-label="加载中"
    />
  );
}
