'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LibraryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Library page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-destructive/10 rounded-full blur-xl" />
          <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-foreground">
            配置库加载失败
          </h1>
          <p className="text-muted text-sm sm:text-base">
            保存的配置可能暂时无法读取。请重试或返回配置器。
          </p>
        </div>

        {/* Error Details (Dev only) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="bg-surface-secondary/50 rounded-xl p-3">
            <p className="text-xs text-muted font-mono break-all">
              Error digest: {error.digest}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="default"
            onClick={reset}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            重试
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回配置器
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
