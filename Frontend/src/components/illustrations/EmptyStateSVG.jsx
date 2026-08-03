import React from 'react';
import { motion } from 'framer-motion';

export const EmptyStateSVG = ({ className = "w-48 h-48" }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="80" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeDasharray="6 6" />
      <motion.rect
        x="60" y="60" width="80" height="80" rx="20"
        fill="#181824" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="100" cy="90" r="16" fill="rgba(168, 85, 247, 0.2)" />
      <path d="M92 90H108" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 82V98" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="75" y="118" width="50" height="6" rx="3" fill="rgba(255, 255, 255, 0.2)" />
    </svg>
  );
};

export const AISVG = ({ className = "w-12 h-12" }) => {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#aiGrad)" opacity="0.2" />
      <motion.path
        d="M50 20L60 40L80 50L60 60L50 80L40 60L20 50L40 40Z"
        fill="url(#aiGrad)"
        animate={{ rotate: 180, scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 50px" }}
      />
    </svg>
  );
};
