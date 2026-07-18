'use client';

import { useEffect, useState, lazy, Suspense, useCallback, useMemo } from 'react';
import {
  useShowComponentSelector,
  useEditingComponentId,
  useComponents,
  useConfigStore,
  useConfigUIStore,
} from '@/lib/stores';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { mockAlternatives } from '@/lib/data';
import { promotionalComponents } from '@/lib/recommended-configs';
import { ConfigComponent } from '@/types';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { Skeleton } from '@/components/ui/skeleton';
import { ComponentSelectorItem } from './ComponentSelectorItem';

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

  const currentComponent = useMemo(
    () => components.find((c) => c.id === editingComponentId),
    [components, editingComponentId]
  );
  const alternatives = useMemo(
    () => mockAlternatives[currentComponent?.category || ''] || [],
    [currentComponent?.category]
  );

  useEffect(() => {
    if (showComponentSelector && !currentComponent) {
      closeComponentSelector();
    }
  }, [showComponentSelector, currentComponent, closeComponentSelector]);

  const handleSelect = useCallback(
    (component: ConfigComponent) => {
      const finalComponent = { ...component };
      if (promotionalComponents[component.id]) {
        finalComponent.price = Math.round(
          promotionalComponents[component.id].originalPrice * (1 - promotionalComponents[component.id].discount / 100)
        );
      }
      replaceComponent(finalComponent);
      closeComponentSelector();
    },
    [replaceComponent, closeComponentSelector]
  );

  const handleViewDetail = useCallback((componentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedComponentId(componentId);
    setShowDetailModal(true);
  }, []);

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

  const getSavings = useCallback((component: ConfigComponent) => {
    if (promotionalComponents[component.id]) {
      const original = promotionalComponents[component.id].originalPrice;
      const discounted = Math.round(original * (1 - promotionalComponents[component.id].discount / 100));
      return original - discounted;
    }
    return 0;
  }, []);

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
                      <ComponentSelectorItem
                        key={component.id}
                        component={component}
                        index={index}
                        isSelected={isSelected}
                        isPromotional={isPromotional}
                        savings={savings}
                        discount={isPromotional ? promotionalComponents[component.id].discount : undefined}
                        originalPrice={isPromotional ? promotionalComponents[component.id].originalPrice : undefined}
                        onSelect={handleSelect}
                        onViewDetail={handleViewDetail}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              共 {alternatives.length} 个可选组件
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeComponentSelector}
              aria-label="关闭组件选择器，稍后选择"
            >
              稍后选择
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
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
