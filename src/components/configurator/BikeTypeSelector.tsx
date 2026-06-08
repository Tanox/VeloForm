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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {types.map((type, index) => {
        const isActive = activeType === type;
        const info = bikeTypeInfo[type];
        const Icon = info.icon;
        
        return (
          <motion.button
            key={type}
            onClick={() => setActiveType(type)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'relative overflow-hidden p-6 sm:p-8 rounded-2xl text-left transition-all duration-300 touch-target group',
              isActive
                ? 'bg-surface border-2 border-primary shadow-xl shadow-primary/20'
                : 'bg-surface/50 border-2 border-border-light hover:border-border hover:shadow-lg hover:shadow-primary/10'
            )}
          >
            {/* Background gradient for active state */}
            {isActive && (
              <motion.div
                layoutId="bike-type-gradient"
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? 5 : 0 
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4',
                  isActive
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30'
                    : 'bg-surface-tertiary text-muted group-hover:text-foreground transition-colors'
                )}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>
              
              <h3 className={cn(
                'text-lg sm:text-xl font-display font-bold mb-2',
                isActive ? 'text-foreground' : 'text-secondary group-hover:text-foreground transition-colors'
              )}>
                {info.label}
              </h3>
              
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {info.description}
              </p>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30, delay: 0.1 }}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
