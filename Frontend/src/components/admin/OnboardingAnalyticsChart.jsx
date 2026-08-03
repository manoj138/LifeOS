import React, { useState, useEffect } from 'react';
import { Target, Code2, Server, Layout, Database, Clock, BarChart3, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { ProgressRing } from '../ui/ProgressRing';
import { apiService } from '../../services/api';

export const OnboardingAnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMetrics = async () => {
      const res = await apiService.getAdminMetrics();
      if (isMounted && res?.success && res.data) {
        setAnalyticsData(res.data);
      }
    };
    fetchMetrics();
    return () => { isMounted = false; };
  }, []);

  const roleDistribution = (analyticsData?.roleDistribution && analyticsData.roleDistribution.length > 0)
    ? analyticsData.roleDistribution.map((item, idx) => ({
        ...item,
        icon: [Code2, Server, Layout, Database][idx % 4],
        color: ['bg-purple-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500'][idx % 4],
      }))
    : [
        { role: 'Full-Stack Web Developer', percentage: 0, count: 0, color: 'bg-purple-500', icon: Code2 },
        { role: 'DevOps & Cloud Engineer', percentage: 0, count: 0, color: 'bg-cyan-500', icon: Server },
        { role: 'Frontend Architect', percentage: 0, count: 0, color: 'bg-emerald-500', icon: Layout },
        { role: 'Backend & Data Engineer', percentage: 0, count: 0, color: 'bg-amber-500', icon: Database },
      ];

  const skillColors = {
    Beginner: 'from-blue-500 to-indigo-600',
    Intermediate: 'from-purple-500 to-pink-600',
    Advanced: 'from-emerald-500 to-teal-600',
  };

  const skillLevelBreakdown = (analyticsData?.skillLevelDistribution && analyticsData.skillLevelDistribution.length > 0)
    ? analyticsData.skillLevelDistribution.map((item) => ({
        level: item.level,
        count: `${item.count} Candidate${item.count === 1 ? '' : 's'}`,
        percentage: item.percentage,
        color: skillColors[item.level] || 'from-purple-500 to-pink-600',
      }))
    : [
        { level: 'Beginner', count: '0 Candidates', percentage: 0, color: skillColors.Beginner },
        { level: 'Intermediate', count: '0 Candidates', percentage: 0, color: skillColors.Intermediate },
        { level: 'Advanced', count: '0 Candidates', percentage: 0, color: skillColors.Advanced },
      ];

  const commitmentLabels = {
    '1 Hour / day': 'Casual',
    '2 Hours / day': 'Steady',
    '4 Hours / day': 'Intensive',
    '6+ Hours / day': 'Bootcamp Pace',
  };

  const dailyCommitment = (analyticsData?.dailyCommitmentDistribution && analyticsData.dailyCommitmentDistribution.length > 0)
    ? analyticsData.dailyCommitmentDistribution.map((item) => ({
        hours: item.hours,
        percentage: item.percentage,
        count: item.count,
        label: commitmentLabels[item.hours] || 'Study Pace',
      }))
    : [
        { hours: '1 Hour / day', percentage: 0, count: 0, label: 'Casual' },
        { hours: '2 Hours / day', percentage: 0, count: 0, label: 'Steady' },
        { hours: '4 Hours / day', percentage: 0, count: 0, label: 'Intensive' },
        { hours: '6+ Hours / day', percentage: 0, count: 0, label: 'Bootcamp Pace' },
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
          <span className="text-xs text-gray-400">{analyticsData?.totalCandidates ?? 0} Total</span>
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
                <div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${item.percentage || (analyticsData?.totalCandidates ? Math.round((parseInt(item.count) / analyticsData.totalCandidates) * 100) : 0)}%` }}
                />
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
          <span className="text-xs text-amber-400">Avg {analyticsData?.avgVelocity ?? 0}h/day</span>
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
