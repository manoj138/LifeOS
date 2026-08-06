import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Badge } from './Badge';

export const TimelineStep = ({
  stepNumber,
  title,
  description,
  status = 'active', // 'completed' | 'active' | 'upcoming'
  codeSnippet,
  actionText,
  onAction,
  isLast = false,
  className = ''
}) => {
  const statusStyles = {
    completed: {
      border: "border-emerald-500/40 bg-emerald-950/20",
      badge: "emerald",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    },
    active: {
      border: "border-purple-500/40 bg-purple-950/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badge: "purple",
      icon: <Circle className="w-5 h-5 text-purple-400 animate-pulse fill-purple-400/20" />
    },
    upcoming: {
      border: "border-white/10 bg-slate-950/40 opacity-70",
      badge: "neutral",
      icon: <Circle className="w-5 h-5 text-gray-500" />
    }
  };

  const activeStatus = statusStyles[status] || statusStyles.active;

  return (
    <div className={`relative flex items-start gap-4 ${className}`}>
      {/* Left Timeline Line & Step Icon */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div className="z-10">
          {activeStatus.icon}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-white/10 my-2 min-h-[60px]" />
        )}
      </div>

      {/* Step Content Card */}
      <div className={`flex-1 rounded-3xl backdrop-blur-2xl p-6 border space-y-3 transition-all duration-300 shadow-2xl ${activeStatus.border}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {stepNumber && (
              <Badge variant={activeStatus.badge} size="xs">
                Step {stepNumber}
              </Badge>
            )}
            <h4 className="text-base font-bold text-white tracking-tight">
              {title}
            </h4>
          </div>

          <Badge variant={status === 'completed' ? 'emerald' : status === 'active' ? 'purple' : 'neutral'} size="xs">
            {status}
          </Badge>
        </div>

        {description && (
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            {description}
          </p>
        )}

        {codeSnippet && (
          <pre className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 text-xs font-mono text-purple-300 overflow-x-auto select-all">
            <code>{codeSnippet}</code>
          </pre>
        )}

        {actionText && onAction && (
          <div className="pt-1">
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineStep;
