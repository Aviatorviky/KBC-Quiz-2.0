import { Link } from "react-router-dom";
import { Cpu, Brain } from "lucide-react";

const ModeSelection = () => {
  return (
    <div className="crt-scanlines animate-page min-h-screen flex items-center justify-center px-6">

      <div className="max-w-6xl w-full">

        <div className="text-center mb-12">

          <p className="text-cyan-neon tracking-[0.4em] text-xs mb-4">
            SELECT GAME MODE
          </p>

          <h1 className="font-display text-6xl font-black text-white">
            KAUN BANEGA
          </h1>

          <h2 className="font-display text-6xl font-black text-amber-neon glow-amber">
            CROREPATI
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* CLASSIC */}

          <Link
            to="/classic"
            className="term-panel p-8 hover:border-cyan-neon transition-all group"
          >

            <Cpu
              size={60}
              className="text-cyan-neon mb-6 group-hover:scale-110 transition-transform"
            />

            <h2 className="text-3xl font-display text-white mb-4">
              CLASSIC MODE
            </h2>

            <p className="text-white/60 mb-6">

              Original Kaun Banega Crorepati experience.

            </p>

            <ul className="space-y-2 text-sm text-white/70">

              <li>✔ 12 Questions</li>

              <li>✔ Original Prize Ladder</li>

              <li>✔ 3 Lifelines</li>

              <li>✔ ₹7 Crore Jackpot</li>

            </ul>

          </Link>

          {/* STRATEGY */}

          <Link
            to="/strategy"
            className="term-panel p-8 hover:border-amber-neon transition-all group"
          >

            <Brain
              size={60}
              className="text-amber-neon mb-6 group-hover:scale-110 transition-transform"
            />

            <h2 className="text-3xl font-display text-white mb-4">
              STRATEGY MODE
            </h2>

            <p className="text-white/60 mb-6">

              Choose categories. Build checkpoints. Win strategically.

            </p>

            <ul className="space-y-2 text-sm text-white/70">

              <li>✔ Choose Category Every Tier</li>

              <li>✔ Random Questions</li>

              <li>✔ Checkpoints</li>

              <li>✔ Infinite Replayability</li>

            </ul>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default ModeSelection;