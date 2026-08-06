import React from 'react';
import { Users, UserCheck, Award, Clock } from 'lucide-react';
import { StatCard } from '../common/StatCard';

export const AdminMetrics = ({ stats }) => {
  const metricsList = [
    {
      title: 'Total Candidates',
      value: stats?.totalCandidates ?? 0,
      icon: Users,
      glowColor: 'purple',
      subtext: 'Active registered accounts',
    },
    {
      title: 'Onboarding Rate',
      value: `${stats?.onboardingRate ?? 0}%`,
      icon: UserCheck,
      glowColor: 'blue',
      subtext: 'Onboarding completion rate',
    },
    {
      title: 'Avg Velocity',
      value: `${stats?.avgVelocity ?? 0} hrs/day`,
      icon: Clock,
      glowColor: 'emerald',
      subtext: 'Target daily commitment',
    },
    {
      title: 'Placement Ready',
      value: `${stats?.placementReady ?? 0} Users`,
      icon: Award,
      glowColor: 'amber',
      subtext: 'Interview matched candidates',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsList.map((m, idx) => (
        <StatCard
          key={idx}
          title={m.title}
          value={m.value}
          icon={m.icon}
          subtitle={m.subtext}
          glowColor={m.glowColor}
        />
      ))}
    </div>
  );
};
