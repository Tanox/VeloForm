import { Configuration } from '@/types';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import { supabaseLogger } from './logger';

interface SupabaseConfigRow {
  id: string;
  user_id: string | null;
  bike_type: string;
  name: string;
  components: unknown;
  total_cost: number;
  estimated_weight: number;
  description: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

/**
 * 将数据库行转换为 Configuration 类型
 */
function rowToConfiguration(row: SupabaseConfigRow): Configuration {
  return {
    id: row.id,
    userId: row.user_id ?? undefined,
    bikeType: row.bike_type as 'Road' | 'MTB' | 'Fold',
    name: row.name,
    components: row.components as Configuration['components'],
    totalCost: row.total_cost,
    estimatedWeight: row.estimated_weight,
    description: row.description ?? undefined,
    tags: row.tags ?? undefined,
    createdAt: row.created_at ? new Date(row.created_at) : new Date(),
    updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
  };
}

/**
 * 将 Configuration 转换为数据库写入对象
 */
function configurationToRow(config: Configuration, userId?: string): Record<string, unknown> {
  return {
    user_id: userId || null,
    bike_type: config.bikeType,
    name: config.name,
    components: config.components,
    total_cost: config.totalCost ?? 0,
    estimated_weight: config.estimatedWeight ?? 0,
    description: config.description ?? null,
    tags: config.tags ?? null,
  };
}

/**
 * 保存配置到 Supabase
 * - 如果 config.id 存在，则更新
 * - 否则创建新记录
 */
export async function saveConfigurationToSupabase(
  config: Configuration,
  userId?: string
): Promise<string> {
  if (!isSupabaseConfigured()) {
    supabaseLogger.info('Supabase not configured, using local only');
    return config.id || `local_${Date.now()}`;
  }

  try {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not initialized');
    }

    const row = configurationToRow(config, userId);

    if (config.id && config.id !== `local_${Date.now()}` && !config.id.startsWith('local_')) {
      const { error } = await client.from('configurations').update(row).eq('id', config.id);

      if (error) {
        throw error;
      }
      supabaseLogger.info(`Configuration updated: ${config.id}`);
      return config.id;
    } else {
      const { data, error } = await client.from('configurations').insert(row).select('id').single();

      if (error) {
        throw error;
      }
      supabaseLogger.info(`Configuration created: ${data.id}`);
      return data.id;
    }
  } catch (error) {
    supabaseLogger.error('Error saving configuration to Supabase:', error);
    return config.id || `local_${Date.now()}`;
  }
}

/**
 * 从 Supabase 加载当前用户的配置列表
 */
export async function loadConfigurationsFromSupabase(userId?: string): Promise<Configuration[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const client = getSupabaseClient();
    if (!client) {
      return [];
    }

    let query = client.from('configurations').select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    query = query.order('updated_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const rows = data as SupabaseConfigRow[];
    return rows.map(rowToConfiguration);
  } catch (error) {
    supabaseLogger.error('Error loading configurations from Supabase:', error);
    return [];
  }
}

/**
 * 从 Supabase 删除配置
 */
export async function deleteConfigurationFromSupabase(
  configId: string,
  userId?: string
): Promise<void> {
  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    const client = getSupabaseClient();
    if (!client) {
      return;
    }

    let query = client.from('configurations').delete().eq('id', configId);
    // Defense in depth: scope deletes to the owner even though RLS also enforces it
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { error } = await query;

    if (error) {
      throw error;
    }

    supabaseLogger.info(`Configuration deleted: ${configId}`);
  } catch (error) {
    supabaseLogger.error('Error deleting configuration from Supabase:', error);
  }
}
