'use client';

import { BikeType } from '@/types';
import { useActiveType } from '@/lib/stores';
import { useConfigStore } from '@/lib/stores';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BikeTypeInfo {
  icon: string;
  label: string;
  description: string;
  weight: string;
  price: string;
}

const bikeTypeIcons: Record<BikeType, string> = {
  Road: `<circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="m12 17.5 2-8h4l-3-5-3 5-4-2-2 5 4 5z"></path>`,
  MTB: `<path d="m19 10-2 7-3-1-2-3-2 2-2-1-2 3"></path><circle cx="7" cy="19" r="3"></circle><circle cx="17" cy="19" r="3"></circle><path d="M8 10h5l2-4 3 1-2 4"></path>`,
  Fold: `<circle cx="6.5" cy="17.5" r="3.5"></circle><circle cx="17.5" cy="17.5" r="3.5"></circle><path d="M14 10h-3.5L9 17.5"></path><path d="m11 10 2-5 3 1"></path><path d="M10 10H7.5L6 17.5"></path>`,
};

export function BikeTypeSelector() {
  const t = useTranslation();
  const activeType = useActiveType();
  const setActiveType = useConfigStore((state) => state.setActiveType);
  const types: BikeType[] = ['Road', 'MTB', 'Fold'];

  const bikeTypeInfo: Record<BikeType, BikeTypeInfo> = {
    Road: {
      icon: bikeTypeIcons.Road,
      label: '公路车 Road',
      description: '速度与效率的终极选择',
      weight: '6.8kg',
      price: '¥32k',
    },
    MTB: {
      icon: bikeTypeIcons.MTB,
      label: '山地车 MTB',
      description: '征服一切地形的野性座驾',
      weight: '10.5kg',
      price: '¥28k',
    },
    Fold: {
      icon: bikeTypeIcons.Fold,
      label: '折叠车 Fold',
      description: '城市通勤的灵活伙伴',
      weight: '9.2kg',
      price: '¥18k',
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="tablist" aria-label="选择车型">
      {types.map((type, index) => {
        const isActive = activeType === type;
        const info = bikeTypeInfo[type];

        return (
          <motion.button
            key={type}
            onClick={() => setActiveType(type)}
            role="tab"
            aria-selected={isActive}
            aria-label={`选择${info.label}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'relative overflow-hidden p-5 rounded-xl text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isActive
                ? 'bg-primary/5 border border-primary shadow-md'
                : 'bg-card border border-border hover:border-border-strong hover:bg-surface-hover'
            )}
          >
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px] bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />

            <svg
              className={cn(
                'w-10 h-10 mb-4 transition-colors duration-200',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: info.icon }}
            />

            <div className="text-base font-bold text-foreground mb-1">
              {info.label}
            </div>
            <div className="text-xs text-muted-foreground mb-4">
              {info.description}
            </div>

            <div className="flex gap-4 pt-3 border-t border-border-subtle">
              <div className="flex flex-col">
                <span className="text-sm font-mono font-semibold text-foreground">
                  {info.weight}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  起重量
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-mono font-semibold text-foreground">
                  {info.price}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  起售价
                </span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}