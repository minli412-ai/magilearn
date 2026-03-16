import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioButtonProps {
  onClick: () => void;
  size?: number;
}

export function AudioButton({ onClick, size = 48 }: AudioButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="touch-target bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-lg"
      style={{ width: size, height: size }}
      aria-label="Rejouer le son"
    >
      <Volume2 size={size * 0.5} color="white" />
    </motion.button>
  );
}
