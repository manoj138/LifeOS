import React from 'react';
import { motion } from 'framer-motion';

export const AudioSpectrum = ({ isActive = true, barCount = 20 }) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
      {bars.map((b) => (
        <motion.div
          key={b}
          className="w-1.5 rounded-full bg-gradient-to-t from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          animate={{
            height: isActive
              ? [
                  `${Math.floor(Math.random() * 20 + 10)}%`,
                  `${Math.floor(Math.random() * 80 + 20)}%`,
                  `${Math.floor(Math.random() * 30 + 10)}%`
                ]
              : '15%'
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: b * 0.05
          }}
        />
      ))}
    </div>
  );
};
