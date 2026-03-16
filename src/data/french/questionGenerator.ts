import type { ExerciseQuestion, Difficulty, Period } from '../../types/index.ts';
import { cgpProgression } from './cgpProgression.ts';
import { wordBank } from './wordBank.ts';
import { shuffle } from '../../utils/shuffle.ts';

export function generateFrenchQuestions(
  period: Period,
  difficulty: Difficulty,
  count: number
): ExerciseQuestion[] {
  const questions: ExerciseQuestion[] = [];
  const availableCGPs = cgpProgression.filter((c) => c.period <= period);
  const availableWords = wordBank.filter((w) => w.period <= period);

  // Mix of exercise types
  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    if (roll < 0.35) {
      // Listen and Tap: hear a sound, pick the grapheme
      const cgp = availableCGPs[Math.floor(Math.random() * availableCGPs.length)];
      const distractors = shuffle(availableCGPs.filter((c) => c.grapheme !== cgp.grapheme))
        .slice(0, 3)
        .map((c) => c.grapheme);
      questions.push({
        id: `fr-lat-${i}-${Date.now()}`,
        type: 'listen-and-tap',
        subject: 'french',
        prompt: `Quel son entends-tu ?`,
        correctAnswer: cgp.grapheme,
        options: shuffle([cgp.grapheme, ...distractors]),
        audioText: cgp.keywords[0] || cgp.grapheme,
        audioLang: 'fr-FR',
        extraData: { grapheme: cgp.grapheme, phoneme: cgp.phoneme },
      });
    } else if (roll < 0.65) {
      // Syllable Builder: see a word, tap syllables in order
      const word = availableWords[Math.floor(Math.random() * availableWords.length)];
      if (word.syllables.length >= 2) {
        questions.push({
          id: `fr-sb-${i}-${Date.now()}`,
          type: 'syllable-builder',
          subject: 'french',
          prompt: `Construis le mot en tapant les syllabes dans l'ordre`,
          correctAnswer: word.syllables.join('-'),
          options: shuffle([...word.syllables]),
          audioText: word.text,
          audioLang: 'fr-FR',
          extraData: { word: word.text, syllables: word.syllables },
        });
      } else {
        i--; // retry
        continue;
      }
    } else {
      // Word Decoder: hear a word, pick it from options
      const word = availableWords[Math.floor(Math.random() * availableWords.length)];
      const distractors = shuffle(availableWords.filter((w) => w.text !== word.text))
        .slice(0, 3)
        .map((w) => w.text);
      questions.push({
        id: `fr-wd-${i}-${Date.now()}`,
        type: 'word-decoder',
        subject: 'french',
        prompt: `Quel mot entends-tu ?`,
        correctAnswer: word.text,
        options: shuffle([word.text, ...distractors]),
        audioText: word.text,
        audioLang: 'fr-FR',
      });
    }
  }

  return questions.slice(0, count);
}
