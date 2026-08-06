import React, { useState } from 'react';
import { Volume2, VolumeX, Lock, Globe, Sparkles, Sliders, Radio } from 'lucide-react';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import { AudioSpectrum } from '../ui/AudioSpectrum';
import { AIRobotAvatar } from './AIRobotAvatar';

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
    voicePersonality,
    setVoicePersonality,
    requestMicPermission,
    startListening,
    speakGreetingAndBriefing,
    lockApp,
    setIsVoiceModalOpen,
    aiName,
    userTranscript
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
      {/* Sleek Fixed-Size AI Voice Capsule (Prevents Layout Shifting) */}
      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#12121a]/90 hover:bg-[#181824] border border-white/15 hover:border-purple-500/50 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-1.5 backdrop-blur-2xl shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all">
        {/* Animated Mic Orb & Capsule Action */}
        <button
          type="button"
          onClick={handleCapsuleClick}
          className="flex items-center gap-1.5 sm:gap-2 text-left group"
          title={`Click to talk or say "Hey ${aiName}" hands-free`}
        >
          {/* 3D Animated Floating AI Robot Companion Icon */}
          <AIRobotAvatar size="sm" />

          {/* Responsive Fixed-Width Label Box (Prevents Layout Shifting & Jitter) */}
          <div className="w-24 sm:w-32 min-w-[96px] sm:min-w-[128px] max-w-[96px] sm:max-w-[128px] h-7 flex flex-col justify-center overflow-hidden">
            {isSpeaking ? (
              <div className="scale-75 origin-left">
                <AudioSpectrum isActive={true} barCount={6} />
              </div>
            ) : (
              <>
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1 truncate">
                  <span>{aiName} AI</span>
                  {isHandsFreeEnabled && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  )}
                </span>
                <span className="text-[10px] text-gray-400 font-mono truncate">
                  {isListening
                    ? (userTranscript ? `"${userTranscript}"` : (language === 'mr' ? 'ऐकत आहे...' : 'Listening...'))
                    : (language === 'mr' ? `हाक मारा: 'Hey ${aiName}'` : `Say "Hey ${aiName}"`)}
                </span>
              </>
            )}
          </div>
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
        <div className="absolute top-12 right-0 z-50 w-64 bg-[#12121a]/95 border border-white/20 rounded-2xl p-3.5 shadow-2xl backdrop-blur-2xl space-y-2.5 text-xs">
          <div className="flex items-center justify-between font-bold text-white pb-2 border-b border-white/10">
            <span>{aiName} Controls & Tone</span>
            <button
              onClick={() => setShowSettingsPopover(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Voice Personality Selector */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">AI Voice Tone:</span>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => setVoicePersonality('sakhi')}
                className={`p-1.5 rounded-xl border text-[10px] font-semibold text-center transition-all ${
                  voicePersonality === 'sakhi'
                    ? 'bg-purple-600/30 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                🌸 Sakhi
              </button>

              <button
                type="button"
                onClick={() => setVoicePersonality('coach')}
                className={`p-1.5 rounded-xl border text-[10px] font-semibold text-center transition-all ${
                  voicePersonality === 'coach'
                    ? 'bg-rose-600/30 border-rose-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                ⚡ Coach
              </button>

              <button
                type="button"
                onClick={() => setVoicePersonality('mentor')}
                className={`p-1.5 rounded-xl border text-[10px] font-semibold text-center transition-all ${
                  voicePersonality === 'mentor'
                    ? 'bg-cyan-600/30 border-cyan-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                💼 Mentor
              </button>
            </div>
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
