let speechUnlocked = false;

export function unlockSpeech(): void {
  if (speechUnlocked || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance('');
  utterance.volume = 0;
  utterance.lang = 'fr-FR';
  speechSynthesis.speak(utterance);
  speechUnlocked = true;
}

export function speak(text: string, lang: 'fr-FR' | 'en-GB' = 'fr-FR'): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve();
      return;
    }
    // Cancel any pending speech to avoid Chrome queue issues
    speechSynthesis.cancel();

    // Small delay after cancel to let Chrome reset
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      // Chrome bug: voices may not be loaded yet
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        const match = voices.find((v) => v.lang.startsWith(lang.split('-')[0]));
        if (match) utterance.voice = match;
      }

      speechSynthesis.speak(utterance);
    }, 50);
  });
}

export function cancelSpeech(): void {
  speechSynthesis?.cancel();
}
