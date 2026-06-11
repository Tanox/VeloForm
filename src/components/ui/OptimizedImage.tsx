'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  /** next/image fill 模式需要父元素有 position: relative */
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** 图片加载失败时显示占位符 */
  fallbackEnabled?: boolean;
}

const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

/**
 * 优化图片组件。
 * 在 next/image 基础上增加了：
 * - 加载状态占位符
 * - 错误处理 fallback
 * - 响应式 sizes 默认值
 */
export function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  imgClassName,
  priority,
  sizes,
  fallbackEnabled = true,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 空 src 或加载失败时显示占位符
  if (!src || hasError) {
    if (!fallbackEnabled) return null;
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-zinc-800 text-zinc-500',
          fill ? 'absolute inset-0' : '',
          className
        )}
        style={!fill && width && height ? { width, height } : undefined}
        aria-label={alt}
      >
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          imgClassName
        )}
        priority={priority}
        sizes={sizes || DEFAULT_SIZES}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
