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

    // ===========================================
    // PUBLIC API
    // ===========================================

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

            case "AI_RANDOM_CATEGORY":
                return this.aiRandomCategory(
                    action.payload?.category
                );

            case "USE_LIFELINE":
                return this.useLifeline(
                    action.payload.type
                );

            case "TIMEOUT":
                return this.timeout();

            case "WALK_AWAY":
                return this.walkAway();

            case "RESET_GAME":
                return this.resetGame();

            default:

                console.warn(
                    "Unknown Action:",
                    action.type
                );

                return this.state;

        }

    }

    // ===========================================
    // START GAME
    // ===========================================

    startGame(payload) {

        this.state = createGameState();

        this.state.playerName =
            payload.playerName;

        this.state.mode =
            payload.mode;

        QuestionEngine.reset();

        QuestionEngine.resetAICategories();

        // ==========================
        // CLASSIC MODE
        // ==========================

        if (payload.mode === "classic") {

            const tier = getTier(1);

            this.state.currentCategory =
                "Classic";

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

            return this.state;

        }

        // ==========================
        // STRATEGY MODE
        // ==========================

        this.state.status =
            GAME_STATUS.CATEGORY_SELECTION;

        return this.state;

    }

    // ===========================================
    // CATEGORY
    // ===========================================

    selectCategory(payload) {

        const tier = getTier(
            this.state.currentTier
        );

        this.state.currentCategory =
            payload.category;

        this.state.currentQuestions =
            QuestionEngine.getQuestions(

                payload.category,

                tier.difficulty,

                tier.questions

            );

        this.state.currentQuestionIndex = 0;

        this.state.currentQuestion =
            this.state.currentQuestions[0];

        this.state.status =
            GAME_STATUS.PLAYING;

        return this.state;

    }

        // ============================
    // GAMEPLAY
    // ============================

    submitAnswer(payload) {

        const question = this.state.currentQuestion;

        if (!question) {

            return this.state;

        }

        const selected = payload.answer;

        this.state.revealedAnswer = selected;

        // ==========================
        // WRONG ANSWER
        // ==========================

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

        // ==========================
        // CORRECT ANSWER
        // ==========================

        this.state.correctAnswers++;

        this.state.totalQuestionsAnswered++;

        const tier =
            getTier(this.state.currentTier);

        this.state.currentPrize =
            tier.reward;

        this.state.guaranteedPrize =
            RewardEngine.getGuaranteedPrize(
                this.state.currentTier
            );

        // Tier completed?

        if (

            this.state.currentQuestionIndex >=
            this.state.currentQuestions.length - 1

        ) {

            if (

                isLastTier(
                    this.state.currentTier
                )

            ) {

                this.state.status =
                    GAME_STATUS.WON;

            }

            else {

                this.state.status =
                    GAME_STATUS.TIER_COMPLETED;

            }

            return this.state;

        }

        return this.nextQuestion();

    }

    // ===========================================
    // NEXT QUESTION
    // ===========================================

    nextQuestion() {

        this.state.currentQuestionIndex++;

        this.state.revealedAnswer = null;

        this.state.currentQuestion =

            this.state.currentQuestions[
                this.state.currentQuestionIndex
            ];

        return this.state;

    }

    // ===========================================
    // NEXT TIER
    // ===========================================

    advanceTier() {

        this.state.currentTier++;

        this.state.currentQuestionIndex = 0;

        this.state.revealedAnswer = null;

        const tier =
            getTier(this.state.currentTier);

        // Finished game?

        if (!tier) {

            this.state.status =
                GAME_STATUS.WON;

            return this.state;

        }

        // =======================================
        // CLASSIC MODE
        // =======================================

        if (this.state.mode === "classic") {

            this.state.currentCategory =
                "Classic";

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

        // =======================================
        // STRATEGY MODE
        // =======================================

        if (!this.state.aiMode) {

            this.state.usedCategories =
                CategoryEngine.lockCategory(

                    this.state.currentCategory,

                    this.state.usedCategories

                );

        }

        this.state.currentCategory = null;

        this.state.currentQuestions = [];

        this.state.currentQuestion = null;

        // =======================================
        // ENTER AI MODE
        // =======================================

        if (

            this.state.currentTier >= 7

        ) {

            this.state.aiMode = true;

        }

        // =======================================
        // AI MODE
        // =======================================

        if (

            this.state.aiMode

        ) {

            this.state.generatedCategory =

                QuestionEngine.getRandomCategory();

            this.state.status =

                GAME_STATUS.AI_ASSIGNING;

        }

        else {

            this.state.status =

                GAME_STATUS.CATEGORY_SELECTION;

        }

        return this.state;

    }


        // ===========================================
    // LIFELINES
    // ===========================================

    useLifeline(type) {

        if (!this.state.lifelines[type]) {

            return this.state;

        }

        this.state.lifelines[type] = false;

        return this.state;

    }

    // ===========================================
    // TIMEOUT
    // ===========================================

    timeout() {

        this.state.currentPrize =
            RewardEngine.getWrongAnswerPrize(
                this.state.currentTier
            );

        this.state.status =
            GAME_STATUS.GAME_OVER;

        return this.state;

    }

    // ===========================================
    // WALK AWAY
    // ===========================================

    walkAway() {

    // Keep whatever prize the player has already earned.
    // currentPrize is already updated after every correct answer.

    this.state.guaranteedPrize =
        RewardEngine.getGuaranteedPrize(
            this.state.currentTier
        );

    this.state.status =
        GAME_STATUS.WALKED_AWAY;

    return this.state;

}

    // ===========================================
    // AI RANDOM CATEGORY
    // ===========================================

    aiRandomCategory() {

        const tier =
            getTier(this.state.currentTier);

        const category =
            this.state.generatedCategory;

        this.state.currentCategory =
            category;

        this.state.currentQuestions =
            QuestionEngine.getQuestions(

                category,

                tier.difficulty,

                tier.questions

            );

        this.state.currentQuestionIndex = 0;

        this.state.currentQuestion =
            this.state.currentQuestions[0];

        this.state.revealedAnswer = null;

        this.state.status =
            GAME_STATUS.PLAYING;

        return this.state;

    }

    // ===========================================
    // RESET GAME
    // ===========================================

    resetGame() {

        this.state =
            createGameState();

        QuestionEngine.reset();

        QuestionEngine.resetAICategories();

        return this.state;

    }

}

export default new GameEngine();