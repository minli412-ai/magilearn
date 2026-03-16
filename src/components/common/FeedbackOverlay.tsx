import { useEffect, useRef } from 'react';
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
    : "Essaie encore !";

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (show) {
      timerRef.current = setTimeout(onComplete, correct ? 1500 : 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [show, correct, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`p-8 rounded-3xl shadow-2xl text-center ${
              correct
                ? "bg-[var(--color-success)]/90 text-[var(--color-text-on-light)]"
                : "bg-orange-400/90 text-white"
            }`}
          >
            <div className="text-5xl mb-3">{correct ? "\u2b50" : "\U0001f4aa"}</div>
            <p className="text-2xl font-bold">{message || defaultMsg}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
