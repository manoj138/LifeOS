import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Bot, Code2, Cpu, Dumbbell, Calendar,
  Target, Flame, Server, ShieldCheck, Zap, Star, CheckCircle2, Terminal, MessageSquareCode, Award, Users, BookOpen
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
      title: "MERN & Microservices Roadmap",
      description: "Production-ready full-stack curriculum, live Node.js sandbox, and distributed architecture patterns.",
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      color: "cyan",
      colSpan: "lg:col-span-2"
    },
    {
      title: "1-on-1 AI Voice Mock Arena",
      description: "Real-time speech frequency spectrum, technical evaluation metrics, and teleprompter script studio.",
      icon: <MessageSquareCode className="w-6 h-6 text-purple-400" />,
      color: "purple",
      colSpan: "lg:col-span-1"
    },
    {
      title: "Hostinger VPS & Cloud Labs",
      description: "Nginx reverse proxy, Docker containers, Let's Encrypt SSL, and live terminal streaming logs.",
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      color: "emerald",
      colSpan: "lg:col-span-1"
    },
    {
      title: "LeetCode DSA Practice Studio",
      description: "Algorithmic pattern problem bank with multi-language code editor, AI hints, and testcase console.",
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      color: "amber",
      colSpan: "lg:col-span-2"
    }
  ];

  const metricsStats = [
    { label: "Active Candidates", value: 50000, suffix: "+", icon: Users },
    { label: "Interview Pass Rate", value: 99.8, suffix: "%", icon: Award },
    { label: "DSA & MERN Lessons", value: 150, suffix: "+", icon: BookOpen },
    { label: "AI Voice Mock Drills", value: 24, suffix: "/7", icon: Bot },
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
    <div className="min-h-screen bg-[#070709] text-gray-100 selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden relative">
      {/* Background glowing light meshes */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Top Floating Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#070709]/80 backdrop-blur-2xl border-b border-white/10 px-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0c0c10] rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            LifeOS <span className="text-cyan-400 text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">AI Studio</span>
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
          <Button variant="glow" size="sm" onClick={handleLaunchApp} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Launch Studio
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-16 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <Badge variant="neon" className="mb-6 px-4 py-1.5 text-sm">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Next-Gen Tech Interview & Engineering Learning Platform</span>
        </Badge>

        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl">
          Master Modern Tech Skills & <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Crush AI Interviews</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mt-6 font-normal leading-relaxed">
          Master MERN Stack, solve LeetCode DSA patterns, practice live 1-on-1 AI mock interviews, deploy Hostinger VPS cloud labs, and track your daily engineering progress.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Button
            size="xl"
            variant="glow"
            onClick={handleLaunchApp}
            rightIcon={<ArrowRight className="w-5 h-5" />}
          >
            Get Started Now
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

      {/* Live Metrics Ticker Section */}
      <section id="metrics" className="py-12 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricsStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Apple Keynote Bento Grid Section */}
      <section id="features" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="purple">Unified Career Matrix</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Ambitious Tech Candidates
          </h2>
          <p className="text-gray-400 text-base">
            Everything you need for full-stack engineering, algorithmic mastery, teleprompter speech practice, and cloud infrastructure deployment in one seamless suite.
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
                <span>Explore Studio</span>
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
            <span className="font-bold text-white">LifeOS AI Studio © 2026</span>
            <span>• Tech Interview & Engineering Platform</span>
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
