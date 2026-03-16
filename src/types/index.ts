export type ThemeId = 'space' | 'ocean' | 'forest';
export type Subject = 'french' | 'maths' | 'english';
export type Period = 1 | 2 | 3 | 4 | 5;
export type Difficulty = 1 | 2 | 3;

export interface ChildProfile {
  id: string;
  name: string;
  theme: ThemeId;
  createdAt: Date;
}

export interface SkillProgress {
  id: string;
  subject: Subject;
  skillKey: string;
  period: Period;
  totalAttempts: number;
  correctAttempts: number;
  lastPracticed: Date;
  mastery: number;
  streakCorrect: number;
}

export interface SessionLog {
  id: string;
  date: Date;
  durationSeconds: number;
  subjects: Subject[];
  exercisesCompleted: number;
  correctAnswers: number;
  starsEarned: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: BadgeCondition;
  unlockedAt: Date | null;
}

export type BadgeCondition =
  | { type: 'streak'; days: number }
  | { type: 'skill-mastery'; skillKey: string }
  | { type: 'period-complete'; subject: string; period: number }
  | { type: 'stars-total'; count: number }
  | { type: 'sessions-total'; count: number };

export interface CGPEntry {
  grapheme: string;
  phoneme: string;
  period: Period;
  audioFile: string;
  keywords: string[];
}

export interface FrenchWord {
  text: string;
  syllables: string[];
  audioFile: string;
  imageFile?: string;
  requiredCGPs: string[];
  period: number;
  frequency: 'high' | 'medium' | 'low';
}

export interface FrenchSentence {
  text: string;
  audioFile: string;
  words: string[];
  comprehensionQuestion?: {
    question: string;
    choices: string[];
    correctIndex: number;
    audioFile: string;
  };
  period: number;
  difficulty: Difficulty;
}

export interface MathExercise {
  id: string;
  type: MathExerciseType;
  period: Period;
  difficulty: Difficulty;
  data: MathExerciseData;
  audioPrompt?: string;
}

export type MathExerciseType =
  | 'counting' | 'comparison' | 'addition' | 'subtraction'
  | 'place-value' | 'word-problem' | 'geometry' | 'pattern';

export type MathExerciseData =
  | { type: 'counting'; target: number; objects: string }
  | { type: 'comparison'; a: number; b: number; operator: '<' | '>' | '=' }
  | { type: 'addition'; a: number; b: number; sum: number }
  | { type: 'subtraction'; a: number; b: number; difference: number }
  | { type: 'place-value'; number: number; dizaines: number; unites: number }
  | { type: 'word-problem'; text: string; illustration: string; answer: number; choices: number[] }
  | { type: 'geometry'; shape: string; task: 'identify' | 'name' | 'sort' }
  | { type: 'pattern'; sequence: (number | string | null)[]; missing: number; answer: number | string };

export interface EnglishVocab {
  english: string;
  french: string;
  audioFile: string;
  imageFile: string;
  theme: string;
  period: Period;
}

export interface EnglishPhrase {
  english: string;
  french: string;
  audioFile: string;
  structure: string;
  theme: string;
  period: number;
}

export type ExerciseType =
  | 'listen-and-tap' | 'syllable-builder' | 'word-decoder'
  | 'sentence-reader' | 'sound-hunt' | 'dictation'
  | 'number-catcher' | 'place-value' | 'calculation-race'
  | 'balance-scale' | 'story-problem' | 'shape-explorer' | 'pattern-builder'
  | 'listen-and-match' | 'repeat-after-me' | 'flashcard-flip'
  | 'song-and-rhyme' | 'mini-dialogue';

export interface ExerciseQuestion {
  id: string;
  type: ExerciseType;
  subject: Subject;
  prompt: string;
  correctAnswer: string | number;
  options?: (string | number)[];
  audioText?: string;
  audioLang?: 'fr-FR' | 'en-GB';
  imageEmoji?: string;
  extraData?: Record<string, unknown>;
}

export type ExerciseState = 'loading' | 'playing' | 'answered' | 'feedback' | 'complete';

export interface ExerciseResult {
  questionId: string;
  correct: boolean;
  attempts: number;
  timeMs: number;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  character: {
    name: string;
    species: string;
    greeting: string;
    encouragement: string[];
    imagePath: string;
  };
  colors: {
    bgDark: string;
    bgLight: string;
    primary: string;
    success: string;
    encouraging: string;
    textOnDark: string;
    textOnLight: string;
  };
  rewards: {
    currency: string;
    currencyIcon: string;
    mapZoneNames: string[];
  };
}
