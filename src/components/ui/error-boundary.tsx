'use client';

import React, { Component, ReactNode } from 'react';
import { Card } from './card';
import { Button } from './button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { uiLogger } from '@/lib/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  /** 是否显示错误堆栈（仅开发环境） */
  showStack?: boolean;
  /** 自定义重置回调 */
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * 全局错误边界组件。
 * 捕获子组件树中的 JavaScript 错误，显示友好的 fallback UI。
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    uiLogger.error('[ErrorBoundary]', error.message, errorInfo.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isDev = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-[200px] flex items-center justify-center p-4">
          <Card className="max-w-lg w-full text-center border-error/30 bg-error/5">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-error/10 rounded-full">
                  <AlertTriangle className="w-8 h-8 text-error" />
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">
                  页面出现了一些问题
                </h2>
                <p className="text-sm text-muted">
                  {this.state.error?.message || '发生了意外错误'}
                </p>
              </div>

              {isDev && this.props.showStack !== false && this.state.error?.stack && (
                <details className="text-left">
                  <summary className="text-xs text-muted cursor-pointer hover:text-foreground">
                    错误堆栈（仅开发环境可见）
                  </summary>
                  <pre className="mt-2 p-3 bg-zinc-900 rounded-lg text-xs text-error overflow-x-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3 justify-center pt-2">
                <Button variant="default" onClick={this.handleReset}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重试
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  返回首页
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
