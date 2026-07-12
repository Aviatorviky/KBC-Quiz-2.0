const TierComplete = ({
  tier,
  reward,
  onContinue,
}) => {

  const formatINR = (amount = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="term-panel-cyan w-full max-w-lg p-8 animate-fade-up">

        <div className="text-center">

          <div className="text-[12px] tracking-[0.35em] text-cyan-neon mb-2">

            SYSTEM MESSAGE

          </div>

          <h1 className="font-display text-4xl text-amber-neon mb-5">

            TIER CLEARED

          </h1>

          <p className="text-white/60">

            Congratulations.

          </p>

          <p className="text-white/60 mb-8">

            You completed Tier {tier}

          </p>

          <div className="border border-cyan-neon/30 py-5 mb-8">

            <div className="text-white/50 text-sm">

              Reward Earned

            </div>

            <div className="text-3xl font-display text-success mt-2">

              {formatINR(reward)}

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
                onClick={onWalkAway}
                className="
                py-4
                border
                border-amber-neon
                text-amber-neon
                hover:bg-amber-neon
                hover:text-black
                transition-all
                font-display
                tracking-[0.3em]
                "
            >
            
            SAFE EXTRACTION
            
            </button>
            
            <button
                onClick={onContinue}
                className="
                py-4
                border
                border-cyan-neon
                text-cyan-neon
                hover:bg-cyan-neon
                hover:text-black
                transition-all
                font-display
                tracking-[0.3em]
                "
            >
            
            CONTINUE MISSION
            
            </button>
            
            </div>

        </div>

      </div>

    </div>

  );

};

export default TierComplete;