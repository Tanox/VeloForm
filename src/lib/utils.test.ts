import { describe, it, expect } from 'vitest';
import { formatCurrency, formatWeight, cn } from '@/lib/utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency with CNY symbol', () => {
      const result = formatCurrency(1000);
      expect(result).toBe('¥1,000');
    });

    it('should format currency with commas', () => {
      const result = formatCurrency(1000000);
      expect(result).toBe('¥1,000,000');
    });

    it('should format zero correctly', () => {
      const result = formatCurrency(0);
      expect(result).toBe('¥0');
    });

    it('should handle decimal amounts', () => {
      const result = formatCurrency(99.99);
      expect(result).toBe('¥100');
    });

    it('should format USD currency when specified', () => {
      const result = formatCurrency(1000, 'USD');
      expect(result).toBe('US$1,000');
    });
  });

  describe('formatWeight', () => {
    it('should format weight with kg unit', () => {
      const result = formatWeight(5.5);
      expect(result).toBe('5.50 kg');
    });

    it('should format zero correctly', () => {
      const result = formatWeight(0);
      expect(result).toBe('0.00 kg');
    });

    it('should handle large weights', () => {
      const result = formatWeight(12.345);
      expect(result).toBe('12.35 kg');
    });
  });

  describe('cn', () => {
    it('should combine class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should filter out falsy values', () => {
      const result = cn('class1', undefined, null, false, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });
});
