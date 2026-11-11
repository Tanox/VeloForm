// 文件路径: src/lib/config-history.test.ts v4.4.10
import { beforeEach, describe, expect, it } from 'vitest';
import { safeLocalStorage } from './storage';
import { saveSnapshot, listSnapshots, getSnapshot, deleteSnapshot } from './config-history';

const STORAGE_KEY = 'veloform-config-history';

describe('客户端配置版本历史', () => {
  beforeEach(() => safeLocalStorage().clear());

  it('保存、读取与删除快照', () => {
    const id = saveSnapshot('  ', 'Road', []);
    expect(listSnapshots()).toHaveLength(1);

    const snapshot = getSnapshot(id);
    expect(snapshot?.activeType).toBe('Road');
    expect(snapshot?.name).toContain('配置');

    deleteSnapshot(id);
    expect(listSnapshots()).toHaveLength(0);
    expect(getSnapshot(id)).toBeNull();
  });

  it('过滤损坏数据并把总数限制在 10 条', () => {
    safeLocalStorage().setItem(STORAGE_KEY, JSON.stringify([{ id: 'broken' }, 'invalid', 42]));
    expect(listSnapshots()).toEqual([]);

    for (let i = 0; i < 12; i += 1) {
      saveSnapshot(`快照 ${i}`, 'MTB', []);
    }
    expect(listSnapshots()).toHaveLength(10);
  });

  it('非法 JSON 不抛错，返回空列表', () => {
    safeLocalStorage().setItem(STORAGE_KEY, '{not-json');
    expect(listSnapshots()).toEqual([]);
  });
});
