import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Terminal,
  Trophy,
  ShieldAlert,
  ChevronRight,
  Cpu,
  Sparkles,
} from "lucide-react";

import { playClick, playHover } from "../../utils/sounds";

const BOOT_LINES = [
  "Initializing Quantum Kernel...",
  "Connecting Secure Mainframe...",
  "Loading Question Database...",
  "Loading Reward Engine...",
  "Synchronizing Lifelines...",
  "Verifying AI Security...",
  "ACCESS GRANTED",
];

const StartScreen = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [mode, setMode] = useState("classic");

  const [line, setLine] = useState(0);

  const [char, setChar] = useState(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {

    if (line >= BOOT_LINES.length) return;

    if (char < BOOT_LINES[line].length) {

      const t = setTimeout(() => {

        setChar((c) => c + 1);

      }, 18);

      return () => clearTimeout(t);

    }

    const p = Math.min(

      100,

      Math.round(((line + 1) / BOOT_LINES.length) * 100)

    );

    setProgress(p);

    const t = setTimeout(() => {

      setLine((l) => l + 1);

      setChar(0);

    }, 220);

    return () => clearTimeout(t);

  }, [char, line]);

  const start = () => {

    const player = name.trim();

    if (!player) return;

    playClick();

    sessionStorage.setItem(

      "player_name",

      player

    );

    sessionStorage.setItem(

      "game_mode",

      mode

    );

    navigate(

      mode === "classic"

        ? "/classic"

        : "/strategy"

    );

  };

  return (

<div className="crt-scanlines animate-page min-h-screen overflow-hidden relative bg-[#05070d]">

    {/* ================= BACKGROUND ================= */}

    <div className="absolute inset-0">

        {/* Glow */}

        <div className="absolute left-1/2 top-40 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-neon/10 blur-[180px] rounded-full"/>

        {/* Grid */}

        <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
                backgroundImage:
                    `
                    linear-gradient(rgba(0,255,255,.18) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,255,.18) 1px, transparent 1px)
                    `,
                backgroundSize: "40px 40px",
            }}
        />

        {/* Floating Particles */}

        <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-cyan-neon animate-ping"/>

        <div className="absolute top-64 right-40 w-2 h-2 rounded-full bg-amber-neon animate-pulse"/>

        <div className="absolute bottom-24 left-1/3 w-3 h-3 rounded-full bg-cyan-neon/70 animate-bounce"/>

    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* HEADER */}

        <header className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-8 sm:mb-12">

            <div className="flex items-center gap-3">

                <Terminal
                    className="text-cyan-neon"
                    size={24}
                />

                <span className="font-display text-sm sm:text-lg lg:text-xl tracking-[0.18em] sm:tracking-[0.35em] text-cyan-neon glow-cyan text-center sm:text-left">

                    KAUN_BANEGA_CYBERPATI

                </span>

            </div>

            <Link

                to="/leaderboard"

                onMouseEnter={playHover}

                onClick={playClick}

                className="w-full sm:w-auto border border-amber-neon px-4 sm:px-5 py-2 hover:bg-amber-neon hover:text-black transition-all flex items-center justify-center gap-2 text-amber-neon"

            >

                <Trophy size={16}/>

                LEADERBOARD

            </Link>

        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ================= HERO ================= */}

            <div>

                <div className="flex items-center gap-2 mb-4 text-cyan-neon">

                    <Cpu size={18}/>

                    <span className="tracking-[0.35em] text-xs">

                        QUANTUM INTELLIGENCE CHALLENGE

                    </span>

                </div>

                <h1 className="font-display font-black leading-none">

                    <span className="block text-4xl sm:text-5xl lg:text-7xl text-white">

                        KAUN

                    </span>

                    <span className="block text-4xl sm:text-5xl lg:text-7xl text-white">

                        BANEGA

                    </span>

                    <span className="block text-5xl sm:text-6xl lg:text-8xl text-cyan-neon glow-cyan">

                        CYBERPATI

                    </span>

                </h1>

                <p className="mt-6 sm:mt-8 text-white/60 max-w-xl leading-7 sm:leading-8 text-base sm:text-lg">

                    Experience the legendary quiz show with a futuristic cyberpunk interface.

                    Fight through increasingly difficult missions, use lifelines wisely,

                    and breach the final mainframe to win the grand prize.

                </p>

                {/* Boot Terminal */}

                <div className="term-panel mt-8 sm:mt-10 p-4 sm:p-6">

                    <div className="flex items-center justify-between mb-4">

                        <span className="text-cyan-neon tracking-[0.3em] text-xs">

                            SYSTEM BOOT

                        </span>

                        <span className="text-success">

                            {progress}%

                        </span>

                    </div>

                    <div className="h-2 bg-white/10 rounded overflow-hidden mb-6">

                        <div

                            className="h-full bg-cyan-neon transition-all duration-300"

                            style={{

                                width: `${progress}%`

                            }}

                        />

                    </div>

                    <div className="font-mono text-sm space-y-2 min-h-[160px] sm:min-h-[220px]">

                        {BOOT_LINES.slice(0, line).map((txt, i)=>(

                            <div
                                key={i}
                                className={txt==="ACCESS GRANTED"
                                    ?"text-success"
                                    :"text-white/70"
                                }
                            >

                                {txt}

                            </div>

                        ))}

                        {

                            line<BOOT_LINES.length &&

                            <div className="text-cyan-neon">

                                {BOOT_LINES[line].substring(

                                    0,

                                    char

                                )}

                                <span className="animate-blink">

                                    ▊

                                </span>

                            </div>

                        }

                    </div>

                </div>

            </div>

            {/* ================= LOGIN PANEL ================= */}

            <div>

                <div className="term-panel-cyan p-5 sm:p-8">

                    <div className="flex items-center gap-3 mb-8">

                        <ShieldAlert
                            size={20}
                            className="text-cyan-neon"
                        />

                        <span className="tracking-[0.35em] text-cyan-neon text-xs">

                            OPERATOR LOGIN

                        </span>

                    </div>

                    <label className="text-white/60 text-xs tracking-[0.25em]">

                        OPERATOR NAME

                    </label>

                    <input


                        value={name}

                        onChange={(e)=>setName(e.target.value)}

                        onKeyDown={(e)=>e.key==="Enter"&&start()}

                        placeholder="neo_1999"

                        autoFocus

                        maxLength={30}

                        className="mt-3 w-full bg-black/40 border border-cyan-neon/30 focus:border-cyan-neon outline-none px-5 py-4 font-mono text-lg transition-all duration-300 focus:shadow-cyan focus:scale-[1.01]"

                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8">

                        <button

                            onClick={()=>setMode("classic")}

                            className={`p-4 sm:p-5 transition-all ${
                                mode==="classic"
                                ?"border-cyan-neon bg-cyan-neon/10 shadow-cyan"
                                :"border-white/10"
                            }`}

                        >

                            <Sparkles className="mx-auto mb-3"/>

                            <div className="font-display">

                                CLASSIC

                            </div>

                        </button>

                        <button

                            onClick={()=>setMode("strategy")}

                            className={`p-4 sm:p-5 transition-all ${
                                mode==="strategy"
                                ?"border-amber-neon bg-amber-neon/10 shadow-amber"
                                :"border-white/10"
                            }`}

                        >

                            <Cpu className="mx-auto mb-3"/>

                            <div className="font-display">

                                STRATEGY

                            </div>

                        </button>

                    </div>

                    <button

                        onMouseEnter={playHover}

                        onClick={start}

                        disabled={!name.trim()}

                        className="mt-8 sm:mt-10 w-full py-4 sm:py-5 border border-amber-neon text-amber-neon hover:bg-amber-neon hover:text-black transition-all font-display text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] disabled:opacity-30 flex justify-center items-center gap-3"

                    >

                        ENTER MAINFRAME

                        <ChevronRight size={20}/>

                    </button>

                </div>

            </div>

        </div>

        <footer className="text-center mt-10 sm:mt-16 text-white/30 tracking-[0.18em] sm:tracking-[0.35em] text-[10px] sm:text-xs px-4">

            CYBERPATI v2.0 • Developed by "Vikram Jha"

        </footer>

    </div>

</div>

);

};

export default StartScreen;