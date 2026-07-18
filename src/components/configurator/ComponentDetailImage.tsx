'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { ImageOff } from 'lucide-react';
import type { ComponentDetail } from '@/lib/data';
import { ComponentDetailThumbnailList } from './ComponentDetailThumbnailList';

interface ComponentDetailImageProps {
  detail: ComponentDetail;
}

export function ComponentDetailImage({ detail }: ComponentDetailImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div
        className="relative w-full h-auto bg-gradient-to-br from-surface to-surface-secondary rounded-2xl overflow-hidden border border-border-light"
        style={{ aspectRatio: '1/1' }}
      >
        {!detail.imageUrl || imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
            <ImageOff className="w-12 h-12 text-zinc-500" />
          </div>
        ) : (
          <>
            {!imageLoaded && <div className="absolute inset-0 bg-zinc-800 animate-pulse" />}
            <Image
              src={detail.imageUrl}
              alt={detail.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
          </>
        )}

        {/* 价格标签 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent backdrop-blur-md rounded-xl px-4 py-2 shadow-lg"
        >
          <span className="text-lg font-bold text-white">{formatCurrency(detail.price)}</span>
        </motion.div>
      </div>

      {/* 缩略图列表（占位） */}
      <ComponentDetailThumbnailList />
    </motion.div>
  );
}
