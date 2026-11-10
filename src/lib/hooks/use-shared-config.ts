// 文件路径: src/lib/hooks/use-shared-config.ts v4.4.9
'use client';

import { useEffect } from 'react';
import type { ConfigComponent } from '@/types';
import { parseShareableConfig, type ShareableConfig } from '@/lib/shareable-config';
import { useConfigStore } from '@/lib/stores/config-store';
import { toast } from '@/lib/toast';

/** 分享载荷的组件转换为应用内部类型；specs 为通用字典，按类别在运行时消费 */
function toConfigComponents(items: ShareableConfig['components']): ConfigComponent[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    weight: item.weight,
    category: item.category,
    bikeType: item.bikeType,
    brand: item.brand,
    model: item.model,
    description: item.description,
    rating: item.rating,
    reviewCount: item.reviewCount,
    imageUrl: item.imageUrl,
    specs: item.specs as unknown as ConfigComponent['specs'],
  }));
}

/** 只移除 config 参数，保留其它查询参数与 hash，避免刷新时重复加载 */
function clearConfigParam(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('config');
  window.history.replaceState(
    window.history.state,
    '',
    `${url.pathname}${url.search}${url.hash}`
  );
}

/**
 * 消费 ?config= 分享链接：首次挂载与浏览器前进/后退时均会解析，
 * 校验通过后载入配置并清理参数；无效链接给出明确错误提示。
 */
export function useSharedConfig(): void {
  useEffect(() => {
    const load = () => {
      const encoded = new URLSearchParams(window.location.search).get('config');
      if (!encoded) return;
      const result = parseShareableConfig(encoded);
      if (!result.valid || !result.data) {
        toast('error', '分享链接无效或已损坏');
        return;
      }
      const { bikeType, name, components } = result.data;
      useConfigStore.getState().loadConfiguration({
        bikeType,
        components: toConfigComponents(components),
        manualConfigName: name,
      });
      clearConfigParam();
      toast('success', `已加载分享配置：${name}`);
    };

    load();
    window.addEventListener('popstate', load);
    return () => window.removeEventListener('popstate', load);
  }, []);
}
