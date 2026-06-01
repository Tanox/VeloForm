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
import { Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
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
    // 如果是促销组件的话，应用折扣价格
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

  if (!currentComponent) return null;

  return (
    <>
      <Modal
        isOpen={showComponentSelector}
        onClose={() => toggleComponentSelector()}
        title={`${t('configurator.selectComponent')} ${getCategoryTranslation(currentComponent.category)}`}
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {alternatives.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  component.id === currentComponent.id ? 'border-primary' : ''
                } ${promotionalComponents[component.id] ? 'border-red-500/50 bg-red-500/5' : ''}`}
                onClick={() => handleSelect(component)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{component.name}</h4>
                      {component.id === currentComponent.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                      {promotionalComponents[component.id] && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                          -{promotionalComponents[component.id].discount}%
                        </span>
                      )}
                    </div>
                    {component.brand && (
                      <p className="text-sm text-muted mt-0.5">{component.brand}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {promotionalComponents[component.id] ? (
                          <>
                            <p className="text-red-500 font-semibold">
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
                      <p className="text-sm text-muted">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleViewDetail(component.id, e)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-6">
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
