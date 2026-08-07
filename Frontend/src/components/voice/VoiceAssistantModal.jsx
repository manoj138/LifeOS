import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Globe } from 'lucide-react';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import { AudioSpectrum } from '../ui/AudioSpectrum';
import { AIRobotAvatar } from './AIRobotAvatar';

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
    language,
    setLanguage,
    aiName
  } = useVoiceGuider();

  if (!isVoiceModalOpen) return null;

  return (
    <AnimatePresence>
      {/* NON-BLOCKING FLOATING CONTAINER */}
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-[9990] pointer-events-none flex flex-col items-end">
        {/* Floating Voice HUD Capsule */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="pointer-events-auto max-w-[calc(100vw-1.5rem)] w-80 sm:w-96 rounded-3xl bg-[#12121a]/95 border border-purple-500/30 p-4 sm:p-5 shadow-[0_0_40px_rgba(168,85,247,0.35)] backdrop-blur-2xl text-left space-y-3 overflow-hidden"
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

          {/* 3D Animated Floating AI Robot Companion & Audio Wave */}
          <div className="flex items-center justify-between gap-3 py-1 bg-white/[0.02] border border-white/5 rounded-2xl p-3">
            <button
              type="button"
              onClick={() => {
                if (isListening) {
                  stopListening();
                } else {
                  startListening();
                }
              }}
              title="Click to toggle listening"
              className="cursor-pointer hover:scale-105 transition-transform shrink-0"
            >
              <AIRobotAvatar size="md" />
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
                  {language === 'mr' ? 'बोलून काम किंवा सवय जोडण्यास सांगा' : 'Say "Add task..." or "Add habit..."'}
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
                  ? `उदा. "Add task: Prepare Resume" किंवा "Add habit: Exercise"`
                  : `Try: "Add task: Prepare Resume" or "Add habit: Exercise"`}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
