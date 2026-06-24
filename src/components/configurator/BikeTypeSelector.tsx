'use client';

import { BikeType } from '@/types';
import { useActiveType } from '@/lib/stores';
import { useConfigStore } from '@/lib/stores';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap, Mountain, Wind } from 'lucide-react';

// Hoist static data to module level to avoid recreation on every render
const TYPES: BikeType[] = ['Road', 'MTB', 'Fold'];

interface BikeTypeInfo {
  icon: typeof Wind;
  label: string;
  description: string;
  gradient: string;
  hoverGradient: string;
}

const BIKE_TYPE_INFO: Record<BikeType, BikeTypeInfo> = {
  Road: {
    icon: Wind,
    label: '公路车',
    description: '速度与激情，专为竞速打造，轻量化设计让你风驰电掣',
    gradient: 'from-blue-500 to-cyan-400',
    hoverGradient: 'hover:from-blue-500/10 hover:to-cyan-400/10',
  },
  MTB: {
    icon: Mountain,
    label: '山地车',
    description: '征服山野，强悍的悬挂系统应对各种复杂地形',
    gradient: 'from-emerald-500 to-teal-400',
    hoverGradient: 'hover:from-emerald-500/10 hover:to-teal-400/10',
  },
  Fold: {
    icon: Zap,
    label: '折叠车',
    description: '灵活便携，轻松收纳，城市通勤的最佳伴侣',
    gradient: 'from-purple-500 to-pink-400',
    hoverGradient: 'hover:from-purple-500/10 hover:to-pink-400/10',
  },
};

export function BikeTypeSelector() {
  const activeType = useActiveType();
  const setActiveType = useConfigStore((state) => state.setActiveType);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
      role="tablist"
      aria-label="选择车型"
    >
      {TYPES.map((type, index) => {
        const isActive = activeType === type;
        const info = BIKE_TYPE_INFO[type];
        const Icon = info.icon;

        return (
          <motion.button
            key={type}
            onClick={() => setActiveType(type)}
            role="tab"
            aria-selected={isActive}
            aria-label={`选择${info.label}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'relative overflow-hidden p-6 sm:p-7 rounded-2xl text-left transition-all duration-300 touch-target group min-h-[180px] sm:min-h-[200px]',
              isActive
                ? 'bg-gradient-to-br from-surface-secondary to-surface shadow-xl border-2 border-transparent ring-2 ring-primary/30'
                : `bg-surface-secondary/80 backdrop-blur-sm border-2 border-border-light hover:border-primary/30 ${info.hoverGradient}`
            )}
          >
            {/* 激活状态渐变背景 */}
            {isActive && (
              <motion.div
                layoutId="bike-type-gradient"
                className={cn('absolute inset-0 bg-gradient-to-br', info.gradient, 'opacity-10')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 0.4 }}
                aria-hidden="true"
              />
            )}

            {/* 顶部装饰线 */}
            <motion.div
              className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', info.gradient)}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
            />

            {/* 左侧装饰圆点 - 激活标识 */}
            <div
              className={cn(
                'absolute top-4 right-4 w-2.5 h-2.5 rounded-full transition-all duration-300',
                isActive ? `bg-gradient-to-br ${info.gradient} shadow-lg scale-125` : 'bg-border'
              )}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* 图标 */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  rotate: isActive ? 5 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={cn(
                  'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300',
                  isActive
                    ? `bg-gradient-to-br ${info.gradient} text-white shadow-lg`
                    : 'bg-surface-tertiary text-muted group-hover:text-foreground'
                )}
                aria-hidden="true"
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>

              {/* 标题 */}
              <h3
                className={cn(
                  'text-xl sm:text-2xl font-display font-bold mb-2 transition-colors',
                  isActive ? 'text-foreground' : 'text-secondary group-hover:text-foreground'
                )}
              >
                {info.label}
              </h3>

              {/* 描述 */}
              <p
                className={cn(
                  'text-sm leading-relaxed transition-colors',
                  isActive ? 'text-secondary' : 'text-muted group-hover:text-secondary'
                )}
              >
                {info.description}
              </p>

              {/* 激活状态底部装饰 */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={cn(
                    'mt-4 flex items-center gap-2 text-sm font-medium bg-gradient-to-r',
                    info.gradient,
                    'bg-clip-text text-transparent'
                  )}
                >
                  <span>已选择</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    <Zap className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
