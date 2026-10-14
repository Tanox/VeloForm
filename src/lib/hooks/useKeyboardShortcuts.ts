'use client';

import { useEffect } from 'react';
import { useConfigStore } from '@/lib/stores';
import { saveConfiguration as saveConfig } from '@/lib/config-service';
import { toast } from '@/lib/toast';
import { APP_CONSTANTS } from '@/lib/constants';

/**
 * 全局键盘快捷键（仅配置器页面挂载）：
 * - S 保存配置
 * - R 重置为默认配置
 * - 1/2/3 切换 公路车/山地车/折叠车
 * 在输入框、文本域或 contenteditable 元素中不触发，避免误触。
 */
export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();
      const store = useConfigStore.getState();

      if (key === 's') {
        e.preventDefault();
        void saveConfig().then(() => {
          if (useConfigStore.getState().configId) {
            toast('success', '配置已保存');
          }
        });
      } else if (key === 'r') {
        e.preventDefault();
        store.resetToDefaults();
      } else if (key === '1' || key === '2' || key === '3') {
        e.preventDefault();
        const type = APP_CONSTANTS.BIKE_TYPES[Number(key) - 1];
        store.setActiveType(type);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
}
