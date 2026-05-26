'use client';

import { useEffect } from 'react';
import { useConfigStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { mockAlternatives } from '@/lib/mock-data';
import { ConfigComponent } from '@/types';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export function ComponentSelector() {
  const t = useTranslation();
  const showComponentSelector = useConfigStore((state) => state.showComponentSelector);
  const toggleComponentSelector = useConfigStore((state) => state.toggleComponentSelector);
  const components = useConfigStore((state) => state.components);
  const replaceComponent = useConfigStore((state) => state.replaceComponent);
  const editingComponentId = useConfigStore((state) => state.editingComponentId);

  const currentComponent = components.find((c) => c.id === editingComponentId);
  const alternatives = mockAlternatives[currentComponent?.category || ''] || [];

  // Auto-close if the current component no longer exists (e.g., was replaced externally)
  useEffect(() => {
    if (showComponentSelector && !currentComponent) {
      toggleComponentSelector();
    }
  }, [showComponentSelector, currentComponent, toggleComponentSelector]);

  const handleSelect = (component: ConfigComponent) => {
    replaceComponent(component);
    toggleComponentSelector();
  };

  const getCategoryTranslation = (category: string) => {
    const key = `categories.${category.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  if (!currentComponent) return null;

  return (
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
              }`}
              onClick={() => handleSelect(component)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{component.name}</h4>
                    {component.id === currentComponent.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary font-semibold">{formatCurrency(component.price)}</p>
                  <p className="text-sm text-muted">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</p>
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
  );
}
