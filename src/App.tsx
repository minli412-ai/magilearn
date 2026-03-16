import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProfileStore } from './stores/profileStore.ts';
import { applyThemeToDOM, getTheme } from './themes/index.ts';
import { Onboarding } from './components/screens/Onboarding.tsx';
import { Home } from './components/screens/Home.tsx';
import { Session } from './components/screens/Session.tsx';
import { WorldMap } from './components/screens/WorldMap.tsx';
import { Badges } from './components/screens/Badges.tsx';
import { Settings } from './components/screens/Settings.tsx';
import type { Subject } from './types/index.ts';
import { unlockSpeech } from './utils/tts.ts';

type Screen = 'home' | 'session' | 'worldmap' | 'badges' | 'settings';

export function App() {
  const { onboarded, theme } = useProfileStore();
  const [screen, setScreen] = useState<Screen>('home');
  const [sessionSubject, setSessionSubject] = useState<Subject>('french');
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    applyThemeToDOM(getTheme(theme));
  }, [theme]);

  const handleFirstInteraction = () => {
    if (!audioUnlocked) {
      unlockSpeech();
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        ctx.resume().then(() => ctx.close());
      } catch (_) { /* ignore */ }
      setAudioUnlocked(true);
    }
  };

  if (!onboarded) {
    return (
      <div onClick={handleFirstInteraction} className="h-full">
        <Onboarding />
      </div>
    );
  }

  const handleStartSession = (subject: Subject) => {
    handleFirstInteraction();
    setSessionSubject(subject);
    setScreen('session');
  };

  return (
    <div onClick={handleFirstInteraction} className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: screen === 'home' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {screen === 'home' && (
            <Home
              onStartSession={handleStartSession}
              onNavigate={(s) => setScreen(s as Screen)}
            />
          )}
          {screen === 'session' && (
            <Session
              subject={sessionSubject}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === 'worldmap' && <WorldMap onBack={() => setScreen('home')} />}
          {screen === 'badges' && <Badges onBack={() => setScreen('home')} />}
          {screen === 'settings' && <Settings onBack={() => setScreen('home')} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
