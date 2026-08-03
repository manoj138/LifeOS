import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Code2, MessageSquareCode, Server, Flame, Dumbbell,
  CheckCircle2, ArrowRight, Bot, Play, Calendar, Zap, TrendingUp, Terminal
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { LiveTerminal } from '../components/ui/LiveTerminal';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

export const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    { title: "MERN Stack Mastery", value: 88, suffix: "%", icon: Code2, color: "cyan", change: "+14% this week" },
    { title: "Interview Readiness", value: 95, suffix: "%", icon: MessageSquareCode, color: "purple", change: "Senior Staff Ready" },
    { title: "Hostinger VPS Uptime", value: 99, suffix: ".9%", icon: Server, color: "emerald", change: "CloudPanel Active" },
    { title: "Habit Streak", value: 30, suffix: " Days", icon: Flame, color: "rose", change: "🔥 Personal Record" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Section Header */}
      <SectionHeader
        badge="Neural Command Center"
        title="Good Morning, Manoj ⚡"
        subtitle="Your AI Personal Coach has synthesized your daily optimization plan for MERN Architecture, System Design & Fitness."
        actions={
          <Button variant="primary" onClick={() => navigate('/app/planner')} leftIcon={<Calendar className="w-4 h-4" />}>
            Open Daily Timeline
          </Button>
        }
      />

      {/* Laser Border Featured AI Morning Briefing */}
      <LaserBorder className="p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Neural Briefing</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
              "Focus on System Design Rate Limiter practice today. MERN Microservices are at 88%."
            </h2>
            <p className="text-sm text-gray-300">
              AI Recommendation: Complete 45 mins of Rate Limiter system design, then deploy Docker containers to Hostinger VPS.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="glow" size="lg" onClick={() => navigate('/app/interview')} leftIcon={<Bot className="w-5 h-5" />}>
              Start AI Voice Session
            </Button>
          </div>
        </div>
      </LaserBorder>

      {/* 3D Tilt Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <TiltCard key={idx} glowColor={m.color}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{m.title}</span>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="text-3xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </div>

              <div className="mt-3 text-xs text-cyan-300 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{m.change}</span>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Apple Bento Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Voice Coach & Focus Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Audio Waveform Coach Card */}
          <TiltCard className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Live AI Audio Coach</h3>
                  <span className="text-xs text-gray-400">Real-time voice feedback active</span>
                </div>
              </div>
              <Badge variant="neon">Ready</Badge>
            </div>

            <AudioSpectrum isActive={true} barCount={28} />

            <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
              <span>Topic: Executive Tech Vocabulary & System Design</span>
              <Button size="xs" variant="ghost" onClick={() => navigate('/app/interview')}>
                Open Full Studio
              </Button>
            </div>
          </TiltCard>

          {/* Live Terminal Stream Monitor */}
          <LiveTerminal title="Hostinger VPS Server Stream (185.220.101.42)" />
        </div>

        {/* Right Col: Readiness Gauge & Quick Shortcuts */}
        <div className="space-y-6">
          <TiltCard className="p-6 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-white tracking-tight mb-4">Overall Career Readiness</h3>
            <ProgressRing progress={92} size={160} strokeWidth={12} showText={true} />
            <p className="text-xs text-gray-400 mt-4 max-w-xs">
              Top 2% Candidate Profile for Senior Staff Frontend & Fullstack Architect roles.
            </p>
            <Button size="sm" variant="glass" className="mt-6 w-full" onClick={() => navigate('/app/analytics')}>
              View Growth Velocity
            </Button>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
