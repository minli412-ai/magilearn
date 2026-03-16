import { useCallback, useRef } from 'react';
import { speak, cancelSpeech } from '../utils/tts.ts';

export function useAudio() {
  const isPlaying = useRef(false);

  const play = useCallback(async (text: string, lang: 'fr-FR' | 'en-GB' = 'fr-FR') => {
    if (isPlaying.current) {
      cancelSpeech();
    }
    isPlaying.current = true;
    try {
      await speak(text, lang);
    } finally {
      isPlaying.current = false;
    }
  }, []);

  const stop = useCallback(() => {
    cancelSpeech();
    isPlaying.current = false;
  }, []);

  return { play, stop };
}
