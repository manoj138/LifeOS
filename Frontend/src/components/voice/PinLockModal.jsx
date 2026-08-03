import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ShieldCheck, Sparkles, Volume2, Globe, Delete, ArrowRight } from 'lucide-react';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import { AudioSpectrum } from '../ui/AudioSpectrum';

export const PinLockModal = () => {
  const { isLocked, unlockWithPin, userName, language, setLanguage, isSpeaking, pinCode } = useVoiceGuider();
  const [pinInput, setPinInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  // Keyboard handler for typing PIN
  useEffect(() => {
    if (!isLocked) return;

    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        if (pinInput.length < 6) {
          setPinInput(prev => prev + e.key);
          setErrorMessage('');
        }
      } else if (e.key === 'Backspace') {
        setPinInput(prev => prev.slice(0, -1));
        setErrorMessage('');
      } else if (e.key === 'Enter') {
        handleUnlock();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, pinInput]);

  const handleKeyPress = (num) => {
    if (pinInput.length < 6) {
      setPinInput(prev => prev + num);
      setErrorMessage('');
    }
  };

  const handleDelete = () => {
    setPinInput(prev => prev.slice(0, -1));
    setErrorMessage('');
  };

  const handleClear = () => {
    setPinInput('');
    setErrorMessage('');
  };

  const handleUnlock = () => {
    if (!pinInput) {
      setErrorMessage('Please enter PIN');
      triggerShake();
      return;
    }

    const result = unlockWithPin(pinInput);
    if (!result.success) {
      setErrorMessage(result.message);
      triggerShake();
      setPinInput('');
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  if (!isLocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#070709]/90 backdrop-blur-2xl selection:bg-purple-500/30"
      >
        {/* Background glow animations */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Modal Container */}
        <motion.div
          animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-md bg-[#12121a]/80 border border-white/15 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-3xl text-center space-y-6 overflow-hidden"
        >
          {/* Top Badge & Language Switch */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>LifeOS Voice Lock</span>
            </div>

            {/* Language Selector Toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  language === 'en'
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  language === 'mr'
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Icon & User Greeting Header */}
          <div className="space-y-3 pt-2">
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-[#0a0a0f] rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-purple-400 animate-pulse" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <span>{language === 'mr' ? `स्वागत आहे, ${userName}!` : `Welcome back, ${userName}!`}</span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {language === 'mr'
                  ? 'सुरक्षित प्रवेशासाठी पिन (PIN) प्रविष्ट करा आणि AI व्हॉईस ब्रीफिंग ऐका.'
                  : 'Enter your Security PIN to unlock AI voice guidance & daily agenda.'}
              </p>
            </div>
          </div>

          {/* Audio Spectrum indicator when AI speech is active */}
          {isSpeaking && (
            <div className="py-1">
              <AudioSpectrum isActive={true} barCount={16} />
            </div>
          )}

          {/* PIN Input Display Boxes */}
          <div className="flex justify-center items-center gap-3 my-4">
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                whileSelect={{ scale: 1.1 }}
                className={`w-11 h-13 rounded-2xl border flex items-center justify-center text-xl font-bold transition-all ${
                  pinInput.length > idx
                    ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'border-white/10 bg-white/5 text-gray-600'
                }`}
              >
                {pinInput.length > idx ? '●' : ''}
              </motion.div>
            ))}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-xs text-rose-400 font-medium animate-bounce">{errorMessage}</p>
          )}

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num.toString())}
                className="h-12 rounded-2xl bg-white/[0.04] hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-white font-semibold text-lg transition-all duration-150 active:scale-95 flex items-center justify-center shadow-sm"
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClear}
              className="h-12 rounded-2xl bg-white/[0.02] hover:bg-white/10 border border-white/10 text-gray-400 text-xs font-semibold transition-all active:scale-95 flex items-center justify-center"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="h-12 rounded-2xl bg-white/[0.04] hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-white font-semibold text-lg transition-all duration-150 active:scale-95 flex items-center justify-center shadow-sm"
            >
              0
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="h-12 rounded-2xl bg-white/[0.02] hover:bg-white/10 border border-white/10 text-gray-400 transition-all active:scale-95 flex items-center justify-center"
            >
              <Delete className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Unlock Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleUnlock}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{language === 'mr' ? 'प्रवेश करा (Enter)' : 'Unlock & Play Briefing'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Default PIN Helper Note */}
          <div className="text-[11px] text-gray-500 pt-1">
            Default PIN: <code className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded font-mono font-bold">1234</code> (Press Enter or Click Unlock)
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
