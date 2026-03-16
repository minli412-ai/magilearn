import { motion, AnimatePresence } from 'framer-motion';

interface StarBurstProps {
  show: boolean;
  count?: number;
}

export function StarBurst({ show, count = 1 }: StarBurstProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.5 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="fixed top-4 right-4 z-40 flex items-center gap-1"
        >
          {Array.from({ length: count }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 500 }}
              className="text-4xl"
            >
              ⭐
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
