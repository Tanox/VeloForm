'use client';

import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { mockComponentDetails } from '@/lib/data';
import { useTranslation } from '@/lib/i18n';
import { Star, ChevronRight } from 'lucide-react';

interface ComponentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  componentId: string;
  onSelect?: () => void;
}

export function ComponentDetailModal({ isOpen, onClose, componentId, onSelect }: ComponentDetailModalProps) {
  const t = useTranslation();
  const detail = mockComponentDetails[componentId];

  if (!detail) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={detail.name} className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="relative aspect-square bg-zinc-900 rounded-xl overflow-hidden">
            <img
              src={detail.imageUrl}
              alt={detail.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-semibold text-white">
                {formatCurrency(detail.price)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {detail.brand && (
            <div>
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                {detail.brand}
              </span>
            </div>
          )}

          <p className="text-muted text-lg">{detail.description}</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(detail.rating || 0)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-zinc-600'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted">
                ({detail.rating}) {detail.reviewCount} {t('componentDetail.reviews')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 py-4 border-y border-zinc-800">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">{t('componentDetail.price')}</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(detail.price)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">{t('componentDetail.weight')}</p>
              <p className="text-2xl font-bold text-accent">
                {formatWeight(detail.weight / 1000)}
              </p>
            </div>
          </div>

          {detail.specs && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                {t('componentDetail.technicalSpecs')}
              </h4>
              <div className="space-y-2">
                {Object.entries(detail.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 px-3 bg-zinc-900/50 rounded-lg"
                  >
                    <span className="text-sm text-muted">{key}</span>
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detail.features && detail.features.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">{t('componentDetail.keyFeatures')}</h4>
              <div className="grid grid-cols-2 gap-2">
                {detail.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <ChevronRight className="w-4 h-4 text-primary" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {onSelect && (
            <Button className="w-full" size="lg" onClick={onSelect}>
              {t('componentDetail.selectComponent')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </motion.div>
      </div>
    </Modal>
  );
}