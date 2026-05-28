'use client';

import { motion } from 'framer-motion';
import { useConfigStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';

const COLORS = [
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
];

export function CostBreakdownChart() {
  const t = useTranslation();
  const components = useConfigStore((state) => state.components);
  const getTotalCost = useConfigStore((state) => state.getTotalCost);

  const totalCost = getTotalCost();

  if (totalCost === 0) return null;

  const sortedComponents = [...components].sort((a, b) => b.price - a.price);

  const calculatePercentage = (price: number) => {
    return ((price / totalCost) * 100).toFixed(1);
  };

  const getCategoryTranslation = (category: string) => {
    const key = `categories.${category.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  const calculatePieSegments = () => {
    let currentAngle = 0;
    return sortedComponents.map((component, index) => {
      const percentage = (component.price / totalCost) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;

      const startRad = ((startAngle - 90) * Math.PI) / 180;
      const endRad = ((startAngle + angle - 90) * Math.PI) / 180;

      const x1 = 100 + 80 * Math.cos(startRad);
      const y1 = 100 + 80 * Math.sin(startRad);
      const x2 = 100 + 80 * Math.cos(endRad);
      const y2 = 100 + 80 * Math.sin(endRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M 100 100`,
        `L ${x1} ${y1}`,
        `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(' ');

      return {
        ...component,
        pathData,
        color: COLORS[index % COLORS.length],
        percentage,
      };
    });
  };

  const segments = calculatePieSegments();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-5"
    >
      <h4 className="text-sm font-medium text-muted mb-4 uppercase tracking-wide">
        {t('configurator.totalCost')} Breakdown
      </h4>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full max-w-[200px] mx-auto">
          <svg viewBox="0 0 200 200" className="w-full">
            {segments.map((segment, index) => (
              <motion.path
                key={segment.id}
                d={segment.pathData}
                fill={segment.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="transition-transform duration-200 hover:opacity-80 cursor-pointer"
              />
            ))}
            <circle cx="100" cy="100" r="50" fill="#18181b" />
            <text
              x="100"
              y="95"
              textAnchor="middle"
              className="fill-zinc-400 text-xs"
              fontSize="10"
            >
              Total
            </text>
            <text
              x="100"
              y="110"
              textAnchor="middle"
              className="fill-white font-bold"
              fontSize="14"
            >
              {formatCurrency(totalCost)}
            </text>
          </svg>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground truncate">
                    {getCategoryTranslation(segment.category)}
                  </span>
                  <span className="text-sm text-primary font-semibold">
                    {formatCurrency(segment.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: segment.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${segment.percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-xs text-muted w-12 text-right">
                    {calculatePercentage(segment.price)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}