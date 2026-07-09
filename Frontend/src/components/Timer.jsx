import { useEffect, useRef, useState } from "react";
import { playTick } from "../utils/sounds";

const Timer = ({ duration, onTimeout, isPaused }) => {
  const [t, setT] = useState(duration);
  const timerRef = useRef(null);
  const expiredRef = useRef(false);

  useEffect(() => {
    setT(duration);
    expiredRef.current = false;
  }, [duration]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (expiredRef.current) return;
    
    timerRef.current = setInterval(() => {
      setT((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onTimeout && onTimeout();
          }
          return 0;
        }
        if (prev <= 6) playTick();
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, [isPaused, onTimeout]);

  const pct = Math.max(0, Math.min(100, (t / duration) * 100));
  const color = t > 20 ? "#00F0FF" : t > 10 ? "#FFB000" : "#FF3366";
  const glowClass = t > 20 ? "glow-cyan" : t > 10 ? "glow-amber" : "glow-red";

  return (
    <div className="w-full" data-testid="timer">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/50">timer.exe</span>
        <span
          className={`font-display font-bold tabular-nums text-lg ${glowClass}`}
          style={{ color }}
          data-testid="timer-value"
        >
          {String(Math.floor(t / 60)).padStart(2, "0")}:{String(t % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="h-1 w-full bg-white/5 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-linear"
          style={{
            width: `${pct}%`,
            background: color,
            boxShadow: `0 0 12px ${color}, 0 0 22px ${color}`,
          }}
        />
      </div>
    </div>
  );
};

export default Timer;
