import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trophy, ChevronLeft, RefreshCcw } from "lucide-react";
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const API =
  (process.env.REACT_APP_BACKEND_URL ||
    "https://kbc-quiz-2-0.onrender.com") + "/api";

const OUTCOME_TAG = {
  won: { label: "BREACHED", cls: "text-success border-success/50" },
  walked_away: { label: "EXTRACTED", cls: "text-amber-neon border-amber-neon/50" },
  wrong: { label: "TERMINATED", cls: "text-danger border-danger/50" },
  timeout: { label: "TIMEOUT", cls: "text-danger border-danger/50" },
};

const Leaderboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = () => {
    setLoading(true);
    axios
      .get(`${API}/leaderboard?limit=25`)
      .then((r) => {
    setRows(Array.isArray(r.data) ? r.data : []);
    setErr(null);
})
.catch((err) => {
    console.error(err);
    setRows([]);
    setErr("Failed to fetch leaderboard");
})
      .catch(() => setErr("Failed to fetch leaderboard"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="crt-scanlines animate-page min-h-screen w-full">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <header className="flex items-center justify-between mb-10">
          <Link
            to="/"
            data-testid="back-home-link"
            className="brk text-cyan-neon hover:text-white transition-colors text-xs tracking-[0.25em] flex items-center gap-2"
          >
            <ChevronLeft size={14} /> RETURN
          </Link>
          <button
            type="button"
            onClick={load}
            data-testid="refresh-leaderboard-btn"
            className="brk text-white/70 hover:text-cyan-neon transition-colors text-xs tracking-[0.25em] flex items-center gap-2"
          >
            <RefreshCcw size={12} /> REFRESH
          </button>
        </header>

        <div className="flex items-start gap-4 mb-8">
          <div className="p-3 border border-amber-neon/40 shadow-amber" style={{ borderRadius: 2 }}>
            <Trophy size={22} className="text-amber-neon glow-amber" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1">
              /var/log/hall_of_fame.dat
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tighter leading-none">
              <span className="text-white">HALL_OF</span>
              <span className="text-amber-neon glow-amber">_FAME</span>
            </h1>
            <p className="text-white/50 mt-3 font-mono text-sm max-w-lg">
              Top operators, ranked by payload. All entries hash-signed by the mainframe.
            </p>
          </div>
        </div>

        <div className="term-panel" data-testid="leaderboard-table">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 text-[10px] tracking-[0.3em] uppercase text-white/50 border-b border-amber-neon/15">
            <div className="col-span-1">rank</div>
            <div className="col-span-4 md:col-span-5">operator</div>
            <div className="col-span-3 md:col-span-3 text-right md:text-left">payload</div>
            <div className="col-span-2 hidden md:block">q_depth</div>
            <div className="col-span-4 md:col-span-1 text-right">status</div>
          </div>

          {loading && (
            <div className="p-8 text-center text-cyan-neon font-mono text-sm" data-testid="leaderboard-loading">
              &gt; fetching entries<span className="animate-blink">▊</span>
            </div>
          )}

          {err && !loading && (
            <div className="p-8 text-center text-danger font-mono text-sm">{err}</div>
          )}

          {!loading && !err && rows.length === 0 && (
            <div className="p-10 text-center font-mono text-sm text-white/50" data-testid="leaderboard-empty">
              &gt; no_entries_found. be the first to breach the mainframe.
            </div>
          )}

          {!loading &&
            (Array.isArray(rows) ? rows : []).map((r, i) => {
              const tag = OUTCOME_TAG[r.outcome] || OUTCOME_TAG.wrong;
              return (
                <div
                  key={r._id || i}
                  data-testid={`leaderboard-row-${i}`}
                  className={[
                    "grid grid-cols-12 gap-4 px-5 py-4 items-center border-b border-white/5 last:border-b-0 font-mono text-sm hover:bg-white/[0.02] transition-colors",
                    i === 0 && "bg-amber-neon/[0.03]",
                  ].join(" ")}
                >
                  <div className="col-span-1">
                    <span
                      className={
                        i === 0
                          ? "text-amber-neon glow-amber font-display font-bold"
                          : i < 3
                          ? "text-cyan-neon font-display font-bold"
                          : "text-white/60"
                      }
                    >
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-4 md:col-span-5 text-white truncate uppercase tracking-wide">
                    {r.player_name}
                  </div>
                  <div className="col-span-3 md:col-span-3 text-right md:text-left text-amber-neon tabular-nums font-display font-bold">
                    {formatINR(r.prize)}
                  </div>
                  <div className="col-span-2 hidden md:block text-white/60 tabular-nums">
                    {r.questions_answered}/36
                  </div>
                  <div className="col-span-4 md:col-span-1 text-right">
                    <span
                      className={`brk inline-block text-[9px] tracking-[0.2em] px-2 py-1 border ${tag.cls}`}
                      style={{ borderRadius: 2 }}
                    >
                      {tag.label}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            data-testid="play-cta-link"
            className="brk inline-flex items-center gap-2 px-5 py-3 border border-cyan-neon text-cyan-neon hover:bg-cyan-neon hover:text-black transition-all font-display tracking-[0.25em] text-xs"
            style={{ borderRadius: 2 }}
          >
            JACK_IN NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
