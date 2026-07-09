import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Terminal, ShieldAlert, Trophy, ChevronRight } from "lucide-react";
import { playClick, playHover } from "../utils/sounds";

const BOOT_LINES = [
  "> initializing quantum quiz kernel v4.2.1...",
  "> loading question payloads [12/12] ...............OK",
  "> mounting lifelines: [50-50] [PHONE] [AUDIENCE] ..OK",
  "> establishing crt uplink @ 60hz ..................OK",
  "> awaiting operator identity ......................",
];

const StartScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    if (line >= BOOT_LINES.length) return;
    if (char < BOOT_LINES[line].length) {
      const t = setTimeout(() => setChar((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => l + 1);
      setChar(0);
    }, 220);
    return () => clearTimeout(t);
  }, [char, line]);

  const start = () => {
    const n = name.trim();
    if (!n) return;
    playClick();
    sessionStorage.setItem("player_name", n);
    navigate("/play");
  };

  return (
    <div className="crt-scanlines min-h-screen w-full relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3">
            <Terminal className="text-amber-neon glow-amber" size={22} strokeWidth={1.5} />
            <span
              className="font-display font-bold tracking-[0.25em] text-amber-neon glow-amber text-sm"
              data-testid="app-logo"
            >
              KAUN_BANEGA_CYBERPATI
            </span>
          </div>
          <Link
            to="/leaderboard"
            onMouseEnter={playHover}
            onClick={playClick}
            data-testid="nav-leaderboard-link"
            className="brk text-cyan-neon hover:text-white transition-colors text-xs tracking-[0.25em] flex items-center gap-2"
          >
            <Trophy size={14} /> LEADERBOARD
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT: Terminal Boot */}
          <div className="lg:col-span-7">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
              /root/quiz/boot.log
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.95] mb-6">
              <span className="text-white">HACK.</span>{" "}
              <span className="text-amber-neon glow-amber">WIN.</span>{" "}
              <span className="text-cyan-neon glow-cyan">CRORE.</span>
            </h1>
            <p className="text-white/60 max-w-lg mb-8 leading-relaxed">
              Twelve encrypted questions. Three lifelines. One crore.
              Breach the mainframe of trivia and claim the payload.
            </p>

            <div
              className="term-panel p-5 font-mono text-sm leading-6 min-h-[210px]"
              data-testid="boot-terminal"
            >
              {BOOT_LINES.slice(0, line).map((l, i) => (
                <div key={i} className="text-white/70">
                  <span className="text-cyan-neon">{l.split(" ")[0]}</span>{" "}
                  {l.split(" ").slice(1).join(" ")}
                </div>
              ))}
              {line < BOOT_LINES.length && (
                <div className="text-white/70">
                  <span className="text-cyan-neon">{BOOT_LINES[line].split(" ")[0]}</span>{" "}
                  {BOOT_LINES[line].slice(BOOT_LINES[line].indexOf(" ") + 1, char)}
                  <span className="text-cyan-neon animate-blink">▊</span>
                </div>
              )}
              {line >= BOOT_LINES.length && (
                <div className="text-success mt-1">&gt; SYSTEM READY. AWAITING OPERATOR.</div>
              )}
            </div>
          </div>

          {/* RIGHT: Login Card */}
          <div className="lg:col-span-5">
            <div className="term-panel-cyan p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <ShieldAlert size={16} className="text-cyan-neon" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-neon glow-cyan">
                  OPERATOR_LOGIN.SH
                </span>
              </div>

              <label htmlFor="pname" className="block text-xs tracking-[0.25em] uppercase text-white/60 mb-2">
                &gt; enter_handle:
              </label>
              <input
                id="pname"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && start()}
                placeholder="ex: neo_1999"
                maxLength={32}
                data-testid="player-name-input"
                className="w-full bg-black/50 border border-cyan-neon/40 focus:border-cyan-neon focus:outline-none focus:shadow-cyan text-white font-mono px-4 py-3 tracking-wider caret-cyan-neon"
                style={{ borderRadius: 2 }}
                autoFocus
              />

              <button
                type="button"
                onClick={start}
                disabled={!name.trim()}
                onMouseEnter={playHover}
                data-testid="start-game-btn"
                className={[
                  "brk mt-6 w-full py-4 border font-display font-bold tracking-[0.25em] text-sm flex items-center justify-center gap-3 transition-all duration-200",
                  name.trim()
                    ? "border-amber-neon text-amber-neon hover:bg-amber-neon hover:text-black shadow-amber"
                    : "border-white/10 text-white/25 cursor-not-allowed",
                ].join(" ")}
                style={{ borderRadius: 2 }}
              >
                JACK_IN <ChevronRight size={16} />
              </button>

              <div className="mt-6 pt-4 border-t border-cyan-neon/15 space-y-2 text-[11px] font-mono text-white/50 leading-relaxed">
                <div>◆ 12 questions across 4 tiers</div>
                <div>◆ 45s countdown per question</div>
                <div>◆ 3 safe milestones: ₹5K · ₹40K · ₹3.2L</div>
                <div>◆ 3 lifelines. use.them.wisely()</div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-[10px] tracking-[0.3em] text-white/25 uppercase">
          [ protocol: KBC/CYBER v1 ]
        </footer>
      </div>
    </div>
  );
};

export default StartScreen;
