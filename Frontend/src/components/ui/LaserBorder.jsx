import React from 'react';
import { cn } from '../../utils/cn';

export const LaserBorder = ({ children, className, containerClassName }) => {
  return (
    <div className={cn("relative p-[1px] overflow-hidden rounded-3xl group", containerClassName)}>
      {/* Animated Conic Laser Gradient Light */}
      <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#a855f7_50%,#ec4899_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Inner Mask Content Container */}
      <div className={cn("relative rounded-3xl bg-[#0c0c11]/90 backdrop-blur-2xl p-6", className)}>
        {children}
      </div>
    </div>
  );
};
