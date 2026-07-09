import { Zap, PhoneCall, Users } from "lucide-react";

const CONFIG = [
  { key: "fifty", label: "50-50", icon: Zap, desc: "purge_2_incorrect" },
  { key: "phone", label: "PHONE_A_FRIEND", icon: PhoneCall, desc: "ext_advisor.query()" },
  { key: "audience", label: "ASK_THE_AUDIENCE", icon: Users, desc: "crowd.poll()" },
];

const LifelinesPanel = ({ lifelines, onUseLifeline, disabled }) => {
  return (
    <div className="term-panel-cyan p-4 md:p-5" data-testid="lifelines-panel">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] tracking-[0.3em] text-cyan-neon glow-cyan uppercase">
          ./lifelines --status
        </span>
        <span className="text-[10px] tracking-[0.3em] text-white/40">
          {Object.values(lifelines).filter(Boolean).length}/3 AVAIL
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {CONFIG.map(({ key, label, icon: Icon, desc }) => {
          const active = lifelines[key];
          return (
            <button
              key={key}
              type="button"
              disabled={!active || disabled}
              onClick={() => active && !disabled && onUseLifeline(key)}
              data-testid={`lifeline-${key}-btn`}
              className={[
                "group relative flex flex-col items-center justify-center gap-1.5 py-3 px-1 border transition-all duration-200",
                active
                  ? "border-cyan-neon/50 hover:border-cyan-neon hover:bg-cyan-neon/10 text-cyan-neon cursor-pointer"
                  : "border-white/10 text-white/25 line-through cursor-not-allowed",
                !active && "opacity-60",
              ].join(" ")}
              style={{ borderRadius: 2 }}
            >
              <Icon size={18} strokeWidth={1.5} className={active ? "glow-cyan" : ""} />
              <span className="text-[10px] tracking-[0.15em] font-semibold text-center leading-tight">
                {label}
              </span>
              <span className="text-[8px] tracking-widest opacity-60">{desc}</span>
              {active && (
                <span className="absolute top-1 right-1 text-[8px] text-cyan-neon/70 animate-blink">◉</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LifelinesPanel;
