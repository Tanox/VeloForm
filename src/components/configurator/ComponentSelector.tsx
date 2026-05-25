'use client';

import { useConfigStore } from '@/lib/store';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { ConfigComponent } from '@/types';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock alternative components
const mockAlternatives: Record<string, ConfigComponent[]> = {
  Drivetrain: [
    { id: 'd1', category: 'Drivetrain', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430 },
    { id: 'd2', category: 'Drivetrain', name: 'SRAM Red AXS', price: 4000, weight: 2380 },
    { id: 'd3', category: 'Drivetrain', name: 'Campagnolo Super Record EPS', price: 4500, weight: 2450 },
  ],
  Wheelset: [
    { id: 'w1', category: 'Wheelset', name: 'Roval Rapide CLX II', price: 2800, weight: 1520 },
    { id: 'w2', category: 'Wheelset', name: 'Zipp 454 NSW', price: 3200, weight: 1480 },
    { id: 'w3', category: 'Wheelset', name: 'Enve SES 4.5', price: 2900, weight: 1550 },
  ],
  Cockpit: [
    { id: 'c1', category: 'Cockpit', name: 'Roval Rapide Cockpit', price: 600, weight: 310 },
    { id: 'c2', category: 'Cockpit', name: 'Enve SES AR', price: 550, weight: 320 },
  ],
  Tires: [
    { id: 't1', category: 'Tires', name: 'Turbo Cotton 28mm', price: 180, weight: 480 },
    { id: 't2', category: 'Tires', name: 'GP5000 S TR', price: 160, weight: 450 },
  ],
};

export function ComponentSelector() {
  const showComponentSelector = useConfigStore((state) => state.showComponentSelector);
  const toggleComponentSelector = useConfigStore((state) => state.toggleComponentSelector);
  const components = useConfigStore((state) => state.components);
  const replaceComponent = useConfigStore((state) => state.replaceComponent);
  const editingComponentId = useConfigStore((state) => state.editingComponentId);

  const currentComponent = components.find((c) => c.id === editingComponentId);
  const alternatives = mockAlternatives[currentComponent?.category || ''] || [];

  const handleSelect = (component: ConfigComponent) => {
    replaceComponent(component);
    toggleComponentSelector();
  };

  if (!currentComponent) return null;

  return (
    <Modal
      isOpen={showComponentSelector}
      onClose={() => toggleComponentSelector()}
      title={`Select ${currentComponent.category}`}
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
                  <p className="text-sm text-muted">{formatWeight(component.weight / 1000)}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-6">
        <Button variant="outline" className="w-full" onClick={() => toggleComponentSelector()}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
