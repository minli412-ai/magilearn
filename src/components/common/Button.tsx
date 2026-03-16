import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'option';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const variants = {
  primary: 'bg-[var(--color-primary)] text-white hover:brightness-110',
  secondary: 'bg-white/20 text-white hover:bg-white/30',
  success: 'bg-[var(--color-success)] text-[var(--color-text-on-light)] hover:brightness-110',
  option: 'bg-white/10 text-white border-2 border-white/20 hover:border-[var(--color-primary)] hover:bg-white/15',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl touch-target',
  md: 'px-6 py-3 text-lg rounded-2xl touch-target-lg',
  lg: 'px-8 py-4 text-xl rounded-2xl touch-target-lg',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={`font-bold transition-all ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
      aria-label={props['aria-label']}
    >
      {children}
    </motion.button>
  );
}
