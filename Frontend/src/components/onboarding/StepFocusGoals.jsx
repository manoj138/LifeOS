import React from 'react';
import { Target, Calendar, CheckCircle2, Sparkles, Code, Terminal, MessageSquare, Dumbbell, Clock } from 'lucide-react';

const FOCUS_AREAS = [
  {
    id: 'Coding & DSA',
    name: 'Coding & DSA Practice',
    desc: 'Master Data Structures, Algorithms & LeetCode problems.',
    icon: Code,
    color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  },
  {
    id: 'DevOps & Cloud',
    name: 'DevOps & Cloud Systems',
    desc: 'Docker, CI/CD, Kubernetes & Production deployments.',
    icon: Terminal,
    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  },
  {
    id: 'English Fluency',
    name: 'English Fluency & Voice',
    desc: 'Mock interviews, speaking practice & communication exercises.',
    icon: MessageSquare,
    color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    id: 'System Design & Projects',
    name: 'System Design & Portfolio',
    desc: 'Architecture patterns, database optimization & portfolio apps.',
    icon: Clock,
    color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
];

export const StepFocusGoals = ({ formData, updateFormData }) => {
  const selectedAreas = formData.focusAreas || [];

  const toggleFocusArea = (areaId) => {
    let updated;
    if (selectedAreas.includes(areaId)) {
      updated = selectedAreas.filter((item) => item !== areaId);
    } else {
      updated = [...selectedAreas, areaId];
    }
    updateFormData({ focusAreas: updated });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 2 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Focus Areas & Target Timeline</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Choose what you want to focus on right now. You can select multiple areas.
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FOCUS_AREAS.map((area) => {
            const Icon = area.icon;
            const isChecked = selectedAreas.includes(area.id);
            return (
              <div
                key={area.id}
                onClick={() => toggleFocusArea(area.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                  isChecked
                    ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-950/40 ring-1 ring-purple-500'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${area.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-purple-500 border-purple-400 text-white'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{area.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{area.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Target Completion Goal Date</span>
            </div>
            <span className="text-xs text-purple-400 font-mono">Deadline Target</span>
          </div>
          <input
            type="date"
            value={formData.targetDate || '2026-12-31'}
            onChange={(e) => updateFormData({ targetDate: e.target.value })}
            className="w-full bg-slate-800/80 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
          />
          <p className="text-xs text-gray-400">
            LifeOS AI will create a reverse roadmap counting down to your target date.
          </p>
        </div>
      </div>
    </div>
  );
};
