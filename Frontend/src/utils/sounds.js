// Procedural sound effects using Web Audio API (no audio files needed).
let ctx = null;
let muted = false;
let suspenseInterval = null;

const initAudio = () => {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
};

export const isMuted = () => muted;

export const toggleMute = () => {
  muted = !muted;
  if (muted) stopSuspense();
  return muted;
};

const playTone = (freq, type, duration, gainStart = 0.1) => {
  if (muted) return;
  initAudio();
  try {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(gainStart, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error(e);
  }
};

export const playClick = () => playTone(800, "sine", 0.08, 0.05);
export const playHover = () => playTone(600, "sine", 0.04, 0.02);
export const playCorrect = () => {
  playTone(523.25, "sine", 0.15, 0.1); // C5
  setTimeout(() => playTone(659.25, "sine", 0.3, 0.1), 150); // E5
};
export const playWrong = () => {
  playTone(180, "sawtooth", 0.4, 0.15);
  setTimeout(() => playTone(130, "sawtooth", 0.5, 0.15), 100);
};
export const playMilestone = () => {
  playTone(523.25, "triangle", 0.2, 0.1);
  setTimeout(() => playTone(659.25, "triangle", 0.2, 0.1), 150);
  setTimeout(() => playTone(783.99, "triangle", 0.4, 0.15), 300);
};
export const playLifeline = () => playTone(440, "triangle", 0.2, 0.08);
export const playTick = () => playTone(1200, "sine", 0.03, 0.05);
export const playGameover = () => playTone(90, "sawtooth", 0.8, 0.2);

export const startSuspense = () => {
  if (muted || suspenseInterval) return;
  initAudio();
  suspenseInterval = setInterval(() => {
    playTone(110, "triangle", 0.4, 0.05);
  }, 1200);
};

export const stopSuspense = () => {
  if (suspenseInterval) {
    clearInterval(suspenseInterval);
    suspenseInterval = null;
  }
};
