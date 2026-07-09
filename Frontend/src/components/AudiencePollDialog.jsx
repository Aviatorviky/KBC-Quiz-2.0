import React from "react";

const AudiencePollDialog = ({ isOpen, onClose, votes }) => {
  if (!isOpen) return null;
  const safeVotes = votes || { A: 0, B: 0, C: 0, D: 0 };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-up">
      <div className="bg-base-1 border border-amber-neon text-foreground font-mono max-w-md w-full p-6 term-panel shadow-amber">
        <div>
          <h3 className="text-amber-neon glow-amber tracking-wider font-display text-sm font-bold mb-2">
            // INTERCEPTING_AUDIENCE_METRICS
          </h3>
          <p className="text-white/70 text-xs mt-1 leading-relaxed">
            Mainframe telemetry successfully parsed. Real-time consensus from active operators across the grid:
          </p>
        </div>

        <div className="my-6 space-y-4">
          {["A", "B", "C", "D"].map((letter) => {
            const percentage = safeVotes[letter] || 0;
            return (
              <div key={letter} className="space-y-1">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-cyan-neon">OPTION_{letter}</span>
                  <span className="text-amber-neon tabular-nums">{percentage}%</span>
                </div>
                <div className="w-full bg-base-0 h-4 border border-white/10 flex items-center p-[2px]" style={{ borderRadius: 1 }}>
                  <div
                    className="bg-amber-neon shadow-amber h-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-amber-neon text-black font-bold text-xs tracking-widest hover:bg-amber-hover px-4 py-2"
            style={{ borderRadius: 2 }}
          >
            DISMISS_DATA
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudiencePollDialog;
