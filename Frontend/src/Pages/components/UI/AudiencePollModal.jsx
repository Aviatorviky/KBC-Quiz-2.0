import { useEffect, useState } from "react";

const LABELS = [
  "OPTION_A",
  "OPTION_B",
  "OPTION_C",
  "OPTION_D",
];

const AudiencePollModal = ({
  open,
  poll,
  onClose,
}) => {

  const [animatedPoll, setAnimatedPoll] = useState([0,0,0,0]);

  useEffect(() => {

    if (!open || !poll) return;

    setAnimatedPoll([0,0,0,0]);

    const t = setTimeout(() => {

      setAnimatedPoll(poll);

    },150);

    return ()=>clearTimeout(t);

  },[open,poll]);

  if (!open || !poll) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">

      <div className="w-[560px] border border-amber-neon bg-[#090909] shadow-amber">

        <div className="p-8">

        <div className="mb-6">

        <div className="text-amber-neon font-display text-2xl">

            // INTERCEPTING

        </div>

        <div className="text-amber-neon font-display text-3xl leading-tight">

            AUDIENCE_METRICS

        </div>

        </div>

          <p className="text-white/60 leading-7 text-[15px] mb-10">

            Mainframe telemetry successfully parsed.

            Real-time consensus from active operators

            across the grid.

          </p>

          <div className="space-y-7">

            {animatedPoll.map((value,index)=>(

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="text-cyan-neon font-bold tracking-wide">

                    {LABELS[index]}

                  </span>

                  <span className="text-amber-neon font-bold">

                    {value}%

                  </span>

                </div>

                <div className="h-4 border border-white/10 bg-black">

                  <div

                    className="h-full bg-amber-neon transition-all duration-1000"

                    style={{

                      width:`${value}%`

                    }}

                  />

                </div>

              </div>

            ))}

          </div>

          <div className="flex justify-end mt-10">

            <button

              onClick={onClose}

              className="px-6 py-3 bg-amber-neon text-black font-display tracking-[0.18em] hover:brightness-110 transition"

            >

              DISMISS_DATA

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AudiencePollModal;