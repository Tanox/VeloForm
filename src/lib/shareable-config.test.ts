// 文件路径: src/lib/shareable-config.test.ts v4.4.9
import { parseShareableConfig, encodeShareableConfig, generateShareableLink } from '@/lib/shareable-config';
import { describe, it, expect } from 'vitest';

const chineseComponents = [
  {
    id: 'frame-1',
    name: '碳纤维车架',
    category: 'Frame' as const,
    bikeType: 'Road' as const,
    price: 1200,
    weight: 1100,
    brand: 'Aero',
    model: 'SL',
    description: '轻量碳纤维',
    rating: 4.8,
    reviewCount: 120,
  },
];

describe('shareable-config (UTF-8 safety)', () => {
  it('round-trips Unicode content without throwing', () => {
    const encoded = encodeShareableConfig('Road', chineseComponents, '我的公路车配置');
    const result = parseShareableConfig(encoded);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.data?.name).toBe('我的公路车配置');
      expect(result.data?.components[0].name).toBe('碳纤维车架');
    }
  });

  it('generateShareableLink returns a config URL', () => {
    const link = generateShareableLink('Road', chineseComponents, '我的公路车配置');
    expect(link).toContain('/?config=');
  });

  it('rejects oversized payloads to prevent DoS', () => {
    const result = parseShareableConfig('a'.repeat(20000));
    expect(result.valid).toBe(false);
  });

  it('rejects invalid base64 gracefully', () => {
    const result = parseShareableConfig('!!!not base64!!!');
    expect(result.valid).toBe(false);
  });

  it('accepts fractional prices/weights and relative image paths', () => {
    const encoded = encodeShareableConfig('Road', [
      { ...chineseComponents[0], price: 1200.5, weight: 1100.25, imageUrl: '/images/frame.svg' },
    ], '小数配置');
    const result = parseShareableConfig(encoded);
    expect(result.valid).toBe(true);
    expect(result.data?.components[0].price).toBe(1200.5);
    expect(result.data?.components[0].imageUrl).toBe('/images/frame.svg');
  });

  it('rejects dangerous image URL schemes', () => {
    const encoded = encodeShareableConfig('Road', [
      { ...chineseComponents[0], imageUrl: 'javascript:alert(1)' },
    ], '危险链接');
    expect(parseShareableConfig(encoded).valid).toBe(false);
  });

  it('encodes the payload so query-safe characters survive the round trip', () => {
    const link = generateShareableLink('Road', chineseComponents, '我的公路车配置');
    const encoded = new URL(link).searchParams.get('config') ?? '';
    expect(encoded).toContain('=');
    expect(parseShareableConfig(encoded).valid).toBe(true);
  });
});
