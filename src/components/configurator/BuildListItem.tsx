'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Edit3 } from 'lucide-react';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { categoryIcons, categoryLabels } from './build-list-data';
import type { ConfigComponent } from '@/types';

interface BuildListItemProps {
  component: ConfigComponent;
  index: number;
  onEdit: (id: string) => void;
}

function BuildListItemBase({ component, index, onEdit }: BuildListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative flex items-center gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer overflow-hidden group hover:border-border-strong hover:bg-surface-hover transition-all duration-200"
      onClick={() => onEdit(component.id)}
    >
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-primary rounded-r-sm"
        initial={{ height: 0 }}
        whileHover={{ height: 24 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />

      <div className="w-11 h-11 rounded-lg bg-background flex items-center justify-center flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: categoryIcons[component.category.toLowerCase()] || categoryIcons.frame }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
          {categoryLabels[component.category.toLowerCase()] || component.category}
        </div>
        <div className="text-sm font-semibold text-foreground truncate">
          {component.name}
        </div>
        {component.brand && (
          <div className="text-xs text-muted-foreground mt-0.5">
            {component.brand}
          </div>
        )}
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-sm font-mono font-semibold text-foreground">
          {formatCurrency(component.price)}
        </div>
        <div className="text-xs font-mono text-muted-foreground mt-0.5">
          {formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}
        </div>
      </div>

      <motion.button
        className="w-8 h-8 rounded-md border border-border bg-background text-muted-foreground flex items-center justify-center flex-shrink-0"
        initial={{ opacity: 0, x: -8 }}
        whileHover={{ opacity: 1, x: 0, borderColor: 'var(--primary)', color: 'var(--primary)', backgroundColor: 'var(--primary)/5' }}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(component.id);
        }}
        aria-label={`编辑 ${component.name}`}
        transition={{ duration: 0.15 }}
      >
        <Edit3 className="w-4 h-4" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}

export const BuildListItem = memo(BuildListItemBase);
