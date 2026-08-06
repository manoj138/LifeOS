import React from 'react';
import { Calendar, Smile, Sparkles, Trash2 } from 'lucide-react';
import { Badge } from './Badge';

export const JournalCard = ({
  title = "Daily Reflection",
  content,
  mood = "Growth Mindset",
  date,
  sentiment = "Positive",
  onDelete,
  className = ''
}) => {
  return (
    <div className={`rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 p-6 space-y-4 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] ${className}`}>
      {/* Background ambient flare */}
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="xs" icon={Smile}>
              {mood}
            </Badge>

            {sentiment && (
              <Badge variant="emerald" size="xs">
                {sentiment}
              </Badge>
            )}
          </div>

          <h4 className="text-base font-bold text-white tracking-tight leading-snug">
            {title}
          </h4>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            title="Delete entry"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Entry Body */}
      {content && (
        <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap line-clamp-4">
          {content}
        </p>
      )}

      {/* Footer */}
      {date && (
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>{date}</span>
          </div>

          <span className="flex items-center gap-1 text-[11px] text-purple-400 font-semibold">
            <Sparkles className="w-3 h-3" />
            LifeOS AI Journal
          </span>
        </div>
      )}
    </div>
  );
};

export default JournalCard;
