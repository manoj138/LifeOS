import React from 'react';
import { Target, Calendar, CheckCircle2, Flame } from 'lucide-react';
import { Badge } from './Badge';

export const GoalProgressCard = ({
  title,
  category = "Career",
  progress = 0, // 0 to 100
  targetDate,
  streak,
  onIncrement,
  onComplete,
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, progress));

  return (
    <div className={`rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 p-6 space-y-4 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-purple-500/30 ${className}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <Badge variant="purple" size="xs">
            {category}
          </Badge>
          <h4 className="text-base font-bold text-white tracking-tight leading-snug">
            {title}
          </h4>
        </div>

        {streak !== undefined && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shrink-0">
            <Flame className="w-3.5 h-3.5" />
            <span>{streak}d</span>
          </div>
        )}
      </div>

      {/* Progress Bar & Percentage */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 font-medium">Completion</span>
          <span className="font-bold text-purple-400 font-mono">{percent}%</span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500 shadow-md shadow-purple-500/30"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
        {targetDate ? (
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Target: {targetDate}</span>
          </div>
        ) : <div />}

        <div className="flex items-center gap-2">
          {onIncrement && percent < 100 && (
            <button
              type="button"
              onClick={onIncrement}
              className="px-3 py-1 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all"
            >
              + Progress
            </button>
          )}

          {onComplete && (
            <button
              type="button"
              onClick={onComplete}
              className={`p-1.5 rounded-xl border transition-all ${
                percent >= 100
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-white/5 text-gray-400 hover:text-white border-white/10'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalProgressCard;
