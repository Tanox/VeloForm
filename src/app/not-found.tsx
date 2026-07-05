import Link from 'next/link';
import { Bike, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Graphic */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="relative flex items-center justify-center">
            <div className="text-[120px] sm:text-[160px] font-display font-bold leading-none tracking-tighter">
              <span className="text-gradient-brand">4</span>
              <span className="text-foreground/20">0</span>
              <span className="text-gradient-brand">4</span>
            </div>
          </div>
          {/* Decorative bike icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Bike className="w-16 h-16 text-primary/30" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            页面没有找到
          </h1>
          <p className="text-muted text-sm sm:text-base">
            你找的页面可能已经被移走了，或者从未存在过。试试回到首页继续配置你的爱车吧。
          </p>
        </div>

        {/* Action */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-brand text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-secondary/80 border border-border-light text-foreground font-medium hover:bg-surface-tertiary/50 transition-colors"
          >
            <Bike className="w-4 h-4" />
            配置库
          </Link>
        </div>
      </div>
    </div>
  );
}
