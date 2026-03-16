import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  volume: number;
  ambientSounds: boolean;
  setVolume: (v: number) => void;
  setAmbientSounds: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      volume: 0.8,
      ambientSounds: true,
      setVolume: (volume) => set({ volume }),
      setAmbientSounds: (ambientSounds) => set({ ambientSounds }),
    }),
    {
      name: 'magilearn-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
