import {
  Shield,
  Trophy,
  Coins,
  Target,
  Cpu,
  Crosshair,
  TrendingUp,
} from "lucide-react";

const formatMoney = (amount = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const GameSidebar = ({ state }) => {

  const total =
    state.correctAnswers + state.wrongAnswers;

  const accuracy =
    total === 0
      ? 0
      : Math.round(
          (state.correctAnswers / total) * 100
        );

  const nextReward =
    state.currentPrize === 7000000
      ? state.currentPrize
      : state.currentPrize * 2;

  return (

    <div className="lg:col-span-1 space-y-5">

      {/* Mission Control */}

      <div className="term-panel p-5">

        <div className="flex items-center gap-2 mb-6">

          <Target
            size={18}
            className="text-cyan-neon"
          />

          <h2 className="font-display text-xl tracking-[0.25em] text-cyan-neon">

            MISSION CONTROL

          </h2>

        </div>

        <div className="space-y-4">

          <Info
            label="Tier"
            value={state.currentTier}
            color="text-cyan-neon"
          />

          <Info
            label="Question"
            value={`${state.currentTier} / 12`}
          />

          <div className="border-t border-white/10"/>

          <Info
            icon={<Coins size={14}/>}
            label="Current"
            value={formatMoney(state.currentPrize)}
            color="text-amber-neon"
          />

          <Info
            icon={<Shield size={14}/>}
            label="Safe"
            value={formatMoney(state.guaranteedPrize)}
            color="text-cyan-neon"
          />

          <Info
            icon={<Trophy size={14}/>}
            label="Correct"
            value={state.correctAnswers}
            color="text-success"
          />

          <Info
            label="Wrong"
            value={state.wrongAnswers}
            color="text-danger"
          />

        </div>

      </div>

      {/* Mission Intelligence */}

      <div className="term-panel p-5">

        <div className="flex items-center gap-2 mb-6">

          <Cpu
            size={18}
            className="text-amber-neon"
          />

          <h2 className="font-display text-lg tracking-[0.25em] text-amber-neon">

            MISSION INTEL

          </h2>

        </div>

        <div className="space-y-4">

          <Info
            icon={<Crosshair size={14}/>}
            label="Difficulty"
            value={
              state.currentQuestion?.difficulty?.toUpperCase()
              || "-"
            }
            color="text-cyan-neon"
          />

          <Info
            label="Category"
            value={
              state.currentCategory || "-"
            }
            color="text-white"
          />

          <Info
            icon={<TrendingUp size={14}/>}
            label="Accuracy"
            value={`${accuracy}%`}
            color="text-success"
          />

          <Info
            label="Next Reward"
            value={formatMoney(nextReward)}
            color="text-amber-neon"
          />

        </div>

      </div>

    </div>

  );

};

const Info = ({
  icon,
  label,
  value,
  color = "text-white",
}) => (

  <div className="flex items-center justify-between">

    <span className="flex items-center gap-2 text-white/55">

      {icon}

      {label}

    </span>

    <span className={`font-semibold ${color}`}>

      {value}

    </span>

  </div>

);

export default GameSidebar;