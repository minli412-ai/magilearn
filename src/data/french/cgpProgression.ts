import type { CGPEntry } from '../../types/index.ts';

export const cgpProgression: CGPEntry[] = [
  // Period 1: Vowels
  { grapheme: 'a', phoneme: '/a/', period: 1, audioFile: 'fr/phonemes/a.mp3', keywords: ['ami', 'animal', 'abricot'] },
  { grapheme: 'i', phoneme: '/i/', period: 1, audioFile: 'fr/phonemes/i.mp3', keywords: ['île', 'igloo', 'iris'] },
  { grapheme: 'o', phoneme: '/o/', period: 1, audioFile: 'fr/phonemes/o.mp3', keywords: ['olive', 'os', 'orange'] },
  { grapheme: 'u', phoneme: '/y/', period: 1, audioFile: 'fr/phonemes/u.mp3', keywords: ['une', 'usine', 'univers'] },
  { grapheme: 'e', phoneme: '/ə/', period: 1, audioFile: 'fr/phonemes/e.mp3', keywords: ['le', 'de', 'menu'] },
  { grapheme: 'é', phoneme: '/e/', period: 1, audioFile: 'fr/phonemes/e-accent.mp3', keywords: ['été', 'école', 'étoile'] },

  // Period 2: Simple consonants
  { grapheme: 'l', phoneme: '/l/', period: 2, audioFile: 'fr/phonemes/l.mp3', keywords: ['lune', 'lit', 'loup'] },
  { grapheme: 'r', phoneme: '/ʁ/', period: 2, audioFile: 'fr/phonemes/r.mp3', keywords: ['rue', 'roi', 'rat'] },
  { grapheme: 'm', phoneme: '/m/', period: 2, audioFile: 'fr/phonemes/m.mp3', keywords: ['maman', 'mur', 'maison'] },
  { grapheme: 'p', phoneme: '/p/', period: 2, audioFile: 'fr/phonemes/p.mp3', keywords: ['papa', 'porte', 'pile'] },
  { grapheme: 't', phoneme: '/t/', period: 2, audioFile: 'fr/phonemes/t.mp3', keywords: ['table', 'tapis', 'tomate'] },
  { grapheme: 'f', phoneme: '/f/', period: 2, audioFile: 'fr/phonemes/f.mp3', keywords: ['feu', 'fil', 'four'] },
  { grapheme: 's', phoneme: '/s/', period: 2, audioFile: 'fr/phonemes/s.mp3', keywords: ['sol', 'sac', 'sapin'] },
  { grapheme: 'n', phoneme: '/n/', period: 2, audioFile: 'fr/phonemes/n.mp3', keywords: ['nid', 'nez', 'nature'] },
  { grapheme: 'v', phoneme: '/v/', period: 2, audioFile: 'fr/phonemes/v.mp3', keywords: ['vélo', 'vache', 'ville'] },

  // Period 3: Complex consonants and digraphs
  { grapheme: 'ch', phoneme: '/ʃ/', period: 3, audioFile: 'fr/phonemes/ch.mp3', keywords: ['chat', 'cheval', 'chocolat'] },
  { grapheme: 'ou', phoneme: '/u/', period: 3, audioFile: 'fr/phonemes/ou.mp3', keywords: ['loup', 'four', 'jour'] },
  { grapheme: 'on', phoneme: '/ɔ̃/', period: 3, audioFile: 'fr/phonemes/on.mp3', keywords: ['pont', 'maison', 'bonbon'] },
  { grapheme: 'an', phoneme: '/ɑ̃/', period: 3, audioFile: 'fr/phonemes/an.mp3', keywords: ['maman', 'enfant', 'blanc'] },
  { grapheme: 'oi', phoneme: '/wa/', period: 3, audioFile: 'fr/phonemes/oi.mp3', keywords: ['roi', 'bois', 'étoile'] },
  { grapheme: 'b', phoneme: '/b/', period: 3, audioFile: 'fr/phonemes/b.mp3', keywords: ['balle', 'bébé', 'banane'] },
  { grapheme: 'd', phoneme: '/d/', period: 3, audioFile: 'fr/phonemes/d.mp3', keywords: ['dame', 'dent', 'domino'] },
  { grapheme: 'j', phoneme: '/ʒ/', period: 3, audioFile: 'fr/phonemes/j.mp3', keywords: ['jardin', 'jeu', 'joli'] },
  { grapheme: 'g', phoneme: '/ɡ/', period: 3, audioFile: 'fr/phonemes/g.mp3', keywords: ['gâteau', 'gare', 'gomme'] },

  // Period 4: Complex graphemes
  { grapheme: 'ai', phoneme: '/ɛ/', period: 4, audioFile: 'fr/phonemes/ai.mp3', keywords: ['maison', 'lait', 'faire'] },
  { grapheme: 'ei', phoneme: '/ɛ/', period: 4, audioFile: 'fr/phonemes/ei.mp3', keywords: ['neige', 'reine', 'baleine'] },
  { grapheme: 'eau', phoneme: '/o/', period: 4, audioFile: 'fr/phonemes/eau.mp3', keywords: ['eau', 'bateau', 'chapeau'] },
  { grapheme: 'au', phoneme: '/o/', period: 4, audioFile: 'fr/phonemes/au.mp3', keywords: ['aussi', 'auto', 'jaune'] },
  { grapheme: 'in', phoneme: '/ɛ̃/', period: 4, audioFile: 'fr/phonemes/in.mp3', keywords: ['lapin', 'jardin', 'matin'] },
  { grapheme: 'en', phoneme: '/ɑ̃/', period: 4, audioFile: 'fr/phonemes/en.mp3', keywords: ['enfant', 'dent', 'vent'] },
  { grapheme: 'gn', phoneme: '/ɲ/', period: 4, audioFile: 'fr/phonemes/gn.mp3', keywords: ['montagne', 'araignée', 'ligne'] },
  { grapheme: 'ill', phoneme: '/j/', period: 4, audioFile: 'fr/phonemes/ill.mp3', keywords: ['fille', 'famille', 'papillon'] },

  // Period 5: Consolidation + irregular
  { grapheme: 'ph', phoneme: '/f/', period: 5, audioFile: 'fr/phonemes/ph.mp3', keywords: ['photo', 'phare', 'éléphant'] },
  { grapheme: 'gu', phoneme: '/ɡ/', period: 5, audioFile: 'fr/phonemes/gu.mp3', keywords: ['guitare', 'guêpe', 'bague'] },
  { grapheme: 'ge', phoneme: '/ʒ/', period: 5, audioFile: 'fr/phonemes/ge.mp3', keywords: ['orange', 'plage', 'nage'] },
  { grapheme: 'ce', phoneme: '/s/', period: 5, audioFile: 'fr/phonemes/ce.mp3', keywords: ['cerise', 'ciel', 'cinéma'] },
];
