import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Code2, MessageSquareCode, Server, Flame, Dumbbell,
  CheckCircle2, ArrowRight, Bot, Play, Calendar, Zap, TrendingUp, UserCheck, Briefcase, RefreshCw, Target
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
import { useUser } from '../context/UserContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, preferences, userProgress, resetOnboarding } = useUser();

  React.useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/app/admin', { replace: true });
    }
  }, [user, navigate]);

  const onboardingDone = preferences?.onboardingCompleted || false;
  const completedTopicsCount = userProgress?.completedTopicIds?.length || 0;
  const solvedDsaCount = userProgress?.solvedDsaIds?.length || 0;

  const targetSpecializationScore = Math.min(100, Math.max(15, Math.round((completedTopicsCount / 15) * 100)));
  const skillReadinessScore = Math.min(100, Math.max(20, Math.round((solvedDsaCount / 10) * 100)));
  const overallReadiness = Math.min(100, Math.round((targetSpecializationScore + skillReadinessScore) / 2));
  const currentStreak = Math.max(1, Math.min(7, completedTopicsCount + solvedDsaCount));

  const stats = [
    { title: "Target Specialization", value: targetSpecializationScore, suffix: "%", icon: Code2, color: "cyan", change: `${completedTopicsCount} Topics Mastered` },
    { title: "Skill Readiness", value: skillReadinessScore, suffix: "%", icon: MessageSquareCode, color: "purple", change: `${solvedDsaCount} DSA Problems Solved` },
    { title: "Daily Target Commitment", value: preferences?.dailyHours || 4, suffix: " hrs/day", icon: Server, color: "emerald", change: `${preferences?.careerLevel || 'Intermediate'}` },
    { title: "Learning & Habit Streak", value: currentStreak, suffix: " Days", icon: Flame, color: "rose", change: `${currentStreak} Active Days` },
  ];

  const [dailyDrillAnswer, setDailyDrillAnswer] = React.useState(null);
  const dailyQuiz = {
    question: "What is the primary difference between `map()` and `forEach()` in JavaScript?",
    options: [
      "`map()` returns a new array, while `forEach()` returns `undefined`.",
      "`forEach()` mutates the original array automatically.",
      "`map()` cannot be used with arrow functions.",
      "`forEach()` is executed asynchronously."
    ],
    correctIndex: 0,
    explanation: "`map()` creates and returns a new transformed array, whereas `forEach()` executes a side-effect callback without producing a return value."
  };
  const displayName = user?.name || user?.email?.split('@')[0] || 'Member';

  return (
    <div className="space-y-8 pb-12">
      {/* Top Section Header */}
      <SectionHeader
        badge="Candidate Academy Studio"
        title={`Good Day, ${displayName} ⚡`}
        subtitle={`${preferences?.targetRole || 'Full-Stack Developer'} • ${preferences?.careerLevel || 'Intermediate'} • Focused on ${preferences?.focusAreas?.slice(0, 3).join(', ') || 'Coding, DevOps & DSA'}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/app/settings')} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
              Edit Onboarding
            </Button>
            <Button variant="primary" onClick={() => navigate('/app/planner')} leftIcon={<Calendar className="w-4 h-4" />}>
              Daily Timeline ({preferences?.dailyHours || 4}h)
            </Button>
          </div>
        }
      />

      {/* Featured AI Continue Active Lesson Hero Card */}
      <LaserBorder className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="cyan">Active Course Track</Badge>
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">React.js & Full-Stack Mastery</span>
              <span className="text-xs text-gray-400 font-mono">Streak: {currentStreak} Days 🔥</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              📖 Continue Where You Left Off: <span className="text-cyan-300">JavaScript & Event Loop Mechanics</span>
            </h2>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Course Progression: <strong>{completedTopicsCount} Topics Mastered</strong></span>
                <span className="text-purple-300 font-bold font-mono">{targetSpecializationScore}% Completed</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${targetSpecializationScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="glow" size="lg" onClick={() => navigate('/app/learning')} leftIcon={<Play className="w-5 h-5 text-emerald-400" />}>
              Resume Practice Track →
            </Button>
          </div>
        </div>
      </LaserBorder>

      {/* Guided Student Action Center & Daily Technical Warmup Drill */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TiltCard className="lg:col-span-2 p-6 space-y-4 border border-cyan-500/30 bg-gradient-to-r from-blue-950/40 via-[#14141b]/80 to-purple-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="cyan">Daily Practice Roadmap</Badge>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>🎯 Recommended Learning & Coding Practice</span>
              </h3>
            </div>
            <Button
              size="sm"
              variant="glow"
              onClick={() => navigate('/app/learning')}
              leftIcon={<Play className="w-4 h-4 text-emerald-400" />}
            >
              Start Today's Lesson
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Step 1: Core Concept</span>
              <p className="font-semibold text-white">Async Execution Mechanics</p>
              <p className="text-gray-400 text-[11px]">Read interactive concept notes & pass mandatory quiz.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Step 2: DSA Challenge</span>
              <p className="font-semibold text-white">Two Sum & Hash Map Lookup</p>
              <p className="text-gray-400 text-[11px]">Solve linked LeetCode problem with live execution.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">Step 3: Interview Q&A</span>
              <p className="font-semibold text-white">Event Loop & Teleprompter</p>
              <p className="text-gray-400 text-[11px]">Practice speaking with live AI Teleprompter studio.</p>
            </div>
          </div>
        </TiltCard>

        {/* Interactive Daily 1-Question Quiz Drill */}
        <TiltCard className="p-6 space-y-3.5 border border-purple-500/30 bg-purple-950/20">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Daily Technical Warmup Drill
            </span>
            <Badge variant="purple">1-Click Drill</Badge>
          </div>

          <p className="text-xs font-semibold text-white leading-relaxed">
            Q: {dailyQuiz.question}
          </p>

          <div className="space-y-1.5">
            {dailyQuiz.options.map((opt, idx) => {
              const isSelected = dailyDrillAnswer === idx;
              const isCorrect = idx === dailyQuiz.correctIndex;
              let style = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";
              if (dailyDrillAnswer !== null) {
                if (isCorrect) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                else if (isSelected) style = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDailyDrillAnswer(idx)}
                  className={`w-full text-left p-2.5 rounded-xl text-[11px] border transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {dailyDrillAnswer !== null && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {dailyDrillAnswer !== null && (
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[11px] text-purple-200 leading-relaxed animate-fadeIn">
              <strong>{dailyDrillAnswer === dailyQuiz.correctIndex ? "Correct! 🎉" : "Explanation:"}</strong> {dailyQuiz.explanation}
            </div>
          )}
        </TiltCard>
      </div>

      {/* 3D Tilt Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((m, idx) => {
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
                  <span className="text-xs text-purple-300">Persona: {preferences?.aiPersona || 'Motivational Tech Mentor'}</span>
                </div>
              </div>
              <Badge variant="neon">Active</Badge>
            </div>

            <AudioSpectrum isActive={true} barCount={28} />

            <div className="flex items-center justify-between pt-2 text-xs text-gray-400">
              <span>Target Role: {preferences?.targetRole || 'Full-Stack Web Developer'}</span>
              <Button size="xs" variant="ghost" onClick={() => navigate('/app/interview')}>
                Open Teleprompter Studio
              </Button>
            </div>
          </TiltCard>

          {/* Live Terminal Stream Monitor */}
          <LiveTerminal title="Production Server Telemetry Stream" />
        </div>

        {/* Right Col: Candidate Profile & Quick Shortcuts */}
        <div className="space-y-6">
          <TiltCard className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Active User Profile</h3>
                <span className="text-xs text-cyan-400">{user?.name || user?.email?.split('@')[0] || 'Active User'}</span>
              </div>
              <Badge variant="emerald">Personalized</Badge>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <p className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>{preferences?.targetRole || 'Full-Stack Web Developer'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Level: {preferences?.careerLevel || 'Intermediate'}</span>
              </p>
            </div>

            <Button size="sm" variant="glow" className="w-full" onClick={() => navigate('/app/settings')}>
              Manage Profile & Preferences
            </Button>
          </TiltCard>


          <TiltCard className="p-6 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-white tracking-tight mb-4">Overall Candidate Readiness</h3>
            <ProgressRing progress={overallReadiness} size={160} strokeWidth={12} showText={true} />
            <p className="text-xs text-gray-400 mt-4 max-w-xs">
              Dynamically evaluated based on completed curriculum topics & DSA problem solves.
            </p>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
