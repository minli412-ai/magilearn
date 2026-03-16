import { lazy, Suspense } from 'react';
import type { ExerciseQuestion, ExerciseResult } from '../../types/index.ts';

const ListenAndTap = lazy(() => import('./french/ListenAndTap.tsx'));
const SyllableBuilder = lazy(() => import('./french/SyllableBuilder.tsx'));
const WordDecoder = lazy(() => import('./french/WordDecoder.tsx'));
const NumberCatcher = lazy(() => import('./maths/NumberCatcher.tsx'));
const CalculationRace = lazy(() => import('./maths/CalculationRace.tsx'));
const PlaceValue = lazy(() => import('./maths/PlaceValue.tsx'));
const PatternBuilder = lazy(() => import('./maths/PatternBuilder.tsx'));
const StoryProblem = lazy(() => import('./maths/StoryProblem.tsx'));
const ListenAndMatch = lazy(() => import('./english/ListenAndMatch.tsx'));
const FlashcardFlip = lazy(() => import('./english/FlashcardFlip.tsx'));

interface ExerciseRendererProps {
  question: ExerciseQuestion;
  onAnswer: (result: ExerciseResult) => void;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin text-4xl">⭐</div>
    </div>
  );
}

export function ExerciseRenderer({ question, onAnswer }: ExerciseRendererProps) {
  const props = { question, onAnswer };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {(() => {
        switch (question.type) {
          case 'listen-and-tap': return <ListenAndTap {...props} />;
          case 'syllable-builder': return <SyllableBuilder {...props} />;
          case 'word-decoder': return <WordDecoder {...props} />;
          case 'number-catcher': return <NumberCatcher {...props} />;
          case 'calculation-race': return <CalculationRace {...props} />;
          case 'place-value': return <PlaceValue {...props} />;
          case 'pattern-builder': return <PatternBuilder {...props} />;
          case 'story-problem': return <StoryProblem {...props} />;
          case 'listen-and-match': return <ListenAndMatch {...props} />;
          case 'flashcard-flip': return <FlashcardFlip {...props} />;
          default: return <NumberCatcher {...props} />;
        }
      })()}
    </Suspense>
  );
}
