import type { ThemeConfig } from '../types/index.ts';

export const forestTheme: ThemeConfig = {
  id: 'forest',
  name: 'Forêt Magique',
  character: {
    name: 'Fern',
    species: 'hibou sage',
    greeting: 'Bienvenue dans la forêt, {name} !',
    encouragement: ['Bien joué !', 'Quelle magie !', 'Formidable !', 'Tu es un vrai magicien !'],
    imagePath: '/images/characters/fern-owl/',
  },
  colors: {
    bgDark: '#1B5E20',
    bgLight: '#F1F8E9',
    primary: '#FFB300',
    success: '#CE93D8',
    encouraging: '#66BB6A',
    textOnDark: '#FFFFFF',
    textOnLight: '#3E2723',
  },
  rewards: {
    currency: 'cristaux',
    currencyIcon: '💎',
    mapZoneNames: ['Clairière de Départ', 'Bosquet des Sons', 'Colline des Nombres', 'Rivière des Mots', 'Arbre Enchanté'],
  },
};
