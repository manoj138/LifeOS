import React from 'react';

export const ProgressRing = ({
  progress = 0, // 0 to 100
  size = 120,
  strokeWidth = 10,
  glowColor = 'purple',
  label,
  valueText,
  className = ''
}) => {
  const percent = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const colorGradients = {
    purple: { start: '#a855f7', end: '#6366f1' },
    cyan: { start: '#06b6d4', end: '#3b82f6' },
    emerald: { start: '#10b981', end: '#14b8a6' },
    amber: { start: '#f59e0b', end: '#eab308' },
    rose: { start: '#f43f5e', end: '#e11d48' }
  };

  const activeGradient = colorGradients[glowColor] || colorGradients.purple;
  const gradientId = `ring-grad-${glowColor}-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={activeGradient.start} />
            <stop offset="100%" stopColor={activeGradient.end} />
          </linearGradient>
        </defs>

        {/* Background Circle Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Label / Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-extrabold text-white font-mono tracking-tight">
          {valueText !== undefined ? valueText : `${percent}%`}
        </span>
        {label && (
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
