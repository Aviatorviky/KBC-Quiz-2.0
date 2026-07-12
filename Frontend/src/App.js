import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import StartScreen from "./Pages/StartScreen/StartScreen";
import ClassicGame from "./Pages/ClassicGame/ClassicGame";
import StrategyGame from "./Pages/StrategyGame/StrategyGame";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";

import Scanlines from "./Pages/components/Scanlines";

function App() {
  return (
    <div className="App font-mono text-[#E0E0E0]">
      <Scanlines />

      <BrowserRouter>

      <>

<div className="fixed inset-0 pointer-events-none overflow-hidden">

    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-cyan-neon/5 blur-[220px]"/>

</div>


</>
        <Routes>

          <Route path="/" element={<StartScreen />} />

          <Route path="/classic" element={<ClassicGame />} />

          <Route path="/strategy" element={<StrategyGame />} />

          <Route path="/leaderboard" element={<Leaderboard />} />

        </Routes>
      </BrowserRouter>

      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(0,240,255,0.4)",
            color: "#E0E0E0",
            borderRadius: "2px",
            fontFamily: "'Fira Code', monospace",
          },
        }}
      />
    </div>
  );
}



export default App;



