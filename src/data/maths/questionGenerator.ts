import type { ExerciseQuestion, Difficulty, Period } from '../../types/index.ts';
import { shuffle } from '../../utils/shuffle.ts';

const objectEmojis = ['🍎', '⭐', '🐟', '🎈', '🌸', '🦋', '🍪', '🎲'];

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeDistractors(answer: number, count: number, min: number, max: number): number[] {
  const set = new Set<number>();
  set.add(answer);
  while (set.size < count + 1) {
    const d = randInt(min, max);
    if (d !== answer) set.add(d);
  }
  set.delete(answer);
  return [...set].slice(0, count);
}

export function generateMathQuestions(
  period: Period,
  difficulty: Difficulty,
  count: number
): ExerciseQuestion[] {
  const questions: ExerciseQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const roll = Math.random();

    if (period === 1) {
      if (roll < 0.3) {
        // Counting
        const target = randInt(1, difficulty === 1 ? 5 : 10);
        const emoji = objectEmojis[randInt(0, objectEmojis.length - 1)];
        const distractors = makeDistractors(target, 3, 1, 10);
        questions.push({
          id: `math-count-${i}-${Date.now()}`,
          type: 'number-catcher',
          subject: 'maths',
          prompt: `Combien de ${emoji} vois-tu ?`,
          correctAnswer: target,
          options: shuffle([target, ...distractors]),
          imageEmoji: emoji.repeat(target),
          audioText: `Combien de objets vois-tu ?`,
          audioLang: 'fr-FR',
        });
      } else if (roll < 0.6) {
        // Addition within 10
        const maxNum = difficulty === 1 ? 5 : 10;
        const a = randInt(1, maxNum - 1);
        const b = randInt(1, maxNum - a);
        const sum = a + b;
        const distractors = makeDistractors(sum, 3, 1, maxNum);
        questions.push({
          id: `math-add-${i}-${Date.now()}`,
          type: 'calculation-race',
          subject: 'maths',
          prompt: `${a} + ${b} = ?`,
          correctAnswer: sum,
          options: shuffle([sum, ...distractors]),
          audioText: `Combien font ${a} plus ${b} ?`,
          audioLang: 'fr-FR',
          extraData: { operation: 'addition', a, b },
        });
      } else {
        // Comparison
        const a = randInt(1, 10);
        const b = randInt(1, 10);
        const answer = a < b ? '<' : a > b ? '>' : '=';
        questions.push({
          id: `math-comp-${i}-${Date.now()}`,
          type: 'number-catcher',
          subject: 'maths',
          prompt: `${a} ... ${b}`,
          correctAnswer: answer,
          options: ['<', '>', '='],
          audioText: `${a} est plus grand, plus petit ou égal à ${b} ?`,
          audioLang: 'fr-FR',
          extraData: { operation: 'comparison', a, b },
        });
      }
    } else if (period === 2) {
      if (roll < 0.4) {
        // Addition/Subtraction within 20
        const isAdd = Math.random() > 0.5;
        if (isAdd) {
          const a = randInt(1, 15);
          const b = randInt(1, 20 - a);
          const sum = a + b;
          const distractors = makeDistractors(sum, 3, 1, 20);
          questions.push({
            id: `math-add20-${i}-${Date.now()}`,
            type: 'calculation-race',
            subject: 'maths',
            prompt: `${a} + ${b} = ?`,
            correctAnswer: sum,
            options: shuffle([sum, ...distractors]),
            audioText: `Combien font ${a} plus ${b} ?`,
            audioLang: 'fr-FR',
            extraData: { operation: 'addition', a, b },
          });
        } else {
          const a = randInt(5, 20);
          const b = randInt(1, a);
          const diff = a - b;
          const distractors = makeDistractors(diff, 3, 0, 20);
          questions.push({
            id: `math-sub-${i}-${Date.now()}`,
            type: 'calculation-race',
            subject: 'maths',
            prompt: `${a} - ${b} = ?`,
            correctAnswer: diff,
            options: shuffle([diff, ...distractors]),
            audioText: `Combien font ${a} moins ${b} ?`,
            audioLang: 'fr-FR',
            extraData: { operation: 'subtraction', a, b },
          });
        }
      } else {
        // Place value
        const num = randInt(11, 59);
        const dizaines = Math.floor(num / 10);
        const unites = num % 10;
        questions.push({
          id: `math-pv-${i}-${Date.now()}`,
          type: 'place-value',
          subject: 'maths',
          prompt: `${num} = ? dizaines et ? unités`,
          correctAnswer: `${dizaines}-${unites}`,
          audioText: `Combien de dizaines et d'unités dans ${num} ?`,
          audioLang: 'fr-FR',
          extraData: { number: num, dizaines, unites },
        });
      }
    } else {
      // Period 3+: larger numbers and more operations
      if (roll < 0.4) {
        const maxVal = period >= 4 ? 100 : 60;
        const a = randInt(10, maxVal - 10);
        const b = randInt(1, Math.min(maxVal - a, 50));
        const sum = a + b;
        const distractors = makeDistractors(sum, 3, 10, maxVal + 20);
        questions.push({
          id: `math-add100-${i}-${Date.now()}`,
          type: 'calculation-race',
          subject: 'maths',
          prompt: `${a} + ${b} = ?`,
          correctAnswer: sum,
          options: shuffle([sum, ...distractors]),
          audioText: `Combien font ${a} plus ${b} ?`,
          audioLang: 'fr-FR',
          extraData: { operation: 'addition', a, b },
        });
      } else if (roll < 0.7) {
        // Pattern
        const step = randInt(2, difficulty === 1 ? 5 : 10);
        const start = randInt(0, 10);
        const seq: (number | null)[] = [];
        const missingIdx = randInt(1, 3);
        let answer = 0;
        for (let j = 0; j < 5; j++) {
          const val = start + step * j;
          if (j === missingIdx) {
            seq.push(null);
            answer = val;
          } else {
            seq.push(val);
          }
        }
        const distractors = makeDistractors(answer, 3, 0, 100);
        questions.push({
          id: `math-pat-${i}-${Date.now()}`,
          type: 'pattern-builder',
          subject: 'maths',
          prompt: `Trouve le nombre manquant`,
          correctAnswer: answer,
          options: shuffle([answer, ...distractors]),
          audioText: 'Quel est le nombre manquant dans la suite ?',
          audioLang: 'fr-FR',
          extraData: { sequence: seq, step },
        });
      } else if (period >= 4) {
        // Word problem
        const problems = [
          { text: 'Marie a {a} pommes. Elle en mange {b}. Combien lui en reste-t-il ?', emoji: '🍎', op: 'sub' as const },
          { text: 'Tom a {a} billes. Léa lui en donne {b}. Combien Tom a-t-il de billes ?', emoji: '🔵', op: 'add' as const },
          { text: 'Il y a {a} oiseaux sur un arbre. {b} s\'envolent. Combien en reste-t-il ?', emoji: '🐦', op: 'sub' as const },
        ];
        const prob = problems[randInt(0, problems.length - 1)];
        const a = randInt(5, 20);
        const b = prob.op === 'sub' ? randInt(1, a) : randInt(1, 15);
        const answer = prob.op === 'sub' ? a - b : a + b;
        const text = prob.text.replace('{a}', String(a)).replace('{b}', String(b));
        const distractors = makeDistractors(answer, 3, 1, 30);
        questions.push({
          id: `math-wp-${i}-${Date.now()}`,
          type: 'story-problem',
          subject: 'maths',
          prompt: text,
          correctAnswer: answer,
          options: shuffle([answer, ...distractors]),
          audioText: text,
          audioLang: 'fr-FR',
          imageEmoji: prob.emoji,
        });
      } else {
        i--;
        continue;
      }
    }
  }

  return questions.slice(0, count);
}
