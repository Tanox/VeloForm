'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Home page error:', error);
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
            页面出现了点小问题
          </h1>
          <p className="text-muted text-sm sm:text-base">
            别担心，这可能只是暂时的。你可以试试刷新页面，或者回到首页。
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
              <Home className="w-4 h-4" />
              返回首页
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-xs text-muted">
          如果问题持续存在，请通过「帮助」按钮联系我们
        </p>
      </div>
    </div>
  );
}
