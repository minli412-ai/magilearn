import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ExerciseQuestion, ExerciseResult } from '../../../types/index.ts';
import { speakDelayed } from '../../../utils/tts.ts';
import { CharacterBubble } from '../../common/CharacterBubble.tsx';

interface Props {
  question: ExerciseQuestion;
  onAnswer: (result: ExerciseResult) => void;
}

export default function SyllableBuilder({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>(question.options as string[] || []);
  const [attempts, setAttempts] = useState(0);
  const [answered, setAnswered] = useState(false);
  const startTime = Date.now();

  const syllables = (question.extraData?.syllables as string[]) || [];

  useEffect(() => {
    if (question.audioText) {
      const cancel = speakDelayed(question.audioText, question.audioLang || 'fr-FR');
      return cancel;
    }
  }, [question]);

  const handleTap = (syllable: string, index: number) => {
    if (answered) return;
    setSelected((prev) => [...prev, syllable]);
    setAvailable((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemove = (index: number) => {
    if (answered) return;
    const removed = selected[index];
    setSelected((prev) => prev.filter((_, i) => i !== index));
    setAvailable((prev) => [...prev, removed]);
  };

  useEffect(() => {
    if (selected.length !== syllables.length || answered) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const correct = selected.join('-') === syllables.join('-');

    if (correct || newAttempts >= 3) {
      setAnswered(true);
      onAnswer({
        questionId: question.id,
        correct,
        attempts: newAttempts,
        timeMs: Date.now() - startTime,
      });
    } else {
      setTimeout(() => {
        setAvailable(question.options as string[] || []);
        setSelected([]);
      }, 500);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center">
      <CharacterBubble message={question.prompt} />

      <div className="flex gap-2 mb-6 min-h-[72px] p-3 bg-white/5 rounded-2xl w-full max-w-lg justify-center flex-wrap">
        {selected.length === 0 && (
          <span className="text-white/30 text-lg self-center">Tape les syllabes dans l'ordre</span>
        )}
        {selected.map((s, i) => (
          <motion.button
            key={`sel-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleRemove(i)}
            className="bg-[var(--color-primary)] text-white px-5 py-3 rounded-xl text-xl font-bold font-literacy touch-target"
          >
            {s}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {available.map((s, i) => (
          <motion.button
            key={`avail-${i}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTap(s, i)}
            className="bg-white/10 text-white px-5 py-3 rounded-xl text-xl font-bold font-literacy touch-target-lg hover:bg-white/15"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
