// 文件路径: src/components/ui/ErrorPageView.tsx v4.4.10
'use client';

import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ErrorPageViewProps {
  title: string;
  message: string;
  digest?: string;
  retryLabel: string;
  backLabel: string;
  backIcon: LucideIcon;
  onReset: () => void;
  contactSupport?: string;
}

/** 首页与配置库共用的错误页骨架，避免两个路由逐行复制同一份 JSX。 */
export function ErrorPageView({
  title,
  message,
  digest,
  retryLabel,
  backLabel,
  backIcon: BackIcon,
  onReset,
  contactSupport,
}: ErrorPageViewProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div id="error-page-content" className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-destructive/10 rounded-full blur-xl" />
          <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-foreground">{title}</h1>
          <p className="text-muted text-sm sm:text-base">{message}</p>
        </div>

        {process.env.NODE_ENV === 'development' && digest && (
          <div className="bg-surface-secondary/50 rounded-xl p-3">
            <p className="text-xs text-muted font-mono break-all">Error digest: {digest}</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-3">
          <Button variant="default" onClick={onReset} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {retryLabel}
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <BackIcon className="w-4 h-4" />
              {backLabel}
            </Button>
          </Link>
        </div>

        {contactSupport && <p className="text-xs text-muted">{contactSupport}</p>}
      </div>
    </div>
  );
}
