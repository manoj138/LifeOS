import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ShieldCheck, Sparkles, Volume2, Globe, Delete, ArrowRight, Bot, Mic } from 'lucide-react';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import { useUser } from '../../context/UserContext';
import { AudioSpectrum } from '../ui/AudioSpectrum';
import liveChatbotSvg from '../../assets/graident-ai-robot-vectorart/Live chatbot.svg';

export const PinLockModal = () => {
  const navigate = useNavigate();
  const { user } = useUser();
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

  const handleUnlock = async () => {
    if (!pinInput) {
      setErrorMessage('Please enter PIN');
      triggerShake();
      return;
    }

    const result = await unlockWithPin(pinInput);
    if (!result.success) {
      setErrorMessage(result.message);
      triggerShake();
      setPinInput('');
    } else {
      if (user?.role === 'admin' || user?.email?.toLowerCase().includes('admin')) {
        navigate('/app/admin');
      }
    }
  };


  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');
  if (!isLocked || isAdmin) return null;



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#050508]/95 backdrop-blur-3xl selection:bg-purple-500/30"
      >
        {/* Ambient background glowing light nodes */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none" />

        {/* 2-Column Split Modal Container */}
        <motion.div
          animate={isShaking ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-4xl bg-[#0f0f17]/85 border border-purple-500/30 rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.25)] backdrop-blur-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border-gradient"
        >
          {/* Left Column: Glowing Live Chatbot AI Robot Artwork Showcase */}
          <div className="lg:col-span-5 p-8 lg:p-10 bg-gradient-to-br from-purple-900/30 via-indigo-950/20 to-transparent border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between items-center text-center relative">
            <div className="w-full flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>LifeOS AI Assistant</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Live Chatbot Vector Artwork with Glowing Aura */}
            <div className="my-6 relative flex flex-col items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-2xl animate-pulse-glow" />
              
              <img
                src={liveChatbotSvg}
                alt="LifeOS Live AI Robot Assistant"
                className="w-48 sm:w-56 h-auto drop-shadow-[0_10px_35px_rgba(168,85,247,0.5)] transform hover:scale-105 transition-transform duration-300 relative z-10"
              />

              {/* Dynamic Live Audio Spectrum */}
              <div className="mt-4 w-full max-w-xs bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <Mic className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    AI Voice Mentor
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Ready
                  </span>
                </div>
                <AudioSpectrum isActive={isSpeaking || true} barCount={18} />
              </div>
            </div>

            {/* Daily Morning Briefing Preview Note */}
            <div className="bg-purple-900/20 border border-purple-500/30 p-3.5 rounded-2xl text-left w-full">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Morning Briefing Ready</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {language === 'mr'
                  ? 'पिन टाकून अनलॉक करा आणि आजचे कोडिंग उद्दिष्ट ऐका.'
                  : 'Enter security PIN to play your personalized AI daily schedule audio briefing.'}
              </p>
            </div>
          </div>

          {/* Right Column: Keypad Workspace */}
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between space-y-6">
            {/* Top Bar: Security Badge & Language Switcher */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Voice Lock Guard</span>
              </div>

              {/* Language Selector Toggle */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    language === 'en'
                      ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mr')}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    language === 'mr'
                      ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)] font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            {/* Greeting Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {language === 'mr' ? `स्वागत आहे, ${userName}! ⚡` : `Welcome back, ${userName}! ⚡`}
              </h2>
              <p className="text-xs text-gray-400">
                {language === 'mr'
                  ? 'सुरक्षित प्रवेशासाठी ४-अंकी सुरक्षा पिन (PIN) प्रविष्ट करा.'
                  : 'Enter your 4-digit security PIN to unlock AI voice guidance & daily agenda.'}
              </p>
            </div>

            {/* PIN Input Display Indicators */}
            <div className="flex justify-center items-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <motion.div
                  key={idx}
                  whileSelect={{ scale: 1.1 }}
                  className={`w-12 h-14 rounded-2xl border flex items-center justify-center text-2xl font-bold transition-all ${
                    pinInput.length > idx
                      ? 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-105'
                      : 'border-white/10 bg-white/5 text-gray-600'
                  }`}
                >
                  {pinInput.length > idx ? '●' : ''}
                </motion.div>
              ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-rose-400 font-medium text-center animate-bounce">{errorMessage}</p>
            )}

            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-[300px] mx-auto w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleKeyPress(num.toString())}
                  className="h-12 rounded-2xl bg-white/[0.04] hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-white font-bold text-lg transition-all duration-150 flex items-center justify-center shadow-sm"
                >
                  {num}
                </motion.button>
              ))}

              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={handleClear}
                className="h-12 rounded-2xl bg-white/[0.02] hover:bg-white/10 border border-white/10 text-gray-400 text-xs font-bold transition-all flex items-center justify-center"
              >
                Clear
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => handleKeyPress('0')}
                className="h-12 rounded-2xl bg-white/[0.04] hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-white font-bold text-lg transition-all duration-150 flex items-center justify-center shadow-sm"
              >
                0
              </motion.button>

              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={handleDelete}
                className="h-12 rounded-2xl bg-white/[0.02] hover:bg-white/10 border border-white/10 text-gray-400 transition-all flex items-center justify-center"
              >
                <Delete className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            {/* Unlock Action Button */}
            <div>
              <button
                type="button"
                onClick={handleUnlock}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(168,85,247,0.45)] transition-all transform active:scale-98 flex items-center justify-center gap-2"
              >
                <span>{language === 'mr' ? 'अनलॉक करा (Unlock & Play)' : 'Unlock & Play Briefing'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};
