import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-colors",
  {
    variants: {
      variant: {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
        cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
        emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
        rose: "bg-rose-500/10 text-rose-300 border-rose-500/30",
        glass: "bg-white/10 text-gray-200 border-white/15 backdrop-blur-md",
        neon: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
      }
    },
    defaultVariants: {
      variant: "purple"
    }
  }
);

export const Badge = ({ className, variant, dot = false, children, ...props }) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
};
