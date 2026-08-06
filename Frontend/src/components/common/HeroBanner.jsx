import React from 'react';
import { Badge } from './Badge';

export const HeroBanner = ({
  badgeText,
  badgeVariant = 'neon',
  title,
  subtitle,
  actions,
  rightElement,
  glowColor = 'purple',
  className = ''
}) => {
  const glowStyles = {
    purple: "bg-purple-500/15 border-purple-500/20",
    blue: "bg-blue-500/15 border-blue-500/20",
    emerald: "bg-emerald-500/15 border-emerald-500/20",
    amber: "bg-amber-500/15 border-amber-500/20"
  };

  return (
    <div className={`relative rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 overflow-hidden shadow-2xl mb-8 ${className}`}>
      {/* Ambient background glow flare */}
      <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full ${glowStyles[glowColor] || glowStyles.purple} blur-3xl pointer-events-none`} />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          {badgeText && (
            <Badge variant={badgeVariant} className="mb-1">
              {badgeText}
            </Badge>
          )}

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl font-sans">
              {subtitle}
            </p>
          )}

          {actions && (
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {actions}
            </div>
          )}
        </div>

        {rightElement && (
          <div className="shrink-0 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
