import type { ConfigComponent } from '@/types';
import { promotionalComponents } from '@/lib/recommended-configs';

// 智能推荐映射：当前分类 -> 推荐的互补分类，引导用户完善配置
const RECOMMENDATION_MAP: Record<string, string> = {
  Frame: 'Wheelset',
  Wheelset: 'Tires',
  Tires: 'Cockpit',
  Cockpit: 'Drivetrain',
  Drivetrain: 'Frame',
  Suspension: 'Frame',
};

export function getRecommendedCategory(category: string): string | null {
  return RECOMMENDATION_MAP[category] || null;
}

// 计算促销组件的优惠金额（与原价和折扣率的差值）
export function calculateSavings(component: ConfigComponent): number {
  const promo = promotionalComponents[component.id];
  if (!promo) return 0;
  const original = promo.originalPrice;
  const discounted = Math.round(original * (1 - promo.discount / 100));
  return original - discounted;
}
