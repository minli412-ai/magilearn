import type { SkillProgress } from '../types/index.ts';

export function needsReview(skill: SkillProgress): boolean {
  if (skill.mastery < 85) return true;
  const daysSince = (Date.now() - new Date(skill.lastPracticed).getTime()) / (1000 * 60 * 60 * 24);
  // Review mastered skills every 3-7 days based on mastery level
  const reviewInterval = skill.mastery >= 95 ? 7 : skill.mastery >= 90 ? 5 : 3;
  return daysSince >= reviewInterval;
}
