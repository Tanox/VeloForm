import { ConfigComponent, BikeType } from '@/types';

// 公路车默认配置：轻量化竞速取向
export const ROAD_DEFAULTS: ConfigComponent[] = [
  {
    id: 'road-drivetrain-1',
    category: 'Drivetrain',
    bikeType: 'Road',
    name: 'Shimano Dura-Ace Di2 R9200',
    price: 4200,
    weight: 2430,
    brand: 'Shimano',
    model: 'Dura-Ace Di2 R9200',
    specs: { speeds: 12, cassetteRange: '11-30T', chainrings: '52/36T', shiftSpeed: 'fast' },
  },
  {
    id: 'road-wheelset-1',
    category: 'Wheelset',
    bikeType: 'Road',
    name: 'Roval Rapide CLX II',
    price: 2800,
    weight: 1520,
    brand: 'Roval',
    model: 'Rapide CLX II',
    specs: { rimDepth: '51mm', rimWidth: '21mm internal', material: 'carbon' },
  },
  {
    id: 'road-cockpit-1',
    category: 'Cockpit',
    bikeType: 'Road',
    name: 'Roval Rapide Cockpit',
    price: 600,
    weight: 310,
    brand: 'Roval',
    model: 'Rapide Cockpit',
    specs: { handlebarWidth: '420mm', stemLength: '110mm', dropReach: '75mm' },
  },
  {
    id: 'road-tires-1',
    category: 'Tires',
    bikeType: 'Road',
    name: 'Specialized S-Works Turbo 2Bliss Ready 28c',
    price: 180,
    weight: 480,
    brand: 'Specialized',
    model: 'S-Works Turbo',
    specs: { size: '700x28c', compound: 'GRIPTON', tpi: 120, tubeless: true },
  },
];

// 山地车默认配置：越野耐力取向
export const MTB_DEFAULTS: ConfigComponent[] = [
  {
    id: 'mtb-drivetrain-1',
    category: 'Drivetrain',
    bikeType: 'MTB',
    name: 'Shimano XTR Di2 M9100',
    price: 3800,
    weight: 1920,
    brand: 'Shimano',
    model: 'XTR Di2 M9100',
    specs: { speeds: 12, cassetteRange: '10-51T', shiftSpeed: 'instant' },
  },
  {
    id: 'mtb-suspension-1',
    category: 'Suspension',
    bikeType: 'MTB',
    name: 'Fox 34 Float Factory GRIP2',
    price: 1050,
    weight: 1738,
    brand: 'Fox Racing Shox',
    model: '34 Float Factory',
    specs: { travel: '140mm', damping: 'GRIP2', adjustability: ['low-speed compression', 'high-speed compression', 'low-speed rebound', 'high-speed rebound'] },
  },
  {
    id: 'mtb-wheelset-1',
    category: 'Wheelset',
    bikeType: 'MTB',
    name: 'Roval Traverse SL II 29',
    price: 1500,
    weight: 1720,
    brand: 'Roval',
    model: 'Traverse SL II',
    specs: { rimDepth: '25mm', rimWidth: '30mm internal', material: 'carbon' },
  },
  {
    id: 'mtb-tires-1',
    category: 'Tires',
    bikeType: 'MTB',
    name: 'Maxxis Minion DHR II 3C MaxxTerra',
    price: 140,
    weight: 790,
    brand: 'Maxxis',
    model: 'Minion DHR II',
    specs: { size: '29x2.4', compound: '3C MaxxTerra', tpi: 60, tubeless: true },
  },
];

// 折叠车默认配置：城市通勤取向
export const FOLD_DEFAULTS: ConfigComponent[] = [
  {
    id: 'fold-frame-1',
    category: 'Frame',
    bikeType: 'Fold',
    name: 'Brompton Superlight Main Frame',
    price: 1400,
    weight: 1800,
    brand: 'Brompton',
    model: 'Superlight Frame',
    specs: { material: 'steel', geometry: 'compact', wheelSize: '16inch' },
  },
  {
    id: 'fold-drivetrain-1',
    category: 'Drivetrain',
    bikeType: 'Fold',
    name: 'Shimano Alfine Di2 SG-S7051-11',
    price: 1200,
    weight: 1765,
    brand: 'Shimano',
    model: 'Alfine Di2 SG-S7051',
    specs: { speeds: 11, cassetteRange: 'internal gear hub', batteryLife: '1000km' },
  },
  {
    id: 'fold-wheelset-1',
    category: 'Wheelset',
    bikeType: 'Fold',
    name: 'Brompton Superlight Wheelset',
    price: 450,
    weight: 1240,
    brand: 'Brompton',
    model: 'Superlight Wheelset',
    specs: { rimDepth: 'standard', rimWidth: '19mm', material: 'aluminum' },
  },
  {
    id: 'fold-cockpit-1',
    category: 'Cockpit',
    bikeType: 'Fold',
    name: 'Brompton M-Type Handlebar',
    price: 120,
    weight: 310,
    brand: 'Brompton',
    model: 'M-Type Handlebar',
    specs: { handlebarWidth: '540mm', stemLength: 'integrated' },
  },
  {
    id: 'fold-tires-1',
    category: 'Tires',
    bikeType: 'Fold',
    name: 'Schwalbe Marathon Racer 16x1-1/3',
    price: 65,
    weight: 370,
    brand: 'Schwalbe',
    model: 'Marathon Racer',
    specs: { size: '16x1-1/3', compound: 'RaceGuard', tpi: 67, tubeless: false },
  },
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
    version: '3.7.0',
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