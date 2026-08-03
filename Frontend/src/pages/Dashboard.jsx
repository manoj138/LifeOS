import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Code2, MessageSquareCode, Server, Flame, Dumbbell,
  CheckCircle2, ArrowRight, Bot, Play, Calendar, Zap, TrendingUp, UserCheck, Briefcase
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
    { title: "Interview Readiness", value: 95, suffix: "%", icon: MessageSquareCode, color: "purple", change: "Junior Intern @ CloudRegex" },
    { title: "Hostinger VPS Uptime", value: 99, suffix: ".9%", icon: Server, color: "emerald", change: "CloudPanel Active" },
    { title: "Habit Streak", value: 30, suffix: " Days", icon: Flame, color: "rose", change: "🔥 Personal Record" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Section Header */}
      <SectionHeader
        badge="Neural Command Center"
        title="Good Morning, Manoj Mansing Chougule ⚡"
        subtitle="Junior Software Developer Intern @ CloudRegex Infotech • MERN Stack & System Design Optimization."
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
              <span>AI Candidate Profile Ready</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-snug">
              "Self Introduction Script & Teleprompter ready for CloudRegex & Senior MERN Interviews."
            </h2>
            <p className="text-sm text-gray-300">
              Featuring E-Commerce Platform (User/Seller/Admin) and RoyalESeva Document Hub (Vendor Module) project highlights.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="glow" size="lg" onClick={() => navigate('/app/interview')} leftIcon={<UserCheck className="w-5 h-5" />}>
              Practice Self Intro
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
                  <span className="text-xs text-gray-400">Practicing Manoj's Self Intro Teleprompter</span>
                </div>
              </div>
              <Badge variant="neon">Ready</Badge>
            </div>

            <AudioSpectrum isActive={true} barCount={28} />

            <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
              <span>Script: Manoj Mansing Chougule • B.Tech CSE @ D.Y. Patil Univ</span>
              <Button size="xs" variant="ghost" onClick={() => navigate('/app/interview')}>
                Open Teleprompter Studio
              </Button>
            </div>
          </TiltCard>

          {/* Live Terminal Stream Monitor */}
          <LiveTerminal title="Hostinger VPS Server Stream (185.220.101.42)" />
        </div>

        {/* Right Col: Candidate Profile & Quick Shortcuts */}
        <div className="space-y-6">
          <TiltCard className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Candidate Profile</h3>
                <span className="text-xs text-cyan-400">Manoj Mansing Chougule</span>
              </div>
              <Badge variant="emerald">Intern</Badge>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>CloudRegex Infotech</span>
              </p>
              <p className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>MERN • E-Commerce & RoyalESeva</span>
              </p>
            </div>

            <Button size="sm" variant="glow" className="w-full" onClick={() => navigate('/app/interview')}>
              Launch Teleprompter Studio
            </Button>
          </TiltCard>

          <TiltCard className="p-6 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-white tracking-tight mb-4">Overall Candidate Readiness</h3>
            <ProgressRing progress={95} size={160} strokeWidth={12} showText={true} />
            <p className="text-xs text-gray-400 mt-4 max-w-xs">
              Interview pitch verified with major project highlights.
            </p>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
