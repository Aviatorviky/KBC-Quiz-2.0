import { createGameState } from "./GameState";
import { GAME_STATUS } from "./GameStatus";
import { getTier, isLastTier } from "./TierEngine";
import QuestionEngine from "./QuestionEngine";
import RewardEngine from "./RewardEngine";
import CategoryEngine from "./CategoryEngine";

class GameEngine {

    constructor() {

        this.state = createGameState();

    }

    // ============================
    // PUBLIC API
    // ============================

    getState() {

        return this.state;

    }

    dispatch(action) {

        switch (action.type) {

            case "START_GAME":
                return this.startGame(action.payload);

            case "SELECT_CATEGORY":
                return this.selectCategory(action.payload);

            case "SUBMIT_ANSWER":
                return this.submitAnswer(action.payload);

            case "NEXT_QUESTION":
                
                return this.nextQuestion();

            case "NEXT_TIER":
                return this.advanceTier();

            case "WALK_AWAY":
                return this.walkAway();
            
            case "USE_LIFELINE":

                return this.useLifeline(
                  action.payload.type
                );

            case "TIMEOUT":
                return this.timeout();

            case "RESET_GAME":
                return this.resetGame();

            default:

                console.warn("Unknown Action:", action.type);

        }

    }

    // ============================
    // GAME START
    // ============================

    startGame(payload) {

    this.state = createGameState();

    this.state.playerName = payload.playerName;

    this.state.mode = payload.mode;

    QuestionEngine.reset();

    // ==========================
    // CLASSIC MODE
    // ==========================

    if (payload.mode === "classic") {

    const tier = getTier(1);

    this.state.currentCategory = "Classic";

    this.state.currentQuestions =
        QuestionEngine.getQuestions(

            "Classic",

            tier.difficulty,

            tier.questions

        );

    this.state.currentQuestionIndex = 0;

    this.state.currentQuestion =
        this.state.currentQuestions[0];

    this.state.status =
        GAME_STATUS.PLAYING;

}
    // ==========================
    // STRATEGY MODE
    // ==========================

    else {

        this.state.status =
            GAME_STATUS.CATEGORY_SELECTION;

    }

    return this.state;

}

    // ============================
    // CATEGORY
    // ============================

    selectCategory(payload) {

        const tier = getTier(this.state.currentTier);

        this.state.currentCategory = payload.category;

        this.state.currentQuestions =
            QuestionEngine.getQuestions(

                payload.category,

                tier.difficulty,

                tier.questions

            );

        this.state.currentQuestionIndex = 0;

        this.state.currentQuestion =
            this.state.currentQuestions[0];

        this.state.status = GAME_STATUS.PLAYING;

        return this.state;

    }

    // ============================
    // PLACEHOLDERS
    // ============================

    submitAnswer(payload) {

    const question = this.state.currentQuestion;

    if (!question) {

        return this.state;

    }

    const selected = payload.answer;

    this.state.revealedAnswer = selected;

    // ------------------------
    // WRONG ANSWER
    // ------------------------

    if (selected !== question.correctAnswer) {

        this.state.wrongAnswers++;

        this.state.currentPrize =
            RewardEngine.getWrongAnswerPrize(
                this.state.currentTier
            );

        this.state.status =
            GAME_STATUS.GAME_OVER;

        return this.state;

    }

    // ------------------------
    // CORRECT ANSWER
    // ------------------------

    this.state.correctAnswers++;

    this.state.totalQuestionsAnswered++;

    const tier = getTier(this.state.currentTier);

    this.state.currentPrize = tier.reward;

    this.state.guaranteedPrize =
        RewardEngine.getGuaranteedPrize(
            this.state.currentTier
        );

    // Finished this tier?

    if (
        this.state.currentQuestionIndex >=
        this.state.currentQuestions.length - 1
    ) {

        // Last Tier?

        if (isLastTier(this.state.currentTier)) {

            this.state.status = GAME_STATUS.WON;

            return this.state;

        }

        this.state.status = GAME_STATUS.TIER_COMPLETED;

        return this.state;

    }

    // More questions remaining

    this.nextQuestion();

    return this.state;

}

    nextQuestion() {

    this.state.currentQuestionIndex++;

    if (
        this.state.currentQuestionIndex <
        this.state.currentQuestions.length
    ) {

        this.state.currentQuestion =
            this.state.currentQuestions[
                this.state.currentQuestionIndex
            ];

        this.state.revealedAnswer = null;

    }

    return this.state;

}

    advanceTier() {

    this.state.currentTier++;

    this.state.revealedAnswer = null;

    this.state.currentQuestionIndex = 0;

    const tier = getTier(this.state.currentTier);

    // No more tiers after the last one
    if (!tier) {

        this.state.status = GAME_STATUS.WON;

        return this.state;

    }

    // ==========================
    // STRATEGY MODE
    // ==========================

    if (this.state.mode === "strategy") {

        this.state.usedCategories =
            CategoryEngine.lockCategory(
                this.state.currentCategory,
                this.state.usedCategories
            );

        this.state.currentCategory = null;
        this.state.currentQuestions = [];
        this.state.currentQuestion = null;

        this.state.status =
            GAME_STATUS.CATEGORY_SELECTION;

        return this.state;

    }

    // ==========================
    // CLASSIC MODE
    // ==========================

    this.state.currentCategory = "Classic";

    this.state.currentQuestions =
        QuestionEngine.getQuestions(
            "Classic",
            tier.difficulty,
            tier.questions
        );

    this.state.currentQuestion =
        this.state.currentQuestions[0];

    this.state.status =
        GAME_STATUS.PLAYING;

    return this.state;

}


    useLifeline(type) {

    if (!this.state.lifelines[type]) {

        return this.state;

    }

    this.state.lifelines[type] = false;

    return this.state;

}

    timeout() {

    this.state.currentPrize =
        RewardEngine.getWrongAnswerPrize(
            this.state.currentTier
        );

    this.state.status =
        GAME_STATUS.GAME_OVER;

    return this.state;

}

    walkAway() {

    this.state.currentPrize =
        RewardEngine.getWalkAwayPrize(
            this.state.currentTier
        );

    this.state.status =
        GAME_STATUS.WALKED_AWAY;

    return this.state;

}

    resetGame() {

    this.state = createGameState();

    QuestionEngine.reset();

    return this.state;

}

}

export default new GameEngine();