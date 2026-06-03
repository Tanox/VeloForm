'use client';

import { useEffect, useState } from 'react';
import { useConfigStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { mockAlternatives } from '@/lib/data';
import { promotionalComponents } from '@/lib/recommended-configs';
import { ConfigComponent } from '@/types';
import { Check, Eye, ChevronRight, Package, Star, Zap, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { ComponentDetailModal } from './ComponentDetailModal';

export function ComponentSelector() {
  const t = useTranslation();
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const showComponentSelector = useConfigStore((state) => state.showComponentSelector);
  const toggleComponentSelector = useConfigStore((state) => state.toggleComponentSelector);
  const components = useConfigStore((state) => state.components);
  const replaceComponent = useConfigStore((state) => state.replaceComponent);
  const editingComponentId = useConfigStore((state) => state.editingComponentId);

  const currentComponent = components.find((c) => c.id === editingComponentId);
  const alternatives = mockAlternatives[currentComponent?.category || ''] || [];

  useEffect(() => {
    if (showComponentSelector && !currentComponent) {
      toggleComponentSelector();
    }
  }, [showComponentSelector, currentComponent, toggleComponentSelector]);

  const handleSelect = (component: ConfigComponent) => {
    const finalComponent = { ...component };
    if (promotionalComponents[component.id]) {
      finalComponent.price = Math.round(
        promotionalComponents[component.id].originalPrice * (1 - promotionalComponents[component.id].discount / 100)
      );
    }
    replaceComponent(finalComponent);
    toggleComponentSelector();
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
      <Modal
        isOpen={showComponentSelector}
        onClose={() => toggleComponentSelector()}
        title={`${t('configurator.selectComponent')} ${getCategoryTranslation(currentComponent.category)}`}
      >
        <AnimatePresence mode="wait">
          {showComponentSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-3 max-h-[70vh] overflow-y-auto"
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
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 ${
                        isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                      } ${isPromotional ? 'border-red-500/30 bg-gradient-to-r from-red-500/5 to-transparent' : ''}`}
                      onClick={() => handleSelect(component)}
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="flex-shrink-0">
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-primary/20' : 'bg-zinc-800/50'
                          }`}>
                            {isSelected ? (
                              <Check className="w-6 h-6 text-primary" />
                            ) : (
                              <Package className="w-6 h-6 text-muted" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground truncate">{component.name}</h4>
                            {isSelected && (
                              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {t('common.selected')}
                              </span>
                            )}
                            {isPromotional && (
                              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                -{promotionalComponents[component.id].discount}%
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-1">
                            {component.brand && (
                              <span className="text-sm text-muted">{component.brand}</span>
                            )}
                            {component.model && (
                              <span className="text-sm text-muted/60">| {component.model}</span>
                            )}
                            {component.description && (
                              <span className="text-xs text-muted/50 truncate">{component.description}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              {isPromotional ? (
                                <>
                                  <p className="text-primary font-semibold">
                                    {formatCurrency(Math.round(promotionalComponents[component.id].originalPrice * (1 - promotionalComponents[component.id].discount / 100)))}
                                  </p>
                                  <p className="text-sm text-muted line-through">
                                    {formatCurrency(promotionalComponents[component.id].originalPrice)}
                                  </p>
                                </>
                              ) : (
                                <p className="text-primary font-semibold">{formatCurrency(component.price)}</p>
                              )}
                            </div>
                            <div className="flex items-center justify-end gap-2 mt-0.5">
                              <p className="text-sm text-muted">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</p>
                              {isPromotional && savings > 0 && (
                                <span className="text-xs text-green-500 font-medium">
                                  -{formatCurrency(savings)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleViewDetail(component.id, e)}
                            className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                          >
                            <Eye className="w-5 h-5 text-muted" />
                          </motion.button>
                        </div>
                      </div>

                      {isPromotional && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-red-500/20 px-4"
                        >
                          <div className="flex items-center gap-2 text-red-500">
                            <Truck className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('promotion.freeShipping')}</span>
                          </div>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 pt-4 border-t border-zinc-800">
          <Button variant="outline" className="w-full" onClick={() => toggleComponentSelector()}>
            {t('common.cancel')}
          </Button>
        </div>
      </Modal>

      <ComponentDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        componentId={selectedComponentId || ''}
        onSelect={handleSelectFromDetail}
      />
    </>
  );
}