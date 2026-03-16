import type { EnglishVocab } from '../../types/index.ts';

export const englishVocabulary: EnglishVocab[] = [
  // Period 1: Greetings
  { english: 'hello', french: 'bonjour', audioFile: 'en/words/hello.mp3', imageFile: 'exercises/en/hello.svg', theme: 'greetings', period: 1 },
  { english: 'goodbye', french: 'au revoir', audioFile: 'en/words/goodbye.mp3', imageFile: 'exercises/en/goodbye.svg', theme: 'greetings', period: 1 },
  { english: 'please', french: 's\'il te plaît', audioFile: 'en/words/please.mp3', imageFile: 'exercises/en/please.svg', theme: 'greetings', period: 1 },
  { english: 'thank you', french: 'merci', audioFile: 'en/words/thank-you.mp3', imageFile: 'exercises/en/thank-you.svg', theme: 'greetings', period: 1 },
  { english: 'yes', french: 'oui', audioFile: 'en/words/yes.mp3', imageFile: 'exercises/en/yes.svg', theme: 'greetings', period: 1 },
  { english: 'no', french: 'non', audioFile: 'en/words/no.mp3', imageFile: 'exercises/en/no.svg', theme: 'greetings', period: 1 },
  { english: 'happy', french: 'content', audioFile: 'en/words/happy.mp3', imageFile: 'exercises/en/happy.svg', theme: 'greetings', period: 1 },
  { english: 'sad', french: 'triste', audioFile: 'en/words/sad.mp3', imageFile: 'exercises/en/sad.svg', theme: 'greetings', period: 1 },

  // Period 2: Colors
  { english: 'red', french: 'rouge', audioFile: 'en/words/red.mp3', imageFile: 'exercises/en/red.svg', theme: 'colors', period: 2 },
  { english: 'blue', french: 'bleu', audioFile: 'en/words/blue.mp3', imageFile: 'exercises/en/blue.svg', theme: 'colors', period: 2 },
  { english: 'green', french: 'vert', audioFile: 'en/words/green.mp3', imageFile: 'exercises/en/green.svg', theme: 'colors', period: 2 },
  { english: 'yellow', french: 'jaune', audioFile: 'en/words/yellow.mp3', imageFile: 'exercises/en/yellow.svg', theme: 'colors', period: 2 },
  { english: 'orange', french: 'orange', audioFile: 'en/words/orange.mp3', imageFile: 'exercises/en/orange.svg', theme: 'colors', period: 2 },
  { english: 'purple', french: 'violet', audioFile: 'en/words/purple.mp3', imageFile: 'exercises/en/purple.svg', theme: 'colors', period: 2 },
  { english: 'white', french: 'blanc', audioFile: 'en/words/white.mp3', imageFile: 'exercises/en/white.svg', theme: 'colors', period: 2 },
  { english: 'black', french: 'noir', audioFile: 'en/words/black.mp3', imageFile: 'exercises/en/black.svg', theme: 'colors', period: 2 },
  { english: 'one', french: 'un', audioFile: 'en/words/one.mp3', imageFile: 'exercises/en/one.svg', theme: 'numbers', period: 2 },
  { english: 'two', french: 'deux', audioFile: 'en/words/two.mp3', imageFile: 'exercises/en/two.svg', theme: 'numbers', period: 2 },
  { english: 'three', french: 'trois', audioFile: 'en/words/three.mp3', imageFile: 'exercises/en/three.svg', theme: 'numbers', period: 2 },
  { english: 'four', french: 'quatre', audioFile: 'en/words/four.mp3', imageFile: 'exercises/en/four.svg', theme: 'numbers', period: 2 },
  { english: 'five', french: 'cinq', audioFile: 'en/words/five.mp3', imageFile: 'exercises/en/five.svg', theme: 'numbers', period: 2 },

  // Period 3: Animals
  { english: 'cat', french: 'chat', audioFile: 'en/words/cat.mp3', imageFile: 'exercises/en/cat.svg', theme: 'animals', period: 3 },
  { english: 'dog', french: 'chien', audioFile: 'en/words/dog.mp3', imageFile: 'exercises/en/dog.svg', theme: 'animals', period: 3 },
  { english: 'fish', french: 'poisson', audioFile: 'en/words/fish.mp3', imageFile: 'exercises/en/fish.svg', theme: 'animals', period: 3 },
  { english: 'bird', french: 'oiseau', audioFile: 'en/words/bird.mp3', imageFile: 'exercises/en/bird.svg', theme: 'animals', period: 3 },
  { english: 'rabbit', french: 'lapin', audioFile: 'en/words/rabbit.mp3', imageFile: 'exercises/en/rabbit.svg', theme: 'animals', period: 3 },
  { english: 'horse', french: 'cheval', audioFile: 'en/words/horse.mp3', imageFile: 'exercises/en/horse.svg', theme: 'animals', period: 3 },
  { english: 'cow', french: 'vache', audioFile: 'en/words/cow.mp3', imageFile: 'exercises/en/cow.svg', theme: 'animals', period: 3 },
  { english: 'pig', french: 'cochon', audioFile: 'en/words/pig.mp3', imageFile: 'exercises/en/pig.svg', theme: 'animals', period: 3 },

  // Period 4: Food & Family
  { english: 'apple', french: 'pomme', audioFile: 'en/words/apple.mp3', imageFile: 'exercises/en/apple.svg', theme: 'food', period: 4 },
  { english: 'banana', french: 'banane', audioFile: 'en/words/banana.mp3', imageFile: 'exercises/en/banana.svg', theme: 'food', period: 4 },
  { english: 'milk', french: 'lait', audioFile: 'en/words/milk.mp3', imageFile: 'exercises/en/milk.svg', theme: 'food', period: 4 },
  { english: 'water', french: 'eau', audioFile: 'en/words/water.mp3', imageFile: 'exercises/en/water.svg', theme: 'food', period: 4 },
  { english: 'mother', french: 'maman', audioFile: 'en/words/mother.mp3', imageFile: 'exercises/en/mother.svg', theme: 'family', period: 4 },
  { english: 'father', french: 'papa', audioFile: 'en/words/father.mp3', imageFile: 'exercises/en/father.svg', theme: 'family', period: 4 },
  { english: 'brother', french: 'frère', audioFile: 'en/words/brother.mp3', imageFile: 'exercises/en/brother.svg', theme: 'family', period: 4 },
  { english: 'sister', french: 'soeur', audioFile: 'en/words/sister.mp3', imageFile: 'exercises/en/sister.svg', theme: 'family', period: 4 },

  // Period 5: Body & Clothes
  { english: 'head', french: 'tête', audioFile: 'en/words/head.mp3', imageFile: 'exercises/en/head.svg', theme: 'body', period: 5 },
  { english: 'hand', french: 'main', audioFile: 'en/words/hand.mp3', imageFile: 'exercises/en/hand.svg', theme: 'body', period: 5 },
  { english: 'foot', french: 'pied', audioFile: 'en/words/foot.mp3', imageFile: 'exercises/en/foot.svg', theme: 'body', period: 5 },
  { english: 'eye', french: 'oeil', audioFile: 'en/words/eye.mp3', imageFile: 'exercises/en/eye.svg', theme: 'body', period: 5 },
];
