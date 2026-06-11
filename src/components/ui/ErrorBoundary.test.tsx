/**
 * ErrorBoundary.test.tsx - 错误边界组件测试
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

// 抑制 React 的错误边界警告
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
      throw new Error('Test error');
    }
    return <div>正常内容</div>;
  };

  it('应该正常渲染子组件', () => {
    render(
      <ErrorBoundary>
        <div>测试内容</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('测试内容')).toBeInTheDocument();
  });

  it('应该捕获错误并显示 fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('页面出现了一些问题')).toBeInTheDocument();
  });

  it('应该显示自定义 fallback', () => {
    render(
      <ErrorBoundary fallback={<div>自定义错误界面</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('自定义错误界面')).toBeInTheDocument();
  });

  it('应该显示错误消息', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
