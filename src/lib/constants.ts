import { ConfigComponent } from '@/types';

export const ROAD_DEFAULTS: ConfigComponent[] = [
  { id: 'road-dt-1', category: 'Drivetrain', bikeType: 'Road', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200', specs: '12速, 电子变速' },
  { id: 'road-ws-1', category: 'Wheelset', bikeType: 'Road', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II', specs: '碳轮, 50mm框高' },
  { id: 'road-cp-1', category: 'Cockpit', bikeType: 'Road', name: 'Roval Rapide Cockpit', price: 600, weight: 310, brand: 'Roval', model: 'Rapide Cockpit', specs: '一体把, 碳纤维' },
  { id: 'road-tr-1', category: 'Tires', bikeType: 'Road', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized', model: 'Turbo Cotton', specs: '开口胎, 28mm' },
  { id: 'road-fr-1', category: 'Frame', bikeType: 'Road', name: 'Specialized Tarmac SL8', price: 8000, weight: 890, brand: 'Specialized', model: 'Tarmac SL8', specs: '碳纤维, 竞赛级' },
];

export const MTB_DEFAULTS: ConfigComponent[] = [
  { id: 'mtb-dt-1', category: 'Drivetrain', bikeType: 'MTB', name: 'SRAM XX1 Eagle AXS', price: 2500, weight: 1515, brand: 'SRAM', model: 'XX1 Eagle AXS', specs: '12速, 无线电子变速' },
  { id: 'mtb-susp-1', category: 'Suspension', bikeType: 'MTB', name: 'Fox 34 Float Factory', price: 1050, weight: 1738, brand: 'Fox', model: '34 Float Factory', specs: '120mm行程, GRIP2阻尼' },
  { id: 'mtb-ws-1', category: 'Wheelset', bikeType: 'MTB', name: 'Reserve 30|SL', price: 1800, weight: 1650, brand: 'Reserve', model: '30|SL', specs: '碳轮, 30mm内宽' },
  { id: 'mtb-tr-1', category: 'Tires', bikeType: 'MTB', name: 'Maxxis Rekon 2.4', price: 160, weight: 1600, brand: 'Maxxis', model: 'Rekon', specs: '真空胎, 2.4寸' },
  { id: 'mtb-fr-1', category: 'Frame', bikeType: 'MTB', name: 'Santa Cruz Blur', price: 6500, weight: 2300, brand: 'Santa Cruz', model: 'Blur', specs: '碳纤维, XC竞赛' },
];

export const FOLD_DEFAULTS: ConfigComponent[] = [
  { id: 'fold-dt-1', category: 'Drivetrain', bikeType: 'Fold', name: 'Brompton 6-Speed', price: 400, weight: 1200, brand: 'Brompton', model: '6-Speed', specs: '6速, 内变速' },
  { id: 'fold-fr-1', category: 'Frame', bikeType: 'Fold', name: 'Brompton M6L', price: 3200, weight: 11800, brand: 'Brompton', model: 'M6L', specs: '钢质, 6速' },
  { id: 'fold-ws-1', category: 'Wheelset', bikeType: 'Fold', name: 'Brompton Superlight', price: 800, weight: 1100, brand: 'Brompton', model: 'Superlight', specs: '铝轮, 16寸' },
  { id: 'fold-tr-1', category: 'Tires', bikeType: 'Fold', name: 'Brompton Kevlar', price: 100, weight: 580, brand: 'Brompton', model: 'Kevlar', specs: '16x1.5, 防刺' },
];

export const APP_CONSTANTS = {
  BIKE_TYPES: ['Road', 'MTB', 'Fold'] as const,
  COMPONENT_CATEGORIES: ['Frame', 'Drivetrain', 'Wheelset', 'Suspension', 'Cockpit', 'Tires'] as const,
  BASE_WEIGHTS: {
    Road: 900,
    MTB: 1800,
    Fold: 2000,
  } as const,
  WEIGHT_CONVERSION_FACTOR: 1000,
  FIRESTORE_COLLECTIONS: {
    configurations: 'configurations',
    components: 'components',
  } as const,
  APP_INFO: {
    name: 'Veloform',
    version: '3.4.0',
    tagline: 'Bike Configurator',
  } as const,
} as const;

export function getDefaultsForType(type: 'Road' | 'MTB' | 'Fold'): ConfigComponent[] {
  switch (type) {
    case 'Road':
      return [...ROAD_DEFAULTS];
    case 'MTB':
      return [...MTB_DEFAULTS];
    case 'Fold':
      return [...FOLD_DEFAULTS];
  }
}
