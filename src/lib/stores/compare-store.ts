'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Configuration } from '@/types';

export interface CompareState {
  comparingConfigIds: string[];
  myConfigs: Configuration[];
}

export interface CompareActions {
  toggleCompare: (configId: string) => void;
  clearCompare: () => void;
  getComparingConfigs: () => Configuration[];
  setMyConfigs: (configs: Configuration[]) => void;
  addMyConfig: (config: Configuration) => void;
  updateMyConfig: (config: Configuration) => void;
  deleteConfiguration: (configId: string) => void;
}

export type CompareStore = CompareState & CompareActions;

const MAX_COMPARE = 3;

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      comparingConfigIds: [],
      myConfigs: [],

      toggleCompare: (configId: string) => {
        set((state) => {
          const isComparing = state.comparingConfigIds.includes(configId);
          if (isComparing) {
            return {
              comparingConfigIds: state.comparingConfigIds.filter(
                (id) => id !== configId
              ),
            };
          }
          if (state.comparingConfigIds.length >= MAX_COMPARE) {
            return state;
          }
          return {
            comparingConfigIds: [...state.comparingConfigIds, configId],
          };
        });
      },

      clearCompare: () => set({ comparingConfigIds: [] }),

      getComparingConfigs: () => {
        const state = get();
        return state.comparingConfigIds
          .map((id) => state.myConfigs.find((c) => c.id === id))
          .filter(Boolean) as Configuration[];
      },

      setMyConfigs: (configs: Configuration[]) => set({ myConfigs: configs }),

      addMyConfig: (config: Configuration) =>
        set((state) => ({
          myConfigs: [...state.myConfigs, config],
        })),

      updateMyConfig: (config: Configuration) =>
        set((state) => ({
          myConfigs: state.myConfigs.map((c) =>
            c.id === config.id ? config : c
          ),
        })),

      deleteConfiguration: (configId: string) =>
        set((state) => ({
          myConfigs: state.myConfigs.filter((c) => c.id !== configId),
          comparingConfigIds: state.comparingConfigIds.filter(
            (id) => id !== configId
          ),
        })),
    }),
    {
      name: 'veloform-compare-storage',
    }
  )
);

export const useMyConfigs = () => useCompareStore((s) => s.myConfigs);
export const useComparingConfigIds = () =>
  useCompareStore((s) => s.comparingConfigIds);
export const useComparingConfigs = () => {
  const myConfigs = useCompareStore((s) => s.myConfigs);
  const ids = useCompareStore((s) => s.comparingConfigIds);
  return ids
    .map((id) => myConfigs.find((c) => c.id === id))
    .filter(Boolean) as Configuration[];
};
