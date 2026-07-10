'use client';

import { useComponents, useConfigUIStore } from '@/lib/stores';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Settings, Package, Check, ArrowRight, Plus } from 'lucide-react';
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
  const completedCategories = new Set(components.map((c) => c.category)).size;
  const completionPercentage = Math.round((completedCategories / totalCategories) * 100);

  const handleEdit = (componentId: string) => {
    setIsLoading(true);
    toggleComponentSelector(componentId);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Settings className="w-5 h-5 text-muted-foreground" />
            组件列表
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Package className="w-4 h-4" />
              <span>{components.length} 个组件</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-28 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {completedCategories}/{totalCategories}
              </span>
            </div>
          </div>
        </div>

        {completionPercentage === 100 && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">配置完成</span>
          </div>
        )}
      </div>

      {components.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            {t('configurator.emptyState.title')}
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            {t('configurator.emptyState.description')}
          </p>
          <Button onClick={() => toggleComponentSelector()} size="lg">
            {t('configurator.emptyState.cta')}
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {components.map((component) => (
            <Card
              key={component.id}
              className="flex-row items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleEdit(component.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wide rounded">
                    {getCategoryTranslation(component.category)}
                  </span>
                </div>

                <h4 className="font-medium text-foreground truncate text-base">{component.name}</h4>

                {component.brand && (
                  <p className="text-sm text-muted-foreground mt-0.5">{component.brand}</p>
                )}
              </div>

              <div className="flex items-center gap-4 ml-4">
                <div className="text-right">
                  <p className="text-base font-semibold text-foreground">
                    {formatCurrency(component.price)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}
                  </p>
                </div>

                <div className="hidden sm:flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(component.id);
                    }}
                    aria-label={`编辑 ${component.name}`}
                    className="w-8 h-8"
                  >
                    <Edit3 className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>

                <div className="sm:hidden" aria-hidden="true">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}

          {components.length < totalCategories && (
            <button
              onClick={() => toggleComponentSelector()}
              className="w-full p-4 rounded-xl border border-dashed border-border hover:border-primary/50 bg-transparent hover:bg-muted/50 transition-colors flex items-center justify-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="text-muted-foreground group-hover:text-foreground font-medium text-sm transition-colors">
                添加更多组件
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
