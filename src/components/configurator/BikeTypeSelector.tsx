'use client';

import { BikeType } from '@/types';
import { useConfigStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
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

  const getTypeIcon = (type: BikeType) => {
    if (type === 'Road') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.5" cy="17.5" r="3.5"/>
          <circle cx="18.5" cy="17.5" r="3.5"/>
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
        </svg>
      );
    } else if (type === 'MTB') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.5" cy="17.5" r="3.5"/>
          <circle cx="18.5" cy="17.5" r="3.5"/>
          <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
          <path d="m14.5 10-2.5 2.5"/>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5.5" cy="17.5" r="2.5"/>
          <circle cx="18.5" cy="17.5" r="2.5"/>
          <path d="M12 15V7a4 4 0 0 0-4-4H6a6 6 0 0 1 12 0h-2a4 4 0 0 0-4 4v8"/>
        </svg>
      );
    }
  };

  return (
    <div className="flex gap-1 p-1 bg-secondary rounded-xl flex-1">
      <AnimatePresence mode="wait">
        {types.map((type, index) => {
          const isActive = activeType === type;
          return (
            <motion.button
              key={type}
              onClick={() => setActiveType(type)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 touch-target',
                isActive
                  ? 'bg-background text-foreground shadow-lg shadow-primary/10'
                  : 'text-muted hover:text-foreground hover:bg-background/50'
              )}
            >
              <motion.span
                initial={false}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? 5 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                {getTypeIcon(type)}
              </motion.span>
              <span>{getTypeLabel(type)}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
