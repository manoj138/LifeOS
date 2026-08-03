import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Bot, Code2, Cpu, Dumbbell, Calendar,
  Target, Flame, Server, ShieldCheck, Zap, Star, CheckCircle2, Terminal
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { Badge } from '../components/ui/Badge';
import { HeroSVG } from '../components/illustrations/HeroSVG';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

import { useUser } from '../context/UserContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, onboardingCompleted } = useUser();

  const bentoFeatures = [
    {
      title: "MERN Microservices Architecture",
      description: "Production-ready roadmaps, live Node.js sandbox, and distributed Redis rate-limiting patterns.",
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      color: "cyan",
      colSpan: "lg:col-span-2"
    },
    {
      title: "AI Interview Simulator",
      description: "Real-time voice frequency spectrum & technical evaluation metrics.",
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      color: "purple",
      colSpan: "lg:col-span-1"
    },
    {
      title: "Hostinger VPS & CloudPanel",
      description: "Nginx, Docker containers, Let's Encrypt SSL, and live terminal streaming logs.",
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      color: "emerald",
      colSpan: "lg:col-span-1"
    },
    {
      title: "Notion Calendar Daily Time-Blocking",
      description: "Visual timeline optimizer with AI energy level curve distribution.",
      icon: <Calendar className="w-6 h-6 text-amber-400" />,
      color: "amber",
      colSpan: "lg:col-span-2"
    }
  ];

  const handleLaunchApp = () => {
    if (!user) {
      navigate('/auth');
    } else if (!onboardingCompleted) {
      navigate('/onboarding');
    } else {
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-gray-100 selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden">
      {/* Top Floating Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#070709]/80 backdrop-blur-2xl border-b border-white/10 px-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#0c0c10] rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            LifeOS <span className="text-gradient font-black text-sm px-2 py-0.5 rounded bg-white/10">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#metrics" className="hover:text-white transition-colors">Metrics</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Button variant="primary" size="sm" onClick={handleLaunchApp} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Launch Dashboard
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <Badge variant="neon" className="mb-6 px-4 py-1.5 text-sm">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Gen $100M+ ARR Luxury AI Copilot</span>
        </Badge>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl">
          Your Personal <span className="text-gradient">AI Career & Life Coach</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mt-6 font-normal leading-relaxed">
          Master MERN Stack, conquer DSA, practice AI interviews, manage Hostinger VPS servers, track fitness, and plan your day with Linear-grade precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Button
            size="xl"
            variant="glow"
            onClick={handleLaunchApp}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Launch LifeOS AI Now
          </Button>

          <Button
            size="xl"
            variant="glass"
            onClick={() => navigate('/auth')}
            leftIcon={<Sparkles className="w-5 h-5 text-cyan-400" />}
          >
            Sign Up Free
          </Button>
        </div>


        {/* Hero Hologram Matrix */}
        <div className="mt-12 w-full max-w-4xl">
          <HeroSVG className="w-full h-auto" />
        </div>
      </section>

      {/* Apple Keynote Bento Grid Section */}
      <section id="features" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-3">Integrated Suite</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Senior Tech Leaders
          </h2>
          <p className="text-gray-400 mt-4 text-base">
            No more fragmenting your focus across 10 different apps. LifeOS AI brings your technical career and personal wellness under one unified command center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bentoFeatures.map((feat, idx) => (
            <TiltCard key={idx} className={`${feat.colSpan} p-8 flex flex-col justify-between`}>
              <div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 w-fit mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feat.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-bold">
                <span>Explore Module</span>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 sm:px-12 bg-[#050507]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white">LifeOS AI © 2026</span>
            <span>• Ultra Luxury Personal Coach</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/app/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/auth" className="hover:text-white transition-colors">Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
