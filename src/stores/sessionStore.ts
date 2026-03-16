import { create } from 'zustand';
import type { Subject, ExerciseQuestion, ExerciseResult } from '../types/index.ts';

interface SessionState {
  active: boolean;
  currentSubject: Subject | null;
  questions: ExerciseQuestion[];
  currentIndex: number;
  results: ExerciseResult[];
  starsEarned: number;
  startTime: number;
  consecutiveCorrect: number;

  startSession: (subject: Subject, questions: ExerciseQuestion[]) => void;
  recordAnswer: (result: ExerciseResult) => void;
  nextQuestion: () => void;
  addStar: (count: number) => void;
  endSession: () => { starsEarned: number; results: ExerciseResult[]; durationMs: number };
  reset: () => void;
}

export const useSessionStore = create<SessionState>()((set, get) => ({
  active: false,
  currentSubject: null,
  questions: [],
  currentIndex: 0,
  results: [],
  starsEarned: 0,
  startTime: 0,
  consecutiveCorrect: 0,

  startSession: (subject, questions) =>
    set({
      active: true,
      currentSubject: subject,
      questions,
      currentIndex: 0,
      results: [],
      starsEarned: 0,
      startTime: Date.now(),
      consecutiveCorrect: 0,
    }),

  recordAnswer: (result) =>
    set((s) => {
      const consecutiveCorrect = result.correct ? s.consecutiveCorrect + 1 : 0;
      let newStars = 0;
      if (result.correct && result.attempts === 1) {
        newStars = 1;
        if (consecutiveCorrect >= 3 && consecutiveCorrect % 3 === 0) {
          newStars = 2;
        }
      }
      return {
        results: [...s.results, result],
        starsEarned: s.starsEarned + newStars,
        consecutiveCorrect,
      };
    }),

  nextQuestion: () =>
    set((s) => ({ currentIndex: s.currentIndex + 1 })),

  addStar: (count) =>
    set((s) => ({ starsEarned: s.starsEarned + count })),

  endSession: () => {
    const s = get();
    const summary = {
      starsEarned: s.starsEarned,
      results: s.results,
      durationMs: Date.now() - s.startTime,
    };
    return summary;
  },

  reset: () =>
    set({
      active: false,
      currentSubject: null,
      questions: [],
      currentIndex: 0,
      results: [],
      starsEarned: 0,
      startTime: 0,
      consecutiveCorrect: 0,
    }),
}));
