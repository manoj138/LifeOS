import React from 'react';
import { User, MapPin, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';

const AI_LANGUAGES = [
  { id: 'English', label: 'English', desc: 'Standard Technical Communication', accent: 'from-purple-500 to-indigo-600' },
  { id: 'Marathi', label: 'मराठी (Marathi)', desc: 'Regional Tech Guidance & Mentorship', accent: 'from-cyan-500 to-blue-600' },
  { id: 'Hindi', label: 'हिन्दी (Hindi)', desc: 'Bilingual Mentorship & Explanations', accent: 'from-amber-500 to-rose-600' },
];

export const StepPersonalIdentity = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 1 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Personal Identity & Location</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Let's personalize your LifeOS AI assistant with your name, region, and primary communication language.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div className="space-y-1">
          <Input
            label="Your Full Name"
            placeholder="e.g. Manoj Kumar"
            value={formData.name || ''}
            onChange={(e) => updateFormData({ name: e.target.value })}
            leftIcon={<User className="w-4 h-4 text-purple-400" />}
            required
            className="focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          />
        </div>

        <div className="space-y-1">
          <Input
            label="Current City & State"
            placeholder="e.g. Pune, Maharashtra"
            value={formData.cityState || ''}
            onChange={(e) => updateFormData({ cityState: e.target.value })}
            leftIcon={<MapPin className="w-4 h-4 text-amber-400" />}
            required
            className="focus:ring-2 focus:ring-amber-500/50 transition-all duration-300"
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Preferred Language for AI Guidance
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {AI_LANGUAGES.map((lang) => {
              const isSelected = (formData.aiLanguage || 'English') === lang.id;
              return (
                <button
                  type="button"
                  key={lang.id}
                  onClick={() => updateFormData({ aiLanguage: lang.id })}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'bg-slate-900/90 border-purple-500/80 ring-2 ring-purple-500/60 shadow-xl shadow-purple-950/50'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {isSelected && (
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${lang.accent}`} />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{lang.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400 animate-pop-check" />}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 leading-snug">{lang.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
