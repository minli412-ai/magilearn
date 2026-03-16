let speechUnlocked = false;
let voicesReady = false;

// Pre-load voices on module init
if (typeof window !== 'undefined' && window.speechSynthesis) {
  if (speechSynthesis.getVoices().length > 0) {
    voicesReady = true;
  }
  speechSynthesis.onvoiceschanged = () => {
    voicesReady = true;
  };
}

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  const prefix = lang.split('-')[0];
  return voices.find((v) => v.lang === lang)
    || voices.find((v) => v.lang.startsWith(prefix))
    || null;
}

export function unlockSpeech(): void {
  if (speechUnlocked || !window.speechSynthesis) return;
  speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance('');
  utterance.volume = 0;
  speechSynthesis.speak(utterance);
  speechUnlocked = true;
}

function doSpeak(text: string, lang: string): void {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;

  if (voicesReady) {
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);
}

/**
 * Speak text immediately (synchronous). Use for user-initiated actions (button clicks).
 */
export function speak(text: string, lang: 'fr-FR' | 'en-GB' = 'fr-FR'): void {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  doSpeak(text, lang);
}

/**
 * Speak text with a delay. Use for auto-speak on exercise mount
 * so that any pending cancel from session cleanup takes effect first.
 * Returns a cleanup function to cancel the pending timeout.
 */
export function speakDelayed(text: string, lang: 'fr-FR' | 'en-GB' = 'fr-FR'): () => void {
  const timer = setTimeout(() => {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    doSpeak(text, lang);
  }, 150);
  return () => clearTimeout(timer);
}

export function cancelSpeech(): void {
  speechSynthesis?.cancel();
}
