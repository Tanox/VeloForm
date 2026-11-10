// 文件路径: src/lib/recommended-configs.ts v4.4.9
import type { Configuration } from '@/types';
import { calculateTotals } from '@/lib/config-totals';

// 推荐配置只维护组件明细，价格与重量统一由 calculateTotals 派生，避免硬编码口径漂移
type RecommendedBuild = Omit<Configuration, 'totalCost' | 'estimatedWeight' | 'createdAt' | 'updatedAt'>;

const rawRecommendedConfigurations: RecommendedBuild[] = [
  {
    id: 'rec_road_race',
    name: 'Pro Race Build',
    bikeType: 'Road',
    components: [
      { id: 'd1', category: 'Drivetrain', bikeType: 'Road', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200' },
      { id: 'w1', category: 'Wheelset', bikeType: 'Road', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II' },
      { id: 'c1', category: 'Cockpit', bikeType: 'Road', name: 'Roval Rapide Cockpit', price: 600, weight: 310, brand: 'Roval', model: 'Rapide Cockpit' },
      { id: 't1', category: 'Tires', bikeType: 'Road', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized', model: 'Turbo Cotton' },
    ],
    description: 'Professional racing setup for maximum speed and performance',
    tags: ['Recommended', 'Lightweight'],
  },
  {
    id: 'rec_road_allround',
    name: 'All-Rounder Build',
    bikeType: 'Road',
    components: [
      { id: 'd2', category: 'Drivetrain', bikeType: 'Road', name: 'SRAM Red AXS', price: 4000, weight: 2380, brand: 'SRAM', model: 'Red AXS' },
      { id: 'w3', category: 'Wheelset', bikeType: 'Road', name: 'Enve SES 4.5', price: 2900, weight: 1550, brand: 'Enve', model: 'SES 4.5' },
      { id: 'c2', category: 'Cockpit', bikeType: 'Road', name: 'Enve SES AR', price: 550, weight: 320, brand: 'Enve', model: 'SES AR' },
      { id: 't2', category: 'Tires', bikeType: 'Road', name: 'GP5000 S TR', price: 160, weight: 450, brand: 'Continental', model: 'GP5000 S TR' },
    ],
    description: 'Versatile setup for all-day rides and mixed terrain',
    tags: ['Popular', 'Value'],
  },
  {
    id: 'rec_mtb_xc',
    name: 'XC Race Build',
    bikeType: 'MTB',
    components: [
      { id: 'd1', category: 'Drivetrain', bikeType: 'MTB', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200' },
      { id: 's3', category: 'Suspension', bikeType: 'MTB', name: 'Fox 32 Step-Cast Factory', price: 1100, weight: 1580, brand: 'Fox', model: '32 Step-Cast Factory' },
      { id: 'w1', category: 'Wheelset', bikeType: 'MTB', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II' },
      { id: 't2', category: 'Tires', bikeType: 'MTB', name: 'GP5000 S TR', price: 160, weight: 450, brand: 'Continental', model: 'GP5000 S TR' },
    ],
    description: 'Ultra-lightweight cross-country mountain bike setup',
    tags: ['Lightweight', 'XC'],
  },
  {
    id: 'rec_fold_city',
    name: 'Urban Fold Build',
    bikeType: 'Fold',
    components: [
      { id: 'd3', category: 'Drivetrain', bikeType: 'Fold', name: 'Campagnolo Super Record EPS', price: 4500, weight: 2450, brand: 'Campagnolo', model: 'Super Record EPS' },
      { id: 'f1', category: 'Frame', bikeType: 'Fold', name: 'Titanium Main Frame', price: 2100, weight: 1800, brand: 'Custom', model: 'Titanium Main Frame' },
      { id: 'w3', category: 'Wheelset', bikeType: 'Fold', name: 'Enve SES 4.5', price: 2900, weight: 1550, brand: 'Enve', model: 'SES 4.5' },
    ],
    description: 'Premium folding bike for city commuting',
    tags: ['Urban', 'Compact'],
  },
];

export const recommendedConfigurations: Configuration[] = rawRecommendedConfigurations.map((build) => {
  const totals = calculateTotals(build.components, build.bikeType);
  return {
    ...build,
    totalCost: totals.totalCost,
    estimatedWeight: totals.estimatedWeight,
  };
});

export const promotionalComponents: Record<string, { discount: number; originalPrice: number }> = {
  d2: { discount: 15, originalPrice: 4706 },
  w1: { discount: 10, originalPrice: 3111 },
  c1: { discount: 5, originalPrice: 632 },
  t2: { discount: 20, originalPrice: 200 },
  s2: { discount: 12, originalPrice: 1080 },
};
