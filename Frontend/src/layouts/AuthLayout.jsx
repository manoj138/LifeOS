import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Bot, Sparkles } from 'lucide-react';
import aiRobotVectorArtSvg from '../assets/graident-ai-robot-vectorart/Ai Robot Vector Art.svg';
import { SplineHero } from '../components/illustrations/SplineHero';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#070709] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden">
      {/* Ambient background glowing light nodes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-5xl bg-[#14141b]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Branding Showcase */}
        <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent border-b lg:border-b-0 lg:border-r border-white/10 relative">
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

          <div className="my-4 flex flex-col items-center text-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />
            <SplineHero className="w-full h-[200px] sm:h-[240px] my-2 relative z-10" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Elevate Your Career & Life
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-sm">
              Your Personal AI Coach for MERN Stack, Interview Prep, DSA, DevOps & Full-Stack Mastery.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-xl w-fit mx-auto lg:mx-0">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Used by 50,000+ engineers & productivity enthusiasts</span>
          </div>
        </div>

        {/* Right Side: Auth Form Workspace */}
        <div className="p-5 sm:p-8 lg:p-12 flex items-center justify-center bg-white/[0.01]">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
