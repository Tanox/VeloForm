// 文件路径: src/lib/hooks/useKeyboardShortcuts.ts v4.4.9
'use client';

import { useEffect } from 'react';
import { useConfigStore } from '@/lib/stores';
import { saveConfiguration as saveConfig } from '@/lib/config-service';
import { APP_CONSTANTS } from '@/lib/constants';
import { configLogger } from '@/lib/logger';

/**
 * 全局键盘快捷键（仅配置器页面挂载）：
 * - S 保存配置
 * - R 重置为默认配置
 * - 1/2/3 切换 公路车/山地车/折叠车
 * 在输入框、文本域或 contenteditable 元素中不触发，避免误触。
 * 保存结果由 config-service 统一提示，这里只负责捕获未处理异常。
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
        void saveConfig().catch((error: unknown) => {
          configLogger.error('Shortcut save failed:', error);
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
