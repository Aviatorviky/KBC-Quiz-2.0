import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameEngine from "../../Engine/GameEngine";

import GameHeader from "../components/Game/GameHeader";
import GameBoard from "../components/Game/GameBoard";
import GameSidebar from "../components/Game/GameSidebar";
import GameDialogs from "../components/Game/GameDialogs";
import RewardMatrixModal from "../components/UI/RewardMatrixModal";

import EndScreen from "../EndsScreen/EndScreen";

const ClassicGame = () => {

    const navigate = useNavigate();

    const [state, setState] = useState(
        GameEngine.getState()
    );

    const [showReward, setShowReward] = useState(false);

    const [loadingNextTier, setLoadingNextTier] = useState(false);

    useEffect(() => {

        const playerName =
            sessionStorage.getItem("player_name");

        if (!playerName) {

            navigate("/");

            return;

        }

        GameEngine.dispatch({

            type: "START_GAME",

            payload: {

                playerName,

                mode: "classic"

            }

        });

        setState({

            ...GameEngine.getState()

        });

    }, [navigate]);

    const refresh = () => {

        const updated = GameEngine.getState();

        setState({

            ...updated

        });

        if (updated.status === "tier-completed") {

            setShowReward(true);

        }

    };

    const continueMission = () => {

    setShowReward(false);

    setLoadingNextTier(true);

    setTimeout(() => {

        GameEngine.dispatch({

            type: "NEXT_TIER"

        });

        setLoadingNextTier(false);

        setState({

            ...GameEngine.getState()

        });

    }, 800);

};

    

    

    const walkAway = () => {

        const confirmWalk = window.confirm(

            `Walk away with ${new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).format(state.currentPrize)} ?`

        );

        if (!confirmWalk) return;

        GameEngine.dispatch({

            type: "WALK_AWAY"

        });

        setState({

            ...GameEngine.getState()

        });

    };


    if (loadingNextTier) {

    return (

        <div className="crt-scanlines animate-page min-h-screen flex items-center justify-center">

            <div className="term-panel max-w-lg w-full p-10 text-center">

                <h2 className="font-display text-3xl text-cyan-neon mb-6">

                    LOADING NEXT MISSION

                </h2>

                <div className="h-3 bg-white/10 rounded overflow-hidden">

                    <div className="h-full bg-cyan-neon animate-pulse w-full"/>

                </div>

                <p className="mt-6 text-white/60">

                    Synchronizing Question Database...

                </p>

            </div>

        </div>

    );

}

    // ======================
    // END SCREEN
    // ======================

    if (

        state.status === "won" ||

        state.status === "game-over" ||

        state.status === "walked-away"

    ) {

        return (

            <EndScreen

                outcome={
                    state.status === "game-over"
                      ? "wrong"
                      : state.status === "walked-away"
                      ? "walked_away"
                      : state.status
                }                   

                prize={state.currentPrize}

                questionsAnswered={

                    state.totalQuestionsAnswered

                }

                playerName={state.playerName}

                onRestart={() => navigate("/")}

                onLeaderboard={() => navigate("/leaderboard")}

            />

        );

    }

    return (

        <div className="crt-scanlines animate-page min-h-screen">

            <GameHeader

                state={state}

                onExit={walkAway}

            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-6">

                <GameBoard

                    state={state}

                    refresh={refresh}

                />

                <GameSidebar

                    state={state}

                    disabled={false}

                />

            </div>

            <RewardMatrixModal

                open={showReward}

                currentTier={state.currentTier}

                currentPrize={state.currentPrize}

                guaranteedPrize={state.guaranteedPrize}

                onContinue={continueMission}

                onWalkAway={() => {

                setShowReward(false);

                GameEngine.dispatch({
                
                    type: "WALK_AWAY"
                
                });
            
                setState({
                
                    ...GameEngine.getState()
                
                });

                 }}
            />

            

            <GameDialogs

                state={state}

                refresh={refresh}

            />

        </div>

    );

};

<EndScreen
    outcome={
        state.status === "game-over"
            ? "wrong"
            : state.status === "walked-away"
            ? "walked_away"
            : state.status
    }
    prize={state.currentPrize}
    questionsAnswered={state.totalQuestionsAnswered}
    playerName={state.playerName}
    onRestart={() => navigate("/")}
    onLeaderboard={() => navigate("/leaderboard")}
/>

export default ClassicGame;