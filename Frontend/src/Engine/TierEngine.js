export const TIERS = [

    {
        level: 1,
        difficulty: "easy",
        questions: 3,
        reward: 5000,
        guaranteed: 5000
    },

    {
        level: 2,
        difficulty: "easy",
        questions: 3,
        reward: 10000,
        guaranteed: 5000
    },

    {
        level: 3,
        difficulty: "easy",
        questions: 3,
        reward: 20000,
        guaranteed: 5000
    },

    {
        level: 4,
        difficulty: "medium",
        questions: 3,
        reward: 40000,
        guaranteed: 40000
    },

    {
        level: 5,
        difficulty: "medium",
        questions: 3,
        reward: 80000,
        guaranteed: 40000
    },

    {
        level: 6,
        difficulty: "medium",
        questions: 3,
        reward: 160000,
        guaranteed: 40000
    },

    {
        level: 7,
        difficulty: "hard",
        questions: 3,
        reward: 320000,
        guaranteed: 320000
    },

    {
        level: 8,
        difficulty: "hard",
        questions: 3,
        reward: 640000,
        guaranteed: 320000
    },

    {
        level: 9,
        difficulty: "hard",
        questions: 3,
        reward: 1250000,
        guaranteed: 320000
    },

    {
        level: 10,
        difficulty: "expert",
        questions: 3,
        reward: 2500000,
        guaranteed: 2500000
    },

    {
        level: 11,
        difficulty: "expert",
        questions: 3,
        reward: 5000000,
        guaranteed: 2500000
    },

    {
        level: 12,
        difficulty: "expert",
        questions: 3,
        reward: 7000000,
        guaranteed: 2500000
    }

];

export const getTier = (level) => {

    return TIERS.find(t => t.level === level);

};

export const isLastTier = (level) => {

    return level >= TIERS.length;

};