// KBC-style questions with cyber-hacker terminal presentation.
// Kept original questions as per user's request.

export const QUESTIONS = [
  // TIER 1
  {
    text: "Which animal is known as the 'Ship of the Desert'?",
    options: [
      "A. Horse",
      "B. Camel",
      "C. Elephant",
      "D. Donkey",
    ],
    answer: "B",
    prize: 1000,
    tier: "TIER_01",
  },
  {
    text: "How many days are there in a leap year?",
    options: [
      "A. 364",
      "B. 365",
      "C. 366",
      "D. 367",
    ],
    answer: "C",
    prize: 3000,
    tier: "TIER_01",
  },
  {
    text: "Which of these is the National Bird of India?",
    options: [
      "A. Peacock",
      "B. Parrot",
      "C. Sparrow",
      "D. Eagle",
    ],
    answer: "A",
    prize: 5000,
    tier: "TIER_01",
  },

  // TIER 2
  {
    text: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: [
      "A. Oxygen",
      "B. Carbon Dioxide",
      "C. Nitrogen",
      "D. Hydrogen",
    ],
    answer: "B",
    prize: 10000,
    tier: "TIER_02",
  },
  {
    text: "Who painted the famous artwork 'Mona Lisa'?",
    options: [
      "A. Vincent van Gogh",
      "B. Pablo Picasso",
      "C. Leonardo da Vinci",
      "D. Michelangelo",
    ],
    answer: "C",
    prize: 20000,
    tier: "TIER_02",
  },
  {
    text: "Which country is the largest by land area in the world?",
    options: [
      "A. Canada",
      "B. China",
      "C. USA",
      "D. Russia",
    ],
    answer: "D",
    prize: 40000,
    tier: "TIER_02",
  },

  // TIER 3
  {
    text: "Which is the smallest ocean in the world?",
    options: [
      "A. Indian Ocean",
      "B. Arctic Ocean",
      "C. Pacific Ocean",
      "D. Atlantic Ocean",
    ],
    answer: "B",
    prize: 80000,
    tier: "TIER_03",
  },
  {
    text: "In which city did the Jallianwala Bagh massacre take place in 1919?",
    options: [
      "A. Amritsar",
      "B. Lahore",
      "C. Delhi",
      "D. Jalandhar",
    ],
    answer: "A",
    prize: 160000,
    tier: "TIER_03",
  },
  {
    text: "Which layer of the Earth's atmosphere contains the ozone layer?",
    options: [
      "A. Troposphere",
      "B. Stratosphere",
      "C. Mesosphere",
      "D. Thermosphere",
    ],
    answer: "B",
    prize: 320000,
    tier: "TIER_03",
  },

  // TIER 4
  {
    text: "Who was the author of the ancient Indian treatise 'Arthashastra'?",
    options: [
      "A. Chanakya",
      "B. Kalidasa",
      "C. Aryabhata",
      "D. Varahamihira",
    ],
    answer: "A",
    prize: 640000,
    tier: "TIER_04",
  },
  {
    text: "Which element has the highest chemical melting point?",
    options: [
      "A. Platinum",
      "B. Iron",
      "C. Tungsten",
      "D. Diamond",
    ],
    answer: "C",
    prize: 5000000,
    tier: "TIER_04",
  },
  {
    text: "Which of these is the highest active volcano on Earth?",
    options: [
      "A. Mount Vesuvius",
      "B. Ojos del Salado",
      "C. Mount Fuji",
      "D. Mauna Loa",
    ],
    answer: "B",
    prize: 10000000,
    tier: "TIER_04",
  },
];

// Milestones after Question 3, 6 and 9 (0-based indexes)
export const MILESTONE_INDEXES = [2, 5, 8];

// Time allowed per question (seconds)
export const QUESTION_TIME_SECONDS = 45;

// Format prize amount in Indian currency
export const formatINR = (n) => {
  if (n >= 10000000) {
    return `₹${(n / 10000000).toFixed(
      n % 10000000 === 0 ? 0 : 2
    )} Cr`;
  }

  if (n >= 100000) {
    return `₹${(n / 100000).toFixed(
      n % 100000 === 0 ? 0 : 2
    )} L`;
  }

  return `₹${n.toLocaleString("en-IN")}`;
};

// Convert an index to a hexadecimal address (for cyber UI)
export const toHexAddr = (i) =>
  `0x${i.toString(16).toUpperCase().padStart(2, "0")}`;