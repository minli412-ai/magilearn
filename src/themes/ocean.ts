import type { ThemeConfig } from '../types/index.ts';

export const oceanTheme: ThemeConfig = {
  id: 'ocean',
  name: 'Explorateur des Océans',
  character: {
    name: 'Coral',
    species: 'tortue exploratrice',
    greeting: 'Prêt à plonger, {name} ?',
    encouragement: ['Bravo !', 'Quel plongeon !', 'Magnifique !', 'Tu nages comme un poisson !'],
    imagePath: '/images/characters/coral-turtle/',
  },
  colors: {
    bgDark: '#0D3B66',
    bgLight: '#FFF8E7',
    primary: '#FF6B6B',
    success: '#F5F5DC',
    encouraging: '#26A69A',
    textOnDark: '#FFFFFF',
    textOnLight: '#004D40',
  },
  rewards: {
    currency: 'perles',
    currencyIcon: '🫧',
    mapZoneNames: ['Plage de Départ', 'Récif des Sons', 'Grotte des Nombres', 'Courant des Mots', 'Trésor des Profondeurs'],
  },
};
