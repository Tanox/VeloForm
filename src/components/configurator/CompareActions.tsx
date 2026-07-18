'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Configuration } from '@/types';

interface CompareActionsProps {
  comparingConfigs: Configuration[];
  onLoad: (config: Configuration) => void;
}

function CompareActionsBase({ comparingConfigs, onLoad }: CompareActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {comparingConfigs.map((config) => (
        <motion.div
          key={config.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 min-w-[150px]"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onLoad(config)}
            className="w-full border-primary/30 hover:bg-primary/5 hover:border-primary"
          >
            加载 {config.name}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const CompareActions = React.memo(CompareActionsBase);
