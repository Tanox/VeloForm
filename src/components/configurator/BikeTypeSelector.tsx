'use client';

import { BikeType } from '@/types';
import { useActiveType } from '@/lib/stores';
import { useConfigStore } from '@/lib/stores';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bike, Zap, Mountain, Wind } from 'lucide-react';

interface BikeTypeInfo {
  icon: typeof Bike;
  label: string;
  description: string;
  accent: string;
}

export function BikeTypeSelector() {
  const t = useTranslation();
  const activeType = useActiveType();
  const setActiveType = useConfigStore((state) => state.setActiveType);
  const types: BikeType[] = ['Road', 'MTB', 'Fold'];

  // 车型配色 — 柔和暖色调，与 Editorial Minimalism 调色板协调
  const bikeTypeInfo: Record<BikeType, BikeTypeInfo> = {
    Road: {
      icon: Wind,
      label: '公路车',
      description: '速度与激情，专为竞速打造，轻量化设计让你风驰电掣',
      accent: 'hsl(200 70% 50%)',
    },
    MTB: {
      icon: Mountain,
      label: '山地车',
      description: '征服山野，强悍的悬挂系统应对各种复杂地形',
      accent: 'hsl(150 60% 40%)',
    },
    Fold: {
      icon: Zap,
      label: '折叠车',
      description: '灵活便携，轻松收纳，城市通勤的最佳伴侣',
      accent: 'hsl(35 85% 55%)',
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5" role="tablist" aria-label="选择车型">
      {types.map((type, index) => {
        const isActive = activeType === type;
        const info = bikeTypeInfo[type];
        const Icon = info.icon;

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
              duration: 0.4,
              delay: index * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'relative overflow-hidden p-6 sm:p-7 rounded-xl text-left transition-all duration-300 touch-target group min-h-[180px] sm:min-h-[200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isActive
                ? 'bg-card border border-primary/30 shadow-md ring-1 ring-primary/10'
                : 'bg-surface-secondary/60 border border-border-light hover:border-border hover:bg-surface-secondary'
            )}
          >
            {/* 顶部装饰线 — 激活时显示车型专属色调 */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: info.accent }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />

            {/* 右上角激活指示点 */}
            <div
              className={cn(
                'absolute top-5 right-5 w-2 h-2 rounded-full transition-all duration-300',
                isActive ? 'scale-125' : 'bg-border scale-100'
              )}
              style={isActive ? { backgroundColor: info.accent } : undefined}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* 图标 */}
              <div
                className={cn(
                  'w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-surface-tertiary text-muted-foreground group-hover:text-foreground'
                )}
                aria-hidden="true"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              {/* 标题 */}
              <h3 className={cn(
                'text-xl sm:text-2xl font-display font-bold mb-2 transition-colors tracking-tight',
                isActive ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
              )}>
                {info.label}
              </h3>

              {/* 描述 */}
              <p className={cn(
                'text-sm leading-relaxed transition-colors',
                isActive ? 'text-foreground-secondary' : 'text-muted-foreground'
              )}>
                {info.description}
              </p>

              {/* 激活状态标识 */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-foreground-secondary"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: info.accent }}
                    aria-hidden="true"
                  />
                  <span>已选择</span>
                </motion.div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
