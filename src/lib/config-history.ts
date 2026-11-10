'use client';

/**
 * 文件: src/lib/config-history.ts
 * 版本: v4.4.8
 *
 * 客户端配置版本历史：将当前配置快照保存到浏览器 localStorage，
 * 支持列出、恢复与删除。最多保留最近 10 个快照（对齐 design-review P2 建议）。
 */

import type { BikeType, ConfigComponent } from '@/types';
import { safeLocalStorage } from '@/lib/storage';

const STORAGE_KEY = 'veloform-config-history';
const MAX_SNAPSHOTS = 10;

export interface ConfigSnapshot {
  id: string;
  name: string;
  activeType: BikeType;
  components: ConfigComponent[];
  createdAt: number;
}

function isValidSnapshot(value: unknown): value is ConfigSnapshot {
  if (!value || typeof value !== 'object') return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    typeof s.activeType === 'string' &&
    Array.isArray(s.components)
  );
}

function readAll(): ConfigSnapshot[] {
  try {
    const raw = safeLocalStorage().getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    // 仅保留结构合法的快照，过滤被篡改或旧版本损坏的数据，避免污染 store
    return Array.isArray(parsed) ? parsed.filter(isValidSnapshot) : [];
  } catch {
    return [];
  }
}

function writeAll(snapshots: ConfigSnapshot[]): void {
  try {
    safeLocalStorage().setItem(STORAGE_KEY, JSON.stringify(snapshots));
  } catch {
    /* 存储不可用时静默忽略 */
  }
}

/** 保存当前配置为快照，返回新快照 id（超过上限时淘汰最旧的）。 */
export function saveSnapshot(
  name: string,
  activeType: BikeType,
  components: ConfigComponent[]
): string {
  const id = `snap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const snapshot: ConfigSnapshot = {
    id,
    name: name.trim() || `配置 ${new Date().toLocaleString()}`,
    activeType,
    components,
    createdAt: Date.now(),
  };
  const all = [snapshot, ...readAll()].slice(0, MAX_SNAPSHOTS);
  writeAll(all);
  return id;
}

/** 列出全部快照（按创建时间倒序）。 */
export function listSnapshots(): ConfigSnapshot[] {
  return readAll();
}

/** 按 id 获取快照，不存在返回 null。 */
export function getSnapshot(id: string): ConfigSnapshot | null {
  return readAll().find((s) => s.id === id) ?? null;
}

/** 删除指定快照。 */
export function deleteSnapshot(id: string): void {
  writeAll(readAll().filter((s) => s.id !== id));
}
