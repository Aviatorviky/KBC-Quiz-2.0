import sportsEasy from "../Data/QuestionBank/Sports/easy.json";
import sportsMedium from "../Data/QuestionBank/Sports/medium.json";
import sportsHard from "../Data/QuestionBank/Sports/hard.json";
import sportsExpert from "../Data/QuestionBank/Sports/expert.json";

import moviesEasy from "../Data/QuestionBank/Movies/easy.json";
import moviesMedium from "../Data/QuestionBank/Movies/medium.json";
import moviesHard from "../Data/QuestionBank/Movies/hard.json";
import moviesExpert from "../Data/QuestionBank/Movies/expert.json";

import historyEasy from "../Data/QuestionBank/History/easy.json";
import historyMedium from "../Data/QuestionBank/History/medium.json";
import historyHard from "../Data/QuestionBank/History/hard.json";
import historyExpert from "../Data/QuestionBank/History/expert.json";

import scienceEasy from "../Data/QuestionBank/Science/easy.json";
import scienceMedium from "../Data/QuestionBank/Science/medium.json";
import scienceHard from "../Data/QuestionBank/Science/hard.json";
import scienceExpert from "../Data/QuestionBank/Science/expert.json";

import mathsEasy from "../Data/QuestionBank/Maths/easy.json";
import mathsMedium from "../Data/QuestionBank/Maths/medium.json";
import mathsHard from "../Data/QuestionBank/Maths/hard.json";
import mathsExpert from "../Data/QuestionBank/Maths/expert.json";

import cyberEasy from "../Data/QuestionBank/CyberSecurity/easy.json";
import cyberMedium from "../Data/QuestionBank/CyberSecurity/medium.json";
import cyberHard from "../Data/QuestionBank/CyberSecurity/hard.json";
import cyberExpert from "../Data/QuestionBank/CyberSecurity/expert.json";

const BANK = {

    Sports: {
        easy: sportsEasy,
        medium: sportsMedium,
        hard: sportsHard,
        expert: sportsExpert
    },

    Movies: {
        easy: moviesEasy,
        medium: moviesMedium,
        hard: moviesHard,
        expert: moviesExpert
    },

    History: {
        easy: historyEasy,
        medium: historyMedium,
        hard: historyHard,
        expert: historyExpert
    },

    Science: {
        easy: scienceEasy,
        medium: scienceMedium,
        hard: scienceHard,
        expert: scienceExpert
    },

    Maths: {
        easy: mathsEasy,
        medium: mathsMedium,
        hard: mathsHard,
        expert: mathsExpert
    },

    CyberSecurity: {
        easy: cyberEasy,
        medium: cyberMedium,
        hard: cyberHard,
        expert: cyberExpert
    }

};

class QuestionEngine {

    constructor(){

        this.usedQuestions = [];

    }

    reset(){

        this.usedQuestions = [];

    }

    shuffle(array){

        return [...array].sort(() => Math.random() - 0.5);

    }

    getClassicQuestions(difficulty, count) {

    let questions = [

        ...BANK.Sports[difficulty],

        ...BANK.Movies[difficulty],

        ...BANK.History[difficulty],

        ...BANK.Science[difficulty],

        ...BANK.Maths[difficulty],

        ...BANK.CyberSecurity[difficulty]

    ];

    questions = questions.filter(

        q => !this.usedQuestions.includes(q.id)

    );

    questions = this.shuffle(questions);

    questions = questions.slice(0, count);

    questions.forEach(q => {

        this.usedQuestions.push(q.id);

    });

    return questions;

}

    getQuestions(category, difficulty, count) {

    if (category === "Classic") {

        return this.getClassicQuestions(

            difficulty,

            count

        );

    }

    let questions = BANK[category][difficulty];

    questions = questions.filter(

        q => !this.usedQuestions.includes(q.id)

    );

    questions = this.shuffle(questions);

    questions = questions.slice(0, count);

    questions.forEach(q => {

        this.usedQuestions.push(q.id);

    });

    return questions;

}

}

export default new QuestionEngine();