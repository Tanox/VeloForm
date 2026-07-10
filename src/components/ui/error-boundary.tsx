'use client';

import React, { Component, ReactNode } from 'react';
import { Card } from './card';
import { Button } from './button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { uiLogger } from '@/lib/logger';
import { useTranslation } from '@/lib/i18n';

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

interface ErrorBoundaryContentProps extends ErrorBoundaryProps {
  t: (key: string, params?: Record<string, string | number>) => string | readonly string[];
}

class ErrorBoundaryInner extends Component<ErrorBoundaryContentProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryContentProps) {
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
    const { t } = this.props;
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
                <h2 className="text-lg font-semibold text-foreground">{t('error.title')}</h2>
                <p className="text-sm text-muted">
                  {this.state.error?.message || t('error.unexpectedError')}
                </p>
              </div>

              {isDev && this.props.showStack !== false && this.state.error?.stack && (
                <details className="text-left">
                  <summary className="text-xs text-muted cursor-pointer hover:text-foreground">
                    {t('error.stackTrace')}
                  </summary>
                  <pre className="mt-2 p-3 bg-zinc-900 rounded-lg text-xs text-error overflow-x-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3 justify-center pt-2">
                <Button variant="default" onClick={this.handleReset}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('common.retry')}
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = '/')}>
                  <Home className="w-4 h-4 mr-2" />
                  {t('common.backToHome')}
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

/**
 * 全局错误边界组件。
 * 捕获子组件树中的 JavaScript 错误，显示友好的 fallback UI。
 */
export function ErrorBoundary({ children, ...props }: ErrorBoundaryProps) {
  const t = useTranslation();
  return (
    <ErrorBoundaryInner {...props} t={t}>
      {children}
    </ErrorBoundaryInner>
  );
}
