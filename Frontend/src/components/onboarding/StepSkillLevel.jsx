import React from 'react';
import { Sparkles, BarChart2, Clock, Code2, Server, MessageSquare } from 'lucide-react';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const DAILY_HOURS_OPTIONS = [
  { hours: 1, label: '1 Hour / day', detail: 'Casual & Consistent' },
  { hours: 2, label: '2 Hours / day', detail: 'Balanced Growth' },
  { hours: 4, label: '4 Hours / day', detail: 'Intensive Upskilling (Recommended)' },
  { hours: 6, label: '6+ Hours / day', detail: 'Full-time Bootcamp Pace' },
];

export const StepSkillLevel = ({ formData, updateFormData }) => {
  const skillLevels = formData.skillLevels || {
    dsa: 'Intermediate',
    devops: 'Beginner',
    english: 'Intermediate',
  };

  const setSkill = (key, val) => {
    updateFormData({
      skillLevels: { ...skillLevels, [key]: val },
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 3 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Skill Self-Assessment</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Help us calibrate module difficulty so you don't waste time on topics you already know.
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        {/* Skill Rating Cards */}
        <div className="space-y-3">
          {/* DSA */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Data Structures & Algorithms Level</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkill('dsa', lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    skillLevels.dsa === lvl
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>DevOps & Infrastructure Level</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkill('devops', lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    skillLevels.devops === lvl
                      ? 'bg-cyan-600/30 border-cyan-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* English */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>English Speaking & Communication Level</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkill('english', lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    skillLevels.english === lvl
                      ? 'bg-amber-600/30 border-amber-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Time Commitment */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-medium text-gray-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Daily Time Commitment
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DAILY_HOURS_OPTIONS.map((item) => {
              const isSelected = formData.dailyHours === item.hours;
              return (
                <button
                  key={item.hours}
                  type="button"
                  onClick={() => updateFormData({ dailyHours: item.hours })}
                  className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-500 text-white ring-1 ring-purple-500 shadow-md'
                      : 'bg-slate-900/60 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                  }`}
                >
                  <span className="text-sm font-bold text-white">{item.label}</span>
                  <span className="text-xs text-gray-400">{item.detail}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
