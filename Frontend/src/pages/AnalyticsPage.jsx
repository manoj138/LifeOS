import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LineChart as ChartIcon, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useUser } from '../context/UserContext';

export const AnalyticsPage = () => {
  const { user, preferences } = useUser();

  const productivityData = [
    { day: 'Mon', score: 75, studyHours: (preferences?.dailyHours || 4) * 1.1 },
    { day: 'Tue', score: 82, studyHours: (preferences?.dailyHours || 4) * 1.2 },
    { day: 'Wed', score: 90, studyHours: (preferences?.dailyHours || 4) * 1.4 },
    { day: 'Thu', score: 88, studyHours: (preferences?.dailyHours || 4) * 1.3 },
    { day: 'Fri', score: 95, studyHours: (preferences?.dailyHours || 4) * 1.5 },
    { day: 'Sat', score: 80, studyHours: (preferences?.dailyHours || 4) * 1.0 },
    { day: 'Sun', score: 92, studyHours: (preferences?.dailyHours || 4) * 1.3 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge={`Specialization: ${preferences?.targetRole || 'Full-Stack Web Developer'}`}
        title={`Growth Velocity & Performance for ${user?.name || 'Manoj'} ⚡`}
        subtitle={`Data-driven insights into your daily commitment (${preferences?.dailyHours || 4}h/day), interview scores, and productivity velocity.`}
      />


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productivity Velocity Area Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Weekly Deep Work Velocity
            </h3>
            <Badge variant="cyan">+18% vs Last Week</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Study Hours Bar Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ChartIcon className="w-5 h-5 text-purple-400" />
              Daily Focus Hours (MERN & DSA)
            </h3>
            <Badge variant="purple">Avg 7.4 hrs/day</Badge>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData}>
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#121218', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="studyHours" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
