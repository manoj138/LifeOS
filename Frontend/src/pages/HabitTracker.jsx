import React from 'react';
import { Flame, CheckCircle2, Trophy, Zap, Plus } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const HabitTracker = () => {
  const days = Array.from({ length: 90 }, (_, i) => i);

  const habits = [
    { name: "Coding / MERN Practice", streak: "24 Days", category: "Skills" },
    { name: "Daily LeetCode Problem", streak: "18 Days", category: "DSA" },
    { name: "1 Hour Reading / English Drill", streak: "14 Days", category: "Mindset" },
    { name: "Gym Workout & 3L Water", streak: "30 Days", category: "Fitness" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Consistency Engine"
        title="Habit Tracker & Streak Matrix"
        subtitle="Build unbreakable discipline with GitHub-style contribution heatmaps."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Habit
          </Button>
        }
      />

      {/* GitHub-style Contribution Grid */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            90-Day Discipline Matrix
          </h3>
          <span className="text-xs font-mono text-cyan-400">Total Active Streak: 🔥 30 Days</span>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-15 sm:grid-cols-30 gap-1.5 pt-2">
          {days.map((day) => {
            const intensity = Math.floor(Math.random() * 4);
            const colors = [
              "bg-white/5 border border-white/5",
              "bg-cyan-500/30 border border-cyan-500/40",
              "bg-indigo-500/60 border border-indigo-500/70",
              "bg-purple-500 border border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            ];
            return (
              <div
                key={day}
                className={`w-3.5 h-3.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${colors[intensity]}`}
                title={`Day ${day + 1}: ${intensity > 0 ? 'Completed' : 'Missed'}`}
              />
            );
          })}
        </div>
      </GlassCard>

      {/* Habit List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((h, i) => (
          <GlassCard key={i} className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">{h.name}</h4>
                <span className="text-xs text-gray-400">{h.category}</span>
              </div>
            </div>

            <Badge variant="neon">{h.streak}</Badge>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
