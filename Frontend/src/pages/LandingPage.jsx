import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Bot, Code2, Cpu, Calendar,
  Target, Flame, Server, ShieldCheck, Zap, Star, CheckCircle2,
  Terminal, MessageSquareCode, Award, Users, BookOpen, Volume2,
  Globe, Briefcase, ChevronRight, Layers, Check, Copy, Play, Compass
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { Badge } from '../components/ui/Badge';
import { SplineHero } from '../components/illustrations/SplineHero';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { useUser } from '../context/UserContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { user, onboardingCompleted } = useUser();
  const [activeTab, setActiveTab] = useState(0);

  // All 8 Core System Modules Detailed Showcase Data
  const systemModules = [
    {
      id: 'mern',
      title: '1. MERN Full-Stack Learning Hub',
      subtitle: 'Natural 1..N Sequential Curriculum',
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 via-indigo-500/10 to-transparent',
      badge: 'Interactive Curriculum',
      desc: 'Master JavaScript, React 19, Node.js Express, and MongoDB with dynamic level-based lessons, quizzes, and live coding exercises.',
      features: [
        'Natural 1..N Topic Sequencing without skipped numbers',
        'Interactive Quiz & Practical Code Verification',
        'Real-time Progress Sync with User Context'
      ],
      previewType: 'code',
      codeSnippet: `// Level 1: Express REST API & Mongoose Schema
const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 1 }
});

module.exports = mongoose.model('CurriculumTopic', curriculumSchema);`
    },
    {
      id: 'dsa',
      title: '2. LeetCode DSA Practice Studio',
      subtitle: 'Multi-Language Algorithmic Patterns',
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/20 via-orange-500/10 to-transparent',
      badge: 'Algorithmic Mastery',
      desc: 'Solve top LeetCode patterns (Arrays, Two Pointers, Dynamic Programming) in JavaScript, Python, C++, and Java with instant hints.',
      features: [
        'Category & Difficulty Filters (Easy, Medium, Hard)',
        '1-Click AI Hints & Solution Criteria Reveal',
        'Multi-Language Syntax Highlighting Code Editor'
      ],
      previewType: 'dsa',
      problemTitle: 'Two Sum - Target Array Search',
      difficulty: 'Easy',
      timeLimit: 'O(N) Time Complexity'
    },
    {
      id: 'interview',
      title: '3. 1-on-1 AI Voice Mock Arena',
      subtitle: 'Senior Tech Lead Interviewer',
      icon: <MessageSquareCode className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/20 via-pink-500/10 to-transparent',
      badge: 'Voice Avatar AI',
      desc: 'Practice real-time technical interviews with an AI Senior Tech Lead avatar that speaks out loud and evaluates your answers.',
      features: [
        'Marathi Intent & Marathi Regional Helper Tags',
        'Self-Introduction Teleprompter with Speed Control',
        'Instant AI Clarity & Delivery Scorecard'
      ],
      previewType: 'voice',
      qTitle: 'How does Nginx reverse proxy route client requests to Express?',
      score: '96% Delivery Score'
    },
    {
      id: 'english',
      title: '4. Zero-to-Hero English Studio',
      subtitle: 'Fluency & Pronunciation Growth Ladder',
      icon: <Volume2 className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      badge: 'Spoken Confidence',
      desc: 'Move from zero confidence to executive phrasing with a 4-level beginner growth ladder and live Web Speech API dictation.',
      features: [
        '4-Level Beginner Growth Ladder (Phrases & Tips)',
        'Duolingo-Style Interactive Sentence Builder',
        'Live Audio Spectrum & Words Per Minute (WPM) Monitor'
      ],
      previewType: 'english',
      phrase: 'Let me walk you through the key microservice features.',
      marathiTag: 'मी तुम्हाला मुख्य फीचर्सबद्दल थोडक्यात सांगतो.'
    },
    {
      id: 'devops',
      title: '5. Hostinger VPS & CloudPanel Studio',
      subtitle: 'Production Infrastructure & Terminal',
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      color: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      badge: 'Cloud Infrastructure',
      desc: 'Master Hostinger VPS hPanel setup step-by-step, deploy Node.js SaaS using CloudPanel, Nginx SSL, PM2, and live terminal commands.',
      features: [
        'Hostinger hPanel Click-by-Click Dashboard Guide',
        '6-Step Production Terminal Roadmap (SSH to SSL)',
        'Interactive Terminal Studio & Nginx Reverse Proxy Config'
      ],
      previewType: 'terminal',
      cmd: 'ssh root@185.220.101.42 && npx pm2 start index.js --name "lifeos-backend"'
    },
    {
      id: 'jobs',
      title: '6. Job Application & Freelancing Suite',
      subtitle: 'Hiring Portals & Client Sourcing',
      icon: <Briefcase className="w-5 h-5 text-rose-400" />,
      color: 'from-rose-500/20 via-pink-500/10 to-transparent',
      badge: 'Career Launchpad',
      desc: 'Accelerate your job search with top hiring platforms, 1-click cold email pitches, ATS resume checklist, and Upwork client proposal templates.',
      features: [
        'Top 4 Developer Hiring Portals Overview',
        '1-Click Copy LinkedIn DM & Cold Pitch Template',
        'ATS Resume Optimization & Upwork Proposal Framework'
      ],
      previewType: 'email',
      pitchText: 'Hi [Name], I noticed you are scaling [Company]. As a MERN & Docker Developer...'
    },
    {
      id: 'planner',
      title: '7. Daily Productivity Planner',
      subtitle: 'Energy-Based Task Scheduling',
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-500/20 via-blue-500/10 to-transparent',
      badge: 'Productivity Matrix',
      desc: 'Organize your daily engineering workflow into time-blocked slots with energy levels (High/Medium) and real-time completion tracking.',
      features: [
        'Hourly Time Slot Scheduling & Energy Tagging',
        '1-Click Task Check-off & Progress Persistence',
        'Clean Dark Mode Visual Timeline'
      ],
      previewType: 'planner',
      taskSample: '09:00 AM - 10:30 AM: Deep Work - Solve 2 LeetCode Tree Problems'
    },
    {
      id: 'admin',
      title: '8. Admin AI Studio & Analytics',
      subtitle: '1-Click Sequence AI Generation',
      icon: <Bot className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-600/20 via-indigo-600/10 to-transparent',
      badge: 'Admin Control Center',
      desc: 'Empower administrators to bulk generate curriculum topics via Gemini AI, re-index sequences 1..N, and track candidate readiness metrics.',
      features: [
        'Bulk AI Sequence Generator with Auto-Numbering',
        'Candidate Directory & Placement Readiness Scores',
        '100% MongoDB Cloud Synced Data Management'
      ],
      previewType: 'admin',
      metric1: '98.5% Onboarding Rate',
      metric2: '4.5 Hrs Avg Velocity'
    }
  ];

  const currentModule = systemModules[activeTab] || systemModules[0];

  const metricsStats = [
    { label: "Active Candidates", value: 50000, suffix: "+", icon: Users },
    { label: "Interview Pass Rate", value: 99.8, suffix: "%", icon: Award },
    { label: "Interactive Lessons", value: 150, suffix: "+", icon: BookOpen },
    { label: "MongoDB Cloud Synced", value: 100, suffix: "%", icon: Server },
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
    <div className="min-h-screen bg-[#070709] text-gray-100 selection:bg-purple-500/30 selection:text-purple-200 overflow-hidden relative font-sans">
      {/* Dynamic Glowing Mesh Orbs */}
      <div className="fixed top-0 left-1/4 w-[750px] h-[750px] bg-cyan-500/15 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[750px] h-[750px] bg-purple-600/15 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Top Floating Glass Navigation Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#070709]/80 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-12 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0c0c10] rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
            LifeOS <span className="text-cyan-400 text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono">AI Studio v2.0</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#showcase" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-cyan-400" /> System Features
          </a>
          <a href="#metrics" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
            <Award className="w-4 h-4 text-purple-400" /> Metrics
          </a>
          <a href="#architect" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <Server className="w-4 h-4 text-amber-400" /> Infrastructure
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Button variant="glow" size="sm" onClick={handleLaunchApp} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Launch Studio
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-36 pb-16 px-4 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="neon" className="mb-6 px-4 py-2 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Next-Gen Full-Stack Engineering & AI Interview Platform</span>
          </Badge>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl"
        >
          Master Full-Stack Coding & <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Crush AI Technical Interviews
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-gray-300 max-w-3xl mt-6 font-normal leading-relaxed"
        >
          An all-in-one AI ecosystem featuring MERN 1..N roadmaps, LeetCode DSA patterns, 1-on-1 AI Voice mock interviews, English speech drills, Hostinger VPS cloud labs, and job application tools.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Button
            size="xl"
            variant="glow"
            onClick={handleLaunchApp}
            rightIcon={<ArrowRight className="w-5 h-5 text-emerald-400" />}
          >
            Start Free Practice Now
          </Button>

          <Button
            size="xl"
            variant="glass"
            onClick={() => navigate('/auth')}
            leftIcon={<Bot className="w-5 h-5 text-cyan-400" />}
          >
            Candidate Sign In
          </Button>
        </motion.div>

        {/* Hero Interactive 3D Spline Visual */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 w-full max-w-5xl"
        >
          <SplineHero className="w-full h-[400px] sm:h-[520px]" />
        </motion.div>
      </section>

      {/* Live Metrics Ticker Section */}
      <section id="metrics" className="py-12 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricsStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ALL 8 CORE MODULES INTERACTIVE SHOWCASE */}
      <section id="showcase" className="py-24 px-4 sm:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="purple">Unified Engineering Ecosystem</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore All 8 Core Modules
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Click on any module below to preview how LifeOS transforms full-stack learning, DSA practice, AI voice interviews, and cloud deployment.
          </p>
        </div>

        {/* 8-Tab Stepper Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {systemModules.map((mod, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`p-3 rounded-2xl text-left transition-all border flex flex-col justify-between gap-2 ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-600/30 via-indigo-600/30 to-blue-600/30 border-purple-500 text-white font-bold shadow-xl shadow-purple-500/20 scale-[1.03]'
                    : 'bg-[#12121a] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="p-1.5 rounded-lg bg-white/10">{mod.icon}</div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400">{idx + 1}/8</span>
                </div>
                <span className="text-xs font-semibold line-clamp-1">{mod.title.split('.')[1] || mod.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Full Animated Interactive Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <LaserBorder className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Info Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                      {currentModule.icon}
                    </div>
                    <div>
                      <Badge variant="cyan">{currentModule.badge}</Badge>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                        {currentModule.title}
                      </h3>
                      <span className="text-xs text-purple-300 font-mono">{currentModule.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {currentModule.desc}
                  </p>

                  <div className="space-y-3 pt-2">
                    {currentModule.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Button variant="glow" onClick={handleLaunchApp} rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Open {currentModule.title.split('.')[1]} Studio
                    </Button>
                  </div>
                </div>

                {/* Right Interactive Visual Preview Column */}
                <div className="lg:col-span-6">
                  <TiltCard className="p-6 space-y-4 border border-purple-500/30 bg-[#0a0a0f] shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-purple-400" /> Interactive Studio Preview
                      </span>
                      <Badge variant="purple">Live Demo Mode</Badge>
                    </div>

                    {/* Preview Type 1: Code */}
                    {currentModule.previewType === 'code' && (
                      <div className="p-4 rounded-xl bg-[#07070a] border border-white/10 font-mono text-xs text-cyan-300 space-y-2 leading-relaxed overflow-x-auto">
                        <pre><code>{currentModule.codeSnippet}</code></pre>
                      </div>
                    )}

                    {/* Preview Type 2: DSA */}
                    {currentModule.previewType === 'dsa' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                          <span className="font-bold text-amber-300">{currentModule.problemTitle}</span>
                          <Badge variant="cyan">{currentModule.difficulty}</Badge>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">⚡ Constraint: {currentModule.timeLimit}</p>
                        <div className="p-3 rounded-xl bg-[#07070a] border border-white/10 font-mono text-xs text-purple-300">
                          <code>function twoSum(nums, target) &#123; return [0, 1]; &#125;</code>
                        </div>
                      </div>
                    )}

                    {/* Preview Type 3: Voice Interview */}
                    {currentModule.previewType === 'voice' && (
                      <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 leading-relaxed italic">
                          "{currentModule.qTitle}"
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-bold">
                          <span>AI Senior Lead Evaluation:</span>
                          <span>{currentModule.score}</span>
                        </div>
                      </div>
                    )}

                    {/* Preview Type 4: English */}
                    {currentModule.previewType === 'english' && (
                      <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
                          <strong>English Phrase:</strong> "{currentModule.phrase}"
                        </div>
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 font-sans">
                          <strong>Regional Helper Tag:</strong> {currentModule.marathiTag}
                        </div>
                      </div>
                    )}

                    {/* Preview Type 5: Terminal */}
                    {currentModule.previewType === 'terminal' && (
                      <div className="p-4 rounded-xl bg-[#050508] border border-white/15 font-mono text-xs text-purple-300 space-y-2">
                        <span className="text-[10px] text-gray-500 uppercase block">$ bash terminal command</span>
                        <code className="break-all">{currentModule.cmd}</code>
                      </div>
                    )}

                    {/* Preview Type 6: Email */}
                    {currentModule.previewType === 'email' && (
                      <div className="p-4 rounded-xl bg-[#09090d] border border-white/15 font-mono text-xs text-purple-200 space-y-2">
                        <span className="text-[10px] text-rose-400 font-bold uppercase block">1-Click Cold Email Pitch</span>
                        <p className="leading-relaxed">{currentModule.pitchText}</p>
                      </div>
                    )}

                    {/* Preview Type 7: Planner */}
                    {currentModule.previewType === 'planner' && (
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200 font-mono">
                        <span>📅 Scheduled Task:</span>
                        <p className="font-bold text-white mt-1">{currentModule.taskSample}</p>
                      </div>
                    )}

                    {/* Preview Type 8: Admin */}
                    {currentModule.previewType === 'admin' && (
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                          <span className="text-[10px] text-gray-400 block">Onboarding Rate</span>
                          <span className="text-sm font-bold text-cyan-300">{currentModule.metric1}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs">
                          <span className="text-[10px] text-gray-400 block">Daily Velocity</span>
                          <span className="text-sm font-bold text-purple-300">{currentModule.metric2}</span>
                        </div>
                      </div>
                    )}
                  </TiltCard>
                </div>
              </div>
            </LaserBorder>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer Call-to-Action */}
      <section className="py-16 px-4 sm:px-12 max-w-7xl mx-auto text-center">
        <LaserBorder className="p-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Elevate Your Tech Career?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join thousands of candidates mastering MERN stack coding, solving algorithm patterns, and cracking tech interviews daily.
          </p>
          <div className="pt-2">
            <Button size="xl" variant="glow" onClick={handleLaunchApp} rightIcon={<ArrowRight className="w-5 h-5 text-emerald-400" />}>
              Launch LifeOS AI Studio
            </Button>
          </div>
        </LaserBorder>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-white/10 py-12 px-6 sm:px-12 bg-[#050507]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white">LifeOS AI Studio © 2026</span>
            <span>• Full-Stack & AI Interview Platform</span>
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
