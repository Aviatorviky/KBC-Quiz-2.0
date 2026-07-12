import React from "react";
import { playClick, playHover } from "../../utils/sounds";

const LETTERS = ["🅰", "🅱", "🅲", "🅳"];

const QuestionCard = ({
  question,
  questionNumber = 1,
  totalQuestions = 12,
  selectedAnswer,
  revealedAnswer,
  lockingAnswer,
  eliminated = [],
  disabled = false,
  friendHint = null,
  onAnswer,
}) => {
  if (!question) {
    return (
      <div className="term-panel p-10 text-center">
        <h2 className="text-cyan-neon text-3xl animate-pulse">
          Initializing Mainframe...
        </h2>
      </div>
    );
  }

  const eliminatedSet = new Set(eliminated);

  return (
    <div
      className="term-panel p-8 md:p-10 animate-fade-in"
      data-testid="question-card"
    >
      {/* HEADER */}

      <div className="flex justify-between items-start mb-8">

        <div>

          <div className="text-xs uppercase tracking-[0.35em] text-cyan-neon">

            QUESTION {String(questionNumber).padStart(2, "0")} OF {totalQuestions}

          </div>

          <div className="text-[10px] mt-2 uppercase tracking-[0.25em] text-white/40">

            MAINFRAME CHALLENGE

          </div>

        </div>

        <div className="text-right">

          <div className="px-3 py-1 border border-amber-neon text-amber-neon text-xs tracking-wider">

            📂 {question.category}

          </div>

          {question.difficulty && (

            <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cyan-neon">

              {question.difficulty}

            </div>

          )}

        </div>

      </div>

      {/* PROGRESS */}

      <div className="mb-8">

        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">

          <span>Progress</span>

          <span>{questionNumber}/{totalQuestions}</span>

        </div>

        <div className="h-2 bg-white/10 rounded-full overflow-hidden">

          <div

            className="h-full bg-cyan-neon transition-all duration-700"

            style={{

              width: `${(questionNumber / totalQuestions) * 100}%`

            }}

          />

        </div>

      </div>

      {/* QUESTION */}

      <div className="border border-cyan-neon/20 bg-white/[0.02] rounded-sm p-10 mb-10">

        <h2 className="font-display text-3xl md:text-4xl text-center text-white leading-relaxed">

          {question.question}

        </h2>

      </div>

      {/* LOCKING */}

      {lockingAnswer && (

<div className="mb-8">

    <div className="relative overflow-hidden border border-cyan-neon bg-cyan-neon/10 p-5">

        {/* Scan Line */}

        <div className="absolute inset-y-0 -left-32 w-32 bg-gradient-to-r from-transparent via-cyan-neon/70 to-transparent animate-scan"/>

        <div className="relative z-10 text-center">

            <div className="font-display text-cyan-neon tracking-[0.35em] text-lg">

                 Decrypting ANSWER

            </div>

            <div className="text-white/60 mt-2 text-sm">

                Verifying response with Mainframe...

            </div>

        </div>

    </div>

</div>

)}

      {/* ANSWERS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {question.options.map((option, index) => {

          const eliminatedOption = eliminatedSet.has(index);

          let classes =
            "relative overflow-hidden border-2 rounded-sm px-6 py-5 flex items-center gap-5 transition-all duration-300";

          if (eliminatedOption) {

            classes +=
              " opacity-20 cursor-not-allowed";

          } else {

            classes +=
              " border-white/15 hover:border-cyan-neon hover:bg-cyan-neon/5 hover:shadow-lg hover:scale-[1.025] hover:shadow-cyan cursor-pointer";

          }

          if (!revealedAnswer && selectedAnswer === index) {

            classes +=
              " border-cyan-neon bg-cyan-neon/15 shadow-cyan scale-[1.04] animate-pulse";

          }

          if (revealedAnswer) {

            if (index === question.correctAnswer) {

              classes +=
                " border-green-400 bg-success/20 border-success shadow-green animate-pulse text-green-300 animate-pulse";

            }

            else if (index === selectedAnswer) {

              classes +=
                " border-red-400 bg-danger/20 border-danger shadow-red animate-pulse text-red-300 animate-pulse";

            }

            else {

              classes +=
                " opacity-40";

            }

          }

          return (

            <button

              key={index}

              disabled={disabled || eliminatedOption}

              className={classes}

              onMouseEnter={() => {

                if (!disabled && !eliminatedOption) {

                  playHover();

                }

              }}

              onClick={() => {

                if (disabled || eliminatedOption) return;

                playClick();

                onAnswer(index);

              }}

            >

              <div className="w-12 h-12 rounded-full bg-cyan-neon text-black flex items-center justify-center font-bold text-lg shadow-lg">

                {LETTERS[index]}

              </div>

              <div className="flex-1">

                <div className="text-left text-lg text-white leading-relaxed">

                  {option}

                </div>

              </div>

              {friendHint === index && !revealedAnswer && (

                <div className="text-right">

                  <div className="text-[10px] tracking-[0.2em] text-cyan-neon">

                    Friends Call

                  </div>

                  <div className="text-xs text-cyan-neon font-bold">

                    HIGH CONFIDENCE

                  </div>

                </div>

              )}

            </button>

          );

        })}

      </div>

    </div>

  );

};

export default QuestionCard;