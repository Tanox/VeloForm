import { ConfigComponent, BikeType } from '@/types';

export const ROAD_DEFAULTS: ConfigComponent[] = [
  { id: 'd1', category: 'Drivetrain', bikeType: 'Road', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200' },
  { id: 'w1', category: 'Wheelset', bikeType: 'Road', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II' },
  { id: 'c1', category: 'Cockpit', bikeType: 'Road', name: 'Roval Rapide Cockpit', price: 600, weight: 310, brand: 'Roval', model: 'Rapide Cockpit' },
  { id: 't1', category: 'Tires', bikeType: 'Road', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized', model: 'Turbo Cotton' },
];

export const MTB_DEFAULTS: ConfigComponent[] = [
  { id: 'd1', category: 'Drivetrain', bikeType: 'MTB', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200' },
  { id: 's1', category: 'Suspension', bikeType: 'MTB', name: 'Fox 34 Float Factory', price: 1050, weight: 1738, brand: 'Fox', model: '34 Float Factory' },
  { id: 'w1', category: 'Wheelset', bikeType: 'MTB', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II' },
  { id: 't1', category: 'Tires', bikeType: 'MTB', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized', model: 'Turbo Cotton' },
];

export const FOLD_DEFAULTS: ConfigComponent[] = [
  { id: 'd1', category: 'Drivetrain', bikeType: 'Fold', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, brand: 'Shimano', model: 'Dura-Ace Di2 R9200' },
  { id: 'f1', category: 'Frame', bikeType: 'Fold', name: 'Titanium Main Frame', price: 2100, weight: 1800, brand: 'Custom', model: 'Titanium Main Frame' },
  { id: 'w1', category: 'Wheelset', bikeType: 'Fold', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, brand: 'Roval', model: 'Rapide CLX II' },
  { id: 'c1', category: 'Cockpit', bikeType: 'Fold', name: 'Roval Rapide Cockpit', price: 600, weight: 310, brand: 'Roval', model: 'Rapide Cockpit' },
  { id: 't1', category: 'Tires', bikeType: 'Fold', name: 'Turbo Cotton 28mm', price: 180, weight: 480, brand: 'Specialized', model: 'Turbo Cotton' },
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
    version: '3.6.0',
    tagline: 'Bike Configurator',
  } as const,
} as const;

export function getDefaultsForType(type: BikeType): ConfigComponent[] {
  switch (type) {
    case 'Road':
      return [...ROAD_DEFAULTS];
    case 'MTB':
      return [...MTB_DEFAULTS];
    case 'Fold':
      return [...FOLD_DEFAULTS];
  }
}