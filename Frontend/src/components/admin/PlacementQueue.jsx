import React from 'react';
import { Award, CheckCircle2, UserCheck, Briefcase, ChevronRight, Sparkles, Send } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const PlacementQueue = () => {
  const topCandidates = [
    {
      name: 'Priya Sharma',
      role: 'DevOps & Cloud Engineer',
      score: 96,
      projects: 'Docker Kubernetes CI/CD & AWS VPS Deployments',
      streak: 28,
    },
    {
      name: 'Manoj Kumar Chougule',
      role: 'Full-Stack Web Developer',
      score: 92,
      projects: 'E-Commerce Platform & RoyalESeva Vendor Portal',
      streak: 14,
    },
    {
      name: 'Vikramaditya Patil',
      role: 'Backend & Data Engineer',
      score: 91,
      projects: 'Microservices & Distributed Database Optimization',
      streak: 22,
    },
  ];

  return (
    <GlassCard className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Job Placement & Interview Referral Queue
          </h3>
        </div>
        <Badge variant="emerald">142 Ready</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topCandidates.map((c, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-white/10 space-y-4 hover:border-purple-500/50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold flex items-center justify-center text-sm">
                #{idx + 1}
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                {c.score}% Readiness
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-white">{c.name}</h4>
              <p className="text-xs text-purple-300 font-medium mt-0.5">{c.role}</p>
            </div>

            <p className="text-xs text-gray-400 border-t border-b border-white/10 py-2.5">
              Highlight: <span className="text-gray-200">{c.projects}</span>
            </p>

            <Button size="sm" variant="glow" className="w-full" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Refer to Tech Partner
            </Button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
