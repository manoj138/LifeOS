import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Cpu, Zap, Code2, ShieldCheck } from 'lucide-react';
import { HeroSVG } from './HeroSVG';

export const Interactive3DHero = ({ className = "w-full h-[450px]" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.04);
    setRotateY(x * 0.04);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center cursor-pointer select-none perspective-1000 ${className}`}
    >
      {/* Background Glowing Spatial Nodes */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full flex flex-col items-center justify-center relative"
      >
        {/* Floating Holographic Orbit Ring 1 */}
        <div
          className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-cyan-500/30 animate-spin-slow pointer-events-none"
          style={{ transform: 'translateZ(-40px) rotateX(65deg)' }}
        />

        {/* Floating Holographic Orbit Ring 2 */}
        <div
          className="absolute w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full border border-purple-500/20 animate-spin-slow pointer-events-none"
          style={{ transform: 'translateZ(-80px) rotateY(65deg)', animationDirection: 'reverse', animationDuration: '25s' }}
        />

        {/* Central Vector Core Graphic */}
        <div style={{ transform: 'translateZ(40px)' }} className="w-full max-w-2xl px-4">
          <HeroSVG className="w-full h-auto filter drop-shadow-[0_20px_50px_rgba(6,182,212,0.35)]" />
        </div>

        {/* Floating Feature Badges around 3D Core */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(70px)' }}
          className="absolute top-6 left-6 sm:left-12 px-3.5 py-2 rounded-2xl bg-[#14141b]/90 border border-cyan-500/40 backdrop-blur-xl flex items-center gap-2 shadow-xl text-xs text-cyan-300 font-mono"
        >
          <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>AI Voice Teleprompter Active</span>
        </motion.div>

        <motion.div
          animate={{ y: [6, -6, 6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(80px)' }}
          className="absolute bottom-8 right-6 sm:right-12 px-3.5 py-2 rounded-2xl bg-[#14141b]/90 border border-purple-500/40 backdrop-blur-xl flex items-center gap-2 shadow-xl text-xs text-purple-300 font-mono"
        >
          <Code2 className="w-4 h-4 text-purple-400" />
          <span>LeetCode DSA & MERN Sandbox</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Interactive3DHero;
