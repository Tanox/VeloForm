'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import {
  useShowComponentSelector,
  useEditingComponentId,
  useComponents,
  useConfigStore,
  useConfigUIStore,
} from '@/lib/stores';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { mockAlternatives } from '@/lib/data';
import { promotionalComponents } from '@/lib/recommended-configs';
import { ConfigComponent } from '@/types';
import { Check, Eye, Package, Star, Zap, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { Skeleton } from '@/components/ui/skeleton';

// 懒加载详情弹窗
const ComponentDetailModal = lazy(() =>
  import('./ComponentDetailModal').then((m) => ({ default: m.ComponentDetailModal }))
);

export function ComponentSelector() {
  const t = useTranslation();
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const showComponentSelector = useShowComponentSelector();
  const closeComponentSelector = useConfigUIStore((s) => s.closeComponentSelector);
  const components = useComponents();
  const replaceComponent = useConfigStore((s) => s.replaceComponent);
  const editingComponentId = useEditingComponentId();

  const currentComponent = components.find((c) => c.id === editingComponentId);
  const alternatives = mockAlternatives[currentComponent?.category || ''] || [];

  useEffect(() => {
    if (showComponentSelector && !currentComponent) {
      closeComponentSelector();
    }
  }, [showComponentSelector, currentComponent, closeComponentSelector]);

  const handleSelect = (component: ConfigComponent) => {
    const finalComponent = { ...component };
    if (promotionalComponents[component.id]) {
      finalComponent.price = Math.round(
        promotionalComponents[component.id].originalPrice * (1 - promotionalComponents[component.id].discount / 100)
      );
    }
    replaceComponent(finalComponent);
    closeComponentSelector();
  };

  const handleViewDetail = (componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponentId(componentId);
    setShowDetailModal(true);
  };

  const handleSelectFromDetail = () => {
    if (selectedComponentId) {
      const component = alternatives.find((c) => c.id === selectedComponentId);
      if (component) {
        handleSelect(component);
      }
    }
    setShowDetailModal(false);
    setSelectedComponentId(null);
  };

  const getCategoryTranslation = (category: string) => {
    const key = `categories.${category.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  const getSavings = (component: ConfigComponent) => {
    if (promotionalComponents[component.id]) {
      const original = promotionalComponents[component.id].originalPrice;
      const discounted = Math.round(original * (1 - promotionalComponents[component.id].discount / 100));
      return original - discounted;
    }
    return 0;
  };

  if (!currentComponent) return null;

  return (
    <>
      <Dialog open={showComponentSelector} onOpenChange={closeComponentSelector}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">选择 {getCategoryTranslation(currentComponent.category)}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto space-y-3 px-2">
            <AnimatePresence mode="wait">
              {showComponentSelector && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {alternatives.map((component, index) => {
                    const isSelected = component.id === currentComponent.id;
                    const isPromotional = !!promotionalComponents[component.id];
                    const savings = getSavings(component);

                    return (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div
                          className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-300 overflow-hidden ${
                            isSelected
                              ? 'bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-2 border-primary shadow-lg shadow-primary/10'
                              : 'bg-surface-secondary/80 border-2 border-border-light hover:border-primary/50 hover:bg-surface-secondary'
                          } ${isPromotional ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500/5 before:to-transparent' : ''}`}
                          onClick={() => handleSelect(component)}
                        >
                          {isPromotional && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-400" />
                          )}

                          <div className="flex items-center gap-4">
                            <motion.div
                              animate={{ scale: isSelected ? 1.1 : 1 }}
                              className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30'
                                  : isPromotional
                                  ? 'bg-red-500/10 text-red-500'
                                  : 'bg-surface-tertiary text-muted'
                              }`}
                            >
                              {isSelected ? (
                                <Check className="w-6 h-6" />
                              ) : isPromotional ? (
                                <Sparkles className="w-5 h-5" />
                              ) : (
                                <Package className="w-5 h-5" />
                              )}
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold text-foreground truncate">{component.name}</h4>
                                {component.brand && (
                                  <span className="px-2 py-0.5 bg-surface-tertiary/50 rounded-md text-xs text-muted">
                                    {component.brand}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-1 text-sm text-muted">
                                {component.model && <span>{component.model}</span>}
                                {component.description && (
                                  <span className="hidden sm:inline text-muted/60 truncate max-w-[200px]">
                                    {component.description}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-2">
                                {isSelected && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                    <Check className="w-3 h-3" />
                                    已选
                                  </span>
                                )}
                                {isPromotional && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-bold rounded-full animate-pulse">
                                    <Zap className="w-3 h-3" />
                                    -{promotionalComponents[component.id].discount}%
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="flex items-center gap-2 justify-end">
                                  {isPromotional ? (
                                    <>
                                      <p className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                                        {formatCurrency(Math.round(promotionalComponents[component.id].originalPrice * (1 - promotionalComponents[component.id].discount / 100)))}
                                      </p>
                                    </>
                                  ) : (
                                    <p className="text-lg font-semibold text-foreground">
                                      {formatCurrency(component.price)}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center justify-end gap-2 mt-0.5 text-sm">
                                  <span className="text-muted">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</span>
                                  {isPromotional && (
                                    <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                                      <span className="line-through opacity-60">{formatCurrency(promotionalComponents[component.id].originalPrice)}</span>
                                      <span>省{formatCurrency(savings)}</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleViewDetail(component.id, e)}
                                className="p-2.5 rounded-xl bg-surface-tertiary/50 hover:bg-primary/10 text-muted hover:text-primary transition-all duration-200"
                              >
                                <Eye className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>

                          {isPromotional && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-4 pt-3 border-t border-red-500/20 flex items-center gap-4"
                            >
                              <div className="flex items-center gap-2 text-red-500 text-sm">
                                <Truck className="w-4 h-4" />
                                <span className="font-medium">免费配送</span>
                              </div>
                              <div className="flex items-center gap-2 text-orange-500 text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span className="font-medium">限时特惠</span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
            <p className="text-sm text-muted">
              共 {alternatives.length} 个可选组件
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeComponentSelector}
            >
              稍后选择
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Suspense fallback={<div className="p-8"><Skeleton className="h-64 w-full rounded-2xl" /></div>}>
        <ComponentDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          componentId={selectedComponentId || ''}
          onSelect={handleSelectFromDetail}
        />
      </Suspense>
    </>
  );
}
