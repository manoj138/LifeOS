import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      label,
      error,
      leftIcon,
      rightIcon,
      hint,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium uppercase tracking-wider text-gray-400">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-gray-400 pointer-events-none transition-colors group-focus-within:text-purple-400">
              {leftIcon}
            </div>
          )}

          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full bg-white/[0.04] text-gray-100 placeholder:text-gray-500 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none transition-all duration-200 focus:bg-white/[0.07] focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

        {hint && !error && (
          <p className="text-xs text-gray-500 mt-1">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
