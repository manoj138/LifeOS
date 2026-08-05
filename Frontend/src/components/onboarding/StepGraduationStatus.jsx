import React from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const GRADUATION_PERIODS = [
  'Just Graduated (2026 Batch)',
  '6 Months Ago (2025 Batch)',
  '1 Year Ago (2025 Batch)',
  '2+ Years Ago (Experienced)',
];

const SEMESTERS = ['1st - 4th Sem (1st/2nd Year)', '5th - 6th Sem (3rd Year)', '7th - 8th Sem (Final Year)'];

export const StepGraduationStatus = ({ formData, updateFormData }) => {
  const isCompleted = (formData.educationStatus || 'Completed') === 'Completed';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 3 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Graduation Status & Timeline</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Indicate whether you are currently studying or graduated, so AI can customize your interview readiness timeline.
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300">Are you currently studying or completed?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateFormData({ educationStatus: 'Pursuing' })}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                !isCompleted
                  ? 'bg-purple-950/70 border-purple-500 text-white ring-2 ring-purple-500/60 shadow-xl shadow-purple-950/50'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">Currently Pursuing</span>
                {!isCompleted && <CheckCircle2 className="w-4 h-4 text-purple-400 animate-pop-check" />}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Enrolled in college, preparing for campus/off-campus placement.</p>
            </button>

            <button
              type="button"
              onClick={() => updateFormData({ educationStatus: 'Completed' })}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                isCompleted
                  ? 'bg-purple-950/70 border-purple-500 text-white ring-2 ring-purple-500/60 shadow-xl shadow-purple-950/50'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">Graduated / Completed</span>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-purple-400 animate-pop-check" />}
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Degree completed, actively seeking jobs or career switch.</p>
            </button>
          </div>
        </div>

        {isCompleted ? (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              How long ago did you complete your degree?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GRADUATION_PERIODS.map((period) => {
                const isSelected = (formData.graduationPeriod || '6 Months Ago (2025 Batch)') === period;
                return (
                  <button
                    key={period}
                    type="button"
                    onClick={() => updateFormData({ graduationPeriod: period })}
                    className={`p-3.5 rounded-xl border text-xs text-left font-medium transition-all duration-300 flex items-center justify-between hover:scale-[1.02] active:scale-95 ${
                      isSelected
                        ? 'bg-amber-950/50 border-amber-500 text-white ring-1 ring-amber-500 shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{period}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 animate-pop-check" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Current Semester / Academic Year
            </label>
            <div className="space-y-2">
              {SEMESTERS.map((sem) => {
                const isSelected = (formData.currentSemester || '7th - 8th Sem (Final Year)') === sem;
                return (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => updateFormData({ currentSemester: sem })}
                    className={`w-full p-3.5 rounded-xl border text-xs text-left font-medium transition-all duration-300 flex items-center justify-between hover:scale-[1.02] active:scale-95 ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{sem}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 animate-pop-check" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
