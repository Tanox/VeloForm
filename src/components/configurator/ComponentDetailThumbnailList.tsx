// 文件路径: src/components/configurator/ComponentDetailThumbnailList.tsx v4.4.10
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

interface ComponentDetailThumbnailListProps {
  imageUrl?: string;
  name: string;
}

/**
 * 组件详情缩略图：仅渲染真实存在的主图，避免无图集数据时的占位块。
 * 图片加载失败时降级为图标，不产生「可点击却无内容」的假入口。
 */
export function ComponentDetailThumbnailList({
  imageUrl,
  name,
}: ComponentDetailThumbnailListProps) {
  const [hasError, setHasError] = useState(false);
  if (!imageUrl || hasError) return null;

  return (
    <div
      id="component-detail-thumbnails"
      className="flex gap-2 mt-4"
      role="list"
      aria-label={`${name} thumbnail`}
    >
      <div
        className="w-16 h-16 rounded-xl bg-surface-tertiary border border-border-light overflow-hidden"
        role="listitem"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      </div>
    </div>
  );
}
