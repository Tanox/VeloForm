import { parseShareableConfig, encodeShareableConfig, generateShareableLink } from '@/lib/shareable-config';

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
});
