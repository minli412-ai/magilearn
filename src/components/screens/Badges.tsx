import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { badges } from '../../data/gamification.ts';
import { useProfileStore } from '../../stores/profileStore.ts';
import { useProgressStore } from '../../stores/progressStore.ts';

interface BadgesProps {
  onBack: () => void;
}

function isBadgeUnlocked(condition: typeof badges[number]['condition'], state: {
  totalStars: number;
  streak: number;
  sessions: number;
}): boolean {
  switch (condition.type) {
    case 'stars-total': return state.totalStars >= condition.count;
    case 'streak': return state.streak >= condition.days;
    case 'sessions-total': return state.sessions >= condition.count;
    default: return false;
  }
}

export function Badges({ onBack }: BadgesProps) {
  const totalStars = useProfileStore((s) => s.totalStars);
  const { streak, sessionsCount } = useProgressStore();

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
        <h1 className="text-2xl font-bold">Mes Badges</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => {
            const unlocked = isBadgeUnlocked(badge.condition, {
              totalStars,
              streak: streak.currentStreak,
              sessions: sessionsCount,
            });

            return (
              <motion.div
                key={badge.id}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-4 rounded-2xl text-center ${
                  unlocked ? 'bg-white/10' : 'bg-white/5 opacity-40'
                }`}
              >
                <span className="text-4xl mb-2">{unlocked ? badge.icon : '🔒'}</span>
                <p className="text-sm font-bold">{badge.name}</p>
                <p className="text-xs opacity-60 mt-1">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
