import { useState, useCallback, useRef } from 'react';
import type { ExerciseQuestion, ExerciseResult, ExerciseState } from '../types/index.ts';
import { speak } from '../utils/tts.ts';

interface UseExerciseReturn {
  state: ExerciseState;
  attempts: number;
  showHint: boolean;
  submitAnswer: (answer: string | number) => ExerciseResult | null;
  playAudio: () => void;
  reset: () => void;
}

export function useExercise(question: ExerciseQuestion | null): UseExerciseReturn {
  const [state, setState] = useState<ExerciseState>('loading');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const startTime = useRef(Date.now());

  const playAudio = useCallback(() => {
    if (question?.audioText) {
      speak(question.audioText, question.audioLang || 'fr-FR');
    }
  }, [question]);

  const submitAnswer = useCallback(
    (answer: string | number): ExerciseResult | null => {
      if (!question || state === 'feedback' || state === 'complete') return null;

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      const correct = String(answer) === String(question.correctAnswer);

      if (correct) {
        setState('feedback');
        return {
          questionId: question.id,
          correct: true,
          attempts: newAttempts,
          timeMs: Date.now() - startTime.current,
        };
      }

      // Incorrect
      if (newAttempts >= 2) setShowHint(true);
      if (newAttempts >= 3) {
        setState('feedback');
        return {
          questionId: question.id,
          correct: false,
          attempts: newAttempts,
          timeMs: Date.now() - startTime.current,
        };
      }

      return null; // Not resolved yet, try again
    },
    [question, attempts, state]
  );

  const reset = useCallback(() => {
    setState('playing');
    setAttempts(0);
    setShowHint(false);
    startTime.current = Date.now();
  }, []);

  return { state, attempts, showHint, submitAnswer, playAudio, reset };
}
