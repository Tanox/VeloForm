// 文件路径: src/lib/hooks/use-shared-config.test.ts v4.4.9
import { describe, it, expect } from 'vitest';
import type { ShareableConfig } from '@/lib/shareable-config';
import { clearConfigParam, toConfigComponents } from './use-shared-config';

const payload: ShareableConfig['components'] = [
  {
    id: 'frame-1',
    name: '碳纤维车架',
    category: 'Frame',
    bikeType: 'Road',
    price: 1200,
    weight: 1100,
    brand: 'Aero',
    imageUrl: '/images/frame.svg',
    specs: { material: 'carbon' },
  },
];

describe('toConfigComponents', () => {
  it('完整映射分享载荷字段并保留 specs', () => {
    const [component] = toConfigComponents(payload);
    expect(component.id).toBe('frame-1');
    expect(component.category).toBe('Frame');
    expect(component.bikeType).toBe('Road');
    expect(component.imageUrl).toBe('/images/frame.svg');
    expect(component.specs).toEqual({ material: 'carbon' });
  });

  it('空载荷返回空数组', () => {
    expect(toConfigComponents([])).toEqual([]);
  });
});

describe('clearConfigParam', () => {
  it('仅移除 config 参数，保留其它 query 与 hash', () => {
    window.history.replaceState({}, '', '/?config=abc&ref=newsletter#pricing');
    clearConfigParam();
    expect(window.location.search).toBe('?ref=newsletter');
    expect(window.location.hash).toBe('#pricing');
  });

  it('无 config 参数时保持 URL 不变', () => {
    window.history.replaceState({}, '', '/?ref=newsletter#pricing');
    clearConfigParam();
    expect(window.location.search).toBe('?ref=newsletter');
    expect(window.location.hash).toBe('#pricing');
  });
});
