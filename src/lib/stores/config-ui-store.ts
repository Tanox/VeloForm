'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeJSONStorage } from '@/lib/storage';

export interface ConfigUIState {
  showComponentSelector: boolean;
  editingComponentId: string;
  isSaving: boolean;
}

export interface ConfigUIActions {
  toggleComponentSelector: (componentId?: string) => void;
  openComponentSelector: (componentId?: string) => void;
  closeComponentSelector: () => void;
  setEditingComponentId: (componentId: string) => void;
  setSaving: (saving: boolean) => void;
}

export type ConfigUIStore = ConfigUIState & ConfigUIActions;

export const useConfigUIStore = create<ConfigUIStore>()(
  persist(
    (set) => ({
      showComponentSelector: false,
      editingComponentId: '',
      isSaving: false,

      toggleComponentSelector: (componentId?: string) =>
        set((state) => ({
          showComponentSelector: !state.showComponentSelector,
          editingComponentId: componentId || state.editingComponentId,
        })),

      openComponentSelector: (componentId?: string) =>
        set({
          showComponentSelector: true,
          editingComponentId: componentId || '',
        }),

      closeComponentSelector: () =>
        set({
          showComponentSelector: false,
        }),

      setEditingComponentId: (componentId: string) => set({ editingComponentId: componentId }),

      setSaving: (saving: boolean) => set({ isSaving: saving }),
    }),
    {
      name: 'veloform-config-ui-storage',
      skipHydration: true,
      storage: safeJSONStorage,
      // UI 瞬时状态（选择器打开/保存中）不应持久化，避免刷新后卡在 loading 态
      partialize: () => ({}),
    }
  )
);

export const useShowComponentSelector = () => useConfigUIStore((s) => s.showComponentSelector);
export const useEditingComponentId = () => useConfigUIStore((s) => s.editingComponentId);
export const useIsSaving = () => useConfigUIStore((s) => s.isSaving);
