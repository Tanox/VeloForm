'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function BuildList() {
  const components = useConfigStore((state) => state.components);
  const toggleComponentSelector = useConfigStore((state) => state.toggleComponentSelector);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Build List</h3>
      {components.map((component, index) => (
        <motion.div
          key={component.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="flex items-center justify-between hover:scale-[1.01]">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted">
                  {component.category}
                </span>
              </div>
              <h4 className="font-medium text-foreground mt-1">{component.name}</h4>
            </div>
            <div className="text-right mr-4">
              <p className="text-primary font-semibold">{formatCurrency(component.price)}</p>
              <p className="text-sm text-muted">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleComponentSelector(component.id)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
