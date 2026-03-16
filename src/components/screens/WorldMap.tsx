import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { useProfileStore } from '../../stores/profileStore.ts';
import { getTheme } from '../../themes/index.ts';
import { ZONE_STAR_THRESHOLDS } from '../../data/gamification.ts';

interface WorldMapProps {
  onBack: () => void;
}

export function WorldMap({ onBack }: WorldMapProps) {
  const { theme: themeId, totalStars } = useProfileStore();
  const theme = getTheme(themeId);

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
        <h1 className="text-2xl font-bold">{theme.name}</h1>
        <div className="ml-auto flex items-center gap-1">
          <span>{theme.rewards.currencyIcon}</span>
          <span className="font-bold">{totalStars}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 justify-center">
        {theme.rewards.mapZoneNames.map((zone, i) => {
          const unlocked = totalStars >= ZONE_STAR_THRESHOLDS[i];
          const isCurrent = unlocked && (i === 4 || totalStars < ZONE_STAR_THRESHOLDS[i + 1]);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                unlocked
                  ? isCurrent
                    ? 'bg-[var(--color-primary)]/30 ring-2 ring-[var(--color-primary)]'
                    : 'bg-white/10'
                  : 'bg-white/5 opacity-50'
              }`}
              style={{ marginLeft: i % 2 === 0 ? 0 : 40, marginRight: i % 2 === 0 ? 40 : 0 }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-2xl">
                {unlocked ? (i === 0 ? '🏁' : i === 4 ? '🏆' : '✨') : <Lock size={20} />}
              </div>
              <div className="flex-1">
                <p className="font-bold">{zone}</p>
                <p className="text-sm opacity-60">
                  {unlocked ? 'Débloqué !' : `${ZONE_STAR_THRESHOLDS[i]} ${theme.rewards.currency} pour débloquer`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
