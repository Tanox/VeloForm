'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface ComponentDetailFeatureItemProps {
  feature: string;
  index: number;
}

function ComponentDetailFeatureItemBase({ feature, index }: ComponentDetailFeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.05 }}
      className="flex items-center gap-2 p-3 bg-surface-secondary/50 rounded-xl border border-border-light"
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0">
        <Check className="w-3.5 h-3.5 text-accent" />
      </div>
      <span className="text-sm text-foreground">{feature}</span>
    </motion.div>
  );
}

export const ComponentDetailFeatureItem = React.memo(ComponentDetailFeatureItemBase);
