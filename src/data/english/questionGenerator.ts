import type { ExerciseQuestion, Difficulty, Period } from '../../types/index.ts';
import { englishVocabulary } from './vocabulary.ts';
import { shuffle } from '../../utils/shuffle.ts';

const emojiMap: Record<string, string> = {
  hello: '👋', goodbye: '👋', please: '🙏', 'thank you': '💖',
  yes: '✅', no: '❌', happy: '😊', sad: '😢',
  red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', orange: '🟠',
  purple: '🟣', white: '⚪', black: '⚫',
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
  cat: '🐱', dog: '🐶', fish: '🐟', bird: '🐦', rabbit: '🐰',
  horse: '🐴', cow: '🐮', pig: '🐷',
  apple: '🍎', banana: '🍌', milk: '🥛', water: '💧',
  mother: '👩', father: '👨', brother: '👦', sister: '👧',
  head: '😶', hand: '✋', foot: '🦶', eye: '👁️',
};

export function generateEnglishQuestions(
  period: Period,
  _difficulty: Difficulty,
  count: number
): ExerciseQuestion[] {
  const available = englishVocabulary.filter((v) => v.period <= period);
  const questions: ExerciseQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    const word = available[Math.floor(Math.random() * available.length)];
    const distractors = shuffle(available.filter((v) => v.english !== word.english))
      .slice(0, 3);

    if (roll < 0.5) {
      // Listen and Match: hear English word, pick the emoji/image
      questions.push({
        id: `en-lm-${i}-${Date.now()}`,
        type: 'listen-and-match',
        subject: 'english',
        prompt: 'What do you hear?',
        correctAnswer: word.english,
        options: shuffle([word, ...distractors].map((w) => w.english)),
        audioText: word.english,
        audioLang: 'en-GB',
        imageEmoji: emojiMap[word.english] || '❓',
        extraData: {
          allEmojis: [word, ...distractors].reduce((acc, w) => {
            acc[w.english] = emojiMap[w.english] || '❓';
            return acc;
          }, {} as Record<string, string>),
        },
      });
    } else {
      // Flashcard Flip: see emoji, pick the English word
      questions.push({
        id: `en-ff-${i}-${Date.now()}`,
        type: 'flashcard-flip',
        subject: 'english',
        prompt: `Comment dit-on "${word.french}" en anglais ?`,
        correctAnswer: word.english,
        options: shuffle([word.english, ...distractors.map((d) => d.english)]),
        audioText: word.english,
        audioLang: 'en-GB',
        imageEmoji: emojiMap[word.english] || '❓',
        extraData: { french: word.french },
      });
    }
  }

  return questions.slice(0, count);
}
