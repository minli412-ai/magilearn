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

export function speak(text: string, lang: 'fr-FR' | 'en-GB' = 'fr-FR'): void {
  if (!window.speechSynthesis) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;

  if (voicesReady) {
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
  }

  speechSynthesis.speak(utterance);
}

export function cancelSpeech(): void {
  speechSynthesis?.cancel();
}
