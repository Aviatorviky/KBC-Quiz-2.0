import { useEffect, useState } from "react";

const AIDefenseScreen = ({ category, onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 700),
            setTimeout(() => setStep(2), 1700),
            setTimeout(() => setStep(3), 2900),
            setTimeout(() => setStep(4), 4300),
            setTimeout(() => setStep(5), 5800),
            setTimeout(() => {
                if (onComplete) {
                    onComplete();
                }
            }, 7600)
        ];

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [onComplete]);

    const aiTaunts = [
        "Your attack pattern has been predicted.",
        "Probability of human success: 12%",
        "Countermeasure successfully deployed.",
        "Adaptive firewall initialized."
    ];

    const currentTaunt = aiTaunts[(step - 1) % aiTaunts.length];

    const messages = [
        "MAINFRAME BREACHED",
        "Unauthorized intrusion detected...",
        "Human strategy analyzed...",
        "Adaptive AI Defense Activated",
        "Generating Counter Strategy..."
    ];

    return (
        <div className="crt-scanlines animate-page min-h-screen flex items-center justify-center px-6 bg-[#07090d]">
            <div className="term-panel border border-danger/40 shadow-red max-w-3xl w-full p-10">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-danger text-xs tracking-[0.45em] animate-pulse">
                        WARNING
                    </span>
                    <span className="text-white/40 text-xs font-mono">
                        AI DEFENSE SYSTEM
                    </span>
                </div>

                {/* TITLE */}
                <h1 className="font-display text-5xl md:text-6xl text-danger animate-glitch mb-10">
                    AI DEFENSE ACTIVATED
                </h1>

                {/* TERMINAL */}
                <div className="space-y-5 font-mono text-lg">
                    <p className="text-danger">
                        ▶ {messages[0]}
                    </p>

                    {step >= 1 && (
                        <p className="text-white/70">
                            ▸ {messages[1]}
                        </p>
                    )}

                    {step >= 2 && (
                        <p className="text-white/70">
                            ▸ {messages[2]}
                        </p>
                    )}

                    {step >= 3 && (
                        <p className="text-cyan-neon animate-pulse">
                            ▸ {messages[3]}
                        </p>
                    )}

                    {step >= 4 && (
                        <p className="text-amber-neon animate-pulse">
                            ▸ {messages[4]}
                        </p>
                    )}

                    {step >= 5 && (
                        <div className="mt-12 border-t border-white/10 pt-8 animate-fade-in">
                            <div className="text-white/40 tracking-[0.35em] text-xs mb-3">
                                TARGET GENERATED
                            </div>
                            <div className="font-display text-5xl md:text-6xl text-cyan-neon glow-cyan animate-glitch">
                                {category || "CLASSIFIED"}
                            </div>
                            <p className="mt-6 text-danger text-sm tracking-wide font-mono animate-pulse">
                                "{currentTaunt}"
                            </p>
                        </div>
                    )}
                </div>

                {/* PROGRESS */}
                <div className="mt-12">

                    <div className="flex justify-between text-[10px] tracking-[0.35em] text-white/40 mb-2">
                                
                        <span>AI ANALYSIS</span>
                                
                        <span>{Math.min(step * 20, 100)}%</span>
                                
                    </div>
                                
                    <div className="relative h-2 rounded overflow-hidden bg-white/10">
                                
                        <div
                
                            className="absolute left-0 top-0 h-full bg-danger transition-all duration-700"
                                
                            style={{
                            
                                width: `${Math.min(step * 20, 100)}%`
                            
                            }}
                        
                        />
                
                    </div>
                        
                </div>
            </div>
        </div>
    );
};

export default AIDefenseScreen;