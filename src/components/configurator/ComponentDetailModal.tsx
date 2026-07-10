'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { mockComponentDetails } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import { Star, ChevronRight, Package, Scale, Check, Sparkles, ImageOff } from 'lucide-react';

import { useState } from 'react';

interface ComponentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  componentId: string;
  onSelect?: () => void;
}

export function ComponentDetailModal({
  isOpen,
  onClose,
  componentId,
  onSelect,
}: ComponentDetailModalProps) {
  const t = useTranslation();
  const detail = mockComponentDetails[componentId];
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!detail) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{detail.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl bg-surface-tertiary border border-border-light overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-surface-tertiary to-surface" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* 右侧：详情 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            {/* 品牌标签 */}
            {detail.brand && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {detail.brand}
                </span>
              </motion.div>
            )}

            {/* 描述 */}
            <p className="text-secondary text-lg leading-relaxed">{detail.description}</p>

            {/* 评分 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        i < Math.floor(detail.rating || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-border'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                {detail.rating} ({detail.reviewCount} 条评价)
              </span>
            </div>

            {/* 价格和重量 */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-surface-tertiary/50 rounded-2xl border border-border-light">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">¥</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">价格</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    {formatCurrency(detail.price)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">重量</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                    {formatWeight(detail.weight / 1000)}
                  </p>
                </div>
              </div>
            </div>

            {/* 技术规格 */}
            {detail.specs && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  技术规格
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(detail.specs ?? {}).map(([key, value], index) => {
                    const displayValue = Array.isArray(value)
                      ? value.join(', ')
                      : value !== null && value !== undefined
                        ? String(value)
                        : '';
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex justify-between py-2.5 px-4 bg-surface-secondary/50 rounded-xl border border-border-light"
                      >
                        <span className="text-sm text-muted-foreground">{key}</span>
                        <span className="text-sm font-semibold text-foreground">
                          {displayValue}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 核心特性 */}
            {detail.features && detail.features.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  核心特性
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {detail.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-center gap-2 p-3 bg-surface-secondary/50 rounded-xl border border-border-light"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 选择按钮 */}
            {onSelect && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button size="lg" onClick={onSelect} className="w-full">
                  选择此组件
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
