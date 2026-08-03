import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, Bot, Shield, Zap, UserCheck, Play } from 'lucide-react';

const AI_PERSONAS = [
  {
    id: 'Motivational Tech Mentor',
    name: 'Antigravity Mentor',
    tagline: 'Encouraging, supportive, career-focused',
    desc: 'Provides structured daily encouragement and breaking down complex DSA & DevOps problems into easy steps.',
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-600',
    sampleVoiceText: 'Welcome to LifeOS! I am your AI Mentor. Let us achieve your engineering goals together step by step.',
  },
  {
    id: 'Strict Technical Drill Coach',
    name: 'Tactical Coach',
    tagline: 'High standards, goal-driven, strict accountability',
    desc: 'Keeps you accountable for every missed daily target with precise action plans and strict reminders.',
    icon: Zap,
    color: 'from-amber-500 to-rose-600',
    sampleVoiceText: 'Time to focus! Consistent practice is non-negotiable. Let us tackle today’s target modules now.',
  },
  {
    id: 'Analytical System Specialist',
    name: 'Architect Mind',
    tagline: 'Deep technical, architectural focus, concise',
    desc: 'Focuses on deep system design patterns, clean code principles, and efficient solution optimization.',
    icon: Bot,
    color: 'from-cyan-500 to-blue-600',
    sampleVoiceText: 'System parameters initialized. Ready to optimize your learning velocity and code metrics.',
  },
];

export const StepVoiceAI = ({ formData, updateFormData }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSample, setActiveSample] = useState('');

  const playVoiceSample = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      setActiveSample(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 5 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">AI Voice Coach & Mentor Persona</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          LifeOS features an integrated AI Voice Assistant. Choose how your AI coach should guide you.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div className="space-y-3">
          {AI_PERSONAS.map((persona) => {
            const Icon = persona.icon;
            const isSelected = formData.aiPersona === persona.id;
            return (
              <div
                key={persona.id}
                onClick={() => updateFormData({ aiPersona: persona.id })}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-950/60 to-slate-900 border-purple-500 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${persona.color} text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{persona.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                          {persona.tagline}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{persona.desc}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playVoiceSample(persona.sampleVoiceText);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test Voice</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Ready for Personalized LifeOS Experience</h5>
              <p className="text-[11px] text-gray-400">Click complete below to render your custom dashboard!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
