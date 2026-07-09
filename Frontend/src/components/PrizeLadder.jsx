import React from "react";
import { QUESTIONS, formatINR, toHexAddr } from "../Data/questions";

const PrizeLadder = ({ currentIdx, score }) => {
  // Create a reversed list of the questions array to display largest prize at the top
  const ladderItems = [...QUESTIONS].reverse();

  return (
    <div className="term-panel p-4 font-mono text-sm" data-testid="prize-ladder">
      <div className="flex items-center justify-between mb-4 border-b border-amber-neon/15 pb-2">
        <span className="text-[10px] tracking-[0.3em] text-amber-neon glow-amber uppercase">
          ./mainframe --ladder
        </span>
        <span className="text-[10px] tracking-[0.3em] text-white/40 tabular-nums">
          NET_WORTH: {formatINR(score)}
        </span>
      </div>

      <ul className="space-y-1">
        {ladderItems.map((item, index) => {
          // Calculate true index because the ladder map execution loop is reversed
          const actualIdx = QUESTIONS.length - 1 - index;
          const isCurrent = actualIdx === currentIdx;
          const isPassed = actualIdx < currentIdx;

          // Milestone stylistic checkpoints (3, 6, 9)
          const isMilestone = [2, 5, 8].includes(actualIdx);

          let rowClass = "text-white/40 border border-transparent px-3 py-1.5 flex items-center justify-between";
          if (isCurrent) {
            rowClass = "bg-amber-neon/10 border border-amber-neon text-amber-neon glow-amber font-bold px-3 py-1.5 flex items-center justify-between shadow-amber";
          } else if (isPassed) {
            rowClass = "text-cyan-neon/70 font-medium px-3 py-1.5 flex items-center justify-between";
          } else if (isMilestone) {
            rowClass = "text-white/70 border-b border-white/5 font-semibold px-3 py-1.5 flex items-center justify-between";
          }

          return (
            <li key={item.id || actualIdx} className={rowClass} data-testid={`ladder-item-${actualIdx}`}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/30 tabular-nums">
                  {toHexAddr(actualIdx + 1)}
                </span>
                <span className={isCurrent ? "text-amber-neon" : "tabular-nums"}>
                  {formatINR(item.prize)}
                </span>
                {isMilestone && !isCurrent && (
                  <span className="text-[8px] tracking-widest text-white/30 border border-white/10 px-1 bg-white/[0.02]" style={{ borderRadius: 1 }}>
                    SAFE_POINT
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-widest opacity-70">
                {item.tier}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrizeLadder;
