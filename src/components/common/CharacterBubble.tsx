import { motion } from 'framer-motion';
import { useProfileStore } from '../../stores/profileStore.ts';
import { getTheme } from '../../themes/index.ts';

interface CharacterBubbleProps {
  message: string;
}

const characterEmojis = {
  space: '🦊',
  ocean: '🐬',
  forest: '🦉',
};

export function CharacterBubble({ message }: CharacterBubbleProps) {
  const themeId = useProfileStore((s) => s.theme);
  const theme = getTheme(themeId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-3 mb-4"
    >
      <div className="text-4xl">{characterEmojis[themeId]}</div>
      <div className="bg-white/15 backdrop-blur-sm rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
        <p className="text-lg" style={{ fontFamily: 'var(--font-nunito)' }}>
          <span className="font-bold text-[var(--color-primary)]">{theme.character.name} : </span>
          {message}
        </p>
      </div>
    </motion.div>
  );
}
