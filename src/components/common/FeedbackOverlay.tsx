import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '../../stores/profileStore.ts';
import { getTheme } from '../../themes/index.ts';

interface FeedbackOverlayProps {
  show: boolean;
  correct: boolean;
  message?: string;
  onComplete: () => void;
}

export function FeedbackOverlay({ show, correct, message, onComplete }: FeedbackOverlayProps) {
  const theme = getTheme(useProfileStore((s) => s.theme));
  const defaultMsg = correct
    ? theme.character.encouragement[Math.floor(Math.random() * theme.character.encouragement.length)]
    : 'Essaie encore !';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            if (show) setTimeout(onComplete, correct ? 1500 : 1000);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`p-8 rounded-3xl shadow-2xl text-center ${
              correct
                ? 'bg-[var(--color-success)]/90 text-[var(--color-text-on-light)]'
                : 'bg-orange-400/90 text-white'
            }`}
          >
            <div className="text-5xl mb-3">{correct ? '⭐' : '💪'}</div>
            <p className="text-2xl font-bold">{message || defaultMsg}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
