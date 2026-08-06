import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  dot = false,
  pill = true,
  ...props 
}) => {
  const variants = {
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-sm shadow-purple-500/10',
    cyan: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10',
    amber: 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10',
    rose: 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm shadow-rose-500/10',
    emerald: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10',
    blue: 'bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-sm shadow-blue-500/10',
    neon: 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20',
    primary: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
    info: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
    neutral: 'bg-white/10 text-gray-300 border border-white/10',
    brand: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
  };

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[9px]',
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center font-bold tracking-tight uppercase transition-all select-none
        ${pill ? 'rounded-full' : 'rounded-lg'}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      )}
      {children}
    </span>
  );
};

export default Badge;
