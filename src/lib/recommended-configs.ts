import { Configuration } from '@/types';

export const recommendedConfigurations: Configuration[] = [
  {
    id: 'rec_road_race',
    name: 'Pro Race Build',
    bikeType: 'Road',
    totalCost: 7780,
    estimatedWeight: 5.64,
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
    totalCost: 7610,
    estimatedWeight: 5.6,
    components: [
      { id: 'd2', category: 'Drivetrain', name: 'SRAM Red AXS', price: 4000, weight: 2380 },
      { id: 'w3', category: 'Wheelset', name: 'Enve SES 4.5', price: 2900, weight: 1550 },
      { id: 'c2', category: 'Cockpit', name: 'Enve SES AR', price: 550, weight: 320 },
      { id: 't2', category: 'Tires', name: 'GP5000 S TR', price: 160, weight: 450 },
    ],
    description: 'Versatile setup for all-day rides and mixed terrain',
    tags: ['Popular', 'Value'],
  },
  {
    id: 'rec_mtb_xc',
    name: 'XC Race Build',
    bikeType: 'MTB',
    totalCost: 6600,
    estimatedWeight: 8.01,
    components: [
      { id: 'd1', category: 'Drivetrain', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430 },
      { id: 's3', category: 'Suspension', name: 'Fox 32 Step-Cast Factory', price: 1100, weight: 1580 },
      { id: 'w1', category: 'Wheelset', name: 'Roval Rapide CLX II', price: 2800, weight: 1520 },
      { id: 't2', category: 'Tires', name: 'GP5000 S TR', price: 160, weight: 450 },
    ],
    description: 'Ultra-lightweight cross-country mountain bike setup',
    tags: ['Lightweight', 'XC'],
  },
  {
    id: 'rec_fold_city',
    name: 'Urban Fold Build',
    bikeType: 'Fold',
    totalCost: 7660,
    estimatedWeight: 8.9,
    components: [
      { id: 'd3', category: 'Drivetrain', name: 'Campagnolo Super Record EPS', price: 4500, weight: 2450 },
      { id: 'f1', category: 'Frame', name: 'Titanium Main Frame', price: 2100, weight: 1800 },
      { id: 'w3', category: 'Wheelset', name: 'Enve SES 4.5', price: 2900, weight: 1550 },
    ],
    description: 'Premium folding bike for city commuting',
    tags: ['Urban', 'Compact'],
  },
];

export const promotionalComponents: Record<string, { discount: number; originalPrice: number }> = {
  'd2': { discount: 15, originalPrice: 4706 },
  'w1': { discount: 10, originalPrice: 3111 },
  'c1': { discount: 5, originalPrice: 632 },
  't2': { discount: 20, originalPrice: 200 },
  's2': { discount: 12, originalPrice: 1080 },
};