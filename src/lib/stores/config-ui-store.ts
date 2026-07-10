'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      partialize: (state) => ({
        // 只持久化必要的UI状态，选择器打开状态不持久化
      }),
    }
  )
);

export const useShowComponentSelector = () => useConfigUIStore((s) => s.showComponentSelector);
export const useEditingComponentId = () => useConfigUIStore((s) => s.editingComponentId);
export const useIsSaving = () => useConfigUIStore((s) => s.isSaving);
