import { useEffect, useState } from "react";
import { Trophy, SkullIcon, LogOut, TimerOff, RotateCcw, ChevronRight } from "lucide-react";
import {playWin,playLose} from "../../utils/sounds";

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const OUTCOME_MAP = {
  won: {
    label: "MISSION COMPLETE",
    subtitle: "You successfully breached all security layers.",
    color: "success",
    Icon: Trophy,
  },

  wrong: {
    label: "MISSION FAILED",
    subtitle: "Wrong answer. You returned to the last secure checkpoint.",
    color: "danger",
    Icon: SkullIcon,
  },

  walked_away: {
    label: "SAFE EXTRACTION",
    subtitle: "You secured your winnings and exited safely.",
    color: "amber",
    Icon: LogOut,
  },

  timeout: {
    label: "SYSTEM TIMEOUT",
    subtitle: "Time expired before an answer could be verified.",
    color: "danger",
    Icon: TimerOff,
  },
};

const colorMap = {
  success: {
    text: "text-success glow-green",
    border: "border-success/50",
    shadow: "shadow-green",
    accent: "bg-success",
  },
  danger: {
    text: "text-danger glow-red",
    border: "border-danger/50",
    shadow: "shadow-red",
    accent: "bg-danger",
  },
  amber: {
    text: "text-amber-neon glow-amber",
    border: "border-amber-neon/50",
    shadow: "shadow-amber",
    accent: "bg-amber-neon",
  },
};

const EndScreen = ({ outcome, prize, questionsAnswered, playerName, onRestart, onLeaderboard }) => {
  const cfg = OUTCOME_MAP[outcome] || OUTCOME_MAP.wrong;
  const c = colorMap[cfg.color];
  const [displayPrize, setDisplayPrize] = useState(0);

  useEffect(() => {

    if(outcome==="won"){

        playWin();

    }

    else{

        playLose();

    }
    if (prize === 0) return;
    let cur = 0;
    const step = Math.max(1, Math.floor(prize / 40));
    const t = setInterval(() => {
      cur += step;
      if (cur >= prize) {
        cur = prize;
        clearInterval(t);
      }
      setDisplayPrize(cur);
    }, 22);
    return () => clearInterval(t);
  }, [prize]);

  const { Icon } = cfg;

  return (
    <div className="crt-scanlines animate-page min-h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        <div className={`term-panel ${c.border} ${c.shadow} p-8 md:p-12`} data-testid="end-screen">
          <div className="flex items-center justify-between mb-8">
            <span className={`text-[10px] tracking-[0.3em] uppercase ${c.text}`}>
              SYSTEM.RESULT
            </span>
            <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono">
              op:{playerName} · q:{questionsAnswered}/12
            </span>
          </div>

          <div className="flex flex-col items-start">
            <div className={`p-3 border ${c.border} mb-6`} style={{ borderRadius: 2 }}>
              <Icon size={28} strokeWidth={1.5} className={c.text} />
            </div>

          <div className="mb-3 px-4 py-2 border border-white/10 bg-white/5 inline-flex items-center gap-2 rounded-sm">

              <span className={`w-2 h-2 rounded-full ${c.accent}`} />

              <span className="text-[10px] tracking-[0.35em] uppercase text-white/60">

                Mission Status

              </span>

          </div>

            <h1
              className={`font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter leading-none mb-3 ${c.text} animate-glitch`}
              data-testid="end-outcome-label"
            >
              {cfg.label}
            </h1>
            <p className="text-white/60 font-mono text-sm md:text-base mb-8 max-w-lg leading-relaxed">
              {cfg.subtitle}
            </p>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="term-panel p-4 col-span-2">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1">
                  payload_extracted
                </div>
                <div
                  className="font-display font-black text-4xl md:text-5xl text-amber-neon glow-amber tabular-nums"
                  data-testid="end-prize-display"
                >
                  {formatINR(displayPrize)}
                </div>
              </div>
              <div className="term-panel p-4 flex flex-col justify-center">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1">
                  breach_depth
                </div>
                <div className="font-display font-bold text-2xl text-cyan-neon glow-cyan tabular-nums">
                  {String(questionsAnswered).padStart(2, "0")}/36
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onRestart}
                data-testid="restart-btn"
                className="brk px-5 py-3 border border-cyan-neon text-cyan-neon hover:bg-cyan-neon hover:text-black transition-all font-display tracking-[0.25em] text-xs flex items-center gap-2"
                style={{ borderRadius: 2 }}
              >
                <RotateCcw size={14} /> REJACK
              </button>
              <button
                type="button"
                onClick={onLeaderboard}
                data-testid="view-leaderboard-btn"
                className="brk px-5 py-3 border border-amber-neon text-amber-neon hover:bg-amber-neon hover:text-black transition-all font-display tracking-[0.25em] text-xs flex items-center gap-2"
                style={{ borderRadius: 2 }}
              >
                LEADERBOARD <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
