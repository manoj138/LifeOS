import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, Cpu, Zap, Code2, ShieldCheck, Terminal, CheckCircle2, Flame, Play, Volume2, Award, Layers } from 'lucide-react';

export const Interactive3DHero = ({ className = "w-full h-[480px]" }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.03);
    setRotateY(x * 0.03);
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
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-[110px] pointer-events-none animate-pulse-glow" />
      <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-[110px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full flex flex-col items-center justify-center relative"
      >
        {/* Central Real Developer Code Editor & AI Studio Window */}
        <div 
          style={{ transform: 'translateZ(30px)' }} 
          className="w-full max-w-3xl p-5 sm:p-6 rounded-3xl bg-[#0b0c13]/90 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-left space-y-4 relative overflow-hidden"
        >
          {/* Custom Web Development SVG Watermark */}
          <img 
            src="/Web Development.svg" 
            alt="Web Dev Illustration" 
            className="absolute -right-12 -bottom-12 w-52 h-52 opacity-15 pointer-events-none object-contain" 
          />

          {/* Top IDE Window Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-gray-400 ml-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> server.js — LifeOS MERN & AI Studio
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              <span>All 12 Tests Passed</span>
            </div>
          </div>

          {/* Syntax Highlighted Real MERN Code Snippet */}
          <div className="p-4 rounded-2xl bg-[#06060a] border border-white/10 font-mono text-xs text-gray-200 leading-relaxed space-y-1 shadow-inner overflow-x-auto">
            <div className="text-purple-400">
              <span className="text-pink-400">const</span> express = require(<span className="text-emerald-300">'express'</span>);
            </div>
            <div className="text-purple-400">
              <span className="text-pink-400">const</span> connectDB = require(<span className="text-emerald-300">'./config/db'</span>);
            </div>
            <div className="text-gray-500 pt-1">// Initialize MongoDB Atlas & Express Backend Router</div>
            <div className="text-cyan-300">
              <span className="text-pink-400">const</span> app = express();
            </div>
            <div className="text-cyan-300">
              app.use(<span className="text-emerald-300">'/api/curriculum'</span>, curriculumRoutes);
            </div>
            <div className="text-emerald-400 font-bold pt-1">
              await connectDB(); <span className="text-gray-400 font-normal">// ✅ MongoDB Atlas Cloud Synced (cluster0)</span>
            </div>
          </div>

          {/* Bottom Live Studio Status Bar */}
          <div className="grid grid-cols-3 gap-3 pt-1 text-center">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5">
              <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">Current Active Topic</span>
              <span className="text-xs text-white font-extrabold truncate block">1. Express REST API & Middleware</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5">
              <span className="text-[10px] text-purple-400 font-mono font-bold uppercase block">AI Tech Lead Tutor</span>
              <span className="text-xs text-emerald-400 font-extrabold truncate block">● Live Voice Evaluator</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5">
              <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">DSA Pattern Status</span>
              <span className="text-xs text-white font-extrabold truncate block">Arrays & Two Pointers</span>
            </div>
          </div>
        </div>

        {/* Floating Ghostsmart AI Voice Avatar Badge */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(75px)' }}
          className="absolute -top-4 left-4 sm:left-8 px-4 py-2.5 rounded-2xl bg-[#14141d]/95 border border-purple-500/40 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-purple-500/20 text-xs text-purple-200"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 p-1 flex items-center justify-center">
            <img src="/Ghostsmart.svg" alt="Ghostsmart AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-white block">AI Voice Mock Arena Active</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">98% Clarity & Delivery Score</span>
          </div>
        </motion.div>

        {/* Floating Daily Coding Streak Badge */}
        <motion.div
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(85px)' }}
          className="absolute -bottom-4 right-4 sm:right-8 px-4 py-2.5 rounded-2xl bg-[#14141d]/95 border border-cyan-500/40 backdrop-blur-xl flex items-center gap-3 shadow-2xl shadow-cyan-500/20 text-xs text-cyan-200"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 p-1 flex items-center justify-center">
            <img src="/Algorithm.svg" alt="Algorithm" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-bold text-white block">🔥 14-Day Learning Streak</span>
            <span className="text-[10px] text-cyan-300 font-mono font-bold">LeetCode Solved: 45 / 50</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Interactive3DHero;
