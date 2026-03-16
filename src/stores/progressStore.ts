import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SkillProgress, Subject, StreakData } from '../types/index.ts';

interface ProgressState {
  skills: Record<string, SkillProgress>;
  streak: StreakData;
  sessionsCount: number;
  updateSkill: (skillKey: string, correct: boolean, subject: Subject, period: 1|2|3|4|5) => void;
  getSkill: (skillKey: string) => SkillProgress | undefined;
  getSubjectSkills: (subject: Subject) => SkillProgress[];
  updateStreak: () => void;
  incrementSessions: () => void;
}

function calculateMastery(correct: number, total: number, streak: number): number {
  if (total === 0) return 0;
  const accuracy = (correct / total) * 100;
  const streakBonus = Math.min(streak * 2, 10);
  return Math.min(100, Math.round(accuracy * 0.9 + streakBonus));
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      skills: {},
      streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: '' },
      sessionsCount: 0,

      updateSkill: (skillKey, correct, subject, period) => {
        set((state) => {
          const existing = state.skills[skillKey] || {
            id: skillKey,
            subject,
            skillKey,
            period,
            totalAttempts: 0,
            correctAttempts: 0,
            lastPracticed: new Date(),
            mastery: 0,
            streakCorrect: 0,
          };
          const totalAttempts = existing.totalAttempts + 1;
          const correctAttempts = existing.correctAttempts + (correct ? 1 : 0);
          const streakCorrect = correct ? existing.streakCorrect + 1 : 0;
          const mastery = calculateMastery(correctAttempts, totalAttempts, streakCorrect);
          return {
            skills: {
              ...state.skills,
              [skillKey]: {
                ...existing,
                totalAttempts,
                correctAttempts,
                lastPracticed: new Date(),
                mastery,
                streakCorrect,
              },
            },
          };
        });
      },

      getSkill: (skillKey) => get().skills[skillKey],

      getSubjectSkills: (subject) =>
        Object.values(get().skills).filter((s) => s.subject === subject),

      updateStreak: () => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          const { lastActiveDate, currentStreak, longestStreak } = state.streak;

          if (lastActiveDate === today) return state;

          let newStreak: number;
          if (lastActiveDate === yesterday) {
            newStreak = currentStreak + 1;
          } else {
            newStreak = 1;
          }
          return {
            streak: {
              currentStreak: newStreak,
              longestStreak: Math.max(longestStreak, newStreak),
              lastActiveDate: today,
            },
          };
        });
      },

      incrementSessions: () => set((s) => ({ sessionsCount: s.sessionsCount + 1 })),
    }),
    {
      name: 'magilearn-progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
