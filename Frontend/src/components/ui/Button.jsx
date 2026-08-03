import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 border border-white/10",
        secondary:
          "bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur-md hover:border-white/20",
        glass:
          "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 backdrop-blur-xl hover:border-purple-500/40 hover:text-white shadow-sm",
        ghost:
          "text-gray-400 hover:text-white hover:bg-white/5",
        outline:
          "border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/60",
        danger:
          "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30",
        glow:
          "relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
      },
      size: {
        xs: "px-2.5 py-1 text-xs gap-1.5",
        sm: "px-3 py-1.5 text-sm gap-2",
        md: "px-4 py-2.5 text-sm gap-2",
        lg: "px-6 py-3 text-base gap-2.5",
        xl: "px-8 py-4 text-lg gap-3",
        icon: "p-2.5 text-sm"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        
        {children}

        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
