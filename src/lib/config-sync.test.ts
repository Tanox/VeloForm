// 文件路径: src/lib/config-sync.test.ts v4.4.9
import { describe, it, expect } from 'vitest';
import type { Configuration } from '@/types';
import { mergeConfigurations } from './config-sync';

function build(id: string, updatedAt: Date, name: string): Configuration {
  return {
    id,
    bikeType: 'Road',
    name,
    components: [],
    totalCost: 100,
    estimatedWeight: 6,
    updatedAt,
  };
}

describe('mergeConfigurations', () => {
  it('保留本地独有草稿与云端独有配置', () => {
    const local = [build('local_1', new Date('2026-11-01'), '本地草稿')];
    const remote = [build('cloud_1', new Date('2026-11-02'), '云端配置')];
    const result = mergeConfigurations(local, remote);
    expect(result.map((c) => c.id).sort()).toEqual(['cloud_1', 'local_1']);
  });

  it('同 id 云端较新时以云端为准', () => {
    const local = [build('same', new Date('2026-11-01'), '旧本地')];
    const remote = [build('same', new Date('2026-11-05'), '新云端')];
    const result = mergeConfigurations(local, remote);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('新云端');
  });

  it('同 id 本地离线编辑较新时不被云端旧记录覆盖', () => {
    const local = [build('same', new Date('2026-11-08'), '离线编辑')];
    const remote = [build('same', new Date('2026-11-05'), '云端旧值')];
    const result = mergeConfigurations(local, remote);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('离线编辑');
  });

  it('按更新时间倒序输出，脏时间值不抛错', () => {
    const local = [build('older', new Date('2026-11-01'), '旧')];
    const remote = [
      build('newer', new Date('2026-11-09'), '新'),
      build('invalid', new Date('invalid'), '脏数据'),
    ];
    const result = mergeConfigurations(local, remote);
    expect(result[0].id).toBe('newer');
    expect(result.at(-1)?.id).toBe('invalid');
  });
});
