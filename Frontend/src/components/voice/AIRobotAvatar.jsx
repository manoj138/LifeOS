import React from 'react';
import { motion } from 'framer-motion';
import { useVoiceGuider } from '../../context/VoiceGuiderContext';
import robotImg from '../../assets/graident-ai-robot-vectorart/Graident Ai Robot.jpg';

export const AIRobotAvatar = ({ size = 'md', className = '' }) => {
  const { isListening, isSpeaking } = useVoiceGuider();

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const glowClasses = isSpeaking
    ? 'shadow-[0_0_30px_rgba(168,85,247,0.8)] border-purple-400'
    : isListening
    ? 'shadow-[0_0_30px_rgba(16,185,129,0.8)] border-emerald-400'
    : 'shadow-[0_0_20px_rgba(56,189,248,0.4)] border-cyan-500/40';

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ripple Rings when Listening */}
      {isListening && (
        <>
          <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          <div className="absolute -inset-0.5 rounded-full border border-emerald-400/40 animate-pulse pointer-events-none" />
        </>
      )}

      {/* Pulsing Soundwave Halo when Speaking */}
      {isSpeaking && (
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600/40 via-cyan-500/40 to-indigo-500/30 blur-sm animate-pulse-glow pointer-events-none" />
      )}

      {/* 3D Floating Robot Wrapper with Framer Motion Physics */}
      <motion.div
        animate={{
          y: isSpeaking ? [-3, 3, -3] : isListening ? [-5, 5, -5] : [-8, 8, -8],
          rotate: isListening ? [0, 3, -3, 0] : [0, 1.5, -1.5, 0],
          scale: isSpeaking ? [1, 1.05, 1] : 1
        }}
        transition={{
          y: { duration: isSpeaking ? 1.2 : 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
        }}
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-2 ${glowClasses} transition-all duration-300 bg-[#0a0a12] p-0.5`}
      >
        <img
          src={robotImg}
          alt="LifeOS AI Robot"
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>
    </div>
  );
};
