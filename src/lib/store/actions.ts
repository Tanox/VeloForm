/**
 * Store 业务操作
 * src/lib/store/actions.ts v4.1.0
 */

import type { StateCreator } from 'zustand';
import type { Configuration } from '@/types';
import { toast } from '@/lib/toast';
import { configLogger } from '@/lib/logger';
import {
  saveConfigurationToSupabase,
  deleteConfigurationFromSupabase,
} from '@/lib/supabase-service';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { LegacyConfigStore } from './types';

/** 最大对比数量 */
export const MAX_COMPARE = 3;

/**
 * 创建保存配置的操作
 */
export const createSaveConfiguration = (
  get: () => LegacyConfigStore,
  set: (partial: Partial<LegacyConfigStore>) => void
) => {
  return async () => {
    const state = get();
    set({ isSaving: true });

    try {
      const config: Configuration = {
        id: state.configId || `config_${Date.now()}`,
        userId: state.userId || 'anonymous',
        bikeType: state.activeType,
        name: state.manualConfigName || `${state.activeType} Build`,
        components: [...state.components],
        totalCost: state.getTotalCost(),
        estimatedWeight: state.getTotalWeight(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      try {
        if (!isSupabaseConfigured()) {
          toast('warning', 'Cloud sync unavailable, saving locally');
        } else {
          const savedId = await saveConfigurationToSupabase(config, state.userId || undefined);
          config.id = savedId;
          toast('success', 'Configuration saved to cloud');
        }
      } catch (supabaseError: unknown) {
        const error = supabaseError as { code?: string };
        if (error?.code === '42501') {
          toast('error', 'Permission denied. Please log in.');
        } else if (error?.code === 'PGRST301') {
          toast('warning', 'Cloud service unavailable, saved locally');
        } else {
          configLogger.error('Supabase error:', supabaseError);
          toast('error', 'Failed to sync with cloud, saved locally');
        }
      }

      const existingIndex = state.myConfigs.findIndex((c) => c.id === config.id);
      if (existingIndex >= 0) {
        const updated = [...state.myConfigs];
        updated[existingIndex] = config;
        set({
          myConfigs: updated,
          configId: config.id || null,
          isSaving: false,
        });
      } else {
        set({
          myConfigs: [...state.myConfigs, config],
          configId: config.id || null,
          isSaving: false,
        });
      }
    } catch (error) {
      configLogger.error('Critical save error:', error);
      toast('error', 'Failed to save configuration');
      set({ isSaving: false });
    }
  };
};

/**
 * 创建删除配置的操作
 */
export const createDeleteConfiguration = (
  get: () => LegacyConfigStore,
  set: (partial: Partial<LegacyConfigStore>) => void
) => {
  return async (configId: string) => {
    try {
      if (isSupabaseConfigured()) {
        await deleteConfigurationFromSupabase(configId);
        toast('info', 'Configuration deleted from cloud');
      }
    } catch (error) {
      configLogger.warn('Failed to delete from Supabase:', error);
      toast('warning', 'Deleted locally but may still exist in cloud');
    }

    const state = get();
    set({
      myConfigs: state.myConfigs.filter((c) => c.id !== configId),
      configId: state.configId === configId ? null : state.configId,
      comparingConfigIds: state.comparingConfigIds.filter((id) => id !== configId),
    });
  };
};

/**
 * 生成可分享链接
 */
export const generateShareableLink = (get: () => LegacyConfigStore): string => {
  const state = get();
  const config = {
    bikeType: state.activeType,
    components: state.components,
    name: state.manualConfigName || `${state.activeType} Build`,
  };
  const encoded = btoa(JSON.stringify(config));
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/?config=${encoded}`;
};

/**
 * 导出配置为 JSON
 */
export const exportConfiguration = (get: () => LegacyConfigStore): string => {
  const state = get();
  const exportData = {
    name: state.manualConfigName || `${state.activeType} Build`,
    bikeType: state.activeType,
    totalCost: state.getTotalCost(),
    estimatedWeight: state.getTotalWeight(),
    components: state.components.map((comp) => ({
      category: comp.category,
      name: comp.name,
      price: comp.price,
      weight: comp.weight,
    })),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(exportData, null, 2);
};

/**
 * 切换对比状态
 */
export const createToggleCompare = (
  get: () => LegacyConfigStore,
  set: (
    partial: Partial<LegacyConfigStore> | ((state: LegacyConfigStore) => Partial<LegacyConfigStore>)
  ) => void
) => {
  return (configId: string) => {
    set((state) => {
      const isComparing = state.comparingConfigIds.includes(configId);
      if (isComparing) {
        return {
          comparingConfigIds: state.comparingConfigIds.filter((id) => id !== configId),
        };
      }
      if (state.comparingConfigIds.length >= MAX_COMPARE) {
        toast('warning', 'You can compare up to 3 configurations');
        return state;
      }
      return {
        comparingConfigIds: [...state.comparingConfigIds, configId],
      };
    });
  };
};
