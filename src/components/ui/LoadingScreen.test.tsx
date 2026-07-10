/**
 * LoadingScreen.test.tsx - 加载屏幕组件测试
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen, InlineLoading } from './LoadingScreen';
import { useI18nStore } from '@/lib/i18n';

describe('LoadingScreen', () => {
  beforeEach(() => {
    useI18nStore.setState({ language: 'zh-CN' });
  });

  it('应该渲染全屏加载指示器', () => {
    render(<LoadingScreen />);

    expect(screen.getByText('Veloform')).toBeInTheDocument();
    expect(screen.getByText('正在加载...')).toBeInTheDocument();
  });

  it('应该显示自定义消息', () => {
    render(<LoadingScreen message="正在保存配置..." />);

    expect(screen.getByText('正在保存配置...')).toBeInTheDocument();
  });
});

describe('InlineLoading', () => {
  it('应该渲染行内加载指示器', () => {
    const { container } = render(<InlineLoading />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('应该应用自定义 className', () => {
    const { container } = render(<InlineLoading className="text-primary" />);

    expect(container.firstChild).toHaveClass('text-primary');
  });
});
