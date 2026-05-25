import { ConfigComponent } from '@/types';

export const ROAD_DEFAULTS: ConfigComponent[] = [
  { id: '1', category: 'Drivetrain', bikeType: 'Road', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430 },
  { id: '2', category: 'Wheelset', bikeType: 'Road', name: 'Roval Rapide CLX II', price: 2800, weight: 1520 },
  { id: '3', category: 'Cockpit', bikeType: 'Road', name: 'Roval Rapide Cockpit', price: 600, weight: 310 },
  { id: '4', category: 'Tires', bikeType: 'Road', name: 'Turbo Cotton 28mm', price: 180, weight: 480 },
];

export const MTB_DEFAULTS: ConfigComponent[] = [
  { id: '5', category: 'Drivetrain', bikeType: 'MTB', name: 'SRAM XX1 Eagle AXS', price: 2500, weight: 1515 },
  { id: '6', category: 'Suspension', bikeType: 'MTB', name: 'Fox 34 Float Factory', price: 1050, weight: 1738 },
  { id: '7', category: 'Wheelset', bikeType: 'MTB', name: 'Reserve 30|SL', price: 1800, weight: 1650 },
  { id: '8', category: 'Tires', bikeType: 'MTB', name: 'Maxxis Rekon 2.4', price: 160, weight: 1600 },
];

export const FOLD_DEFAULTS: ConfigComponent[] = [
  { id: '9', category: 'Drivetrain', bikeType: 'Fold', name: 'Brompton 6-Speed', price: 400, weight: 1200 },
  { id: '10', category: 'Frame', bikeType: 'Fold', name: 'Titanium Main Frame', price: 2100, weight: 1800 },
  { id: '11', category: 'Wheelset', bikeType: 'Fold', name: 'Brompton Superlight', price: 800, weight: 1100 },
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
