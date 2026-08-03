import React from 'react';
import { Target, Flag, Sparkles, Plus, Trophy } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';

export const GoalsPage = () => {
  const goals = [
    { title: "Land Staff/Principal Frontend Role ($250k+)", deadline: "Q4 2026", progress: 85, category: "Career" },
    { title: "Deploy 5 Fullstack MERN SaaS Applications", deadline: "Q3 2026", progress: 70, category: "Engineering" },
    { title: "Achieve 15% Body Fat & Run 10K", deadline: "Q3 2026", progress: 90, category: "Health" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Vision & Milestones"
        title="Life Goals & Quarter Milestones"
        subtitle="Align daily habits with long-term career, financial, and personal targets."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Life Goal
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((g, i) => (
          <GlassCard key={i} className="p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="purple">{g.category}</Badge>
                <span className="text-xs text-gray-400 font-mono">Target: {g.deadline}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{g.title}</h3>
            </div>

            <div className="flex flex-col items-center py-2">
              <ProgressRing progress={g.progress} size={130} strokeWidth={10} />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span>Status: On Track</span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
