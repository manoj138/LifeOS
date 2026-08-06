import React from 'react';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';

export const SectionHeader = ({
  badge,
  badgeVariant = 'neon',
  title,
  subtitle,
  actions,
  className
}) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8 animate-fadeIn", className)}>
      <div className="space-y-1.5">
        {badge && (
          <Badge variant={badgeVariant} className="mb-2">
            {badge}
          </Badge>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-400 max-w-3xl leading-relaxed font-sans">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
