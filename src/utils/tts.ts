let speechUnlocked = false;

function ensureVoicesLoaded(): Promise<void> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve();
      return;
    }
    speechSynthesis.onvoiceschanged = () => resolve();
    // Fallback if event never fires
    setTimeout(resolve, 1000);
  });
}

export function unlockSpeech(): void {
  if (speechUnlocked || !window.speechSynthesis) return;
  // Trigger voice loading
  speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance('');
  utterance.volume = 0;
  utterance.lang = 'fr-FR';
  speechSynthesis.speak(utterance);
  speechUnlocked = true;
}

export async function speak(text: string, lang: 'fr-FR' | 'en-GB' = 'fr-FR'): Promise<void> {
  if (!window.speechSynthesis) return;

  await ensureVoicesLoaded();

  // Cancel any pending speech to avoid Chrome queue issues
  speechSynthesis.cancel();

  return new Promise((resolve) => {
    // Small delay after cancel to let Chrome reset
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      const voices = speechSynthesis.getVoices();
      const match = voices.find((v) => v.lang.startsWith(lang.split('-')[0]));
      if (match) utterance.voice = match;

      speechSynthesis.speak(utterance);
    }, 50);
  });
}

export function cancelSpeech(): void {
  speechSynthesis?.cancel();
}
