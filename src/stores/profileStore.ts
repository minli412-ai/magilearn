import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ThemeId } from '../types/index.ts';

interface ProfileState {
  name: string;
  theme: ThemeId;
  onboarded: boolean;
  totalStars: number;
  setName: (name: string) => void;
  setTheme: (theme: ThemeId) => void;
  setOnboarded: (v: boolean) => void;
  addStars: (count: number) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: '',
      theme: 'space',
      onboarded: false,
      totalStars: 0,
      setName: (name) => set({ name }),
      setTheme: (theme) => set({ theme }),
      setOnboarded: (v) => set({ onboarded: v }),
      addStars: (count) => set((s) => ({ totalStars: s.totalStars + count })),
    }),
    {
      name: 'magilearn-profile',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
