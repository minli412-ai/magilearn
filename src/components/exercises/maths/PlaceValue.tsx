import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ExerciseQuestion, ExerciseResult } from '../../../types/index.ts';
import { speakDelayed } from '../../../utils/tts.ts';
import { CharacterBubble } from '../../common/CharacterBubble.tsx';
import { Button } from '../../common/Button.tsx';

interface Props {
  question: ExerciseQuestion;
  onAnswer: (result: ExerciseResult) => void;
}

export default function PlaceValue({ question, onAnswer }: Props) {
  const [dizaines, setDizaines] = useState(0);
  const [unites, setUnites] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);
  const startTime = Date.now();

  const target = question.extraData as { number: number; dizaines: number; unites: number };

  useEffect(() => {
    if (question.audioText) {
      const cancel = speakDelayed(question.audioText, question.audioLang || 'fr-FR');
      return cancel;
    }
  }, [question]);

  const handleSubmit = () => {
    if (answered) return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const correct = dizaines === target.dizaines && unites === target.unites;

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
      <CharacterBubble message={question.prompt} />

      <div className="text-6xl font-bold font-literacy mb-8 text-[var(--color-primary)]">
        {target.number}
      </div>

      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <p className="text-sm opacity-60 mb-2">Dizaines</p>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDizaines(Math.max(0, dizaines - 1))} className="w-12 h-12 rounded-full bg-white/10 text-2xl font-bold touch-target" disabled={answered}>-</motion.button>
            <span className="text-3xl font-bold w-12 text-center font-literacy">{dizaines}</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDizaines(Math.min(9, dizaines + 1))} className="w-12 h-12 rounded-full bg-white/10 text-2xl font-bold touch-target" disabled={answered}>+</motion.button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-60 mb-2">Unités</p>
          <div className="flex items-center gap-2">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setUnites(Math.max(0, unites - 1))} className="w-12 h-12 rounded-full bg-white/10 text-2xl font-bold touch-target" disabled={answered}>-</motion.button>
            <span className="text-3xl font-bold w-12 text-center font-literacy">{unites}</span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setUnites(Math.min(9, unites + 1))} className="w-12 h-12 rounded-full bg-white/10 text-2xl font-bold touch-target" disabled={answered}>+</motion.button>
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={answered}>
        Vérifier
      </Button>
    </div>
  );
}
