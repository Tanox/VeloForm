// 文件路径: src/lib/config-sync.ts v4.4.9
import type { Configuration } from '@/types';

function updatedAtTime(value: Configuration['updatedAt']): number {
  if (!value) return 0;
  const time = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

/**
 * 合并本地草稿与云端配置：
 * - 同 id 取 updatedAt 较新的一方，避免离线编辑被较旧的云端记录覆盖
 * - 本地独有草稿（含 local_ 前缀）始终保留，绝不因登录/登出/加载失败而丢失
 * - 按更新时间倒序，便于配置库展示
 */
export function mergeConfigurations(
  local: readonly Configuration[],
  remote: readonly Configuration[]
): Configuration[] {
  const merged = new Map<string, Configuration>();
  for (const config of local) {
    if (config.id) merged.set(config.id, config);
  }
  for (const config of remote) {
    const existing = merged.get(config.id);
    // 时间相同时以云端为准（多设备同步的权威来源），本地较新则保留本地
    if (!existing || updatedAtTime(config.updatedAt) >= updatedAtTime(existing.updatedAt)) {
      merged.set(config.id, config);
    }
  }
  return [...merged.values()].sort(
    (a, b) => updatedAtTime(b.updatedAt) - updatedAtTime(a.updatedAt)
  );
}
