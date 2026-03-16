import type { Badge } from '../types/index.ts';

export const badges: Badge[] = [
  { id: 'first-session', name: 'Première Aventure', description: 'Termine ta première session', icon: '🚀', condition: { type: 'sessions-total', count: 1 }, unlockedAt: null },
  { id: 'streak-3', name: 'Régulier', description: '3 jours de suite', icon: '🔥', condition: { type: 'streak', days: 3 }, unlockedAt: null },
  { id: 'streak-7', name: 'Super Régulier', description: '7 jours de suite', icon: '⚡', condition: { type: 'streak', days: 7 }, unlockedAt: null },
  { id: 'streak-30', name: 'Inarrêtable', description: '30 jours de suite', icon: '👑', condition: { type: 'streak', days: 30 }, unlockedAt: null },
  { id: 'stars-50', name: 'Collectionneur', description: 'Gagne 50 étoiles', icon: '✨', condition: { type: 'stars-total', count: 50 }, unlockedAt: null },
  { id: 'stars-200', name: 'Trésor', description: 'Gagne 200 étoiles', icon: '💫', condition: { type: 'stars-total', count: 200 }, unlockedAt: null },
  { id: 'french-p1', name: 'Les Voyelles', description: 'Maîtrise toutes les voyelles', icon: '📖', condition: { type: 'period-complete', subject: 'french', period: 1 }, unlockedAt: null },
  { id: 'french-p2', name: 'Lecteur en herbe', description: 'Maîtrise les consonnes simples', icon: '📚', condition: { type: 'period-complete', subject: 'french', period: 2 }, unlockedAt: null },
  { id: 'maths-p1', name: 'Ami des Nombres', description: 'Maîtrise les nombres de 0 à 10', icon: '🔢', condition: { type: 'period-complete', subject: 'maths', period: 1 }, unlockedAt: null },
  { id: 'english-p1', name: 'Hello!', description: 'Apprends tes premiers mots anglais', icon: '🇬🇧', condition: { type: 'period-complete', subject: 'english', period: 1 }, unlockedAt: null },
  { id: 'sessions-10', name: 'Habitué', description: '10 sessions complétées', icon: '🏆', condition: { type: 'sessions-total', count: 10 }, unlockedAt: null },
  { id: 'sessions-50', name: 'Expert', description: '50 sessions complétées', icon: '🎓', condition: { type: 'sessions-total', count: 50 }, unlockedAt: null },
];

export const ZONE_STAR_THRESHOLDS = [0, 50, 150, 300, 500];
