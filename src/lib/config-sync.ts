// 文件路径: src/lib/config-sync.ts v4.4.9
import type { Configuration } from '@/types';

function updatedAtTime(value: Configuration['updatedAt']): number {
  if (!value) return 0;
  const time = value instanceof Date ? value.getTime() : new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

/**
 * 合并本地草稿与云端配置：
 * - 同 id 以云端为准（云端为多设备同步的权威来源）
 * - 本地独有草稿（local_ 前缀）始终保留，绝不因登录/登出/加载失败而丢失
 * - 按更新时间倒序，便于配置库展示
 */
export function mergeConfigurations(
  local: readonly Configuration[],
  remote: readonly Configuration[]
): Configuration[] {
  const remoteIds = new Set(remote.map((config) => config.id));
  const localOnly = local.filter((config) => !remoteIds.has(config.id));
  return [...remote, ...localOnly].sort(
    (a, b) => updatedAtTime(b.updatedAt) - updatedAtTime(a.updatedAt)
  );
}
