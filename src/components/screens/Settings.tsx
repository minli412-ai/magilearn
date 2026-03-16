import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Trees, RotateCcw } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore.ts';
import { useProfileStore } from '../../stores/profileStore.ts';
import { themes, applyThemeToDOM } from '../../themes/index.ts';
import type { ThemeId } from '../../types/index.ts';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { volume, setVolume, ambientSounds, setAmbientSounds } = useSettingsStore();
  const { theme, setTheme, name } = useProfileStore();

  const handleThemeChange = (id: ThemeId) => {
    setTheme(id);
    applyThemeToDOM(themes[id]);
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="touch-target p-2 rounded-full bg-white/10"
          aria-label="Retour"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      <div className="flex-1 space-y-6">
        <div className="bg-white/10 rounded-2xl p-5">
          <p className="text-sm opacity-60 uppercase tracking-wide mb-2">Profil</p>
          <p className="text-xl font-bold">{name}</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Volume2 size={20} />
            <span className="font-bold">Volume</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-[var(--color-primary)]"
            aria-label="Volume"
          />
        </div>

        <div className="bg-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Trees size={20} />
            <span className="font-bold">Sons d'ambiance</span>
          </div>
          <button
            onClick={() => setAmbientSounds(!ambientSounds)}
            className={`w-14 h-8 rounded-full transition-all ${ambientSounds ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}
            aria-label="Toggle sons d'ambiance"
          >
            <div className={`w-6 h-6 bg-white rounded-full transition-transform mx-1 ${ambientSounds ? 'translate-x-6' : ''}`} />
          </button>
        </div>

        <div className="bg-white/10 rounded-2xl p-5">
          <p className="font-bold mb-3">Thème</p>
          <div className="flex gap-3">
            {(Object.keys(themes) as ThemeId[]).map((id) => (
              <button
                key={id}
                onClick={() => handleThemeChange(id)}
                className={`flex-1 p-3 rounded-xl text-center transition-all touch-target ${
                  theme === id ? 'ring-2 ring-[var(--color-primary)] bg-white/15' : 'bg-white/5'
                }`}
                aria-label={themes[id].name}
              >
                <span className="text-2xl">{id === 'space' ? '🚀' : id === 'ocean' ? '🐬' : '🦉'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-5">
          <button
            onClick={() => {
              if (confirm('Effacer toutes les données ? Cette action est irréversible.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="flex items-center gap-3 text-red-400 touch-target"
            aria-label="Réinitialiser"
          >
            <RotateCcw size={20} />
            <span className="font-bold">Réinitialiser les données</span>
          </button>
        </div>
      </div>
    </div>
  );
}
