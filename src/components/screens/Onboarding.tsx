import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '../../stores/profileStore.ts';
import { applyThemeToDOM, getTheme } from '../../themes/index.ts';
import { Button } from '../common/Button.tsx';
import type { ThemeId } from '../../types/index.ts';

const themeOptions: { id: ThemeId; emoji: string; label: string }[] = [
  { id: 'space', emoji: '🚀', label: 'Aventure Spatiale' },
  { id: 'ocean', emoji: '🐬', label: 'Explorateur des Océans' },
  { id: 'forest', emoji: '🦉', label: 'Forêt Magique' },
];

export function Onboarding() {
  const { setName, setTheme, setOnboarded } = useProfileStore();
  const [step, setStep] = useState<'name' | 'theme'>('name');
  const [inputName, setInputName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('space');

  const handleNameSubmit = () => {
    if (inputName.trim().length > 0) {
      setName(inputName.trim());
      setStep('theme');
    }
  };

  const handleThemeSelect = (id: ThemeId) => {
    setSelectedTheme(id);
    const theme = getTheme(id);
    applyThemeToDOM(theme);
  };

  const handleFinish = () => {
    setTheme(selectedTheme);
    setOnboarded(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {step === 'name' ? (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-full max-w-md text-center"
          >
            <div className="text-6xl mb-6">✨</div>
            <h1 className="text-3xl font-bold mb-2">Bienvenue sur MagiLearn !</h1>
            <p className="text-xl mb-8 opacity-80">Comment tu t'appelles ?</p>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              placeholder="Ton prénom"
              className="w-full text-2xl text-center bg-white/10 border-2 border-white/20 rounded-2xl px-6 py-4 mb-6 focus:outline-none focus:border-[var(--color-primary)] text-white placeholder-white/40"
              autoFocus
              aria-label="Ton prénom"
            />
            <Button onClick={handleNameSubmit} size="lg" disabled={inputName.trim().length === 0}>
              C'est parti !
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="theme"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-full max-w-md text-center"
          >
            <h1 className="text-3xl font-bold mb-2">Choisis ton univers !</h1>
            <p className="text-xl mb-8 opacity-80">{inputName}, quel monde veux-tu explorer ?</p>
            <div className="flex flex-col gap-4 mb-8">
              {themeOptions.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleThemeSelect(opt.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all touch-target-lg ${
                    selectedTheme === opt.id
                      ? 'bg-[var(--color-primary)] text-white ring-4 ring-white/30'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                  aria-label={opt.label}
                >
                  <span className="text-4xl">{opt.emoji}</span>
                  <span className="text-xl font-bold">{opt.label}</span>
                </motion.button>
              ))}
            </div>
            <Button onClick={handleFinish} size="lg">
              C'est parti !
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
