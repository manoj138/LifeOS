import React from 'react';
import { motion } from 'framer-motion';

export const HeroSVG = ({ className = "w-full h-auto max-w-lg" }) => {
  return (
    <svg viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="heroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient background glow orb */}
      <circle cx="300" cy="250" r="180" fill="url(#heroGrad1)" opacity="0.15" filter="url(#glow)" />

      {/* Floating Orbital Rings */}
      <motion.circle
        cx="300" cy="250" r="160"
        stroke="url(#heroGrad1)" strokeWidth="1.5" strokeDasharray="8 8"
        fill="none" opacity="0.4"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "300px 250px" }}
      />
      <motion.circle
        cx="300" cy="250" r="110"
        stroke="url(#heroGrad2)" strokeWidth="2"
        fill="none" opacity="0.6"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "300px 250px" }}
      />

      {/* Central Hologram Core Matrix */}
      <rect x="210" y="160" width="180" height="180" rx="32" fill="#14141d" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      <rect x="230" y="180" width="140" height="140" rx="20" fill="url(#heroGrad1)" opacity="0.1" />

      {/* Pulsing Core Node */}
      <motion.circle
        cx="300" cy="250" r="35" fill="url(#heroGrad1)"
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "300px 250px" }}
      />
      <circle cx="300" cy="250" r="18" fill="#ffffff" opacity="0.9" />

      {/* Connecting Network Nodes */}
      {/* Node 1: Top Left */}
      <g>
        <line x1="210" y1="180" x2="130" y2="120" stroke="url(#heroGrad1)" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="90" y="90" width="70" height="50" rx="12" fill="#1e1e28" stroke="#3b82f6" strokeWidth="1.5" />
        <circle cx="110" cy="115" r="5" fill="#06b6d4" />
        <line x1="125" y1="115" x2="145" y2="115" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Node 2: Top Right */}
      <g>
        <line x1="390" y1="180" x2="470" y2="120" stroke="url(#heroGrad2)" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="440" y="90" width="80" height="50" rx="12" fill="#1e1e28" stroke="#a855f7" strokeWidth="1.5" />
        <circle cx="465" cy="115" r="5" fill="#a855f7" />
        <line x1="480" y1="115" x2="505" y2="115" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Node 3: Bottom Left */}
      <g>
        <line x1="210" y1="320" x2="130" y2="380" stroke="url(#heroGrad2)" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="80" y="360" width="85" height="50" rx="12" fill="#1e1e28" stroke="#ec4899" strokeWidth="1.5" />
        <circle cx="105" cy="385" r="5" fill="#ec4899" />
        <line x1="120" y1="385" x2="150" y2="385" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Node 4: Bottom Right */}
      <g>
        <line x1="390" y1="320" x2="470" y2="380" stroke="url(#heroGrad1)" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="440" y="360" width="80" height="50" rx="12" fill="#1e1e28" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="465" cy="385" r="5" fill="#10b981" />
        <line x1="480" y1="385" x2="505" y2="385" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </g>
    </svg>
  );
};
