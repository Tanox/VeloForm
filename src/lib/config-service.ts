// 文件路径: src/lib/config-service.ts v4.4.9
import { Configuration } from '@/types';
import { useConfigStore } from '@/lib/stores/config-store';
import { useCompareStore } from '@/lib/stores/compare-store';
import { useUserStore } from '@/lib/stores/user-store';
import {
  saveConfigurationToSupabase,
  deleteConfigurationFromSupabase,
} from '@/lib/supabase-service';
import { isSupabaseConfigured } from '@/lib/supabase';
import { generateShareableLink as generateShareableConfigLink } from '@/lib/shareable-config';
import { ShareableConfigSchema } from '@/lib/shareable-config';
import { calculateTotals } from '@/lib/config-totals';
import { toast } from '@/lib/toast';
import { configLogger } from '@/lib/logger';

/**
 * 保存前校验配置数据，防止被污染的 store 状态直接入库。
 * 复用 shareable-config 的 zod schema（约束 bikeType/name/components 结构）。
 */
function validateConfigForSave(config: ReturnType<typeof buildConfigurationFromStore>): boolean {
  const result = ShareableConfigSchema.safeParse({
    bikeType: config.bikeType,
    name: config.name,
    components: config.components,
  });
  if (!result.success) {
    configLogger.warn('Configuration validation failed before save:', result.error.issues);
    return false;
  }
  return true;
}

export function buildConfigurationFromStore(): Configuration {
  const { activeType, components, configId, manualConfigName } = useConfigStore.getState();
  const userId = useUserStore.getState().userId;
  const totals = calculateTotals(components, activeType);

  return {
    // 未保存配置使用 local_ 前缀，supabase-service 的 isLocalDraft() 据此判定为草稿走 insert
    id: configId || `local_${Date.now()}`,
    userId: userId || 'anonymous',
    bikeType: activeType,
    name: manualConfigName || `${activeType} Build`,
    components: [...components],
    totalCost: totals.totalCost,
    estimatedWeight: totals.estimatedWeight,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

// 模块级 in-flight 锁：按钮与快捷键共用，避免并发 insert 生成重复记录
let saveInFlight: Promise<void> | null = null;

async function doSaveConfiguration(): Promise<void> {
  const compareStore = useCompareStore.getState();

  try {
    const config = buildConfigurationFromStore();

    // 信任边界：保存到云端前校验数据结构，阻断被污染状态入库
    if (!validateConfigForSave(config)) {
      toast('error', 'Configuration data is invalid, cannot save');
      return;
    }

    const cloudAvailable = isSupabaseConfigured();
    const userId = useUserStore.getState().userId;

    try {
      if (!cloudAvailable) {
        toast('warning', 'Cloud sync unavailable, saved locally');
      } else if (!userId) {
        // 未登录时 RLS 的 WITH CHECK (auth.uid() = user_id) 必然拒绝写入；
        // 明确降级为本地草稿，避免「假云端 id + 已保存到云端」的静默数据丢失
        toast('warning', 'Please sign in to sync to cloud; saved locally');
      } else {
        const savedId = await saveConfigurationToSupabase(config, userId);
        config.id = savedId;
        toast('success', 'Configuration saved to cloud');
      }
    } catch (supabaseError: unknown) {
      const error = supabaseError as { code?: string; message?: string };
      if (error?.code === '42501') {
        toast('error', 'Permission denied. Please log in.');
      } else if (error?.code === 'PGRST301') {
        toast('warning', 'Cloud service unavailable, saved locally');
      } else {
        configLogger.error('Supabase error:', error);
        toast('error', 'Failed to sync with cloud, saved locally');
      }
    }

    const existingIndex = compareStore.myConfigs.findIndex((c) => c.id === config.id);
    if (existingIndex >= 0) {
      const updated = [...compareStore.myConfigs];
      updated[existingIndex] = config;
      compareStore.setMyConfigs(updated);
    } else {
      compareStore.setMyConfigs([...compareStore.myConfigs, config]);
    }

    // 只回写 id，避免 await 期间用户改名 / 切换车型被旧快照覆盖
    useConfigStore.setState({ configId: config.id || null });
  } catch (error) {
    configLogger.error('Critical save error:', error);
    toast('error', 'Failed to save configuration');
  }
}

export function saveConfiguration(): Promise<void> {
  if (saveInFlight) return saveInFlight;
  saveInFlight = doSaveConfiguration().finally(() => {
    saveInFlight = null;
  });
  return saveInFlight;
}

export async function deleteConfiguration(configId: string): Promise<void> {
  const compareStore = useCompareStore.getState();

  try {
    // 本地草稿 id 非 uuid，传给 Supabase 会触发类型错误，直接跳过云端删除
    if (isSupabaseConfigured() && !configId.startsWith('local_')) {
      await deleteConfigurationFromSupabase(configId, useUserStore.getState().userId || undefined);
      toast('info', 'Configuration deleted from cloud');
    }
  } catch (error) {
    configLogger.warn('Failed to delete from Supabase:', error);
    toast('warning', 'Deleted locally but may still exist in cloud');
  }

  compareStore.deleteConfiguration(configId);
}

export function generateShareableLink(): string {
  const { activeType, components, manualConfigName } = useConfigStore.getState();
  return generateShareableConfigLink(
    activeType,
    components,
    manualConfigName || `${activeType} Build`
  );
}

export function exportConfiguration(): string {
  const { activeType, components, manualConfigName } = useConfigStore.getState();
  const totals = calculateTotals(components, activeType);
  const exportData = {
    name: manualConfigName || `${activeType} Build`,
    bikeType: activeType,
    totalCost: totals.totalCost,
    estimatedWeight: totals.estimatedWeight,
    components: components.map((comp) => ({
      category: comp.category,
      name: comp.name,
      price: comp.price,
      weight: comp.weight,
    })),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(exportData, null, 2);
}
