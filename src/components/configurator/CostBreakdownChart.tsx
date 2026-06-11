'use client';

import { motion } from 'framer-motion';
import { useComponents, useTotalCost } from '@/lib/stores';
import { formatCurrency } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { TrendingUp, PieChart } from 'lucide-react';

const COLORS = [
  '#0066ff', // primary
  '#00d4aa', // accent
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f43f5e', // rose
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
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

      const x1 = 100 + 70 * Math.cos(startRad);
      const y1 = 100 + 70 * Math.sin(startRad);
      const x2 = 100 + 70 * Math.cos(endRad);
      const y2 = 100 + 70 * Math.sin(endRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M 100 100`,
        `L ${x1} ${y1}`,
        `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
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
      className="bg-surface-tertiary/50 backdrop-blur-sm border border-border-light rounded-2xl p-5 overflow-hidden"
    >
      {/* 标题 */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <PieChart className="w-4 h-4 text-primary" />
        </div>
        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          成本分解
        </h4>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 饼图 */}
        <div className="relative w-full max-w-[180px] mx-auto">
          <svg viewBox="0 0 200 200" className="w-full">
            {/* 背景圆 */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="var(--border)"
              strokeWidth="20"
              opacity="0.3"
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
                className="cursor-pointer transition-transform duration-200"
              />
            ))}

            {/* 中心 */}
            <circle cx="100" cy="100" r="45" fill="var(--surface)" />

            {/* 中心文字 */}
            <text
              x="100"
              y="90"
              textAnchor="middle"
              className="fill-muted"
              fontSize="10"
            >
              总计
            </text>
            <text
              x="100"
              y="108"
              textAnchor="middle"
              className="fill-foreground font-bold"
              fontSize="12"
            >
              {formatCurrency(totalCost)}
            </text>
          </svg>

          {/* 装饰光效 */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl" />
        </div>

        {/* 图例 */}
        <div className="flex-1 space-y-2.5">
          {segments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center gap-3 p-2 rounded-xl hover:bg-surface-secondary/50 transition-colors cursor-pointer"
            >
              {/* 颜色指示 */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                style={{ backgroundColor: segment.color }}
              />

              {/* 内容和进度条 */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-foreground truncate group-hover:text-gradient transition-all">
                    {getCategoryTranslation(segment.category)}
                  </span>
                  <span className="text-sm font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent ml-2 flex-shrink-0">
                    {formatCurrency(segment.price)}
                  </span>
                </div>

                {/* 进度条 */}
                <div className="h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: segment.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${segment.percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  />
                </div>
              </div>

              {/* 百分比 */}
              <span className="text-xs text-muted font-medium w-10 text-right flex-shrink-0">
                {calculatePercentage(segment.price)}%
              </span>
            </motion.div>
          ))}

          {/* 总结 */}
          <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted">共 {segments.length} 个组件</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
