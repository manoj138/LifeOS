import React from 'react';

export const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  trendPositive = true,
  glowColor = 'purple',
  className = '',
  action
}) => {
  const glowStyles = {
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      glowBg: "bg-purple-500/10"
    },
    blue: {
      border: "border-blue-500/30 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glowBg: "bg-blue-500/10"
    },
    emerald: {
      border: "border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glowBg: "bg-emerald-500/10"
    },
    amber: {
      border: "border-amber-500/30 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      glowBg: "bg-amber-500/10"
    },
    rose: {
      border: "border-rose-500/30 hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
      badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      glowBg: "bg-rose-500/10"
    }
  };

  const activeGlow = glowStyles[glowColor] || glowStyles.purple;

  return (
    <div className={`relative group rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl p-6 border transition-all duration-300 overflow-hidden shadow-2xl ${activeGlow.border} ${className}`}>
      {/* Background ambient radial glow */}
      <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full ${activeGlow.glowBg} blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`p-3 rounded-2xl border backdrop-blur-md ${activeGlow.badgeBg}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h4>
            {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {value}
        </span>

        {trend && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
            trendPositive
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
