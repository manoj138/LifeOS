import React from 'react';
import { Target, Code2, Server, Layout, Database, Clock, BarChart3, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';

export const OnboardingAnalyticsChart = () => {
  const roleDistribution = [
    { role: 'Full-Stack Web Developer', percentage: 45, count: 578, color: 'bg-purple-500', icon: Code2 },
    { role: 'DevOps & Cloud Engineer', percentage: 25, count: 321, color: 'bg-cyan-500', icon: Server },
    { role: 'Frontend Architect', percentage: 18, count: 231, color: 'bg-emerald-500', icon: Layout },
    { role: 'Backend & Data Engineer', percentage: 12, count: 154, color: 'bg-amber-500', icon: Database },
  ];

  const skillLevelBreakdown = [
    { level: 'Beginner', count: '256 Candidates (20%)', color: 'from-blue-500 to-indigo-600', width: 'w-1/5' },
    { level: 'Intermediate', count: '745 Candidates (58%)', color: 'from-purple-500 to-pink-600', width: 'w-7/12' },
    { level: 'Advanced', count: '283 Candidates (22%)', color: 'from-emerald-500 to-teal-600', width: 'w-1/4' },
  ];

  const dailyCommitment = [
    { hours: '1 Hour / day', percentage: 15, label: 'Casual' },
    { hours: '2 Hours / day', percentage: 25, label: 'Steady' },
    { hours: '4 Hours / day', percentage: 45, label: 'Intensive (Popular)' },
    { hours: '6+ Hours / day', percentage: 15, label: 'Bootcamp Pace' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Target Role Breakdown */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Target Role Distribution</h3>
          </div>
          <span className="text-xs text-gray-400">1,284 Total</span>
        </div>

        <div className="space-y-3.5 pt-2">
          {roleDistribution.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.role} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-gray-300 font-medium">
                    <Icon className="w-3.5 h-3.5 text-purple-400" />
                    {item.role}
                  </span>
                  <span className="text-purple-300 font-bold">{item.percentage}% ({item.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Skill Level Self Assessment Ratios */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Skill Level Breakdown</h3>
          </div>
          <span className="text-xs text-cyan-400">DSA & DevOps</span>
        </div>

        <div className="space-y-4 pt-2">
          {skillLevelBreakdown.map((item) => (
            <div key={item.level} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{item.level}</span>
                <span className="text-gray-400">{item.count}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${item.color} rounded-full ${item.width}`} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Daily Study Hours Distribution */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Daily Commitment Pace</h3>
          </div>
          <span className="text-xs text-amber-400">Avg 4.2h</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {dailyCommitment.map((item) => (
            <div key={item.hours} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <div className="text-xl font-extrabold text-white">{item.percentage}%</div>
              <div className="text-xs font-bold text-amber-300">{item.hours}</div>
              <div className="text-[10px] text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
