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
import { toast } from '@/lib/toast';
import { configLogger } from '@/lib/logger';

/**
 * 保存前校验配置数据，防止被污染的 store 状态直接入库。
 * 复用 shareable-config 的 zod schema（约束 bikeType/name/components 结构），
 * 并丢弃 schema 未覆盖的运行时字段（如 id/totalCost 由服务端重新计算）。
 */
function validateConfigForSave(
  config: ReturnType<typeof buildConfigurationFromStore>
): boolean {
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
  const { activeType, components, configId, manualConfigName, getTotalCost, getTotalWeight } =
    useConfigStore.getState();
  const userId = useUserStore.getState().userId;

  return {
    id: configId || `config_${Date.now()}`,
    userId: userId || 'anonymous',
    bikeType: activeType,
    name: manualConfigName || `${activeType} Build`,
    components: [...components],
    totalCost: getTotalCost(),
    estimatedWeight: getTotalWeight(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function saveConfiguration(): Promise<void> {
  const compareStore = useCompareStore.getState();

  try {
    const config = buildConfigurationFromStore();

    // 信任边界：保存到云端前校验数据结构，阻断被污染状态入库
    if (!validateConfigForSave(config)) {
      toast('error', 'Configuration data is invalid, cannot save');
      return;
    }

    try {
      if (!isSupabaseConfigured()) {
        toast('warning', 'Cloud sync unavailable, saving locally');
      } else {
        const savedId = await saveConfigurationToSupabase(
          config,
          useUserStore.getState().userId || undefined
        );
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

    useConfigStore.setState({
      configId: config.id || null,
      manualConfigName: config.name,
    });
  } catch (error) {
    configLogger.error('Critical save error:', error);
    toast('error', 'Failed to save configuration');
  }
}

export async function deleteConfiguration(configId: string): Promise<void> {
  const compareStore = useCompareStore.getState();

  try {
    if (isSupabaseConfigured()) {
      await deleteConfigurationFromSupabase(
        configId,
        useUserStore.getState().userId || undefined
      );
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
  // Delegate to the validated, UTF-8 safe encoder in shareable-config.ts
  return generateShareableConfigLink(
    activeType,
    components,
    manualConfigName || `${activeType} Build`
  );
}

export function exportConfiguration(): string {
  const { activeType, components, manualConfigName, getTotalCost, getTotalWeight } =
    useConfigStore.getState();
  const exportData = {
    name: manualConfigName || `${activeType} Build`,
    bikeType: activeType,
    totalCost: getTotalCost(),
    estimatedWeight: getTotalWeight(),
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
