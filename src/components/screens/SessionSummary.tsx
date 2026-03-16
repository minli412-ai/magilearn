import { motion } from 'framer-motion';
import type { ExerciseResult } from '../../types/index.ts';
import { Button } from '../common/Button.tsx';
import { useProfileStore } from '../../stores/profileStore.ts';
import { getTheme } from '../../themes/index.ts';

interface SessionSummaryProps {
  starsEarned: number;
  results: ExerciseResult[];
  totalQuestions: number;
  onContinue: () => void;
}

export function SessionSummary({ starsEarned, results, totalQuestions, onContinue }: SessionSummaryProps) {
  const themeId = useProfileStore((s) => s.theme);
  const name = useProfileStore((s) => s.name);
  const theme = getTheme(themeId);
  const correctCount = results.filter((r) => r.correct).length;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-7xl mb-6"
      >
        🎉
      </motion.div>

      <h1 className="text-3xl font-bold mb-2">Bravo {name} !</h1>
      <p className="text-xl opacity-80 mb-8">
        {theme.character.encouragement[Math.floor(Math.random() * theme.character.encouragement.length)]}
      </p>

      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <div className="text-4xl mb-1">⭐</div>
          <div className="text-2xl font-bold">{starsEarned}</div>
          <div className="text-sm opacity-60">{theme.rewards.currency}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-1">✅</div>
          <div className="text-2xl font-bold">{correctCount}/{totalQuestions}</div>
          <div className="text-sm opacity-60">correct</div>
        </div>
      </div>

      <Button onClick={onContinue} size="lg">
        Continuer
      </Button>
    </div>
  );
}
