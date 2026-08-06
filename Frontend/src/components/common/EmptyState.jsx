import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = "No Data Found",
  description = "Get started by adding your first item or asking LifeOS AI for assistance.",
  actionText,
  onAction,
  actionIcon,
  icon,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center rounded-3xl bg-[#0d0d14]/80 border border-white/10 backdrop-blur-2xl my-6 space-y-4 shadow-2xl relative overflow-hidden animate-fadeIn ${className}`}>
      {/* Background ambient glow flare */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-500/20 to-indigo-500/10 border border-white/10 shadow-lg shadow-purple-500/10">
        {icon ? icon : <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />}
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
        {description && <p className="text-xs text-gray-400 leading-relaxed font-sans">{description}</p>}
      </div>

      {actionText && onAction && (
        <div className="pt-2">
          <Button variant="glow" size="sm" onClick={onAction} leftIcon={actionIcon}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
