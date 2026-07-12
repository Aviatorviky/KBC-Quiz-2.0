import { useEffect, useRef, useState } from "react";
import { Clock3 } from "lucide-react";
import { playTick, stopTimer } from "../../utils/sounds";

const Timer = ({ duration, onTimeout, isPaused }) => {

  const [time, setTime] = useState(duration);

  const timerRef = useRef(null);

  const expiredRef = useRef(false);

  // ===========================
  // RESET
  // ===========================

  useEffect(() => {

    setTime(duration);

    expiredRef.current = false;

  }, [duration]);

  // ===========================
  // TIMER
  // ===========================

  useEffect(() => {

    if (isPaused) {

      clearInterval(timerRef.current);

      stopTimer();

      return;

    }

    if (expiredRef.current) return;

    timerRef.current = setInterval(() => {

      setTime((prev) => {

        if (prev <= 1) {

          clearInterval(timerRef.current);

          stopTimer();

          if (!expiredRef.current) {

            expiredRef.current = true;

            onTimeout?.();

          }

          return 0;

        }

        if (prev <= 10) {

          playTick();

        }

        return prev - 1;

      });

    }, 1000);

    return () => {

      clearInterval(timerRef.current);

      stopTimer();

    };

  }, [isPaused, onTimeout]);

  // ===========================
  // COLORS
  // ===========================

  const percent = (time / duration) * 100;

  let color = "bg-cyan-neon";
  let text = "text-cyan-neon";
  let border = "border-cyan-neon";
  let glow = "shadow-cyan";
  let status = "STABLE";

  if (time <= 20) {

    color = "bg-amber-neon";
    text = "text-amber-neon";
    border = "border-amber-neon";
    glow = "shadow-amber";
    status = "WARNING";

  }

  if (time <= 10) {

    color = "bg-danger";
    text = "text-danger";
    border = "border-danger";
    glow = "shadow-red";
    status = "CRITICAL";

  }

  if (time <= 5) {

    status = "EMERGENCY";

  }

  // ===========================
  // UI
  // ===========================

  return (

    <div
      className={`term-panel p-5 border ${border} ${glow} ${
        time <= 5 ? "animate-pulse" : ""
      }`}
      data-testid="timer"
    >

      {/* Header */}

      <div className="flex justify-between items-center mb-5">

        <div className="flex items-center gap-3">

          <Clock3
            size={18}
            className={text}
          />

          <span className="tracking-[0.35em] text-xs text-white/50 uppercase">

            Mission Timer

          </span>

        </div>

        <span
          className={`font-display font-black text-3xl tabular-nums ${text}`}
        >

          {String(Math.floor(time / 60)).padStart(2, "0")}:
          {String(time % 60).padStart(2, "0")}

        </span>

      </div>

      {/* Progress */}

      <div className="h-3 bg-white/10 rounded overflow-hidden">

        <div
          className={`h-full transition-all duration-1000 ${color}`}
          style={{
            width: `${percent}%`,
          }}
        />

      </div>

      {/* Footer */}

      <div className="flex justify-between mt-4 text-xs">

        <span className="text-white/40">

          STATUS

        </span>

        <span className={`${text} font-bold tracking-[0.25em]`}>

          {status}

        </span>

      </div>

      {/* Emergency */}

      {time <= 5 && (

        <div className="mt-4 text-center">

          <div className="font-display text-danger text-xl tracking-[0.3em] animate-bounce">

            SYSTEM FAILURE

          </div>

          <div className="text-white/60 mt-1">

            Respond Immediately

          </div>

        </div>

      )}

    </div>

  );

};

export default Timer;