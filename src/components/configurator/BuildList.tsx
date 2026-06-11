'use client';

import { useComponents, useConfigUIStore } from '@/lib/stores';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Settings, Package, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function BuildList() {
  const t = useTranslation();
  const components = useComponents();
  const toggleComponentSelector = useConfigUIStore((state) => state.toggleComponentSelector);
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryTranslation = (category: string) => {
    const key = `categories.${category.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  const totalCategories = APP_CONSTANTS.COMPONENT_CATEGORIES.length;
  const completedCategories = new Set(components.map(c => c.category)).size;
  const completionPercentage = Math.round((completedCategories / totalCategories) * 100);

  const handleEdit = (componentId: string) => {
    setIsLoading(true);
    toggleComponentSelector(componentId);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 标题区 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            组件列表
          </h3>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2 text-muted text-sm">
              <Package className="w-4 h-4" />
              <span>{components.length} 个组件</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 sm:w-28 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs text-muted font-medium">
                {completedCategories}/{totalCategories}
              </span>
            </div>
          </div>
        </div>

        {/* 完成进度指示 */}
        {completionPercentage === 100 && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full"
          >
            <Check className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">配置完成</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {components.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative text-center py-12 sm:py-16 overflow-hidden"
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center border border-border-light"
            >
              <Package className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </motion.div>

            <div className="relative">
              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                {t('configurator.emptyState.title')}
              </h4>
              <p className="text-muted mb-6 max-w-md mx-auto leading-relaxed">
                {t('configurator.emptyState.description')}
              </p>
              <Button
                onClick={() => toggleComponentSelector()}
                className="btn-gradient"
                size="lg"
              >
                {t('configurator.emptyState.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="component-list"
            className="space-y-3"
          >
            {components.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card
                  className="p-4 sm:p-5 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleEdit(component.id)}
                >
                  {/* 左侧内容 */}
                  <div className="flex-1 min-w-0">
                    {/* 分类标签 */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-bold uppercase tracking-wider rounded-md">
                        {getCategoryTranslation(component.category)}
                      </span>
                    </div>

                    {/* 组件名称 */}
                    <h4 className="font-semibold text-foreground truncate group-hover:text-gradient transition-all duration-300 text-base sm:text-lg">
                      {component.name}
                    </h4>

                    {/* 品牌 */}
                    {component.brand && (
                      <p className="text-sm text-muted mt-1">{component.brand}</p>
                    )}
                  </div>

                  {/* 右侧内容 */}
                  <div className="flex items-center gap-4 sm:gap-6 ml-4">
                    {/* 价格和重量 */}
                    <div className="text-right">
                      <motion.p
                        key={component.price}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 0.2 }}
                        className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                      >
                        {formatCurrency(component.price)}
                      </motion.p>
                      <p className="text-sm text-muted mt-0.5">
                        {formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}
                      </p>
                    </div>

                    {/* 编辑按钮 */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:flex"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(component.id);
                        }}
                        aria-label={`编辑 ${component.name}`}
                        className="w-10 h-10 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </motion.div>

                    {/* 移动端箭头 */}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="sm:hidden"
                    >
                      <ArrowRight className="w-5 h-5 text-muted" />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* 添加更多组件按钮 */}
            {components.length < totalCategories && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: components.length * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleComponentSelector()}
                className="w-full p-4 sm:p-5 rounded-2xl border-2 border-dashed border-border-light hover:border-primary/50 bg-transparent hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-tertiary group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <Sparkles className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                </div>
                <span className="text-muted group-hover:text-foreground font-medium transition-colors">
                  添加更多组件
                </span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
