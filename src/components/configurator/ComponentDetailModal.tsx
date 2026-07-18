'use client';

import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { mockComponentDetails } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import { ChevronRight, Package, Scale, Sparkles } from 'lucide-react';

import { ComponentDetailImage } from './ComponentDetailImage';
import { ComponentDetailSpecRow } from './ComponentDetailSpecRow';
import { ComponentDetailFeatureItem } from './ComponentDetailFeatureItem';
import { ComponentDetailRating } from './ComponentDetailRating';

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

  if (!detail) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{detail.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ComponentDetailImage detail={detail} />

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
              <ComponentDetailRating rating={detail.rating || 0} />
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
                      <ComponentDetailSpecRow
                        key={key}
                        specKey={key}
                        value={displayValue}
                        index={index}
                      />
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
                    <ComponentDetailFeatureItem key={index} feature={feature} index={index} />
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
