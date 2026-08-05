import React from 'react';
import { User, MapPin, Globe, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';

const AI_LANGUAGES = [
  { id: 'English', label: 'English', desc: 'Standard Technical Communication' },
  { id: 'Marathi', label: 'मराठी (Marathi)', desc: 'Regional Tech Guidance & Support' },
  { id: 'Hindi', label: 'हिन्दी (Hindi)', desc: 'Bilingual Mentorship & Explanations' },
];

export const StepPersonalIdentity = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 1 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Personal Identity & Location</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Let's personalize your LifeOS AI assistant with your name, region, and primary communication language.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <Input
          label="Your Full Name"
          placeholder="e.g. Manoj Kumar"
          value={formData.name || ''}
          onChange={(e) => updateFormData({ name: e.target.value })}
          leftIcon={<User className="w-4 h-4 text-purple-400" />}
          required
        />

        <Input
          label="Current City & State"
          placeholder="e.g. Pune, Maharashtra"
          value={formData.cityState || ''}
          onChange={(e) => updateFormData({ cityState: e.target.value })}
          leftIcon={<MapPin className="w-4 h-4 text-amber-400" />}
          required
        />

        <div className="space-y-2 pt-2">
          <label className="block text-xs font-medium text-gray-300 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Preferred Language for AI Guidance
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {AI_LANGUAGES.map((lang) => {
              const isSelected = (formData.aiLanguage || 'English') === lang.id;
              return (
                <button
                  type="button"
                  key={lang.id}
                  onClick={() => updateFormData({ aiLanguage: lang.id })}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-500 text-white ring-1 ring-purple-500 shadow-md'
                      : 'bg-slate-900/60 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{lang.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{lang.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
