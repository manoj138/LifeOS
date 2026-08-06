import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles } from 'lucide-react';
import { Button } from './Button';

export const PomodoroTimer = ({
  onTimerComplete,
  className = ''
}) => {
  const [mode, setMode] = useState('work'); // 'work' (25m) | 'shortBreak' (5m) | 'longBreak' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onTimerComplete) onTimerComplete(mode);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode, onTimerComplete]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === 'work') setTimeLeft(25 * 60);
    else if (newMode === 'shortBreak') setTimeLeft(5 * 60);
    else if (newMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else if (mode === 'longBreak') setTimeLeft(15 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const modeTotal = mode === 'work' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60;
  const progressPercent = Math.round(((modeTotal - timeLeft) / modeTotal) * 100);

  return (
    <div className={`rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 p-6 space-y-5 shadow-2xl relative overflow-hidden text-center ${className}`}>
      {/* Background ambient glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Mode Selector Pills */}
      <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <button
          type="button"
          onClick={() => switchMode('work')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'work' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          🧠 Focus (25m)
        </button>
        <button
          type="button"
          onClick={() => switchMode('shortBreak')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          ☕ Short (5m)
        </button>
        <button
          type="button"
          onClick={() => switchMode('longBreak')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'longBreak' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
          }`}
        >
          🌿 Long (15m)
        </button>
      </div>

      {/* Timer Display Circle */}
      <div className="relative w-44 h-44 mx-auto flex flex-col items-center justify-center rounded-full bg-gradient-to-b from-slate-900 to-slate-950 border-4 border-white/10 shadow-inner">
        <span className="text-4xl font-black text-white font-mono tracking-wider">
          {formattedTime}
        </span>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-1">
          {isRunning ? <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" /> : <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
          {mode === 'work' ? 'Focus Session' : 'Break Time'}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <Button
          variant={isRunning ? "danger" : "glow"}
          size="md"
          onClick={() => setIsRunning(!isRunning)}
          leftIcon={isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        >
          {isRunning ? 'Pause' : 'Start Focus'}
        </Button>

        <Button
          variant="glass"
          size="md"
          onClick={resetTimer}
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
