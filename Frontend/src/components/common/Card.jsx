import React from 'react';

export const Card = ({ 
  children, 
  title, 
  subtitle, 
  footer, 
  className = '', 
  headerAction,
  hoverable = false,
  noPadding = false,
  bordered = true,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-[#0d0d14]/80 backdrop-blur-2xl rounded-3xl transition-all duration-300 relative overflow-hidden
        ${bordered ? 'border border-white/10 shadow-2xl' : ''}
        ${hoverable ? 'hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)] hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between gap-4 rounded-t-3xl bg-white/[0.02]">
          <div>
            {title && <h3 className="text-base font-bold text-white tracking-tight leading-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className={`${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 rounded-b-3xl">
          {footer}
        </div>
      )}
    </div>
  );
};

export const GlassCard = ({ 
  children, 
  className = '', 
  glowColor = 'purple', 
  ...props 
}) => {
  const glowStyles = {
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    rose: "hover:border-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]"
  };

  return (
    <div
      className={`
        relative group rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 transition-all duration-300 overflow-hidden
        ${glowStyles[glowColor] || glowStyles.purple}
        ${className}
      `}
      {...props}
    >
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
      {children}
    </div>
  );
};

export default Card;
