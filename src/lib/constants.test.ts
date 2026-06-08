import { describe, it, expect } from 'vitest';
import { getDefaultsForType, APP_CONSTANTS } from '@/lib/constants';

describe('Constants', () => {
  describe('getDefaultsForType', () => {
    it('should return Road defaults for Road type', () => {
      const defaults = getDefaultsForType('Road');
      expect(defaults).toHaveLength(4);
      expect(defaults[0].bikeType).toBe('Road');
    });

    it('should return MTB defaults for MTB type', () => {
      const defaults = getDefaultsForType('MTB');
      expect(defaults).toHaveLength(4);
      expect(defaults[0].bikeType).toBe('MTB');
    });

    it('should return Fold defaults for Fold type', () => {
      const defaults = getDefaultsForType('Fold');
      expect(defaults).toHaveLength(5);
      expect(defaults[0].bikeType).toBe('Fold');
    });
  });

  describe('APP_CONSTANTS', () => {
    it('should have correct bike types', () => {
      expect(APP_CONSTANTS.BIKE_TYPES).toContain('Road');
      expect(APP_CONSTANTS.BIKE_TYPES).toContain('MTB');
      expect(APP_CONSTANTS.BIKE_TYPES).toContain('Fold');
    });

    it('should have correct component categories', () => {
      expect(APP_CONSTANTS.COMPONENT_CATEGORIES).toContain('Frame');
      expect(APP_CONSTANTS.COMPONENT_CATEGORIES).toContain('Drivetrain');
      expect(APP_CONSTANTS.COMPONENT_CATEGORIES).toContain('Wheelset');
    });

    it('should have correct base weights', () => {
      expect(APP_CONSTANTS.BASE_WEIGHTS.Road).toBe(900);
      expect(APP_CONSTANTS.BASE_WEIGHTS.MTB).toBe(1800);
      expect(APP_CONSTANTS.BASE_WEIGHTS.Fold).toBe(2000);
    });

    it('should have correct weight conversion factor', () => {
      expect(APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR).toBe(1000);
    });

    it('should have correct app info', () => {
      expect(APP_CONSTANTS.APP_INFO.name).toBe('Veloform');
      expect(APP_CONSTANTS.APP_INFO.tagline).toBe('Bike Configurator');
    });
  });
});
