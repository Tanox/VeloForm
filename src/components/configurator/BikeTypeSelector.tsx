'use client';

import { BikeType } from '@/types';
import { useConfigStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bike, Zap, Package } from 'lucide-react';

interface BikeTypeInfo {
  icon: typeof Bike;
  label: string;
  description: string;
}

export function BikeTypeSelector() {
  const t = useTranslation();
  const activeType = useConfigStore((state) => state.activeType);
  const setActiveType = useConfigStore((state) => state.setActiveType);
  const types: BikeType[] = ['Road', 'MTB', 'Fold'];

  const bikeTypeInfo: Record<BikeType, BikeTypeInfo> = {
    Road: {
      icon: Bike,
      label: '公路车',
      description: '速度与激情，专为竞速打造，轻量化设计让你风驰电掣'
    },
    MTB: {
      icon: Zap,
      label: '山地车',
      description: '征服山野，强悍的悬挂系统应对各种复杂地形'
    },
    Fold: {
      icon: Package,
      label: '折叠车',
      description: '灵活便携，轻松收纳，城市通勤的最佳伴侣'
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
      {types.map((type, index) => {
        const isActive = activeType === type;
        const info = bikeTypeInfo[type];
        const Icon = info.icon;
        
        return (
          <motion.button
            key={type}
            onClick={() => setActiveType(type)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.12,
              ease: [0.4, 0, 0.2, 1]
            }}
            whileHover={{ scale: 1.03, y: -6 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'relative overflow-hidden p-7 sm:p-9 rounded-3xl text-left transition-all duration-400 touch-target group',
              isActive
                ? 'bg-surface-secondary border-2 border-primary shadow-apple-lg'
                : 'bg-surface-secondary border-2 border-border-light hover:border-border hover:shadow-apple'
            )}
          >
            {/* Background gradient for active state */}
            {isActive && (
              <motion.div
                layoutId="bike-type-gradient"
                className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  scale: isActive ? 1.15 : 1,
                  rotate: isActive ? 5 : 0 
                }}
                transition={{ duration: 0.4 }}
                className={cn(
                  'w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center mb-6',
                  isActive
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-apple shadow-primary/40'
                    : 'bg-surface text-muted group-hover:text-foreground transition-colors'
                )}
              >
                <Icon className="w-8 h-8 sm:w-9 sm:h-9" />
              </motion.div>
              
              <h3 className={cn(
                'text-xl sm:text-2xl font-display text-apple-title mb-3',
                isActive ? 'text-foreground' : 'text-secondary group-hover:text-foreground transition-colors'
              )}>
                {info.label}
              </h3>
              
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {info.description}
              </p>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute top-5 right-5 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-apple shadow-primary/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 600, damping: 25, delay: 0.15 }}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
