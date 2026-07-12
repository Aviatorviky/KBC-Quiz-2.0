import { useState, useEffect, useCallback } from "react";

import Timer from "../../components/Timer";
import QuestionCard from "../../components/QuestionCard";
import LifelinesPanel from "../../components/LifelinesPanel";
import AudiencePollModal from "../../components/UI/AudiencePollModal";

import GameEngine from "../../../Engine/GameEngine";

import {
    playLock,
    playCorrect,
    playWrong
} from "../../../utils/sounds";

const GameBoard = ({ state, refresh }) => {

    const question = state.currentQuestion;

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [revealedAnswer, setRevealedAnswer] = useState(false);

    const [answerLocked, setAnswerLocked] = useState(false);

    const [lockingAnswer, setLockingAnswer] = useState(false);

    const [timerPaused, setTimerPaused] = useState(false);

    const [eliminated, setEliminated] = useState([]);

    const [friendHint, setFriendHint] = useState(null);

    const [audiencePoll, setAudiencePoll] = useState(null);

    useEffect(() => {

        setSelectedAnswer(null);

        setRevealedAnswer(false);

        setAnswerLocked(false);

        setLockingAnswer(false);

        setTimerPaused(false);

        setEliminated([]);

        setFriendHint(null);

        setAudiencePoll(null);

    }, [question]);

    useEffect(() => {

        const handleKey = (e) => {

            if (

                e.target.tagName === "INPUT" ||

                e.target.tagName === "TEXTAREA"

            ) return;

            if (

                revealedAnswer ||

                lockingAnswer ||

                answerLocked

            ) return;

            const map = {

                a: 0,

                b: 1,

                c: 2,

                d: 3

            };

            const answer =

                map[e.key.toLowerCase()];

            if (

                answer !== undefined

            ) {

                submitAnswer(answer);

            }

        };

        window.addEventListener(

            "keydown",

            handleKey

        );

        return () =>

            window.removeEventListener(

                "keydown",

                handleKey

            );

    }, [

        revealedAnswer,

        lockingAnswer,

        answerLocked,

        question

    ]);

        // ===========================================
    // TIMER
    // ===========================================

    const handleTimeout = useCallback(() => {

        GameEngine.dispatch({

            type: "TIMEOUT"

        });

        refresh();

    }, [refresh]);

    // ===========================================
    // ANSWER
    // ===========================================

    const submitAnswer = (answer) => {

        if (

            revealedAnswer ||

            lockingAnswer ||

            answerLocked

        ) return;

        setSelectedAnswer(answer);

        setAnswerLocked(true);

        setTimerPaused(true);

        setLockingAnswer(true);

        playLock();

        setTimeout(() => {

            GameEngine.dispatch({

                type: "SUBMIT_ANSWER",

                payload: {

                    answer

                }

            });

            const updated =

                GameEngine.getState();

            if (

                updated.status === "game-over"

            ) {

                playWrong();

            }

            else {

                playCorrect();

            }

            setLockingAnswer(false);

            setRevealedAnswer(true);

            setTimeout(() => {

                refresh();

            }, 1500);

        }, 1200);

    };

    // ===========================================
    // LIFELINES
    // ===========================================

    const useLifeline = (type) => {

        if (!question) return;

        GameEngine.dispatch({

            type: "USE_LIFELINE",

            payload: {

                type

            }

        });

        switch (type) {

            // -------------------

            // 50 : 50

            // -------------------

            case "fifty": {

                const wrongAnswers = [];

                question.options.forEach((_, index) => {

                    if (

                        index !== question.correctAnswer

                    ) {

                        wrongAnswers.push(index);

                    }

                });

                wrongAnswers.sort(() =>

                    Math.random() - 0.5

                );

                setEliminated(

                    wrongAnswers.slice(0, 2)

                );

                break;

            }

            // -------------------

            // PHONE

            // -------------------

            case "phone": {

                setFriendHint(

                    question.correctAnswer

                );

                break;

            }

            // -------------------

            // AUDIENCE

            // -------------------

            case "audience": {

                const poll = [0, 0, 0, 0];

                const correct =

                    question.correctAnswer;

                let remaining = 100;

                const correctVotes =

                    Math.floor(

                        Math.random() * 21

                    ) + 65;

                poll[correct] =

                    correctVotes;

                remaining -= correctVotes;

                const wrong = [];

                question.options.forEach(

                    (_, index) => {

                        if (

                            index !== correct

                        ) {

                            wrong.push(index);

                        }

                    }

                );

                wrong.forEach(

                    (option, index) => {

                        if (

                            index ===

                            wrong.length - 1

                        ) {

                            poll[option] =

                                remaining;

                        }

                        else {

                            const votes =

                                Math.floor(

                                    Math.random() *

                                    (

                                        remaining / 2

                                    )

                                );

                            poll[option] =

                                votes;

                            remaining -=

                                votes;

                        }

                    }

                );

                setAudiencePoll(

                    poll

                );

                break;

            }

            default:

                break;

        }

        refresh();

    };

        

        // ===========================================
    // LOADING
    // ===========================================

    if (!question) {

        return (

            <div className="lg:col-span-4 flex items-center justify-center">

                <div className="term-panel p-12 text-center">

                    <div className="animate-spin w-12 h-12 mx-auto border-2 border-cyan-neon border-t-transparent rounded-full mb-6"/>

                    <h2 className="font-display text-3xl text-cyan-neon">

                        Initializing Mainframe...

                    </h2>

                </div>

            </div>

        );

    }

    // ===========================================
    // UI
    // ===========================================

    return (

        <div className="lg:col-span-4 relative space-y-6">

            {/* Lock Overlay */}

            {

                lockingAnswer && (

                    <div className="absolute inset-0 z-40 rounded bg-black/40 backdrop-blur-[2px] animate-pulse"/>

                )

            }

            {/* Timer */}

            <Timer

                duration={45}

                isPaused={timerPaused}

                onTimeout={handleTimeout}

            />

            {/* Question */}

            <QuestionCard

                question={question}

                questionNumber={state.currentTier}

                totalQuestions={12}

                selectedAnswer={selectedAnswer}

                revealedAnswer={revealedAnswer}

                lockingAnswer={lockingAnswer}

                eliminated={eliminated}

                friendHint={friendHint}

                disabled={

                    revealedAnswer ||

                    lockingAnswer ||

                    answerLocked

                }

                onAnswer={submitAnswer}

            />

            {/* Audience Poll */}

            <AudiencePollModal

                open={!!audiencePoll}

                poll={audiencePoll}

                onClose={() =>

                    setAudiencePoll(null)

                }

            />

            {/* Lifelines */}

            <LifelinesPanel

                lifelines={state.lifelines}

                disabled={

                    revealedAnswer ||

                    lockingAnswer ||

                    answerLocked

                }

                onUseLifeline={useLifeline}

            />

        </div>

    );

};

export default GameBoard;