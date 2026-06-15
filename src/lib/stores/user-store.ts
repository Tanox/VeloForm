'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserState {
  userId: string | null;
}

export interface UserActions {
  setUserId: (userId: string | null) => void;
  clearUser: () => void;
}

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: null,

      setUserId: (userId: string | null) => set({ userId }),

      clearUser: () => set({ userId: null }),
    }),
    {
      name: 'veloform-user-storage',
    }
  )
);

export const useUserId = () => useUserStore((s) => s.userId);
