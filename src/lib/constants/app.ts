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
    version: '4.1.0',
    tagline: 'Bike Configurator',
  } as const,
} as const;
