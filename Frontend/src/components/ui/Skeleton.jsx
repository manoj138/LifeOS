import React from 'react';
import { cn } from '../../utils/cn';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-white/[0.06] backdrop-blur-md relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
        className
      )}
      {...props}
    />
  );
};
