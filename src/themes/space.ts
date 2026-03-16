import type { ThemeConfig } from '../types/index.ts';

export const spaceTheme: ThemeConfig = {
  id: 'space',
  name: 'Aventure Spatiale',
  character: {
    name: 'Astro',
    species: 'renard astronaute',
    greeting: 'Prêt pour le décollage, {name} ?',
    encouragement: ['Super !', 'Vers les étoiles !', 'Fantastique !', 'Tu es un champion !'],
    imagePath: '/images/characters/astro-fox/',
  },
  colors: {
    bgDark: '#0B1528',
    bgLight: '#E8F0FE',
    primary: '#FF8C42',
    success: '#FFD700',
    encouraging: '#B39DDB',
    textOnDark: '#FFFFFF',
    textOnLight: '#1A237E',
  },
  rewards: {
    currency: 'étoiles',
    currencyIcon: '⭐',
    mapZoneNames: ['Lune de Départ', 'Planète des Sons', 'Nébuleuse des Nombres', 'Galaxie des Mots', 'Étoile Finale'],
  },
};
