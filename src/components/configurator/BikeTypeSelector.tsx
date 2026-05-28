'use client';

import { BikeType } from '@/types';
import { useConfigStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';

export function BikeTypeSelector() {
  const t = useTranslation();
  const activeType = useConfigStore((state) => state.activeType);
  const setActiveType = useConfigStore((state) => state.setActiveType);
  const types: BikeType[] = ['Road', 'MTB', 'Fold'];

  const getTypeLabel = (type: BikeType) => {
    const key = `bikeTypes.${type.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? type : translated;
  };

  return (
    <div className="flex gap-1 p-1 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800/50">
      {types.map((type, index) => (
        <motion.button
          key={type}
          onClick={() => setActiveType(type)}
          className={
            'relative px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ' +
            (activeType === type
              ? 'text-white'
              : 'text-muted hover:text-foreground hover:bg-zinc-800/50')
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {activeType === type && (
            <motion.div
              layoutId="activeType"
              className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg shadow-primary/25"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{getTypeLabel(type)}</span>
        </motion.button>
      ))}
    </div>
  );
}
