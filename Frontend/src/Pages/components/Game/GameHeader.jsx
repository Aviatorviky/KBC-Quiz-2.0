import {
  LogOut,
  User,
  Volume2,
  VolumeX,
  Trophy,
  Target,
  Coins,
} from "lucide-react";

import { useState } from "react";
import { toggleMute, isMuted } from "../../../utils/sounds";

const formatMoney = (amount = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const GameHeader = ({
  state,
  onExit,
}) => {

  const [muted, setMuted] = useState(isMuted());

  const handleMute = () => {

    setMuted(toggleMute());

  };

  const progress =
    ((state.currentTier || 1) / 12) * 100;

  return (

    <header className="mb-6 px-6 pt-5">

      <div className="term-panel border border-cyan-neon/20 p-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          {/* Logo */}

          <div>

            <div className="font-display font-black tracking-[0.3em] text-xl text-amber-neon glow-amber">

              KBC CYBERPATI

            </div>

            <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-1">

              Quantum Intelligence Challenge

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1 lg:px-10">

            <div className="border border-white/10 p-3">

              <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase">

                <User size={12} />

                Player

              </div>

              <div className="mt-1 font-display text-cyan-neon uppercase">

                {state.playerName}

              </div>

            </div>

            <div className="border border-white/10 p-3">

              <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase">

                <Target size={12} />

                Mode

              </div>

              <div
                className={`mt-1 font-display uppercase ${
                  state.mode === "classic"
                    ? "text-cyan-neon"
                    : "text-amber-neon"
                }`}
              >

                {state.mode}

              </div>

            </div>

            <div className="border border-white/10 p-3">

              <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase">

                <Trophy size={12} />

                Tier

              </div>

              <div className="mt-1 font-display text-white">

                {state.currentTier}/12

              </div>

            </div>

            <div className="border border-white/10 p-3">

              <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase">

                <Coins size={12} />

                Prize

              </div>

              <div className="mt-1 font-display text-amber-neon glow-amber">

                {formatMoney(state.currentPrize)}

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex items-center gap-3">

            <button
              onClick={handleMute}
              className="w-11 h-11 flex items-center justify-center border border-cyan-neon/30 hover:border-cyan-neon hover:bg-cyan-neon/10 transition-all"
            >
              {muted ? (
                <VolumeX size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>

            <button
              onClick={onExit}
              className="px-5 h-11 border border-danger text-danger hover:bg-danger hover:text-black transition-all font-display tracking-[0.2em]"
            >

              <LogOut
                size={14}
                className="inline mr-2"
              />

              WALK AWAY

            </button>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-5">

          <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-white/40 mb-2">

            <span>Mission Progress</span>

            <span>{state.currentTier}/12</span>

          </div>

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-cyan-neon transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </header>

  );

};

export default GameHeader;