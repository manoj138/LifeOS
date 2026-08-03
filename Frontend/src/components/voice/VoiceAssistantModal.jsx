import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Sparkles, Globe, Compass, Send } from 'lucide-react';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import { AudioSpectrum } from '../ui/AudioSpectrum';

export const VoiceAssistantModal = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    isListening,
    startListening,
    stopListening,
    isSpeaking,
    userTranscript,
    aiResponseText,
    processVoiceQuery,
    language,
    setLanguage,
    aiName
  } = useVoiceGuider();

  if (!isVoiceModalOpen) return null;

  const promptSuggestions = language === 'mr'
    ? [
        `Hey ${aiName}, आज काय pending आहे?`,
        `${aiName}, open learning hub`,
        `तुझे नाव काय आहे?`
      ]
    : [
        `Hey ${aiName}, what is pending today?`,
        `${aiName}, open Learning Hub`,
        `What is your name?`
      ];

  return (
    <AnimatePresence>
      {/* NON-BLOCKING FLOATING CONTAINER (pointer-events-none allows clicks on page beneath) */}
      <div className="fixed bottom-6 right-6 z-[9990] pointer-events-none flex flex-col items-end">
        {/* Floating Voice HUD Capsule (pointer-events-auto captures clicks on HUD itself) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="pointer-events-auto w-80 sm:w-96 rounded-3xl bg-[#12121a]/95 border border-purple-500/30 p-5 shadow-[0_0_40px_rgba(168,85,247,0.35)] backdrop-blur-2xl text-left space-y-3 overflow-hidden"
        >
          {/* Header Toolbar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>{aiName} Voice HUD</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    Active
                  </span>
                </h4>
                <p className="text-[10px] text-gray-400">
                  {language === 'mr' ? `हाक मारा: "Hey ${aiName}"` : `Say "Hey ${aiName}"`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Switch */}
              <button
                type="button"
                onClick={() => setLanguage(prev => (prev === 'mr' ? 'en' : 'mr'))}
                className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors flex items-center gap-1"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>{language === 'mr' ? 'मराठी' : 'EN'}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsVoiceModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Dismiss Voice HUD"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Pulsing Orb & Audio Wave */}
          <div className="flex items-center justify-between gap-3 py-1 bg-white/[0.02] border border-white/5 rounded-2xl px-3 py-2">
            <button
              type="button"
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md shrink-0 ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-600 to-purple-600 text-white animate-pulse'
                  : 'bg-gradient-to-tr from-purple-600 to-cyan-500 hover:scale-105 text-white'
              }`}
            >
              <Mic className="w-5 h-5 text-white" />
            </button>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-purple-300 truncate">
                {isListening
                  ? (language === 'mr' ? 'ऐकत आहे... बोला' : 'Listening... Speak')
                  : isSpeaking
                  ? (language === 'mr' ? `${aiName} उत्तर देत आहे...` : `${aiName} Responding...`)
                  : (language === 'mr' ? `हाक मारा: 'Hey ${aiName}'` : `Say 'Hey ${aiName}'`)}
              </div>
              {isSpeaking ? (
                <div className="scale-75 origin-left pt-1">
                  <AudioSpectrum isActive={true} barCount={12} />
                </div>
              ) : (
                <p className="text-[10px] text-gray-400 truncate">
                  {language === 'mr' ? 'नेव्हिगेशन किंवा प्रलंबित कामे विचारा' : 'Ask about pending tasks or navigation'}
                </p>
              )}
            </div>
          </div>

          {/* Transcript Display Box */}
          <div className="space-y-2 text-left bg-white/[0.03] border border-white/10 rounded-2xl p-3 text-xs min-h-[70px] flex flex-col justify-center">
            {userTranscript && (
              <div className="space-y-0.5">
                <span className="text-[9px] uppercase font-bold tracking-wider text-cyan-400">You Spoke:</span>
                <p className="text-xs font-medium text-white italic truncate">"{userTranscript}"</p>
              </div>
            )}

            {aiResponseText && (
              <div className="space-y-0.5 pt-1 border-t border-white/10">
                <span className="text-[9px] uppercase font-bold tracking-wider text-purple-400">{aiName}:</span>
                <p className="text-xs font-medium text-purple-200 leading-snug">{aiResponseText}</p>
              </div>
            )}

            {!userTranscript && !aiResponseText && (
              <p className="text-[11px] text-gray-400 text-center italic">
                {language === 'mr'
                  ? `उदा. "Hey ${aiName}, आज काय pending आहे?"`
                  : `Try: "Hey ${aiName}, what is pending today?"`}
              </p>
            )}
          </div>

          {/* Quick Suggested Voice Commands */}
          <div className="space-y-1.5 text-left pt-0.5">
            <span className="text-[10px] font-semibold text-gray-400 flex items-center gap-1">
              <Compass className="w-3 h-3 text-purple-400" />
              {language === 'mr' ? 'त्वरित विचारण्यासाठी क्लिक करा:' : 'Quick Voice Prompts:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {promptSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => processVoiceQuery(prompt)}
                  className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/40 text-[10px] font-medium text-gray-300 hover:text-white transition-all text-left flex items-center gap-1"
                >
                  <Send className="w-2.5 h-2.5 text-cyan-400" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
