import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LogOut, Volume2, VolumeX, User } from "lucide-react";
import PrizeLadder from "../components/PrizeLadder";
import LifelinesPanel from "../components/LifelinesPanel";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import AudiencePollDialog from "../components/AudiencePollDialog";
import EndScreen from "./EndScreen";
import { QUESTIONS, MILESTONE_INDEXES, QUESTION_TIME_SECONDS, formatINR } from "../Data/questions";
import {
  playCorrect, playWrong, playMilestone, playLifeline, playGameover, startSuspense,
  stopSuspense, toggleMute, isMuted,
} from "../utils/sounds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const computeMilestone = (idx) => {
  if (idx > 8) return 320000;
  if (idx > 5) return 40000;
  if (idx > 2) return 5000;
  return 0;
};

const GameScreen = () => {
  const navigate = useNavigate();
  const [playerName] = useState(() => sessionStorage.getItem("player_name") || "OPERATOR");
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [guaranteed, setGuaranteed] = useState(0);
  const [lifelines, setLifelines] = useState({ fifty: true, phone: true, audience: true });
  const [eliminated, setEliminated] = useState(new Set());
  const [friendHint, setFriendHint] = useState(null);
  const [audienceVotes, setAudienceVotes] = useState(null);
  const [audienceOpen, setAudienceOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [revealed, setRevealed] = useState(null); // {chosen, correct}
  const [gameOver, setGameOver] = useState(null); // { outcome, prize }
  const [tierPromptOpen, setTierPromptOpen] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);
  const [muted, setMuted] = useState(isMuted());
  const [timerKey, setTimerKey] = useState(0);
  const submittedRef = useRef(false);

  const q = QUESTIONS[idx];

  const remainingOptions = useMemo(
    () => q.options.filter((o) => !eliminated.has(o)),
    [q, eliminated]
  );

  useEffect(() => {
    if (!gameOver && !revealed && !tierPromptOpen) startSuspense();
    return () => stopSuspense();
  }, [idx, gameOver, revealed, tierPromptOpen]);

  useEffect(() => {
    if (!gameOver || submittedRef.current) return;
    submittedRef.current = true;
    axios
      .post(`${API}/leaderboard`, {
        player_name: playerName,
        prize: gameOver.prize,
        questions_answered: gameOver.questionsAnswered,
        outcome: gameOver.outcome,
      })
      .catch(() => console.log("Leaderboard offline, logging score locally."));
  }, [gameOver, playerName]);

  const resetPerQuestion = () => {
    setEliminated(new Set());
    setFriendHint(null);
    setAudienceVotes(null);
    setRevealed(null);
    setTimerKey((k) => k + 1);
  };

  const handleAnswer = (letter) => {
    if (revealed || gameOver) return;
    stopSuspense();
    const correct = q.answer;
    setRevealed({ chosen: letter, correct });

    setTimeout(() => {
      if (letter === correct) {
        playCorrect();
        const newScore = q.prize;
        setScore(newScore);

        if (MILESTONE_INDEXES.includes(idx)) {
          setGuaranteed(q.prize);
          setTimeout(playMilestone, 400);
          toast.success(`MILESTONE LOCKED · ${formatINR(q.prize)} guaranteed`, {
            duration: 2600,
          });
        }

        setTimeout(() => {
          if (idx === QUESTIONS.length - 1) {
            setGameOver({ outcome: "won", prize: newScore, questionsAnswered: idx + 1 });
            playMilestone();
            return;
          }
          const nextTier = QUESTIONS[idx + 1].tier;
          if (nextTier !== q.tier) {
            setTierPromptOpen(true);
          } else {
            advance();
          }
        }, 1400);
      } else {
        playWrong();
        setTimeout(() => {
          setGameOver({
            outcome: "wrong",
            prize: guaranteed,
            questionsAnswered: idx,
          });
          playGameover();
        }, 1400);
      }
    }, 650);
  };

  const advance = () => {
    resetPerQuestion();
    setIdx((i) => i + 1);
  };

  const continueTier = () => {
    setTierPromptOpen(false);
    advance();
  };

  const exitTier = () => {
    setTierPromptOpen(false);
    setGameOver({ outcome: "walked_away", prize: score, questionsAnswered: idx + 1 });
  };

  const handleTimeout = () => {
    if (revealed || gameOver) return;
    stopSuspense();
    playWrong();
    setRevealed({ chosen: null, correct: q.answer });
    toast.error("TIMEOUT · connection dropped");
    setTimeout(() => {
      setGameOver({
        outcome: "timeout",
        prize: computeMilestone(idx),
        questionsAnswered: idx,
      });
      playGameover();
    }, 1300);
  };

  const useLifeline = (key) => {
    if (!lifelines[key]) return;
    playLifeline();
    setLifelines((prev) => ({ ...prev, [key]: false }));

    if (key === "fifty") {
      const wrongs = ["A", "B", "C", "D"].filter((l) => l !== q.answer && !eliminated.has(l));
      const remove = wrongs.sort(() => Math.random() - 0.5).slice(0, 2);
      setEliminated((prev) => new Set([...prev, ...remove]));
      toast.info(`50-50 · purged ${remove.join(" + ")}`);
    } else if (key === "phone") {
      const remaining = ["A", "B", "C", "D"].filter((l) => !eliminated.has(l));
      let pick;
      if (Math.random() < 0.65) pick = q.answer;
      else pick = remaining[Math.floor(Math.random() * remaining.length)];
      setFriendHint({ letter: pick });
      setPhoneOpen(true);
    } else if (key === "audience") {
      const letters = ["A", "B", "C", "D"].filter((l) => !eliminated.has(l));
      const votes = {};
      let remaining = 100;

      if (letters.includes(q.answer)) {
        const correctPct = 45 + Math.floor(Math.random() * 31);
        votes[q.answer] = correctPct;
        remaining -= correctPct;
      }
      const rest = letters.filter((l) => l !== q.answer);
      rest.forEach((l, i) => {
        if (i === rest.length - 1) votes[l] = Math.max(0, remaining);
        else {
          const p = Math.floor(Math.random() * (remaining + 1));
          votes[l] = p;
          remaining -= p;
        }
      });
      setAudienceVotes(votes);
      setAudienceOpen(true);
    }
  };

  const handleMute = () => setMuted(toggleMute());

  const handleQuit = () => {
    setQuitOpen(false);
    stopSuspense();
    setGameOver({ outcome: "walked_away", prize: score, questionsAnswered: idx });
  };

  if (gameOver) {
    return (
      <EndScreen
        outcome={gameOver.outcome}
        prize={gameOver.prize}
        questionsAnswered={gameOver.questionsAnswered}
        playerName={playerName}
        onRestart={() => navigate("/")}
        onLeaderboard={() => navigate("/leaderboard")}
      />
    );
  }

  return (
    <div className="crt-scanlines min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold tracking-[0.25em] text-amber-neon glow-amber text-xs">
              KBC_CYBER//
            </span>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <User size={12} />
              <span className="uppercase tracking-widest text-cyan-neon">
                {playerName}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleMute}
              className="p-2 border border-white/10 hover:border-cyan-neon text-white/60 hover:text-cyan-neon transition-colors"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={() => setQuitOpen(true)}
              className="brk px-3 py-1.5 border border-danger/40 text-danger/80 hover:bg-danger hover:text-black font-display text-[10px] tracking-wider transition-all"
            >
              <LogOut size={12} className="inline mr-1" /> DISCONNECT
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <div className="term-panel px-4 py-2 flex items-center gap-2 text-xs">
                <span className="text-white/40">SEC_LEVEL:</span>
                <span className="text-cyan-neon font-bold tracking-wider">{q.tier}</span>
              </div>
              <Timer key={timerKey} duration={QUESTION_TIME_SECONDS} onTimeout={handleTimeout} isPaused={!!revealed} />
            </div>

            <QuestionCard
              question={q}
              revealed={revealed}
              eliminated={eliminated}
              onAnswerSelect={handleAnswer}
              friendHint={friendHint}
            />

            <LifelinesPanel lifelines={lifelines} onUseLifeline={useLifeline} />
          </div>

          <div className="lg:col-span-1">
            <PrizeLadder currentIdx={idx} score={score} />
          </div>
        </div>
      </div>

      <AudiencePollDialog isOpen={audienceOpen} onClose={() => setAudienceOpen(false)} votes={audienceVotes} />

            {/* PHONE LIFELINE POPUP */}
      {phoneOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-base-1 border border-cyan-neon text-foreground font-mono max-w-md w-full p-6 term-panel shadow-cyan">
            <h3 className="text-cyan-neon glow-cyan tracking-wider font-display text-sm font-bold mb-3">// ENC_LINK_ESTABLISHED</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Your contact on the outside responds with minimal latency:
              <span className="block mt-4 p-3 bg-base-0 border border-white/10 text-amber-neon text-base font-bold text-center">
                "I ran a fast cross-reference. I'm fairly certain the correct argument is: option ({friendHint?.letter})"
              </span>
            </p>
            <div className="flex justify-end mt-5">
              <button onClick={() => setPhoneOpen(false)} className="bg-cyan-neon text-black font-bold text-xs tracking-widest hover:bg-cyan-hover px-4 py-2">
                CLOSE_LINK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MILESTONE ROUTE POPUP */}
      {tierPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-base-1 border border-amber-neon text-foreground font-mono max-w-md w-full p-6 term-panel shadow-amber">
            <h3 className="text-amber-neon glow-amber tracking-wider font-display text-sm font-bold mb-3">// GATEWAY_LEVEL_CLEARED</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Security layer bypassed. You can safely disconnect now and save your current bounty of 
              <strong className="text-amber-neon"> {formatINR(score)} </strong>, or proceed deeper into the mainframe where failures will erase unprotected variables.
            </p>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={exitTier} className="border border-danger text-danger hover:bg-danger hover:text-black font-bold text-xs tracking-wider px-4 py-2">
                EXTRACT_PAYLOAD
              </button>
              <button onClick={continueTier} className="bg-amber-neon text-black font-bold text-xs tracking-wider hover:bg-amber-hover px-4 py-2">
                BREACH_NEXT_LAYER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCONNECT POPUP */}
      {quitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-base-1 border border-danger text-foreground font-mono max-w-md w-full p-6 term-panel shadow-red">
            <h3 className="text-danger glow-red tracking-wider font-display text-sm font-bold mb-3">// ABORT_SEQUENCE_REQUESTED</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Are you sure you want to drop your access tunnel? You will log out with your current safe pool value of <strong className="text-amber-neon">{formatINR(score)}</strong>.
            </p>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setQuitOpen(false)} className="border border-white/10 text-white/60 px-4 py-2 text-xs">
                CANCEL
              </button>
              <button onClick={handleQuit} className="bg-danger text-black font-bold text-xs tracking-widest hover:bg-red-700 px-4 py-2">
                CONFIRM_ABORT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
