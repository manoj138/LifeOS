import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';
import aiRobotVectorArtSvg from '../assets/graident-ai-robot-vectorart/Ai Robot Vector Art.svg';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glowing light nodes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-5xl bg-[#121218]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Branding Showcase */}
        <div className="p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent border-r border-white/10 relative">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#0c0c10] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              LifeOS <span className="text-gradient font-black text-sm px-2 py-0.5 rounded bg-white/10">AI</span>
            </span>
          </Link>

          <div className="my-6 flex flex-col items-center text-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />
            <img
              src={aiRobotVectorArtSvg}
              alt="LifeOS AI Robot Mentor"
              className="w-full max-w-xs h-auto my-4 drop-shadow-[0_10px_30px_rgba(168,85,247,0.4)] transform hover:scale-105 transition-transform duration-300 relative z-10"
            />
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Elevate Your Career & Life
            </h2>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">
              Your Personal AI Coach for MERN Stack, Interview Prep, DSA, DevOps, Fitness & Habit Mastery.
            </p>
          </div>


          <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-xl w-fit">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Used by 50,000+ engineers & productivity enthusiasts</span>
          </div>
        </div>

        {/* Right Side: Auth Form Workspace */}
        <div className="p-8 lg:p-12 flex items-center justify-center bg-white/[0.01]">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
