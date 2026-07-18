'use client';

import React from 'react';
import { ConfigComponent } from '@/types';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Check, Eye, Package, Zap, Truck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComponentSelectorItemProps {
  component: ConfigComponent;
  index: number;
  isSelected: boolean;
  isPromotional: boolean;
  savings: number;
  discount?: number;
  originalPrice?: number;
  onSelect: (component: ConfigComponent) => void;
  onViewDetail: (componentId: string, e: React.MouseEvent) => void;
}

function ComponentSelectorItemBase({
  component,
  index,
  isSelected,
  isPromotional,
  savings,
  discount,
  originalPrice,
  onSelect,
  onViewDetail,
}: ComponentSelectorItemProps) {
  const discountedPrice =
    isPromotional && originalPrice !== undefined && discount !== undefined
      ? Math.round(originalPrice * (1 - discount / 100))
      : component.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={`relative cursor-pointer rounded-xl p-5 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          isSelected
            ? 'bg-primary/5 border border-primary/40 shadow-sm'
            : 'bg-surface-secondary/60 border border-border-light hover:border-border hover:bg-surface-secondary'
        }`}
        onClick={() => onSelect(component)}
        tabIndex={0}
        role="button"
        aria-label={`选择 ${component.name}${isSelected ? ' (已选)' : ''}`}
        aria-pressed={isSelected}
      >
        {isPromotional && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" aria-hidden="true" />
        )}

        <div className="flex items-center gap-4">
          <div
            className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-sm'
                : isPromotional
                ? 'bg-primary/10 text-primary'
                : 'bg-surface-tertiary text-muted-foreground'
            }`}
            aria-hidden="true"
          >
            {isSelected ? (
              <Check className="w-6 h-6" />
            ) : isPromotional ? (
              <Sparkles className="w-5 h-5" />
            ) : (
              <Package className="w-5 h-5" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-foreground truncate">{component.name}</h4>
              {component.brand && (
                <span className="px-2 py-0.5 bg-surface-tertiary/50 rounded-md text-xs text-muted-foreground">
                  {component.brand}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              {component.model && <span>{component.model}</span>}
              {component.description && (
                <span className="hidden sm:inline text-muted-foreground/60 truncate max-w-[200px]">
                  {component.description}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              {isSelected && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  <Check className="w-3 h-3" aria-hidden="true" />
                  已选
                </span>
              )}
              {isPromotional && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  -{discount}%
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                {isPromotional ? (
                  <p className="text-lg font-display font-bold text-primary">
                    {formatCurrency(discountedPrice)}
                  </p>
                ) : (
                  <p className="text-lg font-display font-semibold text-foreground">
                    {formatCurrency(component.price)}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 mt-0.5 text-sm">
                <span className="text-muted-foreground">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</span>
                {isPromotional && (
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    <span className="line-through opacity-60">{formatCurrency(originalPrice ?? component.price)}</span>
                    <span>省{formatCurrency(savings)}</span>
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={(e) => onViewDetail(component.id, e)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-surface-tertiary/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`查看 ${component.name} 详情`}
            >
              <Eye className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isPromotional && (
          <div
            className="mt-4 pt-3 border-t border-border-light flex items-center gap-4"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2 text-primary text-sm">
              <Truck className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">免费配送</span>
            </div>
            <div className="flex items-center gap-2 text-foreground-secondary text-sm">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">限时特惠</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export const ComponentSelectorItem = React.memo(ComponentSelectorItemBase);
