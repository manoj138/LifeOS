import React from 'react';
import { LaserBorder } from './LaserBorder';

export const KpiStatCard = ({
  icon,
  title,
  value,
  subtext,
  trend,
  color = 'purple',
  className = ''
}) => {
  const colorGradients = {
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    rose: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400'
  };

  const selectedColor = colorGradients[color] || colorGradients.purple;

  return (
    <LaserBorder className={`p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-black text-white tracking-tight">{value}</h4>
          {subtext && <p className="text-[11px] text-gray-400">{subtext}</p>}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center shrink-0 ${selectedColor}`}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-emerald-400 font-bold">{trend}</span>
        </div>
      )}
    </LaserBorder>
  );
};
