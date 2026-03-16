import type { SkillProgress, Subject, ExerciseQuestion, Difficulty, Period } from '../types/index.ts';
import { shuffle } from './shuffle.ts';
import { generateFrenchQuestions } from '../data/french/questionGenerator.ts';
import { generateMathQuestions } from '../data/maths/questionGenerator.ts';
import { generateEnglishQuestions } from '../data/english/questionGenerator.ts';

export function pickExercises(
  subject: Subject,
  count: number,
  allSkills: Record<string, SkillProgress>
): ExerciseQuestion[] {
  const subjectSkills = Object.values(allSkills).filter((s) => s.subject === subject);

  // Determine current period based on progress
  let currentPeriod: Period = 1;
  for (const skill of subjectSkills) {
    if (skill.mastery >= 85 && skill.period >= currentPeriod) {
      currentPeriod = Math.min(5, skill.period + 1) as 1|2|3|4|5;
    }
  }

  // Determine difficulty from average mastery
  const avgMastery = subjectSkills.length > 0
    ? subjectSkills.reduce((sum, s) => sum + s.mastery, 0) / subjectSkills.length
    : 0;
  const difficulty: Difficulty = avgMastery < 40 ? 1 : avgMastery < 70 ? 2 : 3;

  // Generate questions based on subject
  let questions: ExerciseQuestion[];
  switch (subject) {
    case 'french':
      questions = generateFrenchQuestions(currentPeriod, difficulty, count + 2);
      break;
    case 'maths':
      questions = generateMathQuestions(currentPeriod, difficulty, count + 2);
      break;
    case 'english':
      questions = generateEnglishQuestions(currentPeriod, difficulty, count + 2);
      break;
  }

  return shuffle(questions).slice(0, count);
}
