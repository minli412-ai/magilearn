import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className={`w-full h-3 bg-white/10 rounded-full overflow-hidden ${className}`} role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      <motion.div
        className="h-full bg-[var(--color-primary)] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
