'use client';

import { motion } from 'framer-motion';
import { useComponents, useTotalCost } from '@/lib/stores';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { PieChart, TrendingUp } from 'lucide-react';

const COLORS = [
  '#e85d2c',
  '#f97316',
  '#fb923c',
  '#fdba74',
  '#22d3ee',
  '#06b6d4',
  '#8b5cf6',
  '#a78bfa',
];

export function CostBreakdownChart() {
  const t = useTranslation();
  const components = useComponents();
  const totalCost = useTotalCost();

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

      const x1 = 100 + 60 * Math.cos(startRad);
      const y1 = 100 + 60 * Math.sin(startRad);
      const x2 = 100 + 60 * Math.cos(endRad);
      const y2 = 100 + 60 * Math.sin(endRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M 100 100`,
        `L ${x1} ${y1}`,
        `A 60 60 0 ${largeArcFlag} 1 ${x2} ${y2}`,
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
      className="bg-card border border-border rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <PieChart className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">成本分布</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{segments.length} ITEMS</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="var(--border)"
              strokeWidth="24"
              opacity="0.2"
            />

            {segments.map((segment, index) => (
              <motion.path
                key={segment.id}
                d={segment.pathData}
                fill={segment.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, originX: '100px', originY: '100px' }}
                className="cursor-pointer"
              />
            ))}

            <circle cx="100" cy="100" r="42" fill="var(--card)" />

            <text
              x="100"
              y="96"
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="9"
            >
              总计
            </text>
            <text
              x="100"
              y="114"
              textAnchor="middle"
              className="fill-foreground font-bold"
              fontSize="11"
            >
              {formatCurrency(totalCost)}
            </text>
          </svg>
        </div>

        <div className="flex-1 space-y-2">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: segment.color }}
              />

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-foreground truncate">
                    {getCategoryTranslation(segment.category)}
                  </span>
                  <span className="text-xs font-mono font-semibold text-foreground">
                    {formatCurrency(segment.price)}
                  </span>
                </div>
                <div className="h-1 bg-background rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: segment.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </div>

              <span className="text-[10px] font-mono text-muted-foreground w-8 text-right flex-shrink-0">
                {calculatePercentage(segment.price)}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">价值分配</span>
        </div>
        <span className="text-sm font-semibold text-foreground">{formatCurrency(totalCost)}</span>
      </div>
    </motion.div>
  );
}