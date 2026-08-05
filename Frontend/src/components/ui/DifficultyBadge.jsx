import React from 'react';
import { Sparkles, Zap, Award } from 'lucide-react';

export const DifficultyBadge = ({ level = 'Beginner', className = '', showIcon = true }) => {
  const levelLower = (level || 'beginner').toLowerCase();

  const configs = {
    beginner: {
      label: 'Beginner',
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      icon: <Sparkles className="w-3 h-3 text-emerald-400" />
    },
    intermediate: {
      label: 'Intermediate',
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      icon: <Zap className="w-3 h-3 text-amber-300" />
    },
    advanced: {
      label: 'Advanced',
      bg: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
      icon: <Award className="w-3 h-3 text-purple-300" />
    }
  };

  const config = configs[levelLower] || configs.beginner;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.bg} ${className}`}>
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
