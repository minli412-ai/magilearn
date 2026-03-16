import { motion } from 'framer-motion';
import { BookOpen, Calculator, Globe, Trophy, Map, Settings } from 'lucide-react';
import { useProfileStore } from '../../stores/profileStore.ts';
import { useProgressStore } from '../../stores/progressStore.ts';
import { getTheme } from '../../themes/index.ts';
import type { Subject } from '../../types/index.ts';

interface HomeProps {
  onStartSession: (subject: Subject) => void;
  onNavigate: (screen: string) => void;
}

const subjects = [
  { id: 'french' as Subject, label: 'Français', emoji: '📖', icon: BookOpen, color: '#FF8C42' },
  { id: 'maths' as Subject, label: 'Maths', emoji: '🔢', icon: Calculator, color: '#4FC3F7' },
  { id: 'english' as Subject, label: 'English', emoji: '🇬🇧', icon: Globe, color: '#66BB6A' },
];

export function Home({ onStartSession, onNavigate }: HomeProps) {
  const { name, theme: themeId, totalStars } = useProfileStore();
  const { streak } = useProgressStore();
  const theme = getTheme(themeId);

  const characterEmoji = themeId === 'space' ? '🦊' : themeId === 'ocean' ? '🐬' : '🦉';
  const greeting = theme.character.greeting.replace('{name}', name);

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{theme.rewards.currencyIcon}</span>
          <span className="text-xl font-bold">{totalStars}</span>
        </div>
        <div className="flex items-center gap-2">
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
              <span>🔥</span>
              <span className="font-bold">{streak.currentStreak}</span>
            </div>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('settings')}
            className="touch-target p-2 rounded-full bg-white/10"
            aria-label="Paramètres"
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

      {/* Character greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="text-5xl">{characterEmoji}</div>
        <div className="bg-white/10 rounded-2xl rounded-bl-sm px-5 py-3 flex-1">
          <p className="text-xl">{greeting}</p>
        </div>
      </motion.div>

      {/* Subject buttons */}
      <div className="flex-1 flex flex-col gap-4 mb-4">
        <h2 className="text-lg font-bold opacity-70 uppercase tracking-wide">Apprendre</h2>
        {subjects.map((sub, i) => (
          <motion.button
            key={sub.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onStartSession(sub.id)}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 hover:bg-white/15 transition-all touch-target-lg"
            aria-label={`Commencer ${sub.label}`}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: sub.color + '30' }}
            >
              {sub.emoji}
            </div>
            <span className="text-xl font-bold">{sub.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('worldmap')}
          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/10 touch-target"
          aria-label="Carte du monde"
        >
          <Map size={20} />
          <span className="font-bold">Carte</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('badges')}
          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/10 touch-target"
          aria-label="Badges"
        >
          <Trophy size={20} />
          <span className="font-bold">Badges</span>
        </motion.button>
      </div>
    </div>
  );
}
