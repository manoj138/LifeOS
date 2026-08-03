import React from 'react';
import { Users, UserCheck, TrendingUp, Sparkles, Target, Award, Clock } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { AnimatedCounter } from '../ui/AnimatedCounter';

export const AdminMetrics = ({ stats }) => {
  const metricsList = [
    {
      title: 'Total Candidates',
      value: stats?.totalCandidates || 1284,
      suffix: '',
      icon: Users,
      color: 'purple',
      subtext: '+48 candidates this week',
    },
    {
      title: 'Onboarding Completion',
      value: stats?.onboardingRate || 94.2,
      suffix: '%',
      icon: UserCheck,
      color: 'cyan',
      subtext: 'High engagement conversion',
    },
    {
      title: 'Avg Learning Velocity',
      value: stats?.avgVelocity || 4.2,
      suffix: ' hrs/day',
      icon: Clock,
      color: 'emerald',
      subtext: 'Daily target commitment',
    },
    {
      title: 'Placement Ready Candidates',
      value: stats?.placementReady || 142,
      suffix: ' Candidates',
      icon: Award,
      color: 'rose',
      subtext: 'Score >= 85% readiness',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsList.map((m, idx) => {
        const Icon = m.icon;
        return (
          <TiltCard key={idx} glowColor={m.color} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                {m.title}
              </span>
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-purple-400">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="text-3xl font-extrabold text-white tracking-tight">
              <AnimatedCounter value={m.value} suffix={m.suffix} />
            </div>

            <div className="mt-3 text-xs text-purple-300 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{m.subtext}</span>
            </div>
          </TiltCard>
        );
      })}
    </div>
  );
};
