import React, { useState } from 'react';
import { Volume2, Sparkles, Bot, Zap, UserCheck, Lock } from 'lucide-react';

const AI_PERSONAS = [
  {
    id: 'Motivational Tech Mentor',
    name: 'Antigravity Mentor',
    tagline: 'Encouraging, supportive, career-focused',
    desc: 'Provides structured daily encouragement and breaks down complex DSA & DevOps topics.',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600',
    sampleVoiceText: 'Welcome to LifeOS! I am your AI Mentor. Let us achieve your engineering goals together step by step.',
  },
  {
    id: 'Strict Technical Drill Coach',
    name: 'Tactical Coach',
    tagline: 'High standards, goal-driven, strict accountability',
    desc: 'Keeps you accountable for every missed daily target with precise action plans.',
    icon: Zap,
    color: 'from-amber-500 to-rose-600',
    sampleVoiceText: 'Time to focus! Consistent practice is non-negotiable. Let us tackle today’s target modules now.',
  },
  {
    id: 'Analytical System Specialist',
    name: 'Architect Mind',
    tagline: 'Deep technical, architectural focus, concise',
    desc: 'Focuses on deep system design patterns, clean code principles, and solution optimization.',
    icon: Bot,
    color: 'from-cyan-500 to-blue-600',
    sampleVoiceText: 'System parameters initialized. Ready to optimize your learning velocity and code metrics.',
  },
];

export const StepVoiceAISecurity = ({ formData, updateFormData }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVoiceSample = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 10 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">AI Voice Mentor & Master Security PIN</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Final step! Choose your AI Coach persona and set your 4-digit security PIN to launch LifeOS.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div className="space-y-2.5">
          {AI_PERSONAS.map((persona) => {
            const Icon = persona.icon;
            const isSelected = (formData.aiPersona || 'Motivational Tech Mentor') === persona.id;
            return (
              <div
                key={persona.id}
                onClick={() => updateFormData({ aiPersona: persona.id })}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-950/60 to-slate-900 border-purple-500 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${persona.color} text-white shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{persona.name}</h4>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                          {persona.tagline}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{persona.desc}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(persona.sampleVoiceText);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-medium transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security PIN Setup Card */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white">Create Your 4-Digit Master Security PIN</h4>
          </div>
          <p className="text-[11px] text-gray-400">
            Set a custom 4-digit PIN to unlock your LifeOS dashboard and voice coach interface.
          </p>
          <input
            type="password"
            maxLength={4}
            placeholder="1234"
            value={formData.pin || ''}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '').slice(0, 4);
              updateFormData({ pin: val });
            }}
            className="w-full sm:w-48 bg-slate-900 border border-white/15 rounded-xl px-4 py-2 text-center text-base font-mono font-bold tracking-widest text-cyan-300 focus:outline-none focus:border-cyan-400 placeholder:text-gray-600"
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">10-Step Deep Profile Complete</h5>
              <p className="text-[10px] text-gray-400">Click complete below to render your custom AI OS dashboard!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
