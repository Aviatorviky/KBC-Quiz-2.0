import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import StartScreen from "./Pages/StartScreen";
import GameScreen from "./Pages/GameScreen";
import Leaderboard from "./Pages/Leaderboard";
import Scanlines from "./components/Scanlines";

function App() {
  return (
    <div className="App font-mono text-[#E0E0E0]">
      <Scanlines />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/play" element={<GameScreen />} />
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
