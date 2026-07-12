import {
  Zap,
  PhoneCall,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { playClick, playHover } from "../../utils/sounds";

const ITEMS = [
  {
    key: "fifty",
    title: "50-50",
    icon: Zap,
  },
  {
    key: "phone",
    title: "PHONE",
    icon: PhoneCall,
  },
  {
    key: "audience",
    title: "AUDIENCE",
    icon: Users,
  },
];

const LifelinesPanel = ({
  lifelines,
  disabled,
  onUseLifeline,
}) => {

  return (

    <div className="term-panel p-6">

      <div className="text-center mb-6">

        <h2 className="font-display text-2xl tracking-[0.25em] text-amber-neon">

          MISSION UTILITIES

        </h2>

        <p className="text-xs text-white/40 mt-2 tracking-widest">

          USE EACH ONLY ONCE

        </p>

      </div>

      <div className="grid grid-cols-3 gap-6">

        {ITEMS.map((item) => {

          const Icon = item.icon;

          const available =
            lifelines[item.key];

          return (

            <button
              key={item.key}
              disabled={
                disabled ||
                !available
              }

              onMouseEnter={() => {

                if (

                  available &&

                  !disabled

                ) {

                  playHover();

                }

              }}

              onClick={() => {

                if (

                  disabled ||

                  !available

                ) return;

                playClick();

                onUseLifeline(item.key);

              }}

              className={[
                "transition-all duration-300",
                "border rounded-sm p-5",
                "flex flex-col items-center",

                available
                  ? "border-cyan-neon hover:border-amber-neon hover:scale-110 active:scale-95 hover:shadow-cyan"
                  : "border-danger opacity-45 cursor-not-allowed",

              ].join(" ")}
            >

              <div
                className={[
                  "w-16 h-16 rounded-full flex items-center justify-center border-2 mb-4 transition-all",

                  available
                    ? "border-cyan-neon text-cyan-neon"
                    : "border-danger text-danger",

                ].join(" ")}
              >

                <Icon size={30} />

              </div>

              <div className="font-display tracking-[0.18em] text-sm mb-3">

                {item.title}

              </div>

              <div
                className={[
                  "px-3 py-1 text-[10px] uppercase tracking-[0.2em] rounded",

                  available
                    ? "bg-cyan-neon/15 text-cyan-neon"
                    : "bg-danger/20 text-danger",

                ].join(" ")}
              >

                {available ? (

                  <span className="flex items-center gap-1">

                    <CheckCircle2 size={10} />

                    READY

                  </span>

                ) : (

                  <span className="flex items-center gap-1">

                    <XCircle size={10} />

                    USED

                  </span>

                )}

              </div>

            </button>

          );

        })}

      </div>

    </div>

  );

};

export default LifelinesPanel;