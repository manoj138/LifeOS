import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, hoverGlow = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-2xl bg-[#14141b]/80 backdrop-blur-xl border border-white/10 p-6 relative overflow-hidden transition-all duration-300",
        hoverGlow && "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const GlassCard = ({ className, children, glowColor = "purple", ...props }) => {
  const glowStyles = {
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    blue: "hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]"
  };

  return (
    <div
      className={cn(
        "relative group rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 transition-all duration-300",
        glowStyles[glowColor] || glowStyles.purple,
        className
      )}
      {...props}
    >
      {/* Background ambient gradient flare on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
      {children}
    </div>
  );
};
