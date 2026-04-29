import { TEAM_COLORS } from './types'

export const DEFAULT_TEAMS = [
  { name: 'Team 1', members: ['Sanjay', 'Madhu', 'Gowtham', 'Vignesh', 'Harris'], color: TEAM_COLORS[0] },
  { name: 'Team 2', members: ['Bala', 'Harsh', 'Balaji', 'Athul', 'Sandhya'], color: TEAM_COLORS[1] },
  { name: 'Team 3', members: ['John', 'Sridhar', 'Vijay', 'Jeeva', 'Bragedesh'], color: TEAM_COLORS[2] },
  { name: 'Team 4', members: ['Arun', 'Adwaith', 'Naren', 'Arjun', 'Hari'], color: TEAM_COLORS[3] },
]

export const DEFAULT_SONGS = [
  // Round 1 — Nostalgia Hits
  { clue: 'Generally my heart is gold', answer: 'Pothuvaaga En Manasu Thangam', movie: 'Kandukondain Kandukondain', director_singer: 'AR Rahman', level: 1 },
  { clue: 'A small flower in the wind fell', answer: 'Chinna Chinna Aasai', movie: 'Roja', director_singer: 'AR Rahman', level: 1 },
  { clue: 'The jasmine bloomed at midnight', answer: 'Malargale Malargathe', movie: 'Minsara Kanavu', director_singer: 'AR Rahman', level: 1 },
  { clue: 'Did the sky come down to meet me?', answer: 'Vaanam Thaazha Vandhadhaa', movie: 'Kandukondain Kandukondain', director_singer: 'AR Rahman', level: 1 },
  { clue: 'Rain rain, come pour on me', answer: 'Mazhai Mazhai', movie: 'Kushi', director_singer: 'Devi Sri Prasad', level: 1 },
  { clue: 'Eyes that speak without words', answer: 'Kangal Irandal', movie: 'Subramaniapuram', director_singer: 'James Vasanthan', level: 1 },

  // Round 2 — Modern Kuthu
  { clue: 'Magnetic eyes, pearl tooth beauty', answer: 'Kaandhak Kannazhagi', movie: '3', director_singer: 'Anirudh Ravichander', level: 2 },
  { clue: 'Shake your waist, break your waist', answer: 'Aaluma Doluma', movie: 'Vedalam', director_singer: 'Anirudh Ravichander', level: 2 },
  { clue: 'Step step step on the floor', answer: 'Verithanam', movie: 'Bigil', director_singer: 'AR Rahman', level: 2 },
  { clue: 'The fish came out of the sea to dance', answer: 'Machi Open the Bottle', movie: 'Inaindha Kaigal', director_singer: 'Anirudh Ravichander', level: 2 },
  { clue: 'I am a rowdy, mother', answer: 'Rowdy Baby', movie: 'Maari 2', director_singer: 'Yuvan Shankar Raja', level: 2 },
  { clue: 'One hundred percent love', answer: 'Nooru Perukkam', movie: 'Kaadhal', director_singer: 'Joshua Sridhar', level: 2 },

  // Round 3 — Absurd Literalism
  { clue: 'Are you a penguin? Or a female dolphin?', answer: 'Antarctica Ven Paniyile', movie: 'Inaindha Kaigal', director_singer: 'Anirudh Ravichander', level: 3 },
  { clue: 'The auto is coming, get out of the way buffalo', answer: 'Auto Varuthu', movie: 'Inaindha Kaigal', director_singer: 'Various', level: 3 },
  { clue: 'My name is Basha, I have not forgotten anything', answer: 'En Peyar Basha', movie: 'Muthu', director_singer: 'AR Rahman', level: 3 },
  { clue: 'I will come like a satellite and orbit you', answer: 'Satellite Kilamaai', movie: 'Various', director_singer: 'Various', level: 3 },
  { clue: 'Why is the moon dancing on the road?', answer: 'Nila Kaikirathu', movie: 'Various', director_singer: 'Various', level: 3 },
  { clue: 'Come, let us eat together, my dear crow', answer: 'Kaakaa Kaakaa', movie: 'Kaakha Kaakha', director_singer: 'Harris Jayaraj', level: 3 },
]

export const PHASE3_CATEGORIES = [
  'A South Indian Breakfast Food',
  'A Rajinikanth Movie',
  'A Cricket Player',
  'A Tamil Hero',
  'A Biryani Type',
  'A Beach in Chennai',
  'A Tamil Movie Villain',
  'An Auto Rickshaw Color',
  'A Kollywood Heroine',
  'A Tamil Festival',
]
