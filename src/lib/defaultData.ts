import { TEAM_COLORS } from './types'

export const DEFAULT_TEAMS = [
  { name: 'Team 1', members: ['Sanjay', 'Madhu', 'Gowtham', 'Vignesh', 'Harris'], color: TEAM_COLORS[0] },
  { name: 'Team 2', members: ['Bala', 'Harsh', 'Balaji', 'Athul', 'Sandhya'], color: TEAM_COLORS[1] },
  { name: 'Team 3', members: ['John', 'Sridhar', 'Vijay', 'Jeeva', 'Bragedesh'], color: TEAM_COLORS[2] },
  { name: 'Team 4', members: ['Arun', 'Adwaith', 'Naren', 'Arjun', 'Hari'], color: TEAM_COLORS[3] },
]

export const DEFAULT_SONGS = [
  // ── Tamil — Round 1: Nostalgia Hits ────────────────────────────────────────
  { clue: 'Generally my heart is gold', answer: 'Pothuvaaga En Manasu Thangam', movie: 'Kandukondain Kandukondain', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'A small flower in the wind fell', answer: 'Chinna Chinna Aasai', movie: 'Roja', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'The jasmine bloomed at midnight', answer: 'Malargale Malargathe', movie: 'Minsara Kanavu', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'Did the sky come down to meet me?', answer: 'Vaanam Thaazha Vandhadhaa', movie: 'Kandukondain Kandukondain', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'Rain rain, come pour on me', answer: 'Mazhai Mazhai', movie: 'Kushi', director_singer: 'Devi Sri Prasad', level: 1, language: 'tamil' },
  { clue: 'Eyes that speak without words', answer: 'Kangal Irandal', movie: 'Subramaniapuram', director_singer: 'James Vasanthan', level: 1, language: 'tamil' },

  // ── Tamil — Round 2: Modern Kuthu ──────────────────────────────────────────
  { clue: 'Magnetic eyes, pearl tooth beauty', answer: 'Kaandhak Kannazhagi', movie: '3', director_singer: 'Anirudh Ravichander', level: 2, language: 'tamil' },
  { clue: 'Shake your waist, break your waist', answer: 'Aaluma Doluma', movie: 'Vedalam', director_singer: 'Anirudh Ravichander', level: 2, language: 'tamil' },
  { clue: 'Step step step on the floor', answer: 'Verithanam', movie: 'Bigil', director_singer: 'AR Rahman', level: 2, language: 'tamil' },
  { clue: 'The fish came out of the sea to dance', answer: 'Machi Open the Bottle', movie: 'Inaindha Kaigal', director_singer: 'Anirudh Ravichander', level: 2, language: 'tamil' },
  { clue: 'I am a rowdy, mother', answer: 'Rowdy Baby', movie: 'Maari 2', director_singer: 'Yuvan Shankar Raja', level: 2, language: 'tamil' },
  { clue: 'One hundred percent love', answer: 'Nooru Perukkam', movie: 'Kaadhal', director_singer: 'Joshua Sridhar', level: 2, language: 'tamil' },

  // ── Tamil — Round 3: Absurd Literalism ─────────────────────────────────────
  { clue: 'Are you a penguin? Or a female dolphin?', answer: 'Antarctica Ven Paniyile', movie: 'Inaindha Kaigal', director_singer: 'Anirudh Ravichander', level: 3, language: 'tamil' },
  { clue: 'The auto is coming, get out of the way buffalo', answer: 'Auto Varuthu', movie: 'Inaindha Kaigal', director_singer: 'Various', level: 3, language: 'tamil' },
  { clue: 'My name is Basha, I have not forgotten anything', answer: 'En Peyar Basha', movie: 'Muthu', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'I will come like a satellite and orbit you', answer: 'Satellite Kilamaai', movie: 'Various', director_singer: 'Various', level: 3, language: 'tamil' },
  { clue: 'Why is the moon dancing on the road?', answer: 'Nila Kaikirathu', movie: 'Various', director_singer: 'Various', level: 3, language: 'tamil' },
  { clue: 'Come, let us eat together, my dear crow', answer: 'Kaakaa Kaakaa', movie: 'Kaakha Kaakha', director_singer: 'Harris Jayaraj', level: 3, language: 'tamil' },

  // ── Hindi — Round 1: Classics ──────────────────────────────────────────────
  { clue: 'A little bit your memories, a little bit your desires remain', answer: 'Zara Zara', movie: 'RHTDM', director_singer: 'Harris Jayaraj / Bombay Jayashri', level: 1, language: 'hindi' },
  { clue: 'If you did not become mine, then what', answer: 'Tum Na Hue Mere Toh Kya', movie: 'Aashiqui 2', director_singer: 'Ankit Tiwari', level: 1, language: 'hindi' },
  { clue: 'As long as there is breath, as long as there is life', answer: 'Jab Tak', movie: 'M.S. Dhoni', director_singer: 'Armaan Malik', level: 1, language: 'hindi' },
  { clue: 'The night was lonely, you were also somewhere present', answer: 'Raat Akeli Thi', movie: 'Raat Akeli Hai', director_singer: 'Anurag Saikia', level: 1, language: 'hindi' },

  // ── Hindi — Round 2: Modern Hits ───────────────────────────────────────────
  { clue: 'O precious one, O precious one, come to me', answer: 'Heeriye', movie: 'Mission Raniganj', director_singer: 'Arijit Singh', level: 2, language: 'hindi' },
  { clue: 'Whether I want you or not, I am still yours', answer: 'Chahun Main Ya Na', movie: 'Aashiqui 2', director_singer: 'Arijit Singh / Palak Muchhal', level: 2, language: 'hindi' },
  { clue: 'Tonight, no ordinary night this is', answer: 'Aaj Ki Raat', movie: 'Stree', director_singer: 'Sachin-Jigar / Divya Kumar', level: 2, language: 'hindi' },
  { clue: 'Sparkling sparkling, you are sparkling in the crowd', answer: 'Chaka Chak', movie: 'Atrangi Re', director_singer: 'AR Rahman / Shreya Ghoshal', level: 2, language: 'hindi' },

  // ── Hindi — Round 3: Absurd / Quirky ───────────────────────────────────────
  { clue: 'Oh mother oh mother, what has happened to me', answer: 'Uyi Amma', movie: 'Creature 3D', director_singer: 'Mika Singh', level: 3, language: 'hindi' },
  { clue: 'The innocent one, yes the innocent one, I am the innocent one', answer: 'Akshath', movie: 'Various', director_singer: 'Various', level: 3, language: 'hindi' },
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
  'A Bollywood Actor',
  'A Shah Rukh Khan Movie',
]
