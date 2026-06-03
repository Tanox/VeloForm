'use client';

import { BikeType } from '@/types';
import { useConfigStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

  const getTypeDescription = (type: BikeType) => {
    const descriptions = {
      Road: 'Speed & Distance',
      MTB: 'Trail & Adventure',
      Fold: 'Urban & Portable',
    };
    return descriptions[type];
  };

  return (
    <div 
      className="flex gap-1.5 p-1.5 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800/50"
      role="tablist"
      aria-label="选择自行车类型"
    >
      {types.map((type, index) => {
        const isActive = activeType === type;
        return (
          <motion.button
            key={type}
            role="tab"
            aria-selected={isActive}
            aria-label={`${getTypeLabel(type)} - ${getTypeDescription(type)}`}
            onClick={() => setActiveType(type)}
            className={cn(
              'relative px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px]',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
              'flex items-center justify-center gap-2',
              isActive
                ? 'text-white'
                : 'text-muted hover:text-foreground hover:bg-zinc-800/50'
            )}
            whileHover={{ scale: isActive ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ 
              duration: 0.2,
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeType"
                className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent rounded-full shadow-lg shadow-primary/25"
                transition={{ 
                  type: 'spring', 
                  bounce: 0.2, 
                  duration: 0.5,
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span>{getTypeLabel(type)}</span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs opacity-80"
                >
                  {getTypeDescription(type)}
                </motion.span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
