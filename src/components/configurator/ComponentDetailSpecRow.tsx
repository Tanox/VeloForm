'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ComponentDetailSpecRowProps {
  specKey: string;
  value: string;
  index: number;
}

function ComponentDetailSpecRowBase({ specKey, value, index }: ComponentDetailSpecRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      className="flex justify-between py-2.5 px-4 bg-surface-secondary/50 rounded-xl border border-border-light"
    >
      <span className="text-sm text-muted-foreground">{specKey}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </motion.div>
  );
}

export const ComponentDetailSpecRow = React.memo(ComponentDetailSpecRowBase);
