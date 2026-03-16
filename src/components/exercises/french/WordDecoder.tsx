import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ExerciseQuestion, ExerciseResult } from '../../../types/index.ts';
import { speakDelayed } from '../../../utils/tts.ts';
import { CharacterBubble } from '../../common/CharacterBubble.tsx';

interface Props {
  question: ExerciseQuestion;
  onAnswer: (result: ExerciseResult) => void;
}

export default function WordDecoder({ question, onAnswer }: Props) {
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | number | null>(null);
  const startTime = Date.now();

  useEffect(() => {
    if (question.audioText) {
      const cancel = speakDelayed(question.audioText, question.audioLang || 'fr-FR');
      return cancel;
    }
  }, [question]);

  const handleSelect = (option: string | number) => {
    if (answered) return;
    setSelected(option);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const correct = String(option) === String(question.correctAnswer);

    if (correct || newAttempts >= 3) {
      setAnswered(true);
      onAnswer({
        questionId: question.id,
        correct,
        attempts: newAttempts,
        timeMs: Date.now() - startTime,
      });
    } else if (newAttempts >= 2) {
      setShowHint(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <CharacterBubble message={question.prompt} />

      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4">
        {question.options?.map((opt, i) => {
          const isCorrect = String(opt) === String(question.correctAnswer);
          const isSelected = selected === opt;
          let bg = 'bg-white/10 hover:bg-white/15';
          if (answered && isCorrect) bg = 'bg-green-500/40 ring-2 ring-green-400';
          else if (isSelected && !isCorrect) bg = 'bg-orange-400/40';
          else if (showHint && isCorrect) bg = 'bg-white/20 ring-1 ring-white/40';

          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              className={`${bg} p-5 rounded-2xl text-center font-bold text-xl transition-all touch-target-lg font-literacy`}
              aria-label={String(opt)}
            >
              {String(opt)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
