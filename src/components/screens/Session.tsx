import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2 } from 'lucide-react';
import type { Subject, ExerciseQuestion, ExerciseResult } from '../../types/index.ts';
import { useSessionStore } from '../../stores/sessionStore.ts';
import { useProgressStore } from '../../stores/progressStore.ts';
import { useProfileStore } from '../../stores/profileStore.ts';
import { pickExercises } from '../../utils/exercisePicker.ts';
import { ProgressBar } from '../common/ProgressBar.tsx';
import { FeedbackOverlay } from '../common/FeedbackOverlay.tsx';
import { StarBurst } from '../common/StarBurst.tsx';
import { ExerciseRenderer } from '../exercises/ExerciseRenderer.tsx';
import { SessionSummary } from './SessionSummary.tsx';
import { speak } from '../../utils/tts.ts';

interface SessionProps {
  subject: Subject;
  onBack: () => void;
}

export function Session({ subject, onBack }: SessionProps) {
  const sessionStore = useSessionStore();
  const progressStore = useProgressStore();
  const addStars = useProfileStore((s) => s.addStars);
  const skills = useProgressStore((s) => s.skills);

  const [feedbackState, setFeedbackState] = useState<{ show: boolean; correct: boolean; message?: string }>({
    show: false,
    correct: false,
  });
  const [showStarBurst, setShowStarBurst] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Initialize session
  useEffect(() => {
    const questions = pickExercises(subject, 5, skills);
    sessionStore.startSession(subject, questions);
  }, [subject]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentQuestion: ExerciseQuestion | null =
    sessionStore.questions[sessionStore.currentIndex] || null;

  const handleAnswer = useCallback(
    (result: ExerciseResult) => {
      sessionStore.recordAnswer(result);

      // Update skill progress
      const skillKey = `${subject}-${currentQuestion?.type}-${currentQuestion?.id?.split('-').slice(0, 3).join('-')}`;
      progressStore.updateSkill(skillKey, result.correct, subject, 1);

      // Show feedback
      setFeedbackState({ show: true, correct: result.correct });

      if (result.correct && result.attempts === 1) {
        setShowStarBurst(true);
        setTimeout(() => setShowStarBurst(false), 1500);
      }
    },
    [sessionStore, progressStore, subject, currentQuestion]
  );

  const handleFeedbackComplete = useCallback(() => {
    setFeedbackState({ show: false, correct: false });

    if (sessionStore.currentIndex >= sessionStore.questions.length - 1) {
      // Session complete
      const summary = sessionStore.endSession();
      addStars(summary.starsEarned);
      progressStore.updateStreak();
      progressStore.incrementSessions();
      setShowSummary(true);
    } else {
      sessionStore.nextQuestion();
    }
  }, [sessionStore, addStars, progressStore]);

  if (showSummary) {
    return (
      <SessionSummary
        starsEarned={sessionStore.starsEarned}
        results={sessionStore.results}
        totalQuestions={sessionStore.questions.length}
        onContinue={onBack}
      />
    );
  }

  return (
    <div className="h-full flex flex-col p-4 md:p-6 max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="touch-target p-2 rounded-full bg-white/10"
          aria-label="Retour"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <ProgressBar
          current={sessionStore.currentIndex + 1}
          total={sessionStore.questions.length}
          className="flex-1"
        />
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <span className="font-bold">{sessionStore.starsEarned}</span>
        </div>
      </div>

      {/* Exercise area */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ExerciseRenderer
                question={currentQuestion}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio replay */}
      {currentQuestion?.audioText && (
        <div className="flex justify-end pb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => speak(currentQuestion.audioText!, currentQuestion.audioLang || 'fr-FR')}
            className="touch-target bg-[var(--color-primary)] rounded-full p-3 shadow-lg"
            aria-label="Rejouer le son"
          >
            <Volume2 size={24} color="white" />
          </motion.button>
        </div>
      )}

      <FeedbackOverlay
        show={feedbackState.show}
        correct={feedbackState.correct}
        message={feedbackState.message}
        onComplete={handleFeedbackComplete}
      />
      <StarBurst show={showStarBurst} />
    </div>
  );
}
