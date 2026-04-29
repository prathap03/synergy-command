import { TEAM_COLORS } from './types'

export const DEFAULT_TEAMS = [
  { name: 'Team 1', members: ['Sanjay', 'Madhu', 'Gowtham', 'Vignesh', 'Harris'], color: TEAM_COLORS[0] },
  { name: 'Team 2', members: ['Bala', 'Harsh', 'Balaji', 'Athul', 'Sandhya'], color: TEAM_COLORS[1] },
  { name: 'Team 3', members: ['John', 'Sridhar', 'Vijay', 'Jeeva', 'Bragedesh'], color: TEAM_COLORS[2] },
  { name: 'Team 4', members: ['Arun', 'Adwaith', 'Naren', 'Dhanush', 'Hari'], color: TEAM_COLORS[3] },
]

export const DEFAULT_SONGS = [
// ── Tamil — Round 1: Nostalgia Hits (Literal Edition) ───────────────────
  { clue: 'The scent of the soil after the first rain', answer: 'Pudhu Vellai Mazhai', movie: 'Roja', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'A small flower in the wind fell down', answer: 'Chinna Chinna Aasai', movie: 'Roja', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'The jasmine bloomed at midnight sharp', answer: 'Malargale Malargathe', movie: 'Minsara Kanavu', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'Did the sky come down to meet me?', answer: 'Vaanam Thaazha Vandhadhaa', movie: 'Kandukondain Kandukondain', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'Rain rain, come pour on my head', answer: 'Mazhai Mazhai', movie: 'Kushi', director_singer: 'Devi Sri Prasad', level: 1, language: 'tamil' },
  { clue: 'Eyes that speak without using any words', answer: 'Kangal Irandal', movie: 'Subramaniapuram', director_singer: 'James Vasanthan', level: 1, language: 'tamil' },
  { clue: 'The heartbeat says your name repeatedly', answer: 'Nenjukkul Peidhidum', movie: 'Vaaranam Aayiram', director_singer: 'Harris Jayaraj', level: 1, language: 'tamil' },
  { clue: 'Will you be my shadow for seven births?', answer: 'Munbe Vaa', movie: 'Sillunu Oru Kaadhal', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'The moon is white like a piece of camphor', answer: 'Vennilave Vennilave', movie: 'Minsara Kanavu', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'A thousand suns are rising in my heart', answer: 'Uyire Uyire', movie: 'Bombay', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'If the postman brings a letter from the girl', answer: 'Anbe Sivam', movie: 'Anbe Sivam', director_singer: 'Kamal Haasan', level: 1, language: 'tamil' },
  { clue: 'The breeze touches me like a silk cloth', answer: 'Thendral Vanthu', movie: 'Avatharam', director_singer: 'Ilaiyaraaja', level: 1, language: 'tamil' },
  { clue: 'Generally my heart is made of 24k gold', answer: 'Pothuvaaga En Manasu', movie: 'Murattu Kaalai', director_singer: 'Ilaiyaraaja', level: 1, language: 'tamil' },
  { clue: 'The red jasmine is laughing on the vine', answer: 'Sivappu Lolakku', movie: 'Kadhal Desam', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'A butterfly is flying inside my chest', answer: 'Ovvoru Pookalume', movie: 'Autograph', director_singer: 'Bharadwaj', level: 1, language: 'tamil' },
  { clue: 'The sparrow is drinking tea on the branch', answer: 'Chittu Kuruvi', movie: 'Chinnathambi', director_singer: 'Ilaiyaraaja', level: 1, language: 'tamil' },
  { clue: 'Is this a human or a walking chocolate?', answer: 'Mustafa Mustafa', movie: 'Kadhal Desam', director_singer: 'AR Rahman', level: 1, language: 'tamil' },
  { clue: 'The world is turning because of your eyes', answer: 'Unakenna Venum Sollu', movie: 'Yennai Arindhal', director_singer: 'Harris Jayaraj', level: 1, language: 'tamil' },
  { clue: 'The small bird is calling for its mother', answer: 'Amma Amma', movie: 'VIP', director_singer: 'Anirudh', level: 1, language: 'tamil' },
  { clue: 'If you are the rain, I am the peacock', answer: 'Mazhai Thuli', movie: 'Sangamam', director_singer: 'AR Rahman', level: 1, language: 'tamil' },

  // ── Tamil — Round 2: Modern Kuthu / Energy ───────────────────────────────
  { clue: 'Magnetic eyes and pearl tooth beauty', answer: 'Kaandhak Kannazhagi', movie: '3', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'Shake your waist, break your waist now', answer: 'Aaluma Doluma', movie: 'Vedalam', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'Step step step on the dance floor', answer: 'Verithanam', movie: 'Bigil', director_singer: 'AR Rahman', level: 2, language: 'tamil' },
  { clue: 'The fish came out of the sea to party', answer: 'Machi Open the Bottle', movie: 'Mankatha', director_singer: 'Yuvan Shankar Raja', level: 2, language: 'tamil' },
  { clue: 'I am a rowdy baby, oh my mother', answer: 'Rowdy Baby', movie: 'Maari 2', director_singer: 'Yuvan Shankar Raja', level: 2, language: 'tamil' },
  { clue: 'The local boy is coming with a heavy step', answer: 'Vaathi Coming', movie: 'Master', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'Your beauty is like a sharp Arabic sword', answer: 'Arabic Kuthu', movie: 'Beast', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'Jump and dance like a hungry tiger', answer: 'Rakita Rakita', movie: 'Jagame Thandhiram', director_singer: 'Santhosh Narayanan', level: 2, language: 'tamil' },
  { clue: 'The red river is flowing through my heart', answer: 'Ranjithame', movie: 'Varisu', director_singer: 'Thaman S', level: 2, language: 'tamil' },
  { clue: 'The cat is drinking milk with a style', answer: 'Tum Tum', movie: 'Enemy', director_singer: 'Thaman S', level: 2, language: 'tamil' },
  { clue: 'Brother, why this murderous anger today?', answer: 'Why This Kolaveri Di', movie: '3', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'The don is coming with a very heavy step', answer: 'Donu Donu Donu', movie: 'Maari', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'One more time, show your mass to us', answer: 'Oru Kutti Kathai', movie: 'Master', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'Don’t look at me like a spicy red chili', answer: 'Kandangi Kandangi', movie: 'Jilla', director_singer: 'Imman', level: 2, language: 'tamil' },
  { clue: 'The soda bottle is breaking in my chest', answer: 'Single Pasanga', movie: 'Natpe Thunai', director_singer: 'Hiphop Tamizha', level: 2, language: 'tamil' },
  { clue: 'My heart is jumping like a frog in rain', answer: 'Kutti Puli Kootam', movie: 'Thuppakki', director_singer: 'Harris Jayaraj', level: 2, language: 'tamil' },
  { clue: 'Is your father a thief? He stole stars', answer: 'Selfie Pulla', movie: 'Kaththi', director_singer: 'Anirudh', level: 2, language: 'tamil' },
  { clue: 'The jasmine is laughing on the vine', answer: 'Malli Poo', movie: 'VTK', director_singer: 'AR Rahman', level: 2, language: 'tamil' },
  { clue: 'The rhythm of the drum is in my blood', answer: 'Tum Tum', movie: 'Enemy', director_singer: 'Thaman S', level: 2, language: 'tamil' },
  { clue: 'Shake the coconut and break it now', answer: 'What a Karuvad', movie: 'VIP', director_singer: 'Anirudh', level: 2, language: 'tamil' },

  // ── Tamil — Round 3: Absurd Literalism ───────────────────────────────────
  { clue: 'Are you a penguin? Or a female dolphin?', answer: 'Antarctica Ven Paniyile', movie: 'Thuppakki', director_singer: 'Harris Jayaraj', level: 3, language: 'tamil' },
  { clue: 'The auto is coming, get out of the way buffalo', answer: 'Auto Varuthu', movie: 'Baashha', director_singer: 'Deva', level: 3, language: 'tamil' },
  { clue: 'I will come like a satellite and orbit you', answer: 'Satellite Kelambalam', movie: 'Sivakasi', director_singer: 'Srikanth Deva', level: 3, language: 'tamil' },
  { clue: 'Come, let us eat together, my dear crow', answer: 'Kaakaa Kaakaa', movie: 'Various', director_singer: 'Various', level: 3, language: 'tamil' },
  { clue: 'Why did the lizard fall on the hot idli?', answer: 'Pallaaku Kuthiraiyile', movie: 'Chandramukhi', director_singer: 'Vidyasagar', level: 3, language: 'tamil' },
  { clue: 'O my yogurt cup, let us mix together', answer: 'O Podu', movie: 'Gemini', director_singer: 'Bharadwaj', level: 3, language: 'tamil' },
  { clue: 'Your eyes are like two large Nokia phones', answer: 'Kannum Kannum Nokia', movie: 'Anniyan', director_singer: 'Harris Jayaraj', level: 3, language: 'tamil' },
  { clue: 'The electric wire is dancing on the road', answer: 'Minsara Kanna', movie: 'Padayappa', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'O my strawberry girl, are you a fruit?', answer: 'Strawberry Penne', movie: 'Minsara Kanavu', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'Is this a computer or a human brain?', answer: 'Oru Viral Puratchi', movie: 'Sarkar', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'The onion is crying because it is being cut', answer: 'Vengamayan', movie: 'Various', director_singer: 'Various', level: 3, language: 'tamil' },
  { clue: 'The atomic bomb exploded in the sambar', answer: 'Bombai City Sukka Rokka', movie: 'Bombay', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'Telephone manipulated by the heavy wind', answer: 'Telephone Manipol', movie: 'Indian', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'O my Biryani, do not leave me alone', answer: 'Manmadhane Nee', movie: 'Manmadhan', director_singer: 'Yuvan Shankar Raja', level: 3, language: 'tamil' },
  { clue: 'The mobile phone is ringing in the forest', answer: 'Hello Mr. Ethirkatchi', movie: 'Iruvar', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'The dinosaur is eating a spicy masala vada', answer: 'Rakita Rakita', movie: 'Jagame Thandhiram', director_singer: 'Santhosh Narayanan', level: 3, language: 'tamil' },
  { clue: 'My brain is a dry land, pour some gravy', answer: 'Varuthapadatha Valibar Sangam', movie: 'VVS', director_singer: 'Imman', level: 3, language: 'tamil' },
  { clue: 'The SIM card is missing in the love mobile', answer: 'En Fuse Pochu', movie: 'Arrambam', director_singer: 'Yuvan', level: 3, language: 'tamil' },
  { clue: 'The butter is melting on the hot dosa', answer: 'Vennilave Vennilave', movie: 'Minsara Kanavu', director_singer: 'AR Rahman', level: 3, language: 'tamil' },
  { clue: 'A small piece of moon in my pant pocket', answer: 'Pala Palakkura', movie: 'Ayan', director_singer: 'Harris Jayaraj', level: 3, language: 'tamil' },

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
