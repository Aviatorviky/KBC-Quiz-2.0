import { useEffect, useRef } from "react";
import { TIERS } from "../../Engine/TierEngine";
import {
    Trophy,
    Shield,
    ChevronRight
} from "lucide-react";

const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);

const PrizeLadder = ({ state }) => {

    const currentRef = useRef(null);

    useEffect(() => {

        currentRef.current?.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }, [state.currentTier]);

    return (

        <div className="term-panel p-5">

            <div className="flex items-center justify-center gap-2 mb-5">

                <Trophy
                    size={18}
                    className="text-amber-neon"
                />

                <h2 className="font-display text-xl tracking-[0.25em] text-amber-neon">

                    PRIZE LADDER

                </h2>

            </div>

            <div className="max-h-[320px] overflow-y-auto space-y-2 pr-1">

                {[...TIERS].reverse().map((tier) => {

                    const current =
                        tier.level === state.currentTier;

                    const completed =
                        tier.level < state.currentTier;

                    const safe =
                        tier.reward === tier.guaranteed;

                    return (

                        <div
                            key={tier.level}
                            ref={
                                current
                                    ? currentRef
                                    : null
                            }
                        >

                            {safe && (

                                <div className="flex items-center gap-2 my-2">

                                    <div className="flex-1 h-px bg-cyan-neon/30"/>

                                    <Shield
                                        size={12}
                                        className="text-cyan-neon"
                                    />

                                    <span className="text-[9px] tracking-[0.25em] text-cyan-neon">

                                        SAFE

                                    </span>

                                    <div className="flex-1 h-px bg-cyan-neon/30"/>

                                </div>

                            )}

                            <div

                                className={[
                                    "flex items-center justify-between px-4 py-3 border transition-all duration-300",

                                    current
                                        ? "border-amber-neon bg-amber-neon/15 shadow-amber scale-[1.03]"

                                        : completed
                                        ? "border-success/20 bg-success/5"

                                        : "border-white/10 hover:border-cyan-neon/40"

                                ].join(" ")}

                            >

                                <div className="flex items-center gap-3">

                                    {

                                        current

                                        ?

                                        <ChevronRight
                                            size={18}
                                            className="text-amber-neon animate-pulse"
                                        />

                                        :

                                        completed

                                        ?

                                        <span className="text-success">

                                            ✓

                                        </span>

                                        :

                                        <span className="text-white/40">

                                            •

                                        </span>

                                    }

                                    <span
                                        className={[
                                            "font-display",

                                            current
                                                ? "text-amber-neon"

                                                : completed
                                                ? "text-success"

                                                : "text-white/70"

                                        ].join(" ")}
                                    >

                                        Q{tier.level}

                                    </span>

                                </div>

                                <span
                                    className={[
                                        "font-bold tabular-nums",

                                        current
                                            ? "text-amber-neon"

                                            : completed
                                            ? "text-success"

                                            : "text-white"

                                    ].join(" ")}
                                >

                                    {formatMoney(tier.reward)}

                                </span>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

};

export default PrizeLadder;