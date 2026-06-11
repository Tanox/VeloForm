/**
 * Skeleton.test.tsx - 骨架屏组件测试
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Skeleton,
  SkeletonCard,
  SkeletonLine,
  SkeletonChart,
  SkeletonBuildItem,
} from './Skeleton';

describe('Skeleton', () => {
  it('应该渲染基础骨架屏', () => {
    render(<Skeleton />);

    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('aria-label', 'Loading...');
  });

  it('应该应用自定义 className', () => {
    render(<Skeleton className="h-4 w-3/4" />);

    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveClass('w-3/4');
  });
});

describe('SkeletonCard', () => {
  it('应该渲染卡片骨架屏', () => {
    const { container } = render(<SkeletonCard />);

    // 验证容器存在
    expect(container.firstChild).toBeInTheDocument();
  });

  it('应该应用自定义 className', () => {
    const { container } = render(<SkeletonCard className="mt-4" />);

    expect(container.firstChild).toHaveClass('mt-4');
  });
});

describe('SkeletonLine', () => {
  it('应该渲染行骨架屏', () => {
    const { container } = render(<SkeletonLine />);

    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('SkeletonChart', () => {
  it('应该渲染图表骨架屏', () => {
    const { container } = render(<SkeletonChart />);

    expect(container.firstChild).toBeInTheDocument();
  });
});

describe('SkeletonBuildItem', () => {
  it('应该渲染配置项骨架屏', () => {
    const { container } = render(<SkeletonBuildItem />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
