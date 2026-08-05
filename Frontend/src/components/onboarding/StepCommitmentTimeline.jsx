import React from 'react';
import { Clock, Calendar, Sparkles, Sun, Moon, Sunrise, Sunset, CheckCircle2 } from 'lucide-react';

const DAILY_HOURS_OPTIONS = [
  { hours: 1, label: '1 Hour / day', detail: 'Casual & Consistent' },
  { hours: 2, label: '2 Hours / day', detail: 'Balanced Growth' },
  { hours: 4, label: '4 Hours / day', detail: 'Intensive Upskilling (Recommended)' },
  { hours: 6, label: '6+ Hours / day', detail: 'Full-time Bootcamp Pace' },
];

const TIME_SLOTS = [
  { id: 'Early Bird (6 AM - 10 AM)', label: 'Early Bird', detail: '6 AM - 10 AM', icon: Sunrise },
  { id: 'Afternoon Focus (12 PM - 4 PM)', label: 'Afternoon Focus', detail: '12 PM - 4 PM', icon: Sun },
  { id: 'Evening Grind (5 PM - 9 PM)', label: 'Evening Grind', detail: '5 PM - 9 PM', icon: Sunset },
  { id: 'Night Owl (8 PM - 12 AM)', label: 'Night Owl', detail: '8 PM - 12 AM', icon: Moon },
];

export const StepCommitmentTimeline = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 9 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Daily Routine & Target Timeline</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Define your study routine and target completion deadline for reverse roadmap planning.
        </p>
      </div>

      <div className="space-y-5 max-w-xl mx-auto">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Daily Learning Commitment
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DAILY_HOURS_OPTIONS.map((item) => {
              const isSelected = (formData.dailyHours || 4) === item.hours;
              return (
                <button
                  key={item.hours}
                  type="button"
                  onClick={() => updateFormData({ dailyHours: item.hours })}
                  className={`p-3.5 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'bg-purple-950/70 border-purple-500 text-white ring-2 ring-purple-500/60 shadow-xl shadow-purple-950/50'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs sm:text-sm font-bold text-white">{item.label}</span>
                    <span className="text-[10px] text-gray-400">{item.detail}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400 animate-pop-check flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <Moon className="w-4 h-4 text-cyan-400" />
            Preferred Study Time Slot
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {TIME_SLOTS.map((slot) => {
              const Icon = slot.icon;
              const isSelected = (formData.preferredTimeSlot || 'Night Owl (8 PM - 12 AM)') === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => updateFormData({ preferredTimeSlot: slot.id })}
                  className={`p-3 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{slot.label}</div>
                      <div className="text-[10px] text-gray-400">{slot.detail}</div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 animate-pop-check flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Target Completion Goal Date</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 font-mono">
              Placement Target
            </span>
          </div>
          <input
            type="date"
            value={formData.targetDate || '2026-12-31'}
            onChange={(e) => updateFormData({ targetDate: e.target.value })}
            className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
