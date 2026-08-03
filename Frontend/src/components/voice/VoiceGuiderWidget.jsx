import React, { useState } from 'react';
import { Volume2, VolumeX, Lock, Globe, Sparkles, Mic, Sliders, Radio } from 'lucide-react';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import { AudioSpectrum } from '../ui/AudioSpectrum';

export const VoiceGuiderWidget = () => {
  const {
    isLocked,
    language,
    setLanguage,
    isMuted,
    setIsMuted,
    isSpeaking,
    isListening,
    isHandsFreeEnabled,
    setIsHandsFreeEnabled,
    requestMicPermission,
    startListening,
    speakGreetingAndBriefing,
    lockApp,
    setIsVoiceModalOpen,
    aiName
  } = useVoiceGuider();

  const [showSettingsPopover, setShowSettingsPopover] = useState(false);

  if (isLocked) return null;

  const handleCapsuleClick = async () => {
    await requestMicPermission();
    setIsVoiceModalOpen(true);
    startListening();
  };

  return (
    <div className="relative flex items-center">
      {/* Sleek Single AI Voice Capsule */}
      <div className="flex items-center gap-2 bg-[#12121a]/90 hover:bg-[#181824] border border-white/15 hover:border-purple-500/50 rounded-full px-3.5 py-1.5 backdrop-blur-2xl shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all">
        {/* Animated Mic Orb & Capsule Action */}
        <button
          type="button"
          onClick={handleCapsuleClick}
          className="flex items-center gap-2 text-left group"
          title={`Click to talk or say "Hey ${aiName}" hands-free`}
        >
          {/* Glowing Voice Orb / Waves */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-0.5 shadow-[0_0_12px_rgba(168,85,247,0.6)]">
            <div className="w-full h-full bg-[#0a0a0f] rounded-full flex items-center justify-center">
              {isSpeaking ? (
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              ) : isListening ? (
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              ) : (
                <Mic className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
              )}
            </div>
          </div>

          {/* Audio Spectrum when AI is speaking */}
          {isSpeaking ? (
            <div className="scale-75 origin-left">
              <AudioSpectrum isActive={true} barCount={5} />
            </div>
          ) : (
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1">
                <span>{aiName} AI</span>
                {isHandsFreeEnabled && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {isListening
                  ? (language === 'mr' ? 'ऐकत आहे...' : 'Listening...')
                  : (language === 'mr' ? `हाक मारा: 'Hey ${aiName}'` : `Say "Hey ${aiName}"`)}
              </span>
            </div>
          )}
        </button>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/15 mx-0.5" />

        {/* Compact Quick Settings Menu Button */}
        <button
          type="button"
          onClick={() => setShowSettingsPopover(prev => !prev)}
          className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Voice Assistant Quick Controls"
        >
          <Sliders className="w-3.5 h-3.5 text-gray-300" />
        </button>
      </div>

      {/* Popover Quick Settings Dropdown */}
      {showSettingsPopover && (
        <div className="absolute top-12 right-0 z-50 w-56 bg-[#12121a]/95 border border-white/20 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-white pb-2 border-b border-white/10">
            <span>{aiName} Voice Controls</span>
            <button
              onClick={() => setShowSettingsPopover(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Hands-Free Toggle */}
          <div
            onClick={() => setIsHandsFreeEnabled(prev => !prev)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
          >
            <span className="text-gray-300 font-medium">Hands-Free "Hey {aiName}"</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isHandsFreeEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/10 text-gray-400'
            }`}>
              {isHandsFreeEnabled ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Language Switch */}
          <div
            onClick={() => setLanguage(prev => (prev === 'mr' ? 'en' : 'mr'))}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
          >
            <span className="text-gray-300 font-medium">Voice Language</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {language === 'mr' ? 'मराठी' : 'English'}
            </span>
          </div>

          {/* Mute Toggle */}
          <div
            onClick={() => setIsMuted(prev => !prev)}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
          >
            <span className="text-gray-300 font-medium">AI Audio Mute</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isMuted ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
            }`}>
              {isMuted ? 'MUTED' : 'ACTIVE'}
            </span>
          </div>

          {/* Test Briefing */}
          <button
            type="button"
            onClick={() => {
              setShowSettingsPopover(false);
              speakGreetingAndBriefing();
            }}
            className="w-full py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-white font-semibold text-center transition-colors"
          >
            Play Daily Voice Briefing
          </button>

          {/* Re-lock App */}
          <button
            type="button"
            onClick={() => {
              setShowSettingsPopover(false);
              lockApp();
            }}
            className="w-full py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-medium text-center transition-colors flex items-center justify-center gap-1"
          >
            <Lock className="w-3 h-3 text-gray-400" />
            <span>Lock Screen with PIN</span>
          </button>
        </div>
      )}
    </div>
  );
};
