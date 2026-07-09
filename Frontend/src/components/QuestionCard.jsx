import React from "react";
import { playClick, playHover } from "../utils/sounds";

const OPTION_COLORS = {
  A: "text-cyan-neon border-cyan-neon/40",
  B: "text-amber-neon border-amber-neon/40",
  C: "text-cyan-neon border-cyan-neon/40",
  D: "text-amber-neon border-amber-neon/40",
};

const QuestionCard = ({
  question,          // The composite object 'q' passed down from GameScreen
  revealed,          // { chosen, correct } | null
  eliminated,        // Set of option letter strings removed by 50-50
  onAnswerSelect,    // The select function name wired inside GameScreen.jsx
  disabled,
  friendHint,        // { letter } | null
}) => {
  const allLetters = ["A", "B", "C", "D"];

  return (
    <div className="term-panel p-5 md:p-8 relative" data-testid="question-card">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-neon glow-amber">
            {`> query_active_node.exe`}
          </span>
        </div>
        <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-neon">
          {question.tier}
        </span>
      </div>

      <h2
        className="font-display text-xl sm:text-2xl md:text-3xl leading-snug tracking-tight text-white mb-8 animate-fade-up"
        data-testid="question-text"
      >
        <span className="text-cyan-neon/90 mr-2">$</span>
        {question.text}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {allLetters.map((L, index) => {
          // Map option string indexes directly to letters: A=0, B=1, C=2, D=3
                    const optText = question.options[index];
          const isEliminated = eliminated.has(L);
          
          // Automatically strip out the "A. ", "B. " prefix if it's baked into your questions array
          const text = isEliminated 
            ? "—— PURGED ——" 
            : (optText && optText.startsWith(`${L}.`) ? optText.slice(3).trim() : optText);

          let stateClasses = "";
          if (revealed) {
            if (L === revealed.correct) stateClasses = "shadow-green border-success text-success glow-green";
            else if (L === revealed.chosen) stateClasses = "shadow-red border-danger text-danger glow-red";
            else stateClasses = "opacity-40";
          }

          const isFriendHint = friendHint && friendHint.letter === L && !revealed;

          return (
            <button
              key={L}
              type="button"
              disabled={isEliminated || disabled}
              onMouseEnter={() => !isEliminated && !disabled && playHover()}
              onClick={() => {
                if (isEliminated || disabled) return;
                playClick();
                onAnswerSelect(L);
              }}
              data-testid={`option-${L}-btn`}
              className={[
                "group relative text-left border px-4 py-4 md:py-5 flex items-center gap-4 transition-all duration-200",
                isEliminated
                  ? "border-white/5 text-white/20 line-through cursor-not-allowed"
                  : `${OPTION_COLORS[L]} hover:bg-white/[0.03] hover:translate-x-[2px] cursor-pointer`,
                stateClasses,
                isFriendHint && "ring-1 ring-cyan-neon/60",
              ].join(" ")}
              style={{ borderRadius: 2 }}
            >
              <span className="font-display font-bold text-lg md:text-xl w-8 shrink-0">
                {L}
              </span>
              <span className="h-6 w-px bg-current opacity-30" />
              <span className={`font-mono text-sm md:text-base ${isEliminated ? "" : "text-white/90 group-hover:text-white"}`}>
                {text}
              </span>
              {isFriendHint && (
                <span className="absolute -top-2 -right-2 text-[9px] tracking-widest bg-cyan-neon text-black px-1.5 py-0.5 rounded-sm">
                  FRIEND_PICK
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
