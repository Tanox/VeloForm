import { ConfigComponent, BikeType } from '@/types';
import { ROAD_DEFAULTS, MTB_DEFAULTS, FOLD_DEFAULTS } from './defaults';

// 重新导出默认配置，保持向后兼容
export { ROAD_DEFAULTS, MTB_DEFAULTS, FOLD_DEFAULTS };

export const APP_CONSTANTS = {
  BIKE_TYPES: ['Road', 'MTB', 'Fold'] as const,
  COMPONENT_CATEGORIES: [
    'Frame',
    'Drivetrain',
    'Wheelset',
    'Suspension',
    'Cockpit',
    'Tires',
  ] as const,
  BASE_WEIGHTS: {
    Road: 900,
    MTB: 1800,
    Fold: 2000,
  } as const,
  WEIGHT_CONVERSION_FACTOR: 1000,
  SUPABASE_TABLES: {
    configurations: 'configurations',
    components: 'components',
  } as const,
  APP_INFO: {
    name: 'Veloform',
    version: '3.9.0',
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
