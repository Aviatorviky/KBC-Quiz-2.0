import hoverSfx from "../assets/sounds/hover.mp3";
import clickSfx from "../assets/sounds/click.mp3";
import lockSfx from "../assets/sounds/lock.mp3";
import correctSfx from "../assets/sounds/correct.mp3";
import wrongSfx from "../assets/sounds/wrong.mp3";
import timerSfx from "../assets/sounds/timer.mp3";
import winSfx from "../assets/sounds/win.mp3";
import loseSfx from "../assets/sounds/lose.mp3";
import tierSfx from "../assets/sounds/tier.mp3";

let muted = localStorage.getItem("kbc_muted") === "true";

const create = (src, volume = 1) => {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.preload = "auto";
  return audio;
};

const sounds = {
  hover: create(hoverSfx, 0.30),
  click: create(clickSfx, 0.45),
  lock: create(lockSfx, 0.60),
  correct: create(correctSfx, 0.70),
  wrong: create(wrongSfx, 0.70),
  timer: create(timerSfx, 0.45),
  win: create(winSfx, 0.90),
  lose: create(loseSfx, 0.90),
  tier: create(tierSfx, 0.80),
};

function play(sound) {
  if (muted) return;

  const audio = sounds[sound];

  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;

  audio.play().catch(() => {});
}

// =========================
// NORMAL SOUNDS
// =========================

export const playHover = () => play("hover");

export const playClick = () => play("click");

export const playLock = () => play("lock");

export const playCorrect = () => play("correct");

export const playWrong = () => play("wrong");

export const playWin = () => play("win");

export const playLose = () => play("lose");

export const playTier = () => play("tier");

// =========================
// TIMER
// =========================

export const playTick = () => {

  if (muted) return;

  const audio = sounds.timer;

  audio.pause();
  audio.currentTime = 0;

  audio.play().catch(() => {});

};

export const stopTimer = () => {

  const audio = sounds.timer;

  audio.pause();
  audio.currentTime = 0;

};

// =========================
// MUTE
// =========================

export const toggleMute = () => {

  muted = !muted;

  localStorage.setItem("kbc_muted", muted);

  return muted;

};

export const isMuted = () => muted;