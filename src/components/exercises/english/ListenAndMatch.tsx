import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ExerciseQuestion, ExerciseResult } from '../../../types/index.ts';
import { speak } from '../../../utils/tts.ts';
import { CharacterBubble } from '../../common/CharacterBubble.tsx';

interface Props {
  question: ExerciseQuestion;
  onAnswer: (result: ExerciseResult) => void;
}

export default function ListenAndMatch({ question, onAnswer }: Props) {
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const startTime = Date.now();

  const allEmojis = (question.extraData?.allEmojis as Record<string, string>) || {};

  useEffect(() => {
    if (question.audioText) {
      speak(question.audioText, question.audioLang || 'en-GB');
    }
  }, [question]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const correct = option === question.correctAnswer;

    if (correct || newAttempts >= 3) {
      setAnswered(true);
      onAnswer({
        questionId: question.id,
        correct,
        attempts: newAttempts,
        timeMs: Date.now() - startTime,
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CharacterBubble message="What do you hear? Tap the right picture!" />

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4">
        {question.options?.map((opt, i) => {
          const optStr = String(opt);
          const isCorrect = optStr === String(question.correctAnswer);
          const isSelected = selected === optStr;
          let bg = 'bg-white/10 hover:bg-white/15';
          if (answered && isCorrect) bg = 'bg-green-500/40 ring-2 ring-green-400';
          else if (isSelected && !isCorrect) bg = 'bg-orange-400/40';

          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(optStr)}
              disabled={answered}
              className={`${bg} p-6 rounded-2xl text-center transition-all touch-target-lg flex flex-col items-center gap-2`}
              aria-label={optStr}
            >
              <span className="text-5xl">{allEmojis[optStr] || '❓'}</span>
              <span className="text-lg font-bold">{optStr}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
