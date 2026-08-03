import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import error404Svg from '../assets/graident-ai-robot-vectorart/Error 404.svg';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070709] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background glow lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />

      {/* 404 Vector Artwork */}
      <div className="relative my-4">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <img
          src={error404Svg}
          alt="LifeOS Page Not Found"
          className="w-full max-w-sm sm:max-w-md h-auto drop-shadow-[0_15px_40px_rgba(168,85,247,0.4)] transform hover:scale-105 transition-transform duration-300 relative z-10"
        />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-4">
        Page Not Found in LifeOS Universe
      </h2>
      <p className="text-sm text-gray-400 max-w-md mt-2 mb-8">
        The requested feature route does not exist or has been relocated by your LifeOS AI Assistant.
      </p>

      <div className="flex items-center gap-4">
        <Button variant="glow" size="lg" onClick={() => navigate('/app/dashboard')} leftIcon={<Home className="w-5 h-5" />}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

