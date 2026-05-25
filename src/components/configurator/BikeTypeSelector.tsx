'use client';

import { BikeType } from '@/types';
import { useConfigStore } from '@/lib/store';
import { motion } from 'framer-motion';

export function BikeTypeSelector() {
  const activeType = useConfigStore((state) => state.activeType);
  const setActiveType = useConfigStore((state) => state.setActiveType);
  const types: BikeType[] = ['Road', 'MTB', 'Fold'];

  return (
    <div className="flex gap-2 p-1 bg-zinc-900 rounded-full">
      {types.map((type) => (
        <motion.button
          key={type}
          onClick={() => setActiveType(type)}
          className={
            'px-4 py-2 rounded-full text-sm font-medium transition-all ' +
            (activeType === type
              ? 'bg-primary text-white shadow-lg'
              : 'text-muted hover:text-foreground hover:bg-zinc-800')
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {type}
        </motion.button>
      ))}
    </div>
  );
}
